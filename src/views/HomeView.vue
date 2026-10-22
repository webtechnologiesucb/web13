<script setup lang="ts">
// Portada: presenta la ruta de aprendizaje y enlaza cada lección.
import { RouterLink } from 'vue-router'

import BaseBadge from '@/components/ui/BaseBadge.vue'
import { RESOURCE_META, RESOURCE_NAMES } from '@/api/types'
import { lessons, totalDuration } from '@/data/lessons'
import { useProgress } from '@/composables/useProgress'

const { percent, done, total, isCompleted } = useProgress()

const levelVariant = {
  Inicial: 'success',
  Intermedio: 'primary',
  Avanzado: 'accent',
} as const
</script>

<template>
  <div class="home stack">
    <section class="hero surface">
      <div class="hero__glow" aria-hidden="true" />
      <p class="hero__eyebrow">Vue 3 · Vite · TypeScript · SWAPI</p>
      <h1 class="hero__title">Ruta de aprendizaje de Vue</h1>
      <p class="hero__lead">
        Diez lecciones progresivas que construyen, desde la reactividad básica hasta el
        rendimiento, una pequeña aplicación real que consume la API de <strong>Star Wars</strong>
        (SWAPI). Cada lección trae una demo interactiva, código clave y retos.
      </p>
      <div class="hero__actions">
        <RouterLink class="btn btn--primary" :to="{ name: 'lesson-01-reactividad' }">
          Empezar la lección 01 →
        </RouterLink>
        <RouterLink class="btn btn--ghost" :to="{ name: 'resource-list', params: { resource: 'people' } }">
          Explorar SWAPI 🧑‍🚀
        </RouterLink>
      </div>

      <ul class="stats">
        <li><strong>{{ total }}</strong><span>lecciones</span></li>
        <li><strong>~{{ totalDuration }}</strong><span>minutos</span></li>
        <li><strong>{{ done }}/{{ total }}</strong><span>completadas</span></li>
        <li><strong>{{ percent }}%</strong><span>progreso</span></li>
      </ul>
    </section>

    <section class="stack">
      <h2>🧭 Cómo usar este showcase</h2>
      <div class="steps">
        <article class="step surface">
          <span class="step__n">1</span>
          <h3>Sigue el orden</h3>
          <p class="muted">Cada lección asume lo aprendido antes. Usa la barra lateral para avanzar.</p>
        </article>
        <article class="step surface">
          <span class="step__n">2</span>
          <h3>Interactúa y lee el código</h3>
          <p class="muted">Cada demo tiene una sección “Código clave” con lo esencial de la lección.</p>
        </article>
        <article class="step surface">
          <span class="step__n">3</span>
          <h3>Resuelve los retos</h3>
          <p class="muted">Marca la lección como completada y mira crecer tu progreso.</p>
        </article>
      </div>
    </section>

    <section class="stack">
      <h2>📚 Ruta de aprendizaje</h2>
      <div class="lessons grid">
        <RouterLink
          v-for="lesson in lessons"
          :key="lesson.id"
          class="lesson surface"
          :class="{ 'lesson--done': isCompleted(lesson.id) }"
          :to="{ name: `lesson-${lesson.id}` }"
        >
          <div class="lesson__top">
            <span class="lesson__order">{{ String(lesson.order).padStart(2, '0') }}</span>
            <BaseBadge :variant="levelVariant[lesson.level]">{{ lesson.level }}</BaseBadge>
            <span v-if="isCompleted(lesson.id)" class="lesson__check" aria-hidden="true">✓</span>
          </div>
          <h3 class="lesson__title">{{ lesson.title }}</h3>
          <p class="lesson__subtitle muted">{{ lesson.subtitle }}</p>
          <p class="lesson__concepts dim">{{ lesson.concepts.slice(0, 4).join(' · ') }}</p>
          <span class="lesson__cta">Ver lección →</span>
        </RouterLink>
      </div>
    </section>

    <section class="stack">
      <h2>🛸 Explorador SWAPI</h2>
      <p class="muted">
        La aplicación real que usan las lecciones: listados paginados, fichas de detalle y
        favoritos persistentes sobre la API de Star Wars.
      </p>
      <div class="explorer grid">
        <RouterLink
          v-for="name in RESOURCE_NAMES"
          :key="name"
          class="explorer__item surface"
          :to="{ name: 'resource-list', params: { resource: name } }"
        >
          <span class="explorer__icon" aria-hidden="true">{{ RESOURCE_META[name].icon }}</span>
          <span class="explorer__label">{{ RESOURCE_META[name].plural }}</span>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: clamp(1.5rem, 1rem + 3vw, 3rem);
}
.hero__glow {
  position: absolute;
  inset: -40% 40% 40% -20%;
  background: radial-gradient(closest-side, var(--accent-soft), transparent);
  pointer-events: none;
}
.hero__eyebrow {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 0.5rem;
}
.hero__title {
  margin: 0 0 0.5rem;
}
.hero__lead {
  max-width: 65ch;
  color: var(--text-muted);
}
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 1.25rem 0 1.5rem;
}
.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid transparent;
}
.btn:hover {
  text-decoration: none;
  filter: brightness(1.06);
}
.btn--primary {
  background: var(--accent);
  color: var(--accent-contrast);
}
.btn--ghost {
  border-color: var(--border-strong);
  background: var(--surface-2);
  color: var(--text);
}
.stats {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 1rem;
}
.stats li {
  display: flex;
  flex-direction: column;
}
.stats strong {
  font-size: 1.6rem;
  color: var(--accent);
}
.stats span {
  font-size: 0.78rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
.step {
  padding: 1.1rem;
  position: relative;
}
.step__n {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--accent-soft);
  border: 1px solid var(--accent);
  color: var(--accent);
  font-weight: 700;
}
.step h3 {
  margin: 0.7rem 0 0.3rem;
}

.lessons {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
.lesson {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.1rem;
  color: var(--text);
  text-decoration: none;
  transition:
    transform 0.16s ease,
    border-color 0.16s ease;
}
.lesson:hover {
  transform: translateY(-3px);
  border-color: var(--border-strong);
  text-decoration: none;
}
.lesson--done {
  border-color: var(--success);
}
.lesson__top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.lesson__order {
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--text-dim);
}
.lesson__check {
  margin-left: auto;
  color: var(--success);
  font-weight: 700;
}
.lesson__title {
  margin: 0.35rem 0 0;
  font-size: 1.05rem;
}
.lesson__subtitle {
  margin: 0;
  font-size: 0.88rem;
}
.lesson__concepts {
  margin: 0.35rem 0 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.74rem;
}
.lesson__cta {
  margin-top: auto;
  color: var(--primary);
  font-weight: 600;
  font-size: 0.88rem;
}

.explorer {
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}
.explorer__item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1rem;
  color: var(--text);
  text-decoration: none;
  transition: border-color 0.15s ease;
}
.explorer__item:hover {
  border-color: var(--primary);
  text-decoration: none;
}
.explorer__icon {
  font-size: 1.4rem;
}
.explorer__label {
  font-weight: 600;
}
</style>
