<script setup lang="ts">
// Contenedor común de una lección: cabecera, secciones y navegación.
import { computed } from 'vue'

import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useProgress } from '@/composables/useProgress'
import type { Lesson } from '@/data/lessons'
import LessonPager from './LessonPager.vue'

const props = defineProps<{ lesson: Lesson }>()

const { isCompleted, toggle } = useProgress()
const completed = computed(() => isCompleted(props.lesson.id))

const levelVariant = computed<'default' | 'accent' | 'primary' | 'success' | 'danger'>(() => {
  switch (props.lesson.level) {
    case 'Inicial':
      return 'success'
    case 'Intermedio':
      return 'primary'
    default:
      return 'accent'
  }
})
</script>

<template>
  <article class="lesson stack">
    <header class="lesson__head">
      <div class="row">
        <BaseBadge variant="accent">Lección {{ String(lesson.order).padStart(2, '0') }}</BaseBadge>
        <BaseBadge :variant="levelVariant">{{ lesson.level }}</BaseBadge>
        <span class="dim">⏱ {{ lesson.duration }} min</span>
      </div>
      <h1 class="lesson__title">{{ lesson.title }}</h1>
      <p class="lesson__subtitle muted">{{ lesson.subtitle }}</p>
      <p class="lesson__summary">{{ lesson.summary }}</p>
      <ul class="concepts" aria-label="Conceptos que se practican">
        <li v-for="concept in lesson.concepts" :key="concept" class="concepts__item">
          {{ concept }}
        </li>
      </ul>
    </header>

    <section class="lesson__section">
      <h2 class="lesson__h2">🧪 Demo interactiva</h2>
      <slot />
    </section>

    <section v-if="$slots.code" class="lesson__section">
      <h2 class="lesson__h2">🔍 Código clave</h2>
      <div class="stack">
        <slot name="code" />
      </div>
    </section>

    <section v-if="$slots.challenges" class="lesson__section">
      <h2 class="lesson__h2">🏁 Retos para practicar</h2>
      <slot name="challenges" />
    </section>

    <div class="lesson__actions">
      <BaseButton :variant="completed ? 'accent' : 'primary'" @click="toggle(lesson.id)">
        {{ completed ? '✓ Lección completada' : 'Marcar como completada' }}
      </BaseButton>
    </div>

    <LessonPager :lesson-id="lesson.id" />
  </article>
</template>

<style scoped>
.lesson__head {
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}
.lesson__title {
  margin-top: 0.6rem;
}
.lesson__subtitle {
  font-size: 1.05rem;
  margin-bottom: 0.5rem;
}
.lesson__summary {
  max-width: 70ch;
}
.lesson__section {
  padding-top: 0.5rem;
}
.lesson__h2 {
  font-size: 1.1rem;
  letter-spacing: 0.01em;
}
.lesson__actions {
  display: flex;
  gap: 0.75rem;
  padding-top: 0.5rem;
}

.concepts {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0;
  margin: 0.75rem 0 0;
}
.concepts__item {
  padding: 0.16rem 0.6rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
}
</style>
