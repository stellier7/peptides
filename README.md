# Lotus Peptides — sitio catálogo

Sitio estático (HTML/CSS/JS puro, sin build step) con 3 páginas:

- `index.html` — catálogo principal (Retatrutide/Tirzepatide, Péptidos, Avanzados, DSIP, Agua/Insumos, Envíos/Novedades). Tarjetas 3D estilo Apple y tarjetas de péptido expandibles.
- `informacion.html` — ficha de referencia de cada péptido, agrupadas por línea de investigación.
- `contacto.html` — página de pedidos con WhatsApp, envío/pick-up y los pasos del proceso.

## Deploy en Vercel

Los archivos del sitio deben estar en la **raíz del repositorio** (`index.html` junto a `README.md`). Si viven en una subcarpeta, Vercel sirve un 404 en `/` porque busca `index.html` en la raíz.

En Vercel:

1. Importa el repo
2. Framework Preset: **Other**
3. Build Command: vacío
4. Output Directory: vacío (o `.`)
5. Root Directory: `.` (no una subcarpeta)

## Estructura de archivos

```
index.html
informacion.html
contacto.html
styles.css
script.js
vercel.json   ← redirecciones desde la ruta antigua /lotus-peptides-site/
```
