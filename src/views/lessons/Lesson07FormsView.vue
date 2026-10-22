<script setup lang="ts">
// Lección 07 · Formularios, filtros y búsqueda con debounce
import { computed, ref, watch } from 'vue'

import ChallengeList from '@/components/lesson/ChallengeList.vue'
import LessonShell from '@/components/lesson/LessonShell.vue'
import CodeBlock from '@/components/ui/CodeBlock.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import ErrorState from '@/components/ui/ErrorState.vue'
import LoadingState from '@/components/ui/LoadingState.vue'
import { listResource } from '@/api/swapi'
import { RESOURCE_META, RESOURCE_NAMES, type ResourceName, type SwapiResources } from '@/api/types'
import { useAsyncData } from '@/composables/useAsyncData'
import { useDebouncedValue } from '@/composables/useDebouncedRef'
import { getLesson } from '@/data/lessons'

const lesson = getLesson('07-formularios')!

const resource = ref<ResourceName>('people')
const term = ref('')
const onlyLongNames = ref(false)

// La ref del input cambia al instante; `debouncedTerm` espera 400 ms.
const debouncedTerm = useDebouncedValue(term, 400)

const state = useAsyncData((signal) =>
  listResource(resource.value, 1, { search: debouncedTerm.value, signal }),
)

// Cada vez que cambia el recurso o el término "debounced", volvemos a consultar.
watch([resource, debouncedTerm], () => {
  void state.execute()
})

function labelOf(item: SwapiResources[ResourceName]): string {
  return 'title' in item ? item.title : item.name
}

const results = computed(() => state.data.value?.results ?? [])
const visible = computed(() =>
  onlyLongNames.value ? results.value.filter((item) => labelOf(item).length > 8) : results.value,
)

const snippet = `const term = ref('')
const debouncedTerm = useDebouncedValue(term, 400)

const state = useAsyncData((signal) =>
  listResource('people', 1, { search: debouncedTerm.value, signal }),
)

watch(debouncedTerm, () => void state.execute())

// SWAPI admite ?search=, pero OJO: la búsqueda del servidor NO se combina
// con filtros locales sobre la página. Elige una estrategia por vista.`

const challenges = [
  'Sincroniza el término de búsqueda con la URL usando route.query.',
  'Añade un botón "limpiar" que reinicie term y muestre todo.',
  'Prueba `v-model.lazy` y explica en qué se diferencia de `.trim` y `.number`.',
  'Implementa el "sin resultados" para búsquedas vacías.',
]
</script>

<template>
  <LessonShell :lesson="lesson">
    <div class="stack">
      <section class="panel surface">
        <h3>Buscador con debounce</h3>
        <p class="muted">
          <span class="inline-code">v-model</span> sincroniza el input; tras 400&nbsp;ms sin
          teclear se lanza una única petición con <span class="inline-code">?search=</span>.
        </p>

        <div class="row">
          <select v-model="resource" class="input">
            <option v-for="name in RESOURCE_NAMES" :key="name" :value="name">
              {{ RESOURCE_META[name].plural }}
            </option>
          </select>

          <input
            v-model.trim="term"
            class="input input--grow"
            type="search"
            :placeholder="`Buscar en ${RESOURCE_META[resource].plural.toLowerCase()}…`"
          />

          <label class="check">
            <input v-model="onlyLongNames" type="checkbox" />
            Sólo nombres &gt; 8 letras
          </label>
        </div>

        <p class="dim">
          Término: “{{ term }}” · aplicado: “{{ debouncedTerm }}” · resultados:
          {{ results.length }}
        </p>
      </section>

      <LoadingState v-if="state.loading.value" variant="skeleton" :count="6" />
      <ErrorState v-else-if="state.error.value" :message="state.error.value.message" @retry="state.execute" />
      <EmptyState
        v-else-if="!visible.length"
        icon="🔍"
        title="Sin coincidencias"
        :message="term ? `Nada para “${term}”.` : 'Prueba a escribir algo.'"
      />
      <ul v-else class="results grid">
        <li v-for="item in visible" :key="item.url" class="result">
          <span aria-hidden="true">{{ RESOURCE_META[resource].icon }}</span>
          <strong>{{ labelOf(item) }}</strong>
        </li>
      </ul>
    </div>

    <template #code>
      <CodeBlock :code="snippet" title="Debounce + búsqueda en servidor" />
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
.input {
  padding: 0.45rem 0.7rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-strong);
  background: var(--surface-2);
  color: var(--text);
  font: inherit;
}
.input--grow {
  flex: 1 1 220px;
}
.check {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}
.results {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  margin: 0;
  padding: 0;
}
.result {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
}
</style>
