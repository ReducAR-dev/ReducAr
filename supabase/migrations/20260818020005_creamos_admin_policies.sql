-- =============================================
-- Políticas administrativas (usan la función es_admin()).
-- =============================================
CREATE SCHEMA IF NOT EXISTS private;
CREATE OR REPLACE FUNCTION private.es_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM usuarios u
    JOIN roles r ON r.id = u.rol_id
    WHERE u.id = auth.uid() AND r.nombre = 'admin'
  );
END;
$$;

------------------------------------------------
-- roles - SELECT público; CRUD admin
------------------------------------------------
CREATE POLICY "Admin administra roles"
ON roles FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- modalidades - SELECT público; CRUD admin
------------------------------------------------
CREATE POLICY "Admin administra modalidades"
ON modalidades FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- niveles - SELECT público; CRUD admin
------------------------------------------------
CREATE POLICY "Admin administra niveles"
ON niveles FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- tipos_certificado - SELECT público; CRUD admin
------------------------------------------------
CREATE POLICY "Admin administra tipos_certificado"
ON tipos_certificado FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- instituciones - SELECT público; CRUD admin
------------------------------------------------
CREATE POLICY "Admin administra instituciones"
ON instituciones FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- categorias - SELECT público; CRUD admin
------------------------------------------------
CREATE POLICY "Admin administra categorias"
ON categorias FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- rutas_cursos - SELECT público; CRUD admin
------------------------------------------------
CREATE POLICY "Admin administra rutas_cursos"
ON rutas_cursos FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- preguntas_test - SELECT público; CRUD admin
------------------------------------------------
CREATE POLICY "Admin administra preguntas_test"
ON preguntas_test FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- opciones_test - SELECT público (cuidado con es_correcta); CRUD admin
------------------------------------------------
CREATE POLICY "Admin administra opciones_test"
ON opciones_test FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- cursos - Activos públicos; CRUD admin
------------------------------------------------
CREATE POLICY "Admin administra cursos"
ON cursos FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- rutas_aprendizaje - Activas públicas; CRUD admin
------------------------------------------------
CREATE POLICY "Admin administra rutas_aprendizaje"
ON rutas_aprendizaje FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- valoraciones_comentarios - Aprobadas públicas; propias; admin
------------------------------------------------
CREATE POLICY "Admin administra valoraciones_comentarios"
ON valoraciones_comentarios FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );

CREATE POLICY "Usuario crea su valoracion"
ON valoraciones_comentarios FOR INSERT TO authenticated
WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Usuario edita su valoracion"
ON valoraciones_comentarios FOR UPDATE TO authenticated
USING (usuario_id = auth.uid())
WITH CHECK (usuario_id = auth.uid());
------------------------------------------------
-- tests - Activos públicos; CRUD admin
------------------------------------------------
CREATE POLICY "Admin administra tests"
ON tests FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- promociones - Activas y vigentes públicas; CRUD admin
------------------------------------------------
CREATE POLICY "Admin administra promociones"
ON promociones FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- usuarios Propio (con rol_id protegido); admin todos
------------------------------------------------
CREATE POLICY "Admin administra usuarios"
ON usuarios FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- favoritos Propios; admin
------------------------------------------------
CREATE POLICY "Admin administra favoritos"
ON favoritos FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- usuarios_cursos_estado Propios; admin
------------------------------------------------
CREATE POLICY "Admin administra usuarios_cursos_estado"
ON usuarios_cursos_estado FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- usuarios_rutas Propios; admin
------------------------------------------------
CREATE POLICY "Admin administra usuarios_rutas"
ON usuarios_rutas FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- resultados_test_usuario - Propios; admin
------------------------------------------------
CREATE POLICY "Admin administra resultados_test_usuario"
ON resultados_test_usuario FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- reportes - Propios; admin
------------------------------------------------
CREATE POLICY "Admin administra reportes"
ON reportes FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- estados_curso_usuario - SELECT autenticado; CRUD admin
------------------------------------------------
CREATE POLICY "Admin administra estados_curso_usuario"
ON estados_curso_usuario FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- estados_ruta_usuario - SELECT autenticado; CRUD admin
------------------------------------------------
CREATE POLICY "Admin administra estados_ruta_usuario"
ON estados_ruta_usuario FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );
------------------------------------------------
-- tipos_reporte - SELECT autenticado; CRUD admin
------------------------------------------------
CREATE POLICY "Admin administra tipos_reporte"
ON tipos_reporte FOR ALL TO authenticated
USING ( (SELECT private.es_admin()) )
WITH CHECK ( (SELECT private.es_admin()) );