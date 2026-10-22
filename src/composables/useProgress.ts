// src/composables/useProgress.ts
// Progreso de la ruta de aprendizaje. Es un ejemplo de estado compartido
// mediante un módulo (singleton) — contrástalo con Pinia en la lección 06.
import { computed, ref, watch } from 'vue'
import { lessons } from '@/data/lessons'

const STORAGE_KEY = 'web13-completed-lessons'

function loadCompleted(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : []
  } catch {
    return []
  }
}

// Estado a nivel de módulo: todas las llamadas comparten esta misma ref.
const completed = ref<string[]>(loadCompleted())

watch(completed, (value) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  } catch {
    /* ignora errores de almacenamiento */
  }
})

export function useProgress() {
  const isCompleted = (id: string): boolean => completed.value.includes(id)

  function toggle(id: string): void {
    completed.value = isCompleted(id)
      ? completed.value.filter((item) => item !== id)
      : [...completed.value, id]
  }

  function reset(): void {
    completed.value = []
  }

  const total = lessons.length
  const done = computed(() => lessons.filter((lesson) => isCompleted(lesson.id)).length)
  const percent = computed(() => (total === 0 ? 0 : Math.round((done.value / total) * 100)))

  return { completed, isCompleted, toggle, reset, total, done, percent }
}
