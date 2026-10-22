<script setup lang="ts">
// Etiqueta/insignia de estado o categoría.
withDefaults(
  defineProps<{
    variant?: 'default' | 'accent' | 'primary' | 'success' | 'danger'
  }>(),
  { variant: 'default' },
)
</script>

<template>
  <span class="badge" :class="`badge--${variant}`">
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.14rem 0.6rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  border: 1px solid var(--border);
  background: var(--surface-3);
  color: var(--text-muted);
  white-space: nowrap;
}
.badge--accent {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent);
}
.badge--primary {
  background: var(--primary-soft);
  border-color: var(--primary);
  color: var(--primary);
}
.badge--success {
  background: var(--success-soft);
  border-color: var(--success);
  color: var(--success);
}
.badge--danger {
  background: var(--danger-soft);
  border-color: var(--danger);
  color: var(--danger);
}
</style>
