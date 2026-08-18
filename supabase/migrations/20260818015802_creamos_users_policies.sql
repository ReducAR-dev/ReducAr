-- =============================================
-- Políticas de "datos propios" para usuarios autenticados.
-- =============================================

------------------------------------------------
-- usuarios Propio (con rol_id protegido); admin todos
------------------------------------------------
CREATE POLICY "Solo los usuarios con sesion iniciada pueden leer su row"
ON usuarios FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY "Usuario actualiza su perfil sin cambiar rol"
ON usuarios FOR UPDATE TO authenticated
USING (id = auth.uid())
WITH CHECK (
id = auth.uid()
AND rol_id = (SELECT rol_id FROM usuarios WHERE id = auth.uid())
);


------------------------------------------------
-- favoritos Propios; admin
------------------------------------------------
CREATE POLICY "Solo los usuarios con sesion iniciada pueden leer sus favoritos"
ON favoritos FOR SELECT
TO authenticated
USING (usuario_id = auth.uid());

CREATE POLICY "Usuario crea sus favoritos"
ON favoritos FOR INSERT TO authenticated
WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Usuario borra su favorito"
ON favoritos FOR DELETE TO authenticated
USING (usuario_id = auth.uid());
------------------------------------------------
-- usuarios_cursos_estado Propios; admin
------------------------------------------------
CREATE POLICY "Solo los usuarios con sesion iniciada pueden leer sus usuarios_cursos_estado"
ON usuarios_cursos_estado FOR SELECT
TO authenticated
USING (usuario_id = auth.uid());

CREATE POLICY "Usuario inserta su estado de curso"
ON usuarios_cursos_estado FOR INSERT TO authenticated
WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Usuario actualiza su estado de curso"
ON usuarios_cursos_estado FOR UPDATE TO authenticated
USING (usuario_id = auth.uid())
WITH CHECK (usuario_id = auth.uid());
------------------------------------------------
-- usuarios_rutas Propios; admin
------------------------------------------------
CREATE POLICY "Solo los usuarios con sesion iniciada pueden leer sus usuarios_rutas"
ON usuarios_rutas FOR SELECT
TO authenticated
USING (usuario_id = auth.uid());

CREATE POLICY "Usuario inserta su usuarios_rutas"
ON usuarios_rutas FOR INSERT TO authenticated
WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Usuario actualiza su usuarios_rutas"
ON usuarios_rutas FOR UPDATE TO authenticated
USING (usuario_id = auth.uid())
WITH CHECK (usuario_id = auth.uid());
------------------------------------------------
-- resultados_test_usuario - Propios; admin
------------------------------------------------
CREATE POLICY "todos pueden leer resultados_test_usuario"
ON resultados_test_usuario FOR SELECT
TO authenticated
USING (usuario_id = auth.uid());

CREATE POLICY "Usuario inserta su resultado de test"
ON resultados_test_usuario FOR INSERT TO authenticated
WITH CHECK (usuario_id = auth.uid());
------------------------------------------------
-- reportes - Propios; admin
------------------------------------------------
CREATE POLICY "Solo los usuarios con sesion iniciada pueden leer sus reportes"
ON reportes FOR SELECT
TO authenticated
USING (usuario_id = auth.uid());

CREATE POLICY "Usuario crea sus reportes"
ON reportes FOR INSERT TO authenticated
WITH CHECK(usuario_id = auth.uid());
------------------------------------------------
-- estados_curso_usuario - SELECT autenticado; CRUD admin
------------------------------------------------
CREATE POLICY "Todos pueden leer estados_curso_usuario"
ON estados_curso_usuario FOR SELECT
TO anon, authenticated
USING (true);
------------------------------------------------
-- estados_ruta_usuario - SELECT autenticado; CRUD admin
------------------------------------------------

CREATE POLICY "Todos pueden leer estados_ruta_usuario"
ON estados_ruta_usuario FOR SELECT
TO anon, authenticated
USING (true);
------------------------------------------------
-- tipos_reporte - SELECT autenticado; CRUD admin
------------------------------------------------
CREATE POLICY "Todos pueden leer tipos_reporte"
ON tipos_reporte FOR SELECT
TO anon, authenticated
USING (true);
