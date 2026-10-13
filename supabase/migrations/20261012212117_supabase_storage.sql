-- =============================================
-- STORAGE: buckets, columna, funcion y politicas
-- =============================================

-- 1. Columna de portada para cursos
alter table curso add column if not exists imagen_url text;

-- 2. Buckets
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values
    ('avatars',     'avatars',     true, 2097152, array['image/png','image/jpeg','image/webp']),
    ('categorias',  'categorias',  true, 1048576, array['image/png','image/svg+xml','image/webp']),
    ('promociones', 'promociones', true, 2097152, array['image/png','image/jpeg','image/webp']),
    ('cursos',      'cursos',      true, 3145728, array['image/png','image/jpeg','image/webp'])
on conflict (id) do update set
    public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

-- 3. Funcion para saber si el usuario es admin
create or replace function public.es_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
    select exists (
        select 1 from public.usuario
        where id = auth.uid() and rol_id = 1 and esta_activo
    );
$$;

-- 4. Politicas de AVATARES: cada usuario gestiona solo su carpeta
drop policy if exists "Usuario lee su carpeta de avatar" on storage.objects;
create policy "Usuario lee su carpeta de avatar"
on storage.objects for select to authenticated
using (bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid()::text));

drop policy if exists "Usuario sube su avatar" on storage.objects;
create policy "Usuario sube su avatar"
on storage.objects for insert to authenticated
with check (bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid()::text));

drop policy if exists "Usuario actualiza su avatar" on storage.objects;
create policy "Usuario actualiza su avatar"
on storage.objects for update to authenticated
using (bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid()::text));

drop policy if exists "Usuario borra su avatar" on storage.objects;
create policy "Usuario borra su avatar"
on storage.objects for delete to authenticated
using (bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid()::text));

-- 5. Politica del CATALOGO: solo administradores
drop policy if exists "Admin gestiona imagenes del catalogo" on storage.objects;
create policy "Admin gestiona imagenes del catalogo"
on storage.objects for all to authenticated
using (bucket_id in ('categorias','promociones','cursos') and public.es_admin())
with check (bucket_id in ('categorias','promociones','cursos') and public.es_admin());