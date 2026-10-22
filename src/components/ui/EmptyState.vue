<script setup lang="ts">
// Estado vacío: cuando no hay datos que mostrar.
withDefaults(
  defineProps<{
    icon?: string
    title?: string
    message?: string
  }>(),
  { icon: '🛰️', title: 'Nada por aquí', message: '' },
)
</script>

<template>
  <div class="empty">
    <span class="empty__icon" aria-hidden="true">{{ icon }}</span>
    <h3 class="empty__title">{{ title }}</h3>
    <p v-if="message" class="muted">{{ message }}</p>
    <slot />
  </div>
</template>

<style scoped>
.empty {
  text-align: center;
  padding: 2.5rem 1rem;
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius);
  background: var(--surface-2);
}
.empty__icon {
  font-size: 2.4rem;
  display: block;
  margin-bottom: 0.5rem;
}
.empty__title {
  margin: 0 0 0.25rem;
}
</style>
