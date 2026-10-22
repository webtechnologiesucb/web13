// src/stores/favorites.ts
// Store de Pinia (estilo setup) con estado, getters y acciones.
// Persiste los favoritos en localStorage (lección 06).
import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'web13-favorites'

function loadFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((url): url is string => typeof url === 'string') : []
  } catch {
    return []
  }
}

export const useFavoritesStore = defineStore('favorites', () => {
  // --- estado ---
  const items = ref<string[]>(loadFavorites())

  // --- getters (computed) ---
  const count = computed(() => items.value.length)
  const isEmpty = computed(() => items.value.length === 0)

  const has = (url: string): boolean => items.value.includes(url)

  // --- acciones ---
  function toggle(url: string): void {
    items.value = has(url) ? items.value.filter((item) => item !== url) : [...items.value, url]
  }

  function remove(url: string): void {
    items.value = items.value.filter((item) => item !== url)
  }

  function clear(): void {
    items.value = []
  }

  // Persistencia sencilla: cada cambio se guarda en localStorage.
  watch(items, (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } catch {
      /* ignora errores de almacenamiento */
    }
  })

  return { items, count, isEmpty, has, toggle, remove, clear }
})
