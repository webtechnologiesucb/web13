<script setup lang="ts">
// Lección 10 · Rendimiento y buenas prácticas
import { ref, shallowRef } from 'vue'

import ChallengeList from '@/components/lesson/ChallengeList.vue'
import LessonShell from '@/components/lesson/LessonShell.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import CodeBlock from '@/components/ui/CodeBlock.vue'
import { getLesson } from '@/data/lessons'

const lesson = getLesson('10-rendimiento')!

// shallowRef: ideal para listas grandes que reemplazamos en bloque
// (no rastreamos cada campo, sólo la referencia del array).
const items = shallowRef(
  Array.from({ length: 300 }, (_, index) => ({
    id: index,
    label: `Registro ${String(index + 1).padStart(3, '0')}`,
  })),
)

const selected = ref<number | null>(null)
const renders = ref(0)
const mountedAt = new Date().toLocaleTimeString('es')

function forceRender(): void {
  renders.value += 1
}

const checklist = [
  'Usa `computed` para valores derivados: se memorizan y sólo se recalculan si cambian sus dependencias.',
  'Evita `v-if` con la misma condición repetida: extrae el cálculo a un `computed`.',
  'En listas largas y estáticas usa `v-once`; en listas que se actualizan a menudo, `v-memo`.',
  'Usa `shallowRef` para estructuras grandes que reemplazas completas.',
  'Carga las vistas por ruta con `() => import(...)` (code splitting).',
  'Da `:key` estable y único en cada `v-for` (nunca el índice si el orden cambia).',
  'Mide antes de optimizar: Vue DevTools > Performance.',
]

const snippet = `<!-- Sólo se re-renderiza la fila cuyo memo cambió -->
<li v-for="item in items" :key="item.id" v-memo="[selected === item.id]">
  {{ item.label }}
</li>

<!-- Se renderiza una vez y no se vuelve a tocar -->
<span v-once>Renderizado a las {{ mountedAt }}</span>

// Listas grandes: no necesitamos reactividad profunda
const items = shallowRef(cargarMilesDeRegistros())

// Code splitting por ruta
{ path: '/people', component: () => import('@/views/PeopleView.vue') }`

const challenges = [
  'Convierte el filtro de ResourceListView en un computed memoizado.',
  'Mide con Vue DevTools cuántos componentes se re-renderizan al cambiar `selected`.',
  'Sustituye shallowRef por ref y compara el uso de memoria de forma conceptual.',
  'Añade `v-memo` a las filas de una tabla con muchas columnas.',
]
</script>

<template>
  <LessonShell :lesson="lesson">
    <div class="stack">
      <section class="panel surface">
        <div class="head">
          <h3>v-memo y shallowRef en acción</h3>
          <div class="row">
            <BaseBadge variant="primary">renders: {{ renders }}</BaseBadge>
            <BaseButton size="sm" variant="subtle" @click="forceRender">Forzar render</BaseButton>
          </div>
        </div>
        <p class="muted">
          Hay {{ items.length }} filas. Con <span class="inline-code">v-memo="[selected === item.id]"</span>
          sólo se repintan las dos filas afectadas al cambiar la selección.
        </p>
        <ul class="rows">
          <li
            v-for="item in items"
            :key="item.id"
            v-memo="[selected === item.id]"
            class="rows__item"
            :class="{ 'rows__item--on': selected === item.id }"
            @click="selected = item.id"
          >
            {{ item.label }}
          </li>
        </ul>
        <p class="dim">
          v-once (no cambia al re-renderizar): <strong>{{ mountedAt }}</strong>
        </p>
      </section>

      <section class="panel surface">
        <h3>Checklist de buenas prácticas</h3>
        <ol class="checklist">
          <li v-for="(tip, index) in checklist" :key="index">{{ tip }}</li>
        </ol>
      </section>
    </div>

    <template #code>
      <CodeBlock :code="snippet" title="v-memo, v-once, shallowRef y code splitting" />
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
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.rows {
  list-style: none;
  margin: 0.75rem 0;
  padding: 0;
  max-height: 260px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.3rem;
}
.rows__item {
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface-2);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  cursor: pointer;
}
.rows__item--on {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--accent);
}
.checklist {
  margin: 0;
  padding-left: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
