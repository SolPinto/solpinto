# Portafolio — Evelin Soledad Pinto

Sitio estático: HTML + CSS + JavaScript + Three.js (por CDN). No requiere instalar nada.

## Ver en tiempo real (VS Code)
1. Abre la carpeta `portafolio/` en VS Code.
2. Instala la extensión **Live Server** (Ritwick Dey).
3. Clic derecho en `index.html` → **Open with Live Server**. Cada vez que guardes, el navegador se recarga.

> Abrir `index.html` con doble clic no funciona bien: el módulo 3D necesita un servidor local.

## Qué editar
| Archivo | Contenido |
|---|---|
| `index.html` | Textos en español de todas las secciones |
| `js/i18n.js` | Traducciones al inglés (misma clave `data-i18n`) |
| `js/data.js` | Proyectos y evidencias (objetivo, participación, resultado, enlace) |
| `css/organic.css` | Paleta, tipografías y radios (tokens del sistema Organic) |
| `css/styles.css` | Diseño del sitio |
| `js/scene.js` | Animación 3D (Three.js) |
| `assets/evidencias/` | Capturas del trabajo en Agenti, Co. y cartas de recomendación del CIT |
| `assets/foto-perfil.jpeg` | Fotografía usada en la sección Perfil profesional |

## Pendientes
- Añadir la fecha de la pasantía en el CIT (`index.html`, comentario en la línea de la trayectoria).
- Agregar enlaces externos adicionales a cada proyecto en `js/data.js` (`link`) cuando estén disponibles.

## Publicar gratis
GitHub Pages: sube la carpeta a un repositorio → Settings → Pages → Branch `main` / root.
