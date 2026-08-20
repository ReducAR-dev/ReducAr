-- =============================================
-- Políticas de SELECT público
-- =============================================

------------------------------------------------
-- Roles - SELECT público; CRUD admin
------------------------------------------------
CREATE POLICY "Todos pueden leer roles"
ON roles FOR SELECT
TO anon, authenticated
USING (true);
------------------------------------------------
-- modalidades - SELECT público; CRUD admin
------------------------------------------------
CREATE POLICY "Todos pueden leer modalidades"
ON modalidades FOR SELECT
TO anon, authenticated
USING (true);
------------------------------------------------
-- niveles - SELECT público; CRUD admin
------------------------------------------------
CREATE POLICY "Todos pueden leer niveles"
ON niveles FOR SELECT
TO anon, authenticated
USING (true);
------------------------------------------------
-- tipos_certificado - SELECT público; CRUD admin
------------------------------------------------
CREATE POLICY "Todos pueden leer tipos_certificado"
ON tipos_certificado FOR SELECT
TO anon, authenticated
USING (true);
------------------------------------------------
-- instituciones - SELECT público; CRUD admin
------------------------------------------------
CREATE POLICY "todos pueden leer instituciones"
ON instituciones FOR SELECT
TO anon, authenticated
USING (true);
------------------------------------------------
-- categorias - SELECT público; CRUD admin
------------------------------------------------
CREATE POLICY "todos pueden leer categorias"
ON categorias FOR SELECT
TO anon, authenticated
USING (true);
------------------------------------------------
-- rutas_cursos - SELECT público; CRUD admin
------------------------------------------------
CREATE POLICY "todos pueden leer rutas_cursos"
ON rutas_cursos FOR SELECT
TO anon, authenticated
USING (true);
------------------------------------------------
-- preguntas_test - SELECT público; CRUD admin
------------------------------------------------
CREATE POLICY "todos pueden leer preguntas_test"
ON preguntas_test FOR SELECT
TO anon, authenticated
USING (true);
------------------------------------------------
-- opciones_test - SELECT público (cuidado con es_correcta); CRUD admin
------------------------------------------------
CREATE POLICY "todos pueden leer opciones_test"
ON opciones_test FOR SELECT
TO anon, authenticated
USING (true);
------------------------------------------------
-- cursos - Activos públicos; CRUD admin
------------------------------------------------
CREATE POLICY "todos pueden leer cursos"
ON cursos FOR SELECT
TO anon, authenticated
USING (esta_activo = true);
------------------------------------------------
-- ruta - Activas públicas; CRUD admin
------------------------------------------------
CREATE POLICY "todos pueden leer ruta"
ON rutas_aprendizaje FOR SELECT
TO anon, authenticated
USING (esta_activa = true);
------------------------------------------------
-- valoraciones_comentarios - Aprobadas públicas; propias; admin
------------------------------------------------
CREATE POLICY "todos pueden leer valoraciones_comentarios"
ON valoraciones_comentarios FOR SELECT
TO anon, authenticated
USING (esta_aprobada = true OR usuario_id=auth.uid());
------------------------------------------------
-- tests - Activos públicos; CRUD admin
------------------------------------------------
CREATE POLICY "todos pueden leer tests"
ON tests FOR SELECT
TO anon, authenticated
USING (true);
------------------------------------------------
-- promociones - Activas y vigentes públicas; CRUD admin
------------------------------------------------
CREATE POLICY "todos pueden leer promociones activas"
ON promociones FOR SELECT
TO anon, authenticated
USING (
    esta_activa = true
    AND now() BETWEEN fecha_inicio AND fecha_finalizacion
);