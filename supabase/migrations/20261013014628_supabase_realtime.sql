alter table valoracion enable row level security;
create policy "Ver valoraciones aprobadas" on valoracion
for select to anon, authenticated using (esta_activa and esta_aprobada);
create policy "Ver mis valoraciones" on valoracion
for select to authenticated using (usuario_id = (select auth.uid()));
create policy "Crear mi valoracion" on valoracion
for insert to authenticated
with check (usuario_id = (select auth.uid()) and esta_aprobada = false);   -- CAMBIO 1
create policy "Admin gestiona valoraciones" on valoracion
for all to authenticated using (public.es_admin()) with check (public.es_admin());

alter table reporte enable row level security;
create policy "Ver mis reportes" on reporte
for select to authenticated using (usuario_id = (select auth.uid()));
create policy "Crear mi reporte" on reporte
for insert to authenticated with check (usuario_id = (select auth.uid()));
create policy "Admin gestiona reportes" on reporte
for all to authenticated using (public.es_admin()) with check (public.es_admin());

do $$
declare t text;
begin
    foreach t in array array['valoracion','reporte','curso','promocion'] loop
        if not exists (select 1 from pg_publication_tables
            where pubname = 'supabase_realtime'
            and schemaname = 'public' and tablename = t) then
            execute format('alter publication supabase_realtime add table public.%I', t);
        end if;
    end loop;
end $$;

