# Resumen de Proyecto y Arquitectura: Nuevas Estrellas Headless

Este documento consolida el estado actual de la infraestructura, los avances realizados y la hoja de ruta para el desarrollo de la plataforma web de Nuevas Estrellas utilizando una arquitectura desacoplada (Headless CMS).

---

## 1. Objetivo General
Evolucionar el sitio web de **Nuevas Estrellas** desde un frontend estático tradicional hacia una **arquitectura Headless moderna**, combinando el rendimiento y diseño a medida de **Next.js (React + Tailwind CSS)** con la facilidad de gestión de contenido de **WordPress**.

Todo esto se implementa sobre el plan de hosting compartido existente en Hostinger, sin contratar servicios adicionales (como VPS), garantizando:
- La coexistencia sin conflictos de ambos entornos bajo el mismo dominio (`nuevasestrellas.com`).
- Flujo de trabajo local con IDEs asistidos por IA (Antigravity / VS Code) sin bloqueos del servidor.
- Capacidad futura para editar notas, torneos, tablas y activar/desactivar secciones visuales del Home desde WordPress.

---

## 2. Arquitectura del Sistema

```
                         [ nuevasestrellas.com ]
                                   │
         ┌─────────────────────────┴─────────────────────────┐
         ▼                                                   ▼
 ┌────────────────────────┐                         ┌─────────────────┐
 │       FRONTEND         │                         │   BACKEND CMS   │
 │   Next.js (Estático)   │  ── Fetch REST API ──>  │    WordPress    │
 │ (HTML/CSS/JS compilado)│                         │ (Subcarpeta /cms│
 │  Ruta: /public_html    │                         │  Base de datos) │
 └────────────────────────┘                         └─────────────────┘
```

- **Frontend (Producción):** Archivos generados por Next.js ubicados directamente en la raíz pública (`/public_html`). Gestionan la interfaz visual, rendimiento extremo y SEO.
- **Backend CMS (Gestor de Contenidos):** Instalación de WordPress en la subcarpeta `/public_html/cms`. Funciona exclusivamente como panel de administración y proveedor de datos vía REST API (`/cms/wp-json/wp/v2/...`).
- **Entorno de Desarrollo (Local):** Todo el código fuente de Next.js se mantiene en tu máquina local (`C:\Work\Freelance\nuevas estrellas test`), permitiendo que extensiones de IA como Antigravity corran sin restricciones de recursos.

---

## 3. Estado Actual y Logros Alcanzados

1. **Seguridad y Respaldo:**
   - Se generó una copia de respaldo íntegra del sitio en producción: `domains/nuevasestrellas.com/public_html_backup`.

2. **WordPress Operativo y Configurado:**
   - WordPress instalado con éxito en la subcarpeta `domains/nuevasestrellas.com/public_html/cms`.
   - Base de datos MySQL vinculada y funcionando: `u224233723_u224233723_cms`.
   - Idioma configurado en Español (`es_ES`).
   - Acceso al panel administrativo operativo en: `https://nuevasestrellas.com/cms/wp-login.php`.

3. **Resolución de Conflictos de Enrutamiento (.htaccess):**
   - Se configuró el archivo `.htaccess` en la raíz para ignorar las peticiones a la ruta `/cms` (`RewriteCond %{REQUEST_URI} !^/cms`), evitando que el enrutador de Next.js secuestre las rutas del CMS.
   - Se creó el `.htaccess` interno de WordPress para permitir permalinks limpios.
   - **REST API verificada exitosamente:** Respondiendo con código `HTTP/2 200` y formato JSON en `https://nuevasestrellas.com/cms/wp-json/wp/v2/posts`.

4. **Entorno Local Preparado:**
   - Proyecto estructurado en Next.js con **App Router** (`src/app`), `src/lib`, y Tailwind CSS.

---

## 4. Próximos Pasos (Hoja de Ruta)

### Fase A: Conexión Básica Local (Completada ✅)
- [x] Implementar el cliente conector en `src/lib/wordpress.ts` para realizar peticiones `fetch` a la REST API de WordPress con soporte de fallback local y extracción de imágenes destacadas.
- [x] Adaptar la página de noticias y notas (`src/app/anuncios-notas/page.tsx` / `AnunciosNotas.tsx`) para renderizar de forma dinámica las publicaciones obtenidas de WordPress sin perder el respaldo histórico.

### Fase B: Campos Personalizados y Contenido Dinámico
- [ ] Instalar el plugin **Advanced Custom Fields (ACF)** en WordPress para estructurar datos específicos (Torneos, Equipos, Fechas, Tablas de Posiciones).
- [ ] Habilitar la exposición de campos ACF en la REST API.
- [ ] Consumir los campos estructurados en los componentes de Next.js.

### Fase C: Control de Secciones de la Página de Inicio (Interruptores) (Completada ✅)
- [x] Crear página de configuración en WordPress (`/cms` slug: `inicio`).
- [x] Generar estructura de campos ACF JSON (`acf-home-config.json`) con interruptores para cada sección (Intro, Hero, Quiénes Somos, Modelo, Impacto, Métricas, Premios, Talento, Galería, Patrocinadores, Equipo, Contacto).
- [x] Conectar `src/app/page.tsx` con el componente `HomeSectionRenderer` para renderizado dinámico condicional en tiempo real.

### Fase D: Despliegue Automatizado y Seguro (Completada ✅)
- [x] Configurar el flujo de compilación (`npm run build:prod` con `.htaccess` blindado).
- [x] Implementar script de despliegue incremental inteligente (`npm run deploy` / `scripts/deploy.js`) que salta archivos sin cambios y garantiza la protección de la carpeta `/cms`.