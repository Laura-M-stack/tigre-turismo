# Tigre Turismo

Guía práctica (no oficial) para planificar un día en Tigre, Buenos Aires: qué hacer, cómo llegar y un itinerario que se guarda en el navegador.

**Demo:** https://laura-m-stack.github.io/tigre-turismo/

## Funcionalidades

- 18 lugares con duración, presupuesto, tips, galería y mapa.
- Vista **lista + mapa** con marcadores numerados que coinciden con la lista.
- Búsqueda sin tildes, filtros y planes rápidos; los filtros viven en la URL (se pueden compartir).
- Itinerario ordenable con estimación de tiempo, mapa y "copiar plan".
- Créditos de cada foto (autor + licencia) y página `/creditos`.

## Stack

React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · React Router 7 · Leaflet / OpenStreetMap · Vitest

## Decisiones técnicas

- **Un solo store para el itinerario** (`src/lib/itineraryStore.ts` + `useSyncExternalStore`): antes había dos claves en localStorage (favoritos y orden) que se desincronizaban. Migra automáticamente los datos de la versión anterior y sincroniza entre pestañas.
- **Lógica pura y testeada**: filtros, orden, labels, itinerario, share y datos (`pnpm test`).
- **Fotos con licencia verificable**: `src/data/photos.json` lista archivos de Wikimedia Commons. `pnpm credits` consulta la API de Commons, confirma que cada archivo existe y completa autor y licencia. Corre solo antes de cada deploy y falla si falta una licencia.
- Si no hay una foto libre **del lugar exacto**, se muestra un panel sin foto en lugar de una imagen de otro sitio.
- Leaflet se carga solo cuando un mapa entra en pantalla.

## Scripts

```bash
pnpm dev        # desarrollo
pnpm test       # tests unitarios
pnpm credits    # actualiza autor/licencia de las fotos (requiere internet)
pnpm run deploy # credits + test + build + gh-pages
```

## Fotos

La foto de portada es de Laura Moyano. El resto proviene de Wikimedia Commons bajo licencias libres; ver `/creditos` en el sitio.
