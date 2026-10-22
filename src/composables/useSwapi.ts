// src/composables/useSwapi.ts
// Composables específicos de SWAPI: paginación y detalle.
// Demuestran cómo combinar useAsyncData con watch() y computed().
import { computed, ref, watch, type Ref } from 'vue'

import { getResource, listResource } from '@/api/swapi'
import type { ResourceName, SwapiListResponse, SwapiResources } from '@/api/types'
import { useAsyncData } from './useAsyncData'

/** Lista paginada de un recurso con navegación de páginas. */
export function useSwapiList<K extends ResourceName>(resource: K, initialPage = 1) {
  const page = ref(initialPage)

  const state = useAsyncData<SwapiListResponse<SwapiResources[K]>>((signal) =>
    listResource(resource, page.value, { signal }),
  )

  // Al cambiar de página, vuelve a cargar.
  watch(page, () => {
    void state.execute()
  })

  const total = computed(() => state.data.value?.count ?? 0)
  const pageSize = computed(() => state.data.value?.results.length ?? 0)
  const totalPages = computed(() =>
    pageSize.value > 0 ? Math.ceil(total.value / pageSize.value) : 1,
  )
  const hasNext = computed(() => state.data.value?.next != null)
  const hasPrevious = computed(() => state.data.value?.previous != null)

  function next(): void {
    if (hasNext.value) page.value += 1
  }
  function previous(): void {
    if (hasPrevious.value) page.value -= 1
  }
  function goTo(target: number): void {
    page.value = Math.min(Math.max(1, target), totalPages.value)
  }

  return {
    ...state,
    page,
    total,
    pageSize,
    totalPages,
    hasNext,
    hasPrevious,
    next,
    previous,
    goTo,
    reload: state.execute,
  }
}

/** Detalle de un recurso. Se recarga cuando cambia el id. */
export function useSwapiDetail<K extends ResourceName>(resource: K, id: Ref<string>) {
  const state = useAsyncData<SwapiResources[K]>((signal) => getResource(resource, id.value, { signal }))

  watch(id, () => {
    void state.execute()
  })

  return { ...state, reload: state.execute }
}
