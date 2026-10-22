<script setup lang="ts" generic="T">
// Componente de ejemplo (lección 08): slot con scope.
// `generic="T"` hace que los items y el slot compartan el mismo tipo.
defineProps<{
  items: T[]
  emptyText?: string
}>()
</script>

<template>
  <ul v-if="items.length" class="datalist">
    <li v-for="(item, index) in items" :key="index" class="datalist__item">
      <!-- El slot expone los datos; quien lo usa decide cómo pintarlos. -->
      <slot :item="item" :index="index" />
    </li>
  </ul>
  <p v-else class="muted">{{ emptyText ?? 'Sin elementos' }}</p>
</template>

<style scoped>
.datalist {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.datalist__item {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-2);
}
</style>
