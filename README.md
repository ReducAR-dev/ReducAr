# ReducAR 🎓🚀

> **Plataforma web integral para el descubrimiento, orientación y formación en tecnología y habilidades digitales.**

---

## 📌 Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Propósito y Visión](#-propósito-y-visión)
- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Configuración Local](#-instalación-y-configuración-local)
  - [Requisitos Previos](#requisitos-previos)
  - [1. Clonar el Repositorio](#1-clonar-el-repositorio)
  - [2. Configuración del Backend](#2-configuración-del-backend)
  - [3. Configuración del Frontend](#3-configuración-del-frontend)
- [Seguridad y Buenas Prácticas](#-seguridad-y-buenas-prácticas)
- [Hoja de Ruta (Roadmap)](#-hoja-de-ruta-roadmap)
- [Equipo y Contribución](#-equipo-y-contribución)
- [Licencia](#-licencia)

---

## 📖 Acerca del Proyecto

**ReducAR** nace como una solución moderna a la dispersión de oportunidades de capacitación en tecnología en Argentina y la región. En un mercado laboral en constante transformación donde la demanda de perfiles técnicos no deja de crecer, muchas personas encuentran barreras al intentar identificar qué estudiar, dónde hacerlo de forma accesible y qué trayectoria formativa seguir.

ReducAR centraliza, clasifica y valida ofertas formativas —cursos, bootcamps, programas comunitarios y talleres— articulando con instituciones educativas, fundaciones y ONGs de impacto social, brindando una experiencia guiada, accesible y transparente tanto para personas que inician desde cero como para quienes buscan reconvertirse profesionalmente.

---

## 🎯 Propósito y Visión

- **Democratizar el acceso a la tecnología:** Conectar a jóvenes y adultos con iniciativas formativas gratuitas, becadas o de bajo costo.
- **Orientación vocacional temprana:** Ayudar al usuario a descubrir qué rama del sector IT se alinea mejor con sus habilidades, intereses y aspiraciones.
- **Trazabilidad y acompañamiento:** Facilitar rutas de aprendizaje estructuradas paso a paso para evitar la deserción y la sobrecarga de información.
- **Articulación de ecosistema:** Dar visibilidad y difusión al trabajo de organizaciones líderes que promueven la inclusión sociolaboral en tecnología.

---

## ✨ Características Principales

### 🔍 Catálogo Unificado de Oportunidades
- Exploración de cursos organizados por **categorías** (Desarrollo Web, UX/UI, Ciencia de Datos, Ciberseguridad, Habilidades Blandas, entre otras).
- Filtros inteligentes por **modalidad** (online, presencial, híbrido), **nivel de dificultad** (inicial, intermedio, avanzado) e **institución oferente**.
- Fichas de detalle completas con temario, requisitos, certificación, duración y enlaces de inscripción.

### 🧭 Test de Orientación Vocacional IT
- Módulo interactivo de orientación rápida enfocado en habilidades y preferencias cognitivas.
- Algoritmo de ponderación que identifica áreas de afinidad y sugiere directamente **rutas de aprendizaje y cursos recomendados**.

### 🗺️ Rutas de Aprendizaje Estructuradas (Learning Paths)
- Itinerarios formativos curados que ordenan los cursos de manera secuencial y lógica.
- Guías paso a paso desde conceptos fundamentales hasta proyectos aplicados.

### 🤖 Asistente Virtual Inteligente (Chatbot con IA)
- Asistente conversacional en español alimentado por modelos de lenguaje de última generación (**Google Gemini** / **Groq**).
- Entrenado con una **base de conocimiento verificada** y delimitada sobre la plataforma para ofrecer respuestas confiables y contextualizadas.
- **Sistema de escalamiento asistido:** Si una consulta excede el alcance del bot o requiere soporte personalizado, permite al usuario enviar una solicitud formal por correo electrónico al equipo de soporte mediante **Resend API**.

### 👤 Hub y Gestión de Perfil de Usuario
- Flujo integral de autenticación (Registro, Inicio de sesión, Sesiones seguras vía tokens).
- Panel de control personal (**Mi Cuenta**): seguimiento de cursos guardados, lista de favoritos y estado de progreso.
- Actualización de perfil con **carga de foto de avatar en tiempo real**, almacenada y servida de forma optimizada a través de almacenamiento en la nube (**Supabase Storage**).

### 🛡️ Panel de Administración (Admin Dashboard)
- Interfaz dedicada para administradores y moderadores.
- Control y gestión de usuarios, catálogo de cursos, reportes de la comunidad y moderación de valoraciones/reseñas.
- Acceso restringido respaldado por roles de usuario y políticas de seguridad a nivel de base de datos.

### 🤝 Directorio de Organizaciones Colaboradoras
- Espacio dedicado para visibilizar a fundaciones y academias aliadas, sus iniciativas de impacto social y convocatorias abiertas.

---

## 🛠️ Stack Tecnológico

El proyecto está diseñado bajo una arquitectura modular y desacoplada, separando claramente las responsabilidades entre el cliente, el servidor y la capa de persistencia de datos:

### Frontend
- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Empaquetador y tooling:** [Vite](https://vitejs.dev/)
- **Estilos y diseño:** [Tailwind CSS v4](https://tailwindcss.com/) con arquitectura de componentes reutilizables y diseño adaptativo (*Mobile-First*).
- **Enrutamiento:** [React Router v7](https://reactrouter.com/) con layouts dedicados y rutas protegidas (`ProtectedRoute`).
- **Estado Global:** [Zustand](https://github.com/pmndrs/zustand) para gestión de sesiones y estado del usuario autenticado.
- **Formularios y Validación:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) para validación estricta de formularios del lado del cliente.

### Backend
- **Entorno de ejecución:** [Node.js](https://nodejs.org/) (ES Modules / TypeScript vía `tsx` y `tsc`).
- **Framework web:** [Express 5](https://expressjs.com/)
- **Validación de esquemas:** [Zod](https://zod.dev/) para tipado estático y validación exhaustiva de *payloads* en rutas y controladores.
- **Gestión de archivos multimedia:** [Multer](https://github.com/expressjs/multer) configurado con límites de tamaño y filtros estrictos de tipo MIME para subida de avatares.
- **Servicios de IA y Correo:**
  - Google Gemini API (`@google/genai` / REST) con fallback en Groq API.
  - Resend API para despacho transaccional de correos de soporte escalado.
- **Seguridad en red:** Middlewares de CORS dinámico por orígenes permitidos, encabezados de seguridad (`securityHeaders`), registro de auditoría (`loggingMiddleware`) y limitador de peticiones (`Rate Limiting`).

### Base de Datos & Almacenamiento
- **Base de datos relacional:** [PostgreSQL](https://www.postgresql.org/) alojado y gestionado mediante [Supabase](https://supabase.com/).
- **Seguridad de datos:** **Row Level Security (RLS)** activado en todas las tablas para garantizar aislamiento estricto por usuario y rol.
- **Almacenamiento de archivos (Storage):** Buckets seguros de Supabase Storage para recursos multimedia y avatares de usuario.

---

## 🏗️ Arquitectura del Sistema

```text
┌─────────────────────────────────────────────────────────────┐
│                       CLIENTE (WEB)                         │
│   React 19 + TypeScript + Vite + Tailwind CSS + Zustand     │
└──────────────┬──────────────────────────────▲───────────────┘
               │                              │
        HTTP / REST (JSON)             Respuestas Tipadas
               │                              │
┌──────────────▼──────────────────────────────┴───────────────┐
│                      SERVIDOR BACKEND                       │
│              Express 5 + TypeScript (Node.js)               │
│                                                             │
│   [ Middlewares: CORS, Security Headers, Rate Limit, Auth ] │
│   [ Controladores & Rutas: Cursos, Usuarios, Auth, Chat   ] │
│   [ Validación de Datos: Zod Schemas & Error Handling     ] │
└───────┬───────────────────┬──────────────────────┬──────────┘
        │                   │                      │
        ▼                   ▼                      ▼
┌───────────────┐   ┌───────────────┐   ┌──────────────────────┐
│  SUPABASE DB  │   │ SUPABASE BLOB │   │ SERVICIOS EXTERNOS   │
│  PostgreSQL   │   │ Storage API   │   │ • Google Gemini AI   │
│  (RLS Activo) │   │ (Avatares)    │   │ • Resend Email API   │
└───────────────┘   └───────────────┘   └──────────────────────┘
```

---

## 📁 Estructura del Proyecto

```text
reducar/
├── frontend/                     # Aplicación del lado del cliente
│   ├── public/                   # Recursos estáticos públicos
│   └── src/
│       ├── assets/               # Logos, imágenes y recursos vectoriales
│       ├── components/           # Componentes UI (comunes, admin, features, test)
│       ├── hooks/                # Custom React Hooks (useAuth, useChatbot, etc.)
│       ├── layouts/              # Plantillas estructurales (Main, Auth, Admin)
│       ├── mocks/                # Datos de prueba tipados para desarrollo
│       ├── pages/                # Vistas de la aplicación (Home, Cursos, Rutas, etc.)
│       ├── services/             # Clientes de API y peticiones HTTP
│       ├── stores/               # Almacenes de estado global con Zustand
│       ├── types/                # Definiciones de tipos e interfaces TypeScript
│       └── utils/                # Funciones auxiliares, formateadores y validadores
│
├── backend/                      # API REST del lado del servidor
│   └── src/
│       ├── config/               # Inicialización de clientes (Supabase, variables)
│       ├── controllers/          # Controladores con lógica de negocio
│       ├── knowledge/            # Base de conocimiento curada para el Chatbot IA
│       ├── middlewares/          # Middlewares (seguridad, auth, rate limit, logging)
│       ├── models/               # Modelos y tipos de datos
│       ├── prompts/              # Prompts estructurados para el motor de IA
│       ├── routes/               # Definición y enrutamiento de endpoints
│       ├── schema/ & validators/ # Esquemas de validación con Zod
│       ├── scripts/              # Scripts utilitarios y seeds de base de datos
│       └── services/             # Integración con Supabase, Gemini, Groq y Resend
│
├── .gitignore                    # Reglas de exclusión para Git
└── README.md                     # Documentación principal del proyecto
```

---

## 🚀 Instalación y Configuración Local

Sigue los siguientes pasos para ejecutar el proyecto en tu entorno de desarrollo local.

### Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18.x o superior recomendada).
- [npm](https://www.npmjs.com/) (incluido habitualmente con Node.js).
- Una cuenta y proyecto activo en [Supabase](https://supabase.com/) (para base de datos y almacenamiento).
- Credenciales de API para servicios de IA (ej. [Google AI Studio](https://aistudio.google.com/)) y [Resend](https://resend.com/) si se desea probar el asistente y el soporte por correo.

---

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-organizacion/reducar.git
cd reducar
```

---

### 2. Configuración del Backend

1. Ingresa a la carpeta del backend e instala las dependencias:
   ```bash
   cd backend
   npm install
   ```

2. Crea el archivo `.env` en la raíz de `backend/` tomando como referencia las siguientes variables:
   ```env
   # Configuración del Servidor
   PORT=3000
   NODE_ENV=development
   FRONTEND_ORIGIN=http://localhost:5173

   # Conexión con Supabase
   SUPABASE_URL=https://tu-proyecto.supabase.co
   SUPABASE_ANON_KEY=tu_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=tu_supabase_service_role_key

   # Configuración de Inteligencia Artificial (Chatbot)
   CHAT_PROVIDER=gemini
   GEMINI_API_KEY=tu_gemini_api_key
   GEMINI_MODEL=gemini-2.0-flash

   # Proveedor opcional de respaldo para Chatbot
   GROQ_API_KEY=tu_groq_api_key
   GROQ_MODEL=llama-3.3-70b-versatile

   # Servicio de Correo Electrónico (Escalamiento de Soporte)
   RESEND_API_KEY=tu_resend_api_key
   RESEND_FROM_EMAIL=ReducAR Soporte <soporte@tu-dominio-verificado.com>
   SUPPORT_EMAIL=contacto@tu-organizacion.com
   ```

3. *(Opcional)* Ejecutar la carga de datos de prueba (seed):
   ```bash
   npm run seed
   ```

4. Iniciar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
   El backend estará disponible en `http://localhost:3000`.

---

### 3. Configuración del Frontend

1. En una nueva terminal, ingresa a la carpeta del frontend e instala las dependencias:
   ```bash
   cd frontend
   npm install
   ```

2. Crea el archivo `.env` en la raíz de `frontend/`:
   ```env
   # URL base de conexión hacia la API del backend
   VITE_API_URL=http://localhost:3000
   ```

3. Iniciar la aplicación web en modo desarrollo:
   ```bash
   npm run dev
   ```
   La aplicación se abrirá automáticamente en tu navegador en `http://localhost:5173`.

---

## 🔒 Seguridad y Buenas Prácticas

- **Sin exposición de credenciales:** Ninguna clave privada (*service role keys*, API keys de IA o correo) se expone al cliente web; todas las llamadas sensibles son intermediadas y autenticadas a través del backend.
- **Row Level Security (RLS):** Cada consulta en la base de datos se evalúa contra las políticas de fila del usuario que realiza la petición, evitando accesos indebidos o fugas de información.
- **Validación Bidireccional:** Validación con esquemas Zod en formularios de frontend y validación obligatoria en cada endpoint del backend antes de tocar la base de datos.
- **Protección contra abusos (Rate Limiting):** Limitadores de tasa por dirección IP en endpoints generales y límites más estrictos en rutas de autenticación e interacción con IA para mitigar ataques de fuerza bruta y denegación de servicio.
- **Control de subida de archivos:** Verificación de tipo MIME (`image/jpeg`, `image/png`, `image/webp`) y límite de peso en la subida de avatares para prevenir vulnerabilidades de almacenamiento.

---

## 🗺️ Hoja de Ruta (Roadmap)

- [x] Arquitectura base desacoplada (Frontend en React 19 + Backend en Express 5).
- [x] Catálogo general de cursos con tarjetas dinámicas y filtrado.
- [x] Test de orientación vocacional IT con sugerencias automáticas.
- [x] Asistente virtual con IA contextual y sistema de derivación a soporte humano.
- [x] Sistema de autenticación y gestión completa de perfil de usuario.
- [x] Carga segura de avatares de perfil con Supabase Storage.
- [x] Panel inicial de administración para moderación de contenidos y usuarios.
- [ ] Implementación de métricas analíticas avanzadas de impacto formativo.
- [ ] Sistema de notificaciones en tiempo real para postulaciones y novedades.
- [ ] Ampliación de convenios con nuevas organizaciones e instituciones educativas.

---

## 👥 Equipo y Contribución

El desarrollo de **ReducAR** se lleva adelante con un equipo comprometido con la educación y la tecnología:

- **Desarrollo Fullstack y Arquitectura:** Implementación de interfaces, experiencia de usuario (UX), componentes y servicios de integración.
- **Desarrollo Backend y APIs:** Modelado de controladores, seguridad, endpoints y servicios de inteligencia artificial.
- **Base de Datos y Persistencia:** Diseño relacional, esquemas de datos, migraciones y políticas RLS.

### ¿Cómo contribuir?
1. Realiza un **Fork** del proyecto.
2. Crea una rama para tu feature o corrección (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus commits siguiendo convenciones claras (`git commit -m 'feat: agregar nuevo filtro de cursos'`).
4. Haz push a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un **Pull Request** explicando detalladamente los cambios propuestos.

---

## 📄 Licencia

Este proyecto se encuentra bajo los términos de la licencia **ISC** (o la licencia definida para la plataforma). Consulta el archivo de licencia correspondiente para más detalles.

---

<p align="center">
  Hecho con dedicación para impulsar la educación digital inclusiva en Argentina y Latinoamérica 🇦🇷✨
</p>