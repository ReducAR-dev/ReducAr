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

- 20/08/2026 - Jonathan Aguilera (Fullstack)
    - 11:32 commit general sobre nueva estructura de front
    - 11:49 commit general TODO EL PROYECTO AFECTADO
        - Unión "guía" del proyecto (Carpetas Frontend y Backend)



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

-----------------------------------------------------------------------

## 27/08 - Estructura de archivos de la carpeta Models

## Agregué los types de cada tabla 

src/
└──models/
  └─────
       ├ categoria.ts
       ├ common.types.ts
       ├ cursos.ts
       ├ estados_curso_usuario.ts
       ├ estados_ruta_usuario.ts
       ├ favorito.ts
       ├ index.ts
       ├ instituciones.ts
       ├ modalidades.ts
       ├ niveles.ts
       ├ opcion_test.ts
       ├ preguntas_test.ts
       ├ promociones.ts
       ├ reportes.ts
       ├ resultados_test_usuario.ts
       ├ roles.ts
       ├ rutas_aprendizaje.ts
       ├ rutas_cursos.ts
       ├ tests.ts
       ├ tipos_certificado.ts
       ├ tipos_reporte.ts
       ├ usuario.ts
       ├ usuarios_cursos_estado.ts
       ├ usuarios_rutas.ts
       ├ valoraciones_comentarios.ts

### Commit:
- Git push realizado: 16:17

-----------------------------------------------------------------------

## 27/08 - Arreglos de nombres y agregue todos los models al index.ts

### Commit:
- Git push realizado: 16:21


-----------------------------------------------------------------------

28/08 - Conexión a Supabase y Servicios

**Responsable:** Jasmin Cantero (BackEnd)

- Reemplacé los servicios mock por consultas reales a Supabase en `cursos.services.ts`
- Implementé (bases) `obtenerTodosLosCursos()` y `obtenerCursoPorId()` con el cliente de Supabase
- Actualicé el controlador `getCursoPorId` con validación de ID (`isNaN`, entero positivo)
- Verifiqué que los endpoints `GET /cursos` y `GET /cursos/:id` funcionan con Postman (respuestas correctas aunque tabla vacía)


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
-----------------------------------------------------------------------
## 17/08 - Modificación de migrations

**Responsable:** Maximiliano (Base de datos)

### Tablas modificadas:
- TODAS

### DETALLES:
- Tablas actualizadas hasta la fecha, RLS FUNCIONANDO.
- Faltan indexar para mejorar ms.
- Faltan triggers

### Commit:
- Git push realizado: 23:05

-----------------------------------------------------------------------

## Chatbot

El chatbot de ReducAR es un asistente virtual en español que responde mediante una API de IA
ejecutada exclusivamente desde el backend. Utiliza el contexto verificado de la plataforma,
evita inventar oportunidades y marca las consultas que requieren intervención humana.

### Endpoints

- `POST /api/chat`: recibe `message` y, opcionalmente, hasta ocho mensajes de historial. Devuelve
  la respuesta, su categoría y `requiresHumanSupport`.
- `POST /api/chat/escalate`: recibe `message`, `email` y un `name` opcional. Sólo se utiliza cuando
  el usuario confirma que desea enviar la consulta al equipo.

Ambos endpoints validan el contenido y tienen rate limiting. Si Gemini o el servicio de correo
fallan, el servidor responde de forma controlada y no expone credenciales.

### Variables de entorno

Copiar `backend/.env.example` a `backend/.env` y completar:

```env
PORT=3000
FRONTEND_ORIGIN=http://localhost:5173
CHAT_PROVIDER=gemini
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-3.7-flash
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=ReducAR <soporte@your_verified_domain.com>
SUPPORT_EMAIL=equipo@your_domain.com
```

La clave de Gemini se crea en Google AI Studio. La clave de Resend debe tener permiso de envío y
el remitente debe pertenecer a un dominio verificado. Nunca colocar estas claves en el frontend,
el README ni archivos versionados. Groq puede conservarse como respaldo opcional configurando
`CHAT_PROVIDER=groq`, `GROQ_API_KEY` y `GROQ_MODEL`.

Copiar `frontend/.env.example` a `frontend/.env` y configurar la URL pública del backend:

```env
VITE_API_URL=http://localhost:3000
```

En producción, `FRONTEND_ORIGIN` debe contener el origen público del frontend y `VITE_API_URL` la
URL pública del backend.

### Desarrollo local

En dos terminales:

```bash
cd backend
npm install
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

Abrir el frontend, iniciar el asistente desde el botón flotante y probar una consulta general y
otra que requiera soporte, por ejemplo: `No puedo entrar a mi cuenta y necesito hablar con alguien`.
El correo sólo se solicita y envía después de presionar **Enviar consulta** y confirmar el formulario.
