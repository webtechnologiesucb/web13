// src/composables/useDebouncedRef.ts
// Dos formas de aplicar "debounce" a valores reactivos (tema 07).
import { customRef, ref, watch, type Ref } from 'vue'

/**
 * Ref cuyo `set` se propaga sólo tras `delay` ms sin cambios.
 * Implementada con customRef: controlamos manualmente track/trigger.
 * Útil cuando programamos escrituras (no como v-model de un input, ya que el
 * valor mostrado también se retrasaría).
 */
export function useDebouncedRef<T>(initialValue: T, delay = 350): Ref<T> {
  let value = initialValue
  let timeout: ReturnType<typeof setTimeout> | undefined

  return customRef<T>((track, trigger) => ({
    get() {
      track()
      return value
    },
    set(next: T) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        value = next
        trigger()
      }, delay)
    },
  }))
}

/**
 * Deriva un valor "debounced" a partir de otra ref (por ejemplo, un input).
 * La ref de entrada se actualiza al instante; la de salida, con retardo.
 */
export function useDebouncedValue<T>(source: Ref<T>, delay = 350): Ref<T> {
  const debounced = ref(source.value) as Ref<T>
  let timeout: ReturnType<typeof setTimeout> | undefined

  watch(source, (next) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      debounced.value = next
    }, delay)
  })

  return debounced
}
