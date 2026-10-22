<script setup lang="ts">
// Lección 09 · Transiciones, TransitionGroup y UX de carga
import { ref } from 'vue'

import ChallengeList from '@/components/lesson/ChallengeList.vue'
import LessonShell from '@/components/lesson/LessonShell.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import CodeBlock from '@/components/ui/CodeBlock.vue'
import LoadingState from '@/components/ui/LoadingState.vue'
import { getLesson } from '@/data/lessons'

const lesson = getLesson('09-transiciones')!

// --- <Transition> ----------------------------------------------------------
const show = ref(true)

// --- <TransitionGroup> -----------------------------------------------------
const pool = ['R2-D2', 'C-3PO', 'Yoda', 'Obi-Wan', 'Lando', 'Rey', 'Finn', 'Poe']
const crew = ref<string[]>(['Luke', 'Leia', 'Han'])
let counter = pool.length

function add(): void {
  const name = pool[counter % pool.length] ?? 'Droide'
  counter += 1
  crew.value = [...crew.value, `${name} #${counter}`]
}

function remove(index: number): void {
  crew.value = crew.value.filter((_, i) => i !== index)
}

// --- Skeleton --------------------------------------------------------------
const loading = ref(false)

function reload(): void {
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
  }, 1600)
}

const snippet = `<!-- Aparecer / desaparecer -->
<Transition name="fade">
  <BaseCard v-if="show">…</BaseCard>
</Transition>

<!-- Listas que se animan al añadir/quitar/reordenar -->
<TransitionGroup name="list" tag="ul">
  <li v-for="item in crew" :key="item">{{ item }}</li>
</TransitionGroup>

/* En el CSS */
.fade-enter-active, .fade-leave-active { transition: opacity .3s ease }
.fade-enter-from, .fade-leave-to { opacity: 0 }
.list-move { transition: transform .35s ease }`

const challenges = [
  'Añade una transición con <Transition mode="out-in"> entre dos vistas.',
  'Crea un acordeón que anime la altura con <Transition> y JavaScript hooks.',
  'Muestra 3 skeletons de distinto tamaño imitando las tarjetas reales.',
  'Comprueba que con prefers-reduced-motion las animaciones casi desaparecen.',
]
</script>

<template>
  <LessonShell :lesson="lesson">
    <div class="stack">
      <section class="panel surface">
        <div class="head">
          <h3>&lt;Transition&gt; · aparecer / desaparecer</h3>
          <BaseButton size="sm" variant="primary" @click="show = !show">
            {{ show ? 'Ocultar tarjeta' : 'Mostrar tarjeta' }}
          </BaseButton>
        </div>
        <Transition name="fade">
          <BaseCard v-if="show" title="Transmisión entrante" subtitle="Animada con <Transition>">
            <p class="muted">
              Esta tarjeta entra y sale con una transición de opacidad y desplazamiento.
            </p>
          </BaseCard>
        </Transition>
      </section>

      <section class="panel surface">
        <div class="head">
          <h3>&lt;TransitionGroup&gt; · listas animadas</h3>
          <BaseButton size="sm" variant="primary" @click="add">Añadir tripulante</BaseButton>
        </div>
        <TransitionGroup name="list" tag="ul" class="tl">
          <li v-for="(member, index) in crew" :key="member" class="tl__item">
            <span aria-hidden="true">🧑‍🚀</span>
            <span class="tl__name">{{ member }}</span>
            <button
              type="button"
              class="tl__remove"
              :aria-label="`Quitar ${member}`"
              @click="remove(index)"
            >
              ✕
            </button>
          </li>
        </TransitionGroup>
      </section>

      <section class="panel surface">
        <div class="head">
          <h3>Skeletons mientras se carga</h3>
          <BaseButton size="sm" variant="subtle" :disabled="loading" @click="reload">
            Simular carga
          </BaseButton>
        </div>
        <LoadingState v-if="loading" variant="skeleton" :count="4" label="Cargando flota…" />
        <ul v-else class="fleet grid">
          <li v-for="ship in ['X-wing', 'TIE Fighter', 'Halcón Milenario', 'Destructor Estelar']" :key="ship" class="fleet__item">
            🚀 {{ ship }}
          </li>
        </ul>
      </section>
    </div>

    <template #code>
      <CodeBlock :code="snippet" title="Transition, TransitionGroup y skeletons" />
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
  margin: 0;
}
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.9rem;
  flex-wrap: wrap;
}

/* <Transition> */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* <TransitionGroup> */
.tl {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.tl__item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.55rem 0.8rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-2);
}
.tl__name {
  flex: 1 1 auto;
  font-weight: 600;
}
.tl__remove {
  border: none;
  background: transparent;
  color: var(--text-dim);
  cursor: pointer;
  font-size: 0.9rem;
}
.tl__remove:hover {
  color: var(--danger);
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.35s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(28px);
}
.list-leave-active {
  position: absolute;
  width: 100%;
}

.fleet {
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  margin: 0;
  padding: 0;
}
.fleet__item {
  list-style: none;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-2);
}
</style>
