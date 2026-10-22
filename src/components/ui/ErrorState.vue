<script setup lang="ts">
// Estado de error con acción de reintento opcional.
import BaseButton from './BaseButton.vue'

withDefaults(
  defineProps<{
    title?: string
    message?: string
    retryable?: boolean
  }>(),
  { title: 'Algo salió mal', message: '', retryable: true },
)

defineEmits<{ (e: 'retry'): void }>()
</script>

<template>
  <div class="error" role="alert">
    <span class="error__icon" aria-hidden="true">⚠️</span>
    <div>
      <h3 class="error__title">{{ title }}</h3>
      <p v-if="message" class="error__msg muted">{{ message }}</p>
    </div>
    <BaseButton v-if="retryable" size="sm" variant="danger" @click="$emit('retry')">
      Reintentar
    </BaseButton>
  </div>
</template>

<style scoped>
.error {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.15rem;
  border: 1px solid var(--danger);
  background: var(--danger-soft);
  border-radius: var(--radius);
}
.error__icon {
  font-size: 1.5rem;
}
.error__title {
  margin: 0;
  font-size: 1rem;
}
.error__msg {
  margin: 0.15rem 0 0;
  font-size: 0.88rem;
  word-break: break-word;
}
</style>
