<script setup lang="ts">
// Componente de ejemplo (lección 02): props de entrada + evento de salida.
// El hijo NO modifica los datos del padre: sólo notifica con emit().
const props = defineProps<{
  label: string
  count?: number
}>()

const emit = defineEmits<{ (e: 'like'): void }>()
</script>

<template>
  <button type="button" class="like" @click="emit('like')">
    <span aria-hidden="true">👍</span>
    <span>{{ props.label }}</span>
    <strong class="like__count">{{ props.count ?? 0 }}</strong>
  </button>
</template>

<style scoped>
.like {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: 1px solid var(--border-strong);
  background: var(--surface-2);
  color: var(--text);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s ease;
}
.like:hover {
  border-color: var(--accent);
}
.like__count {
  color: var(--accent);
}
</style>
