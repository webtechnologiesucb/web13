<script setup lang="ts">
// Barra lateral: progreso de la ruta de aprendizaje y accesos al explorador.
import { RouterLink, useRoute } from 'vue-router'

import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { RESOURCE_META, RESOURCE_NAMES } from '@/api/types'
import { lessons, totalDuration } from '@/data/lessons'
import { useProgress } from '@/composables/useProgress'

defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const route = useRoute()
const { isCompleted, percent, done, total, reset } = useProgress()

const levelVariant = {
  Inicial: 'success',
  Intermedio: 'primary',
  Avanzado: 'accent',
} as const
</script>

<template>
  <aside id="sidebar" class="sidebar" :class="{ 'sidebar--open': open }">
    <section class="panel surface">
      <div class="panel__row">
        <span class="muted">Tu progreso</span>
        <strong class="panel__percent">{{ percent }}%</strong>
      </div>
      <div class="bar" role="progressbar" :aria-valuenow="percent" aria-valuemin="0" aria-valuemax="100">
        <span class="bar__fill" :style="{ width: `${percent}%` }" />
      </div>
      <p class="dim panel__count">{{ done }} de {{ total }} lecciones · ~{{ totalDuration }} min</p>
      <BaseButton size="sm" variant="subtle" block @click="reset">Reiniciar progreso</BaseButton>
    </section>

    <nav class="nav" aria-label="Ruta de aprendizaje">
      <h2 class="nav__title">Ruta de aprendizaje</h2>
      <ul class="nav__list">
        <li v-for="lesson in lessons" :key="lesson.id">
          <RouterLink
            class="lesson-link"
            :class="{
              'lesson-link--active': route.path.endsWith(lesson.id),
              'lesson-link--done': isCompleted(lesson.id),
            }"
            :to="{ name: `lesson-${lesson.id}` }"
            @click="emit('close')"
          >
            <span class="lesson-link__order">{{ String(lesson.order).padStart(2, '0') }}</span>
            <span class="lesson-link__body">
              <span class="lesson-link__title">{{ lesson.title }}</span>
              <span class="lesson-link__meta">
                <BaseBadge :variant="levelVariant[lesson.level]">{{ lesson.level }}</BaseBadge>
                <span class="dim">{{ lesson.duration }} min</span>
              </span>
            </span>
            <span class="lesson-link__check" aria-hidden="true">{{ isCompleted(lesson.id) ? '✓' : '' }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <nav class="nav" aria-label="Explorador SWAPI">
      <h2 class="nav__title">Explorador SWAPI</h2>
      <ul class="nav__list nav__list--compact">
        <li v-for="name in RESOURCE_NAMES" :key="name">
          <RouterLink
            class="resource-link"
            :to="{ name: 'resource-list', params: { resource: name } }"
            @click="emit('close')"
          >
            <span aria-hidden="true">{{ RESOURCE_META[name].icon }}</span>
            <span>{{ RESOURCE_META[name].plural }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  position: sticky;
  top: calc(var(--header-height) + 1.25rem);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-height: calc(100vh - var(--header-height) - 2rem);
  overflow-y: auto;
  padding-right: 0.35rem;
}

.panel {
  padding: 1rem;
}
.panel__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: 0.88rem;
}
.panel__percent {
  font-size: 1.15rem;
  color: var(--accent);
}
.panel__count {
  margin: 0.3rem 0 0.75rem;
  font-size: 0.78rem;
}
.bar {
  height: 8px;
  border-radius: 999px;
  background: var(--surface-3);
  overflow: hidden;
  margin-top: 0.4rem;
}
.bar__fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--accent), var(--primary));
  transition: width 0.4s ease;
}

.nav__title {
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-dim);
  margin: 0 0 0.5rem 0.2rem;
}
.nav__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.lesson-link {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.65rem;
  padding: 0.5rem 0.6rem;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  color: var(--text);
  text-decoration: none;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;
}
.lesson-link:hover {
  background: var(--surface-2);
  text-decoration: none;
}
.lesson-link--active {
  background: var(--surface-2);
  border-color: var(--border-strong);
}
.lesson-link--done .lesson-link__order {
  background: var(--success);
  color: #04180c;
}
.lesson-link__order {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--surface-3);
  border: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 700;
}
.lesson-link__body {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.lesson-link__title {
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.lesson-link__meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  margin-top: 0.15rem;
}
.lesson-link__check {
  color: var(--success);
  font-weight: 700;
}

.resource-link {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.42rem 0.6rem;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
}
.resource-link:hover {
  background: var(--surface-2);
  color: var(--text);
  text-decoration: none;
}

@media (max-width: 980px) {
  .sidebar {
    position: fixed;
    inset: var(--header-height) 0 0 0;
    z-index: 20;
    max-height: none;
    padding: 1.25rem;
    background: var(--bg);
    overflow-y: auto;
    transform: translateX(-102%);
    transition: transform 0.25s ease;
    visibility: hidden;
  }
  .sidebar--open {
    transform: translateX(0);
    visibility: visible;
  }
}
</style>
