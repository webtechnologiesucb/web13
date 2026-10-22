<script setup lang="ts">
// Lección 03 · Datos asíncronos con fetch (versión "manual", sin composables)
import { onMounted, onUnmounted, ref } from 'vue'

import ChallengeList from '@/components/lesson/ChallengeList.vue'
import LessonShell from '@/components/lesson/LessonShell.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import CodeBlock from '@/components/ui/CodeBlock.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import ErrorState from '@/components/ui/ErrorState.vue'
import LoadingState from '@/components/ui/LoadingState.vue'
import { getResource, listResource } from '@/api/swapi'
import type { Person } from '@/api/types'
import { getLesson } from '@/data/lessons'

const lesson = getLesson('03-datos-asincronos')!

const people = ref<Person[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const loaded = ref(false)

// Un AbortController por petición: si lanzamos otra, cancelamos la anterior.
let controller: AbortController | null = null

async function load(): Promise<void> {
  controller?.abort()
  controller = new AbortController()

  loading.value = true
  error.value = null

  try {
    const response = await listResource('people', 1, { signal: controller.signal })
    people.value = response.results
    loaded.value = true
  } catch (caught) {
    if ((caught as Error).name === 'AbortError') return // cancelada: no es un error
    error.value = (caught as Error).message
  } finally {
    loading.value = false
  }
}

/** Provoca un error real: pedimos un personaje que no existe (404). */
async function forceError(): Promise<void> {
  loading.value = true
  error.value = null
  try {
    await getResource('people', 9999)
  } catch (caught) {
    error.value = (caught as Error).message
  } finally {
    loading.value = false
  }
}

// onMounted lanza la carga cuando el componente ya está montado.
onMounted(load)
// onUnmounted cancela la petición si el usuario navega fuera antes de terminar.
onUnmounted(() => controller?.abort())

const snippet = `const people = ref<Person[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

let controller: AbortController | null = null

async function load() {
  controller?.abort()
  controller = new AbortController()
  loading.value = true
  error.value = null
  try {
    const res = await listResource('people', 1, { signal: controller.signal })
    people.value = res.results
  } catch (e) {
    if ((e as Error).name === 'AbortError') return
    error.value = (e as Error).message
  } finally {
    loading.value = false
  }
}

onMounted(load)
onUnmounted(() => controller?.abort())`

const challenges = [
  'Añade un botón que cargue la página 2 de personajes (?page=2).',
  'Muestra el número total de resultados usando response.count.',
  'Implementa un "timeout" con AbortSignal.timeout(5000).',
  'Refactoriza este componente para reutilizar la lógica con un composable (lección 04).',
]
</script>

<template>
  <LessonShell :lesson="lesson">
    <div class="stack">
      <div class="controls surface">
        <p class="muted">
          Patrón de <strong>tres estados</strong>: cargando · error · datos. Toda vista real
          necesita los tres.
        </p>
        <div class="row">
          <BaseButton variant="primary" size="sm" :disabled="loading" @click="load">
            Recargar personajes
          </BaseButton>
          <BaseButton variant="danger" size="sm" :disabled="loading" @click="forceError">
            Provocar error (404)
          </BaseButton>
        </div>
      </div>

      <!-- 1) Cargando -->
      <LoadingState v-if="loading" variant="skeleton" :count="6" label="Consultando SWAPI…" />

      <!-- 2) Error -->
      <ErrorState
        v-else-if="error"
        title="No se pudieron cargar los personajes"
        :message="error"
        @retry="load"
      />

      <!-- 3) Vacío -->
      <EmptyState
        v-else-if="!people.length"
        icon="🛰️"
        title="Sin resultados"
        message="La API respondió, pero no hay personajes que mostrar."
      />

      <!-- 4) Datos -->
      <ul v-else class="people grid">
        <li v-for="person in people" :key="person.url" class="person">
          <strong>{{ person.name }}</strong>
          <span class="dim">Nacimiento: {{ person.birth_year }}</span>
          <span class="dim">Altura: {{ person.height }} cm</span>
        </li>
      </ul>

      <p v-if="loaded && !error" class="dim">
        Se mostraron {{ people.length }} personajes de la primera página.
      </p>
    </div>

    <template #code>
      <CodeBlock :code="snippet" title="Carga manual con estados y AbortController" />
    </template>

    <template #challenges>
      <ChallengeList :items="challenges" />
    </template>
  </LessonShell>
</template>

<style scoped>
.controls {
  padding: 1rem 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.controls p {
  margin: 0;
}
.people {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
.person {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.8rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
}
.person span {
  font-size: 0.82rem;
}
</style>
