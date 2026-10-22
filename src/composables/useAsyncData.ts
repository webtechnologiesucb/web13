// src/composables/useAsyncData.ts
// Envuelve una carga asíncrona en el patrón data/error/loading/execute,
// cancelando la petición anterior con AbortController (lecciones 03 y 04).
import { ref, shallowRef, type Ref, type ShallowRef } from 'vue'

export interface AsyncDataOptions {
  /** Si es false, no lanza la carga al crear el composable (por defecto true). */
  immediate?: boolean
}

export interface AsyncDataResult<T> {
  data: ShallowRef<T | null>
  error: Ref<Error | null>
  loading: Ref<boolean>
  loaded: Ref<boolean>
  execute: () => Promise<void>
}

export function useAsyncData<T>(
  loader: (signal: AbortSignal) => Promise<T>,
  options: AsyncDataOptions = {},
): AsyncDataResult<T> {
  const data = shallowRef<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)
  const loaded = ref(false)

  let controller: AbortController | null = null

  async function execute(): Promise<void> {
    // Cancela la petición en curso si se relanza antes de terminar.
    controller?.abort()
    controller = new AbortController()

    loading.value = true
    error.value = null

    try {
      data.value = await loader(controller.signal)
      loaded.value = true
    } catch (caught) {
      if ((caught as Error)?.name === 'AbortError') return
      error.value = caught instanceof Error ? caught : new Error(String(caught))
    } finally {
      loading.value = false
    }
  }

  if (options.immediate !== false) {
    void execute()
  }

  return { data, error, loading, loaded, execute }
}
