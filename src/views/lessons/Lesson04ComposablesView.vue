<script setup lang="ts">
// Lección 04 · Composables: extraer lógica reactiva reutilizable
import { ref } from 'vue'

import ChallengeList from '@/components/lesson/ChallengeList.vue'
import LessonShell from '@/components/lesson/LessonShell.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import CodeBlock from '@/components/ui/CodeBlock.vue'
import LoadingState from '@/components/ui/LoadingState.vue'
import ErrorState from '@/components/ui/ErrorState.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import PaginationBar from '@/components/ui/PaginationBar.vue'
import { useDebouncedRef } from '@/composables/useDebouncedRef'
import { useSwapiList } from '@/composables/useSwapi'
import { getLesson } from '@/data/lessons'

const lesson = getLesson('04-composables')!

// --- Toda la lógica de "listar + paginar" vive ahora en un composable ------
const planets = useSwapiList('planets')

// --- Demostración de useDebouncedRef (customRef) ---------------------------
const names = ['Tatooine', 'Hoth', 'Endor', 'Naboo', 'Dagobah', 'Coruscant']
const immediate = ref('—')
const debounced = useDebouncedRef('—', 800)

function randomize(): void {
  const value = names[Math.floor(Math.random() * names.length)] ?? '—'
  immediate.value = value
  debounced.value = value // se propaga 800 ms después
}

const snippet = `// useAsyncData.ts: un composable genérico y tipado
export function useAsyncData<T>(loader: (signal: AbortSignal) => Promise<T>) {
  const data = shallowRef<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)
  let controller: AbortController | null = null

  async function execute() {
    controller?.abort()
    controller = new AbortController()
    loading.value = true
    error.value = null
    try {
      data.value = await loader(controller.signal)
    } catch (e) {
      if ((e as Error).name !== 'AbortError') error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  void execute()
  return { data, error, loading, execute }
}`

const challenges = [
  'Añade una opción `immediate: false` a useAsyncData para cargar bajo demanda.',
  'Crea un composable useToggle(initial) que devuelva [valor, toggle].',
  'Extrae la búsqueda con debounce a un composable useSearch().',
  'Devuelve de useSwapiList un computed `isEmpty` y úsalo en ResourceListView.',
]
</script>

<template>
  <LessonShell :lesson="lesson">
    <div class="stack">
      <section class="panel surface">
        <h3>Planetas con useSwapiList()</h3>
        <p class="muted">
          Este componente tiene <strong>una sola línea</strong> de lógica de datos:
          <span class="inline-code">const planets = useSwapiList('planets')</span>. La carga,
          los estados y la paginación viven en el composable.
        </p>

        <LoadingState v-if="planets.loading.value" variant="skeleton" :count="4" />
        <ErrorState
          v-else-if="planets.error.value"
          :message="planets.error.value.message"
          @retry="planets.reload"
        />
        <EmptyState v-else-if="!planets.data.value?.results.length" title="Sin planetas" />
        <template v-else>
          <ul class="planets grid">
            <li
              v-for="planet in planets.data.value.results"
              :key="planet.url"
              class="planet"
            >
              <strong>🪐 {{ planet.name }}</strong>
              <span class="dim">Clima: {{ planet.climate }}</span>
              <span class="dim">Población: {{ planet.population }}</span>
            </li>
          </ul>
          <PaginationBar
            v-model:page="planets.page.value"
            :total-pages="planets.totalPages.value"
          />
          <p class="dim center">
            {{ planets.total.value }} planetas · página {{ planets.page.value }} de
            {{ planets.totalPages.value }}
          </p>
        </template>
      </section>

      <section class="panel surface">
        <h3>useDebouncedRef() con customRef</h3>
        <p class="muted">
          Pulsa varias veces: el valor <em>inmediato</em> cambia al instante y el
          <em>debounced</em> espera 800&nbsp;ms de calma.
        </p>
        <div class="row">
          <BaseButton size="sm" variant="primary" @click="randomize">Nombre aleatorio</BaseButton>
          <span>Inmediato: <strong>{{ immediate }}</strong></span>
          <span>Debounced: <strong class="accent">{{ debounced }}</strong></span>
        </div>
      </section>
    </div>

    <template #code>
      <CodeBlock :code="snippet" title="useAsyncData: el composable que lo unifica todo" />
    </template>

    <template #challenges>
      <ChallengeList :items="challenges" />
    </template>
  </LessonShell>
</template>

<style scoped>
.panel {
  padding: 1.15rem;
}
.panel h3 {
  margin-top: 0;
}
.planets {
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  margin: 0.75rem 0;
}
.planet {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.75rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-2);
}
.planet span {
  font-size: 0.82rem;
}
.center {
  text-align: center;
}
.accent {
  color: var(--accent);
}
</style>
