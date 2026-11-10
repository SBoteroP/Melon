# Corazón de Melón 🍈

Página estática para GitHub Pages. Sin dependencias ni compilación.

## Estructura

```
index.html        estructura y menú
css/style.css     estilos
js/config.js      nombre, título, dedicatoria, opciones del home
js/main.js        lógica
carta.txt         la primera carta
cartas/           el resto de cartas (.txt)
assets/           gifs, fotos y canción
```

## Escribir las cartas

El menú **Cartas** muestra una lista; cada carta es un `.txt` (párrafos separados por una línea en blanco).

Para agregar una carta:

1. Crea el archivo, por ejemplo `cartas/san-valentin.txt`.
2. Añádela a la lista `cartas` en `js/config.js`:

```js
{ nombre: "San Valentín", fecha: "14 de febrero", archivo: "cartas/san-valentin.txt" },
```

`fecha` es opcional y `dedicatoria` también (si no la pones usa la general).
La primera carta de la lista lee `carta.txt`.

## Correrla en tu PC

La carta se carga con `fetch`, así que **no funciona con doble clic** en `index.html`.
Usa un servidor local desde esta carpeta:

```powershell
python -m http.server 8000
```

Abre http://localhost:8000. (Alternativa: `npx serve`, o la extensión Live Server de VS Code.)
Para detenerlo, `Ctrl+C`.

## Publicar en GitHub Pages

```powershell
git init
git add .
git commit -m "Primera versión"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

Luego en GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → main / (root)**.
En un minuto o dos queda en `https://TU_USUARIO.github.io/TU_REPO/`.

Ojo: si el repo es público, la carta también lo es.

## Gifs y música

Pon los archivos en `assets/` con estos nombres (o cámbialos en `js/config.js`):
`hero.gif`, `cancion.mp3`. Si falta alguno se muestra un emoji.

## Secciones vacías

Recuerdos y Sorpresas dicen "Próximamente". Se llenan en `index.html`
(cada una es un `<section>` con su id).
