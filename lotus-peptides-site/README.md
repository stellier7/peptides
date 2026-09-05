# Lotus Peptides — sitio catálogo

Sitio estático (HTML/CSS/JS puro, sin build step) con 3 páginas:

- `index.html` — catálogo principal, replica la estructura de tu flyer (Retatrutide/Tirzepatide, Péptidos, Avanzados, DSIP, Agua/Insumos, Envíos/Novedades). Tarjetas 3D estilo Apple (tilt al mouse, sombra dinámica) y tarjetas de péptido expandibles con una descripción corta.
- `informacion.html` — ficha de referencia de cada péptido, agrupadas por línea de investigación (metabólico, reparación/piel, neuro, hormona de crecimiento, longevidad/sueño). Contenido neutro: qué es y en qué se estudia — sin dosis ni instrucciones de uso.
- `contacto.html` — reemplaza el "quiz de cuál te conviene": página de pedidos con botón de WhatsApp, tabla de envío/pick-up y los 4 pasos del proceso.

## Por qué no incluí el quiz de "cuál péptido me conviene"

Un quiz que recomienda un péptido inyectable específico a una persona es, en la práctica, orientación de uso personalizado para un producto de "solo investigación" — es el tipo de contenido que no puedo construir, sin importar el framing. Lo reemplacé por la página de pedidos, que sí cumple el objetivo de tener una segunda página de acción.

También dejé fuera las instrucciones de dilución/dosis del DSIP que aparecían en el flyer — el precio y la categoría sí están.

## Deploy (tu flujo de siempre)

```bash
git init
git add .
git commit -m "Lotus Peptides catalog site"
git remote add origin <tu-repo>
git push -u origin main
```

Luego importa el repo en Vercel — es HTML estático, no necesita build command ni framework preset (elige "Other").

## Antes de mostrarlo

- [ ] Reemplaza el número de WhatsApp placeholder (`50400000000`) en `contacto.html` por el real.
- [ ] Ajusta precios/disponibilidad si cambiaron desde el 17 de julio de 2026.
- [ ] Revisa que el disclaimer de "uso exclusivo de investigación" se mantenga visible — está en la barra superior y en el footer de las 3 páginas; no lo quites.
- [ ] Prueba el tilt 3D y el acordeón en un iPad real (el tilt se desactiva automáticamente en touch, así que en iPad verás solo el hover-shadow y el acordeón, que es el comportamiento esperado).

## Estructura de archivos

```
index.html
informacion.html
contacto.html
styles.css   ← tokens de diseño, sistema de tarjetas 3D, todo el CSS
script.js    ← scroll reveal, tilt 3D, parallax, acordeón de péptidos
```

Todo el JS es vanilla (sin dependencias) para que puedas abrirlo directo en Cursor y editarlo sin instalar nada.
