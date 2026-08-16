# ReducAr
Plataforma educativa para explorar cursos, rutas de aprendizaje y oportunidades de formación digital.


Ejemplos:

================================
=            Ejemplo           =
================================

(Caso de varias modificaciones en un mismo día)
02/08 - Modificación del Readme.md
- Jonathan (Fullstack)
- Hoy diseñé estructura general del archivo README para usar de ejemplo
- Git push 08:50

- Jonathan (Tester de ejemplo)
- Puse a prueba el desempeño y legibilidad del documento


(caso de única modificación en el día)
03/08 - Modificación del Readme.md - Jonathan (Fullstack)
- Hoy diseñé estructura general del archivo README para usar de ejemplo




=========================================================================
=                               FRONT END                               =
=========================================================================







=========================================================================
=                               BACK END                                =
=========================================================================
## 16/08 - Creacción de carpetas iniciales e Instalación de dependencias y demas

**Responsable:** Patricio (BackEnd)

### Carpetas
- Hoy creé la estructura general de carpetas
- Git push 08:50

### Instalé 2 paquetes en la carpeta node_modules
-@supabase/supabase-js
-dotenv
-ejecute: npm install @supabase/supabase-js dotenv

### Instale CLI de Supabase como dependencia de desarrollo
-ejecute: npm install -D

### Creacción de archivo supabase.ts
- Creé el archivo inicial, configure algunas cosas tal y como me había dicho jonathan

### Creacción de archivo seed.ts
- agregue la seed con la configuración que me paso jonathan (*AUN NO ESTA PROBADO SU FUNCIONAMIENTO*)

### Modificación del package.json
- Modifique la parte de scripts agregando la seed

### *NOTA*
AUN ME FALTA PROBAR EL SIGUENTE CODIGO QUE ME PASO JONATHAN EN LA TERMINAL: npx supabase gen types typescript --project-id "tu-project-id" >
ESO PORQUE AUN NO SE CUAL ES LA ID NI TENGO TANTA IDEA DEL QUE HACE AUN.

### Commit:
- Git push realizado: 04:46

=========================================================================
=                            BASE DE DATOS                              =
=========================================================================

## 03/08 - Modificación de migrations

**Responsable:** Maximiliano (Base de datos)

### Tablas creadas:
- roles
- modalidades
- niveles
- tipos_certificado
- estados_curso_usuario
- estados_ruta_usuario
- tipos_reporte
- usuarios
- instituciones
- categorias

### Tablas modificadas:
- cursos

### Commit:
- Git push realizado: 17:15
-----------------------------------------------------------------------
## 03/08 - Modificación de migrations

**Responsable:** Maximiliano (Base de datos)

### Tablas creadas:
- rutas_aprendizaje
- rutas_cursos
- favoritos
- valoraciones_comentarios
- usuarios_cursos_estado
- usuarios_rutas
- tests
- preguntas_test
- opciones_test
- resultados_test_usuario
- reportes
- promociones

### DETALLES:
- Faltan implementar los RLS correctos.

### Commit:
- Git push realizado: 23:05