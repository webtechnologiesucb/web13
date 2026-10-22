<script setup lang="ts">
// Fila etiqueta/valor para las fichas de detalle.
import { computed } from 'vue'

const props = defineProps<{
  label: string
  value?: string | number | null
}>()

const display = computed(() => {
  const value = props.value
  if (value === null || value === undefined || value === '') return '—'
  const text = String(value)
  if (text === 'unknown' || text === 'n/a' || text === 'none') return '—'
  return text
})
</script>

<template>
  <div class="field">
    <dt class="field__label">{{ label }}</dt>
    <dd class="field__value">{{ display }}</dd>
  </div>
</template>

<style scoped>
.field {
  padding: 0.55rem 0;
  border-bottom: 1px dashed var(--border);
}
.field:last-child {
  border-bottom: none;
}
.field__label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-dim);
}
.field__value {
  margin: 0.1rem 0 0;
  font-size: 0.98rem;
  word-break: break-word;
}
</style>
