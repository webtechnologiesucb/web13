<script setup lang="ts">
// Navegación "lección anterior / siguiente" usando los metadatos de la ruta.
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { getAdjacentLessons } from '@/data/lessons'

const props = defineProps<{ lessonId: string }>()

const adjacent = computed(() => getAdjacentLessons(props.lessonId))
</script>

<template>
  <nav class="pager" aria-label="Navegación entre lecciones">
    <RouterLink
      v-if="adjacent.previous"
      class="pager__link"
      :to="{ name: `lesson-${adjacent.previous.id}` }"
    >
      <small class="dim">← Lección anterior</small>
      <strong>{{ adjacent.previous.title }}</strong>
    </RouterLink>
    <span v-else class="pager__spacer" />

    <RouterLink
      v-if="adjacent.next"
      class="pager__link pager__link--next"
      :to="{ name: `lesson-${adjacent.next.id}` }"
    >
      <small class="dim">Siguiente lección →</small>
      <strong>{{ adjacent.next.title }}</strong>
    </RouterLink>
  </nav>
</template>

<style scoped>
.pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  margin-top: 0.5rem;
}
.pager__link {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--text);
  text-decoration: none;
  transition: border-color 0.15s ease;
}
.pager__link:hover {
  border-color: var(--primary);
  text-decoration: none;
}
.pager__link--next {
  text-align: right;
}
@media (max-width: 620px) {
  .pager {
    grid-template-columns: 1fr;
  }
}
</style>
