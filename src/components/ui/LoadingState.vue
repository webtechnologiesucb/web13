<script setup lang="ts">
// Indicador de carga: spinner o rejilla de "skeletons".
withDefaults(
  defineProps<{
    label?: string
    variant?: 'spinner' | 'skeleton'
    count?: number
  }>(),
  { label: 'Cargando…', variant: 'spinner', count: 6 },
)
</script>

<template>
  <div v-if="variant === 'skeleton'" class="grid" role="status" aria-live="polite">
    <div v-for="n in count" :key="n" class="sk" aria-hidden="true">
      <div class="sk__line sk__line--title" />
      <div class="sk__line" />
      <div class="sk__line sk__line--short" />
    </div>
    <span class="visually-hidden">{{ label }}</span>
  </div>

  <div v-else class="spinner-wrap" role="status" aria-live="polite">
    <span class="spinner" aria-hidden="true" />
    <span class="muted">{{ label }}</span>
  </div>
</template>

<style scoped>
.spinner-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 0;
}
.spinner {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 3px solid var(--border-strong);
  border-top-color: var(--accent);
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.sk {
  padding: 1.1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
}
.sk__line {
  height: 12px;
  border-radius: 6px;
  margin-bottom: 0.6rem;
  background: linear-gradient(90deg, var(--surface-3) 25%, var(--surface-2) 50%, var(--surface-3) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}
.sk__line--title {
  height: 18px;
  width: 60%;
}
.sk__line--short {
  width: 40%;
}
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
