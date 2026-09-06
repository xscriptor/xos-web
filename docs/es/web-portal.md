# Portal web

El sitio web es una aplicación **Next.js** que además transporta el repositorio de
paquetes (ver más abajo). El código vive en `app/`, `components/` y `lib/`.

## Stack

- **Next.js 16** con App Router (`next ^16.2.9`), React 19, TypeScript (strict).
- **Tailwind CSS 4** (`@tailwindcss/postcss`) con `@tailwindcss/typography` para el
  prosa de la documentación markdown.
- **Framer Motion** para animaciones, **Three.js** con **@react-three/fiber** y
  **drei** para el componente `BlackHoleBackground`.
- **next-themes** para el tema claro/oscuro, **lucide-react** para iconos,
  **react-markdown** para renderizar la página de docs, **react-hook-form** para los
  formularios de developers/contact.
- Fuentes: `Anonymous_Pro` cargada con `next/font/google` en `app/layout.tsx`.

## Estructura del código

| Ruta | Rol |
|---|---|
| `app/layout.tsx` | Layout raíz: metadatos, fuente, estilos globales, `Providers` + `Navbar`. |
| `app/page.tsx` | Portada (hero + secciones de características). |
| `app/download/` | Página de descarga (descarga automática del ISO a los 5 s). |
| `app/docs/` | Página de documentación renderizada desde una cadena markdown con `react-markdown`. |
| `app/developers/` | Página "Join the Revolution" con formulario. |
| `app/contact/` | Página de contacto con formulario. |
| `components/BlackHoleBackground.tsx` | Fondo animado con Three.js. |
| `components/Navbar.tsx` | Navegación tipo dock, toggle de tema y de idioma. |
| `components/Providers.tsx` | Envuelve la app en `ThemeProvider` + `I18nProvider`. |
| `lib/i18n.tsx` | Diccionario de traducción y contexto del lado cliente. |
| `app/globals.css` | Estilos globales y entrada de Tailwind. |

## Configuración de export estático

`next.config.mjs`:

```js
const nextConfig = {
  output: 'export',
  basePath: '/x-repo',
  images: { unoptimized: true },
};
```

- `output: 'export'` produce un sitio totalmente estático en `out/` — el despliegue no
  tiene runtime de servidor.
- `basePath: '/x-repo'` coincide con la ruta de proyecto de GitHub Pages
  (`https://xlnux.github.io/x-repo/`). Las referencias a imágenes estáticas en las
  páginas usan el prefijo `/x-repo/images/...` en consecuencia.
- Las imágenes no se optimizan porque el export estático no puede ejecutar el
  optimizador de imágenes de Next.
- Scripts npm (de `package.json`): `dev` (next dev), `build` (next build),
  `start` (next start), `lint` (next lint).

## Build y despliegue en GitHub Pages

El despliegue lo gestiona `.github/workflows/build.yml` ("Deploy Website to GitHub
Pages"). Se dispara **manualmente** (`workflow_dispatch`) después de fusionar cambios
de paquetes.

```yaml
jobs:
  deploy-web:
    runs-on: ubuntu-latest
    steps:
      - actions/checkout@v4
      - actions/setup-node@v4          # node-version: "22"
      - npm ci && npm run build        # export estático a ./out
      - test -f public/repo/x86_64/x.db          # sanity: db del repo presente
      - test -f public/repo/x86_64/x-release-*.pkg.tar.zst
      - actions/upload-pages-artifact@v3 (path: ./out)
      - actions/deploy-pages@v4
```

Permisos del workflow: `pages: write`, `id-token: write` (despliegue de Pages), y un
grupo de concurrencia `pages` para que solo se ejecute un despliegue de Pages a la vez.

Importante: el workflow **no construye paquetes**. Los paquetes se construyen
localmente y se commitean (ver [publishing.md](publishing.md)); el workflow solo
reconstruye la web y sube `./out`.

## Cómo el portal también sirve el repo [x] de pacman

Un export estático de Next copia todo lo de `public/` al directorio de salida `out/`
sin cambios. Como el artefacto de deploy es `./out`, los archivos binarios del repo
commiteados se publican junto con la web:

- `out/repo/x86_64/x.db`, `out/repo/x86_64/x-release-...pkg.tar.zst`, etc. se mapean a
  `https://xlnux.github.io/x-repo/repo/x86_64/...`.
- Por tanto, el Server del repo `[x]` de pacman es
  `https://xlnux.github.io/x-repo/repo/x86_64`.
- El endpoint nativo `.xp` bajo `public/x/x86_64/` se sirve igual en
  `https://xlnux.github.io/x-repo/x/x86_64/` para `xpm`.
- `public/.nojekyll` indica a GitHub Pages que sirva los archivos tal cual (sin
  procesamiento de Jekyll).

Así pues, publicar un paquete es: reconstruir el repo localmente, committear los
archivos nuevos bajo `public/`, y ejecutar una vez el workflow de deploy para
actualizar el sitio de Pages.

## Nota de i18n: es espeja a en

La localización es del lado cliente y basada en diccionario (`lib/i18n.tsx`), no en
rutas:

- Un único tipo `Translations` cubre todos los textos visibles; el diccionario tiene
  un bloque `en` y un bloque `es`.
- El idioma por defecto es `en`. `I18nProvider` guarda el idioma actual en estado de
  React; el botón de globo en `Navbar` alterna entre `en` y `es`.
- No hay una ruta `/es` separada: las mismas páginas se re-renderizan con el
  diccionario seleccionado.
- Actualmente el bloque **`es` espeja a `en`** — ambos bloques contienen las mismas
  cadenas (las traducciones quedaron congeladas al contenido en inglés; ver el cambio
  `i18n: portal content in English (es block mirrors en)`). Cualquier cambio de
  redacción debe aplicarse a ambos bloques.
- La página de docs se alimenta de la cadena markdown `t.docs.content` dentro del
  mismo diccionario, renderizada con `react-markdown`, así que la documentación de
  formato largo también está solo en inglés por ahora.
