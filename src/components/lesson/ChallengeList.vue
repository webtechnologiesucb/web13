<script setup lang="ts">
// Lista numerada de retos/ejercicios de una lección.
withDefaults(
  defineProps<{
    items?: string[]
    title?: string
  }>(),
  { items: () => [], title: '' },
)
</script>

<template>
  <div class="challenges">
    <p v-if="title" class="challenges__title muted">{{ title }}</p>
    <ol class="challenges__list">
      <li v-for="(item, index) in items" :key="index">{{ item }}</li>
    </ol>
  </div>
</template>

<style scoped>
.challenges {
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  padding: 0.9rem 1.1rem;
}
.challenges__title {
  margin: 0 0 0.5rem;
  font-size: 0.85rem;
}
.challenges__list {
  margin: 0;
  padding-left: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.92rem;
}
</style>
