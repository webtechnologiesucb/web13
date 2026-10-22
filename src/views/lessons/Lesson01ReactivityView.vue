<script setup lang="ts">
// Lección 01 · Reactividad esencial
import { computed, ref, watch } from 'vue'

import ChallengeList from '@/components/lesson/ChallengeList.vue'
import LessonShell from '@/components/lesson/LessonShell.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import CodeBlock from '@/components/ui/CodeBlock.vue'
import { getLesson } from '@/data/lessons'

const lesson = getLesson('01-reactividad')!

// --- Estado reactivo: ref() ------------------------------------------------
const jedi = ref('Anakin Skywalker')
const midichlorians = ref(12000)
const side = ref<'luz' | 'oscuridad'>('luz')

// --- Estado derivado: computed() -------------------------------------------
const rank = computed(() => {
  if (midichlorians.value >= 17500) return 'Gran Maestro'
  if (midichlorians.value >= 13000) return 'Maestro'
  if (midichlorians.value >= 10000) return 'Caballero'
  return 'Padawan'
})

const power = computed(() => Math.min(100, Math.round(midichlorians.value / 200)))

const rankBadge = computed<'default' | 'accent' | 'primary' | 'success' | 'danger'>(() => {
  if (rank.value === 'Gran Maestro') return 'accent'
  if (rank.value === 'Maestro') return 'primary'
  if (rank.value === 'Caballero') return 'success'
  return 'default'
})

// --- Efectos secundarios: watch() ------------------------------------------
const events = ref<string[]>([])

function log(message: string): void {
  events.value = [message, ...events.value].slice(0, 6)
}

watch(midichlorians, (value, oldValue) => {
  log(`midiclorianos: ${oldValue} → ${value}`)
})

watch(side, (value) => {
  log(`cambió al ${value === 'luz' ? 'lado luminoso' : 'lado oscuro'}`)
})

// --- Acciones: v-on --------------------------------------------------------
function train(amount: number): void {
  midichlorians.value = Math.max(0, midichlorians.value + amount)
}

function reset(): void {
  jedi.value = 'Anakin Skywalker'
  midichlorians.value = 12000
  side.value = 'luz'
  events.value = []
}

const snippet = `const midichlorians = ref(12000)

// Derivado: se recalcula solo cuando cambia midichlorians
const rank = computed(() => {
  if (midichlorians.value >= 13000) return 'Maestro'
  return 'Padawan'
})

// Efecto: reacciona a los cambios
watch(midichlorians, (valor, anterior) => {
  console.log(anterior, '->', valor)
})

function train() {
  midichlorians.value += 500
}`

const challenges = [
  'Añade un tercer estado con ref() y muéstralo con v-if / v-else.',
  'Crea un computed() que combine el nombre y el rango en una sola frase.',
  'Usa watch() con { immediate: true } y explica qué cambia.',
  'Convierte la barra de poder en un computed() con formato de porcentaje.',
]
</script>

<template>
  <LessonShell :lesson="lesson">
    <div class="demo surface">
      <div class="demo__form">
        <label class="field-label" for="jedi">Nombre del Jedi</label>
        <input id="jedi" v-model="jedi" class="input" type="text" />

        <label class="field-label">Midiclorianos</label>
        <div class="row">
          <BaseButton size="sm" variant="subtle" @click="train(-500)">−500</BaseButton>
          <strong class="demo__value">{{ midichlorians.toLocaleString('es') }}</strong>
          <BaseButton size="sm" variant="primary" @click="train(500)">+500</BaseButton>
        </div>

        <label class="field-label">Alineación</label>
        <div class="row">
          <BaseButton
            size="sm"
            :variant="side === 'luz' ? 'primary' : 'subtle'"
            @click="side = 'luz'"
          >
            Luminoso
          </BaseButton>
          <BaseButton
            size="sm"
            :variant="side === 'oscuridad' ? 'danger' : 'subtle'"
            @click="side = 'oscuridad'"
          >
            Oscuro
          </BaseButton>
        </div>

        <BaseButton size="sm" variant="ghost" @click="reset">Reiniciar</BaseButton>
      </div>

      <div class="demo__out">
        <h3 class="demo__name">{{ jedi }}</h3>
        <div class="row">
          <BaseBadge :variant="rankBadge">{{ rank }}</BaseBadge>
          <span class="muted">{{ side === 'luz' ? '☀️ Lado luminoso' : '🌑 Lado oscuro' }}</span>
        </div>

        <div class="bar" aria-hidden="true">
          <span
            class="bar__fill"
            :class="{ 'bar__fill--dark': side === 'oscuridad' }"
            :style="{ width: `${power}%` }"
          />
        </div>
        <p class="dim">Poder estimado: {{ power }}%</p>

        <h4 class="demo__sub">Registro de eventos (watch)</h4>
        <ul class="events">
          <li v-for="(event, index) in events" :key="index" class="events__item">{{ event }}</li>
          <li v-if="!events.length" class="dim">Interactúa con los controles…</li>
        </ul>
      </div>
    </div>

    <template #code>
      <CodeBlock :code="snippet" title="Reactividad: ref, computed y watch" />
    </template>

    <template #challenges>
      <ChallengeList :items="challenges" />
    </template>
  </LessonShell>
</template>

<style scoped>
.demo {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) 1.2fr;
  gap: 1.5rem;
  padding: 1.25rem;
}
.demo__form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.field-label {
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-dim);
  margin-top: 0.4rem;
}
.input {
  width: 100%;
  padding: 0.5rem 0.7rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-strong);
  background: var(--surface-2);
  color: var(--text);
  font: inherit;
}
.demo__value {
  min-width: 4.5rem;
  text-align: center;
  font-variant-numeric: tabular-nums;
}
.demo__name {
  margin-bottom: 0.4rem;
}
.demo__sub {
  margin: 1rem 0 0.4rem;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-dim);
}
.bar {
  height: 12px;
  border-radius: 999px;
  background: var(--surface-3);
  overflow: hidden;
  margin: 0.75rem 0 0.25rem;
}
.bar__fill {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  transition: width 0.3s ease;
}
.bar__fill--dark {
  background: linear-gradient(90deg, #7a2bff, var(--danger));
}
.events {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
}
.events__item {
  color: var(--text-muted);
  border-left: 2px solid var(--border-strong);
  padding-left: 0.5rem;
}
@media (max-width: 760px) {
  .demo {
    grid-template-columns: 1fr;
  }
}
</style>
