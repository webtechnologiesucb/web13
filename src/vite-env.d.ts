/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base de la API SWAPI. Ej: https://swapi.dev/api */
  readonly VITE_SWAPI_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
