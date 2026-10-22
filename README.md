# Ruta de Aprendizaje · Vue 3 + Vite + TypeScript con SWAPI

Un **showcase didáctico** que enseña Vue 3 moderno construyendo, paso a paso, una
pequeña aplicación real que consume la [API SWAPI](https://swapi.dev) (Star Wars).

No es una demo de “hola mundo”: es una **ruta de 10 lecciones progresivas** donde cada
una añade una pieza y se apoya en las anteriores. Cada lección incluye:

- una **demo interactiva** que puedes tocar,
- una sección de **código clave** (el fragmento esencial de esa lección),
- **retos** para practicar por tu cuenta,
- un botón para **marcar la lección como completada** (tu progreso se guarda).

---

## ¿Qué vas a aprender?

| #   | Lección                            | Nivel      | Min | Conceptos clave                                                          |
| --- | ---------------------------------- | ---------- | --- | ------------------------------------------------------------------------ |
| 01  | **Reactividad esencial**           | Inicial    | 25  | `ref`, `computed`, `watch`, `v-if`, `v-for`, `v-bind`, `v-on`            |
| 02  | **Componentes, props y eventos**   | Inicial    | 30  | `defineProps`, `defineEmits`, `defineModel` (`v-model`), composición     |
| 03  | **Datos asíncronos**               | Intermedio | 35  | `onMounted`, `fetch` + `AbortController`, estados carga/error/vacío      |
| 04  | **Composables**                    | Intermedio | 35  | extraer lógica, `useAsyncData`, genéricos en TS, `customRef`             |
| 05  | **Vue Router**                     | Intermedio | 40  | rutas dinámicas, `useRoute`/`useRouter`, `RouterLink`, lazy loading      |
| 06  | **Estado global con Pinia**        | Intermedio | 35  | `defineStore`, getters, acciones, persistencia en `localStorage`         |
| 07  | **Formularios y búsqueda**         | Intermedio | 35  | `v-model`, `debounce`, filtrado, búsqueda en servidor (`?search=`)       |
| 08  | **Slots y provide/inject**         | Avanzado   | 30  | slots con nombre, slots con scope, `provide`/`inject`, `InjectionKey`    |
| 09  | **Transiciones y UX de carga**     | Avanzado   | 35  | `<Transition>`, `<TransitionGroup>`, skeletons, `prefers-reduced-motion` |
| 10  | **Rendimiento y buenas prácticas** | Avanzado   | 30  | `v-once`, `v-memo`, `shallowRef`, code splitting, checklist              |

Duración total estimada: **~5 h 30 min**.

> La aplicación “real” que usan las lecciones es un **explorador SWAPI** con listados
> paginados, fichas de detalle, búsqueda y **favoritos persistentes**.

---

## Stack

| Herramienta                                                     | Versión | Rol                                            |
| --------------------------------------------------------------- | ------- | ---------------------------------------------- |
| [Vue 3](https://vuejs.org)                                      | `^3.5`  | Framework (Composition API + `<script setup>`) |
| [Vite](https://vite.dev)                                        | `^7.3`  | Dev server y bundler                           |
| [TypeScript](https://www.typescriptlang.org)                    | `~5.9`  | Tipado estático                                |
| [vue-tsc](https://github.com/vuejs/language-tools)              | `^3.3`  | Chequeo de tipos de los SFC                    |
| [Vue Router](https://router.vuejs.org)                          | `^4.6`  | Enrutado y carga diferida                      |
| [Pinia](https://pinia.vuejs.org)                                | `^3.0`  | Estado global                                  |
| [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue) | `^6.0`  | Soporte de `.vue` en Vite                      |

**Sin dependencias de UI**: todo el estilo es CSS propio con variables, para que el foco
esté en Vue, no en una librería de componentes.

### Requisitos

- **Node.js ≥ 20.19** (o ≥ 22.12). Vite 7 lo exige; por eso el proyecto fija Vite 7 y no
  Vite 8 (que pide Node ≥ 22.18).
- npm (incluido con Node).

```bash
node -v   # p. ej. v20.19.4
npm create vite@latest web14 -- --template vue-ts # crea el proyecto con vite
npm install # instala las dependencias
npm run dev # arranca el proyecto
```

---

## Puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Arrancar en desarrollo (http://localhost:5173)
npm run dev

# 3. Compilar para producción (typecheck + build) -> dist/
npm run build

# 4. Previsualizar el build de producción
npm run preview

# 5. Sólo comprobar tipos
npm run typecheck
```

### Scripts disponibles

| Script              | Qué hace                                                  |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Servidor de desarrollo con HMR en `http://localhost:5173` |
| `npm run build`     | Ejecuta `vue-tsc --noEmit` (tipos) y luego `vite build`   |
| `npm run preview`   | Sirve la carpeta `dist/` para probar el build             |
| `npm run typecheck` | Sólo `vue-tsc --noEmit`                                   |

---

## Estructura del proyecto

```
web13/
├─ index.html                  # HTML raíz (monta #app y carga /src/main.ts)
├─ vite.config.ts              # Plugin de Vue + alias "@" -> ./src
├─ tsconfig.json               # TS estricto, moduleResolution: bundler
├─ .env.example                # VITE_SWAPI_BASE_URL (opcional)
└─ src/
   ├─ main.ts                  # createApp + Pinia + Router + mount
   ├─ App.vue                  # Layout raíz (header + sidebar + <RouterView> + footer)
   ├─ style.css                # Variables de tema, reset y utilidades
   │
   ├─ router/
   │  └─ index.ts              # Rutas + lazy loading + título del documento
   │
   ├─ data/
   │  └─ lessons.ts            # Metadatos de la ruta de aprendizaje (títulos, niveles…)
   │
   ├─ api/                     # Capa de datos (SWAPI)
   │  ├─ types.ts              # Interfaces (Person, Planet, Film…) y helpers
   │  ├─ http.ts               # fetch tipado, errores y mirrors de respaldo
   │  └─ swapi.ts              # Endpoints con genéricos: listResource, getResource
   │
   ├─ composables/             # Lógica reactiva reutilizable
   │  ├─ useAsyncData.ts       # data / error / loading + AbortController
   │  ├─ useSwapi.ts           # useSwapiList (paginado) y useSwapiDetail
   │  ├─ useDebouncedRef.ts    # useDebouncedRef (customRef) y useDebouncedValue
   │  ├─ useProgress.ts        # Progreso de lecciones (estado a nivel de módulo)
   │  └─ useTheme.ts           # Tema claro/oscuro con provide/inject
   │
   ├─ stores/
   │  └─ favorites.ts          # Store de Pinia: favoritos persistidos
   │
   ├─ components/
   │  ├─ layout/               # AppHeader, AppSidebar, AppFooter
   │  ├─ ui/                   # BaseButton, BaseCard, BaseBadge, CodeBlock,
   │  │                        # LoadingState, ErrorState, EmptyState, PaginationBar
   │  ├─ swapi/                # ResourceCard, ResourceField, FavoriteButton, FavoriteLink
   │  ├─ lesson/               # LessonShell, LessonPager, ChallengeList
   │  └─ demo/                 # Componentes pequeños usados dentro de las lecciones
   │
   └─ views/
      ├─ HomeView.vue                  # Portada + índice de la ruta
      ├─ ResourceListView.vue          # Listado paginado + filtro
      ├─ ResourceDetailView.vue        # Ficha de detalle + relaciones
      ├─ FavoritesView.vue             # Favoritos
      ├─ NotFoundView.vue              # 404 (ruta comodín)
      └─ lessons/
         ├─ Lesson01ReactivityView.vue   … Lesson10PerformanceView.vue
```

### Rutas de la aplicación

| Ruta                                                      | Nombre            | Vista                       |
| --------------------------------------------------------- | ----------------- | --------------------------- |
| `/`                                                       | `home`            | Portada e índice de la ruta |
| `/lecciones/01-reactividad` … `/lecciones/10-rendimiento` | `lesson-*`        | Cada lección                |
| `/:resource(people\|planets\|films\|starships\|species)`  | `resource-list`   | Listado SWAPI               |
| `/:resource/:id`                                          | `resource-detail` | Ficha de un recurso         |
| `/favoritos`                                              | `favorites`       | Favoritos guardados         |
| `/*`                                                      | `not-found`       | 404                         |

Los segmentos dinámicos van restringidos con una expresión regular
(`(people|planets|films|starships|species)`), de modo que sólo aceptan recursos válidos.

---

## Cómo recorrer la ruta de aprendizaje

1. **Sigue el orden.** Abre la app y empieza por la **Lección 01**. La barra lateral marca
   tu progreso y la lección activa.
2. **Interactúa con cada demo.** Todas usan datos locales o SWAPI en vivo.
3. **Lee el “código clave”.** Es el fragmento mínimo que resume la lección; el botón
   _Copiar_ guarda el snippet en el portapapeles.
4. **Resuelve los retos.** Cada lección propone ejercicios para aplicar lo aprendido.
5. **Marca la lección como completada** y continúa con la siguiente.

Cada lección está pensada para que la anterior sea un requisito: por ejemplo, la
Lección 04 (“Composables”) refactoriza exactamente lo que escribiste a mano en la 03.

---

## Sobre la API SWAPI

SWAPI es una API REST pública de Star Wars, ideal para practicar: es de sólo lectura, no
necesita autenticación y tiene recursos relacionados entre sí (personajes → planeta natal,
películas → personajes…).

**Base por defecto:** `https://swapi.dev/api`

### Recursos usados

| Recurso    | Endpoint      | Ejemplo                       |
| ---------- | ------------- | ----------------------------- |
| Personajes | `/people/`    | `/people/1/` → Luke Skywalker |
| Planetas   | `/planets/`   | `/planets/1/` → Tatooine      |
| Películas  | `/films/`     | `/films/1/` → A New Hope      |
| Naves      | `/starships/` | `/starships/9/` → Death Star  |
| Especies   | `/species/`   | `/species/1/` → Human         |

### Paginación y búsqueda

Las respuestas de lista son **paginadas**:

```json
{ "count": 82, "next": "…/people/?page=2", "previous": null, "results": [ … ] }
```

SWAPI también acepta `?search=` para buscar por nombre/título:

```
GET https://swapi.dev/api/people/?search=luke
```

> **Matiz importante (Lección 07):** la paginación y la búsqueda las resuelve el
> servidor. El filtro “en esta página” del listado es sólo local (sobre los resultados ya
> descargados). Elige una estrategia por vista, no mezcles ambas esperando que se
> combinen.

### Cambiar de base (mirrors)

`swapi.dev` es la instancia oficial, pero a veces se cae. El cliente (`src/api/http.ts`)
**prueba automáticamente mirrors** si la base principal falla por red:

1. `VITE_SWAPI_BASE_URL` (si lo defines en un `.env`)
2. `https://swapi.dev/api`
3. `https://swapi.py4e.com/api`
4. `https://swapi.info/api`

Para forzar una base concreta:

```bash
cp .env.example .env
# .env
VITE_SWAPI_BASE_URL=https://swapi.py4e.com/api
```

> Los `404` (recurso inexistente) **no** disparan el fallback: son un error real.

---

## Cómo fluyen los datos

```
        ┌─────────────┐
        │   api/*.ts  │   fetch tipado + errores + mirrors
        └──────┬──────┘
               │
     ┌─────────▼──────────┐
     │  composables/*.ts  │   data / error / loading, paginación, debounce
     └─────────┬──────────┘
               │
   ┌───────────▼───────────┐        ┌──────────────────┐
   │  stores/ (Pinia)      │◄──────►│  composables/     │
   │  favoritos persist.   │        │  useProgress,     │
   └───────────┬───────────┘        │  useTheme         │
               │                    └────────┬─────────┘
               ▼                             ▼
        ┌──────────────────────────────────────────┐
        │  components/  (ui, swapi, layout, lesson) │
        └────────────────────┬─────────────────────┘
                             ▼
                     views/ (páginas)
```

- **`api/`** es la única capa que sabe _cómo_ hablar con SWAPI.
- **`composables/`** encapsula _estado y ciclo de vida_ reutilizable.
- **`stores/`** guarda estado _global y persistente_ (favoritos).
- **`components/`** son piezas de UI presentacionales o conectadas.
- **`views/`** orquestan todo por ruta.

### Mapa concepto → archivo (para estudiar)

| Quiero ver…                           | Mira en…                                                             |
| ------------------------------------- | -------------------------------------------------------------------- |
| `ref`, `computed`, `watch`            | `views/lessons/Lesson01ReactivityView.vue`                           |
| `defineProps` / `defineEmits`         | `components/demo/LikeButton.vue`                                     |
| `defineModel` (`v-model`)             | `components/demo/RatingStars.vue`, `components/ui/PaginationBar.vue` |
| `fetch` + `AbortController`           | `views/lessons/Lesson03AsyncDataView.vue`                            |
| Composable genérico `useAsyncData<T>` | `composables/useAsyncData.ts`                                        |
| `customRef`                           | `composables/useDebouncedRef.ts`                                     |
| Genéricos + `keyof` en la API         | `api/swapi.ts`, `api/types.ts`                                       |
| Rutas dinámicas y lazy loading        | `router/index.ts`                                                    |
| `useRoute` / `useRouter`              | `views/lessons/Lesson05RouterView.vue`                               |
| Store de Pinia                        | `stores/favorites.ts`                                                |
| Persistencia en `localStorage`        | `stores/favorites.ts`, `composables/useProgress.ts`                  |
| Debounce + búsqueda en servidor       | `views/lessons/Lesson07FormsView.vue`                                |
| Slots (con nombre y con scope)        | `components/ui/BaseCard.vue`, `components/demo/DataList.vue`         |
| `provide` / `inject` + `InjectionKey` | `composables/useTheme.ts`, `App.vue`                                 |
| Transiciones y `TransitionGroup`      | `views/lessons/Lesson09TransitionsView.vue`                          |
| `v-memo`, `v-once`, `shallowRef`      | `views/lessons/Lesson10PerformanceView.vue`                          |

---

## Buenas prácticas que se aplican

- **`<script setup lang="ts">`** en todos los componentes (Composition API).
- **TypeScript estricto**: `strict`, `noUnusedLocals`, `verbatimModuleSyntax` (imports de
  tipo con `import type`).
- **Separación por capas**: la vista nunca llama a `fetch` directamente; pasa por
  `api → composables`.
- **Un `AbortController` por petición**: se cancela la anterior al relanzar y al desmontar.
- **Cancelación ≠ error**: las peticiones abortadas se ignoran silenciosamente.
- **Accesibilidad**: estados con `role="status"`/`role="alert"`, `aria-*` en controles,
  foco visible y `prefers-reduced-motion`.
- **Code splitting** por ruta con `() => import(...)`.

---

## Retos y extensiones

Cada lección trae sus propios retos. Algunas ideas para seguir ampliando el proyecto:

- Añadir el recurso **`vehicles`** al explorador (tipo, endpoint y ruta).
- Guardar el **nombre** del recurso en los favoritos (no sólo la URL) para no tener que
  resolverlo al mostrarlos.
- Sincronizar la búsqueda y la página con la **URL** (`route.query`).
- Convertir el store de favoritos en un **plugin de Pinia** reutilizable.
- Añadir **tests** con Vitest + Vue Test Utils.
- Internacionalizar la interfaz (i18n).

---

## Solución de problemas

| Síntoma                                                                       | Causa / solución                                                                                                                                                               |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm install` falla con `Cannot read properties of null (reading 'edgesOut')` | Bug de algunas versiones de npm con ciertos árboles de peers. Prueba `npm install --legacy-peer-deps` o actualiza npm. Este proyecto fija versiones compatibles para evitarlo. |
| `EBADENGINE` / error al arrancar Vite                                         | Necesitas Node ≥ 20.19. Comprueba con `node -v`.                                                                                                                               |
| Los datos no cargan y aparece el error con “Intentos: …”                      | `swapi.dev` no responde desde tu red. Define `VITE_SWAPI_BASE_URL` con un mirror (`https://swapi.py4e.com/api`).                                                               |
| CORS                                                                          | SWAPI envía `Access-Control-Allow-Origin: *`, así que funciona desde el navegador sin proxy.                                                                                   |
| Puerto ocupado                                                                | `npm run dev -- --port 5180`.                                                                                                                                                  |

---

## Recursos

- Guía de Vue: <https://vuejs.org/guide/>
- Vue Router: <https://router.vuejs.org/>
- Pinia: <https://pinia.vuejs.org/>
- Vite: <https://vite.dev/>
- Documentación de SWAPI: <https://swapi.dev/documentation>

---

## Licencia y créditos

Proyecto con fines **educativos**. Los datos e imágenes de Star Wars pertenecen a
Lucasfilm/Disney; la API pública utilizada es [SWAPI](https://swapi.dev) (proyecto de la
comunidad). El código de este showcase es de libre uso para aprender.
