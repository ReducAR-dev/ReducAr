-- ------------------------------------------------------------------------------
-- ------------------------------RLS USUARIO-------------------------------------
-- ------------------------------------------------------------------------------

--Funcion auxiliar
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
    select exists (
        select 1
        from public.usuario u
        join public.rol r on r.id=u.rol_id
        where u.id = (select auth.uid())
            and r.nombre = 'admin'
            and u.esta_activo
    );
$$;
revoke execute on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

--activo RLS
alter table public.usuario enable row level security;

create policy "Usuario: ver propio o admin" on public.usuario
    for select to authenticated
    using (id = (select auth.uid()) or public.is_admin());

create policy "usuario: crear propio" on public.usuario
    for insert to authenticated
    with check (id = (select auth.uid()) and rol_id=2);

create policy "usuario: editar propio o admin" on public.usuario
    for update to authenticated
    using (id = (select auth.uid()) or public.is_admin())
    with check (id = (select auth.uid()) or public.is_admin());

create policy "usuario: borrar admin" on public.usuario
    for delete to authenticated
    using (public.is_admin());

--Trigger de usuario
create or replace function public.proteger_columnas_usuario()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
    if (select auth.uid()) is not null and not public.is_admin() then
        if new.rol_id is distinct from old.rol_id
            or new.esta_activo is distinct from old.esta_activo then
            raise exception 'No puedes modificar rol_id ni esta_activo';
        end if;
    end if;
    return new;
end;
$$;

create trigger trg_proteger_columnas_usuario
    before update on public.usuario
    for each row execute function public.proteger_columnas_usuario();
-- ------------------------------------------------------------------------------

create or replace function public.is_publisher()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
    select exists (
    select 1
    from public.usuario u
    where u.id = (select auth.uid())
        and u.rol_id in (3, 4)
        and u.esta_activo
    );
$$;
revoke execute on function public.is_publisher() from public, anon;
grant execute on function public.is_publisher() to authenticated;
-- -----------------------------------------------------------------
do $$
declare t text;
begin
    foreach t in array array['modalidad', 'nivel', 'tipo_certificado', 'tipo_reporte']
    loop
        execute format('alter table public.%I enable row level security', t);

        execute format('drop policy if exists %I on public.%I', t || ': lectura publica', t);
        execute format(
            'create policy %I on public.%I for select to anon, authenticated using (true)',
            t || ': lectura publica', t);

        execute format('drop policy if exists %I on public.%I', t || ': insertar admin', t);
        execute format(
            'create policy %I on public.%I for insert to authenticated with check ((select public.is_admin()))',
            t || ': insertar admin', t);
    end loop;
end $$;

-- Catálogos solo para usuarios logueados
do $$
declare t text;
begin
    foreach t in array array['rol', 'estado_reporte']
    loop
        execute format('alter table public.%I enable row level security', t);

        execute format('drop policy if exists %I on public.%I', t || ': lectura autenticados', t);
        execute format(
            'create policy %I on public.%I for select to authenticated using (true)',
            t || ': lectura autenticados', t);

        execute format('drop policy if exists %I on public.%I', t || ': insertar admin', t);
        execute format(
            'create policy %I on public.%I for insert to authenticated with check ((select public.is_admin()))',
            t || ': insertar admin', t);
    end loop;
end $$;

-- tipo_accion: solo la ve/usa el admin (es interno de auditoría)
alter table public.tipo_accion enable row level security;

create policy "tipo_accion: ver admin" on public.tipo_accion
    for select to authenticated
    using ((select public.is_admin()));

create policy "tipo_accion: insertar admin" on public.tipo_accion
    for insert to authenticated
    with check ((select public.is_admin()));


-- =====================================================================
-- SECCIÓN 3: CURSOS
-- =====================================================================

-- categoria: lectura pública, gestión admin
alter table public.categoria enable row level security;

create policy "categoria: lectura publica" on public.categoria
    for select to anon, authenticated
    using (true);

create policy "categoria: insertar admin" on public.categoria
    for insert to authenticated
    with check ((select public.is_admin()));

create policy "categoria: editar admin" on public.categoria
    for update to authenticated
    using ((select public.is_admin()))
    with check ((select public.is_admin()));

create policy "categoria: borrar admin" on public.categoria
    for delete to authenticated
    using ((select public.is_admin()));

-- -----------------------------------------------------------
alter table public.curso enable row level security;

create policy "curso: ver activos o admin" on public.curso
    for select to anon, authenticated
    using (esta_activo or (select public.is_admin()));

create policy "curso: publicar both/institution o admin" on public.curso
    for insert to authenticated
    with check ((select public.is_publisher()) or (select public.is_admin()));

create policy "curso: editar admin" on public.curso
    for update to authenticated
    using ((select public.is_admin()))
    with check ((select public.is_admin()));

create policy "curso: borrar admin" on public.curso
    for delete to authenticated
    using ((select public.is_admin()));

-- --------------------------------------------------------------


alter table public.curso_usuario enable row level security;

create policy "curso_usuario: ver propio o admin" on public.curso_usuario
    for select to authenticated
    using (usuario_id = (select auth.uid()) or (select public.is_admin()));

create policy "curso_usuario: crear propio" on public.curso_usuario
    for insert to authenticated
    with check (usuario_id = (select auth.uid()));

create policy "curso_usuario: editar propio o admin" on public.curso_usuario
    for update to authenticated
    using (usuario_id = (select auth.uid()) or (select public.is_admin()))
    with check (usuario_id = (select auth.uid()) or (select public.is_admin()));

create policy "curso_usuario: borrar admin" on public.curso_usuario
    for delete to authenticated
    using ((select public.is_admin()));


-- =====================================================================
-- SECCIÓN 5: INTERACCIONES DEL USUARIO
-- =====================================================================

-- favorito: el usuario gestiona solo los suyos (aquí sí se borra de verdad)
alter table public.favorito enable row level security;

create policy "favorito: ver propio o admin" on public.favorito
    for select to authenticated
    using (usuario_id = (select auth.uid()) or (select public.is_admin()));

create policy "favorito: crear propio" on public.favorito
    for insert to authenticated
    with check (usuario_id = (select auth.uid()));

create policy "favorito: borrar propio o admin" on public.favorito
    for delete to authenticated
    using (usuario_id = (select auth.uid()) or (select public.is_admin()));


-- valoracion
alter table public.valoracion enable row level security;

create policy "valoracion: ver publicas, propia o admin" on public.valoracion
    for select to anon, authenticated
    using (
    (esta_aprobada and esta_activa)
    or usuario_id = (select auth.uid())
    or (select public.is_admin())
    );

-- Al crear siempre nace sin aprobar
create policy "valoracion: crear propia" on public.valoracion
    for insert to authenticated
    with check (
    usuario_id = (select auth.uid())
    and esta_aprobada = false
    and fecha_aprobacion is null
    );

-- Editar propia (incluye el soft delete: esta_activa = false)
create policy "valoracion: editar propia" on public.valoracion
    for update to authenticated
    using (usuario_id = (select auth.uid()))
    with check (usuario_id = (select auth.uid()) and esta_aprobada = false and fecha_aprobacion is null);

-- Admin: aprobar / moderar
create policy "valoracion: editar admin" on public.valoracion
    for update to authenticated
    using ((select public.is_admin()))
    with check ((select public.is_admin()));

-- Nunca se hace DELETE (soft delete): solo admin como válvula de escape
create policy "valoracion: borrar admin" on public.valoracion
    for delete to authenticated
    using ((select public.is_admin()));


revoke select on public.valoracion from anon, authenticated;
grant select (id, usuario_id, curso_id, puntuacion, comentario,
            esta_activa, esta_aprobada, fecha_aprobacion, fecha)
    on public.valoracion to anon, authenticated;

-- Vista completa solo para admin (corre con permisos del owner y se filtra a mano)
create or replace view public.valoracion_admin as
    select v.*
    from public.valoracion v
    where public.is_admin();

revoke all on public.valoracion_admin from public, anon;
grant select on public.valoracion_admin to authenticated;


-- =====================================================================
-- SECCIÓN 7: REPORTES Y AUDITORÍA
-- =====================================================================

-- reporte: cualquier logueado crea; solo admin lee, actualiza y resuelve
alter table public.reporte enable row level security;

create policy "reporte: crear propio" on public.reporte
    for insert to authenticated
    with check (
    usuario_id = (select auth.uid())
    and estado_id = 1                 -- 1 = pending
    and respuesta_admin is null
    and fecha_resolucion is null
    );

create policy "reporte: ver admin" on public.reporte
    for select to authenticated
    using ((select public.is_admin()));

create policy "reporte: actualizar admin" on public.reporte
    for update to authenticated
    using ((select public.is_admin()))
    with check ((select public.is_admin()));

create policy "reporte: borrar admin" on public.reporte
    for delete to authenticated
    using ((select public.is_admin()));



alter table public.auditoria enable row level security;

create policy "auditoria: ver admin" on public.auditoria
    for select to authenticated
    using ((select public.is_admin()));

-- Defensa en profundidad: aunque alguien cree una policy por error,
-- los roles de la API no tienen permiso de modificar/borrar.
revoke insert, update, delete, truncate on public.auditoria from anon, authenticated;
revoke all on public.auditoria from anon;


-- =====================================================================
-- SECCIÓN 8: PROMOCIONES
-- =====================================================================

-- La tabla `promocion` no tiene creador_id ni es_forzada/monto_subsidiado
-- (la sección 8 de las reglas los menciona). Por ahora gestión solo admin.
alter table public.promocion enable row level security;

create policy "promocion: ver vigentes o admin" on public.promocion
    for select to anon, authenticated
    using (
        (esta_activa and current_date between fecha_inicio and fecha_finalizacion)
        or (select public.is_admin())
);

create policy "promocion: crear admin" on public.promocion
    for insert to authenticated
    with check ((select public.is_admin()));

create policy "promocion: editar admin" on public.promocion
    for update to authenticated
    using ((select public.is_admin()))
    with check ((select public.is_admin()));

create policy "promocion: borrar admin" on public.promocion
    for delete to authenticated
    using ((select public.is_admin()));

