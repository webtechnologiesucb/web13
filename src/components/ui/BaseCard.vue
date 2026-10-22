<script setup lang="ts">
// Tarjeta contenedora con slots: header, default y footer.
// Es el ejemplo central de la lección 08 (slots y composición).
withDefaults(
  defineProps<{
    as?: 'div' | 'article' | 'section' | 'li'
    title?: string
    subtitle?: string
    hoverable?: boolean
    flush?: boolean
  }>(),
  {
    as: 'div',
    title: undefined,
    subtitle: undefined,
    hoverable: false,
    flush: false,
  },
)
</script>

<template>
  <component
    :is="as"
    class="card"
    :class="{ 'card--hover': hoverable, 'card--flush': flush }"
  >
    <header v-if="$slots.header || title" class="card__header">
      <slot name="header">
        <h3 v-if="title" class="card__title">{{ title }}</h3>
        <p v-if="subtitle" class="card__subtitle">{{ subtitle }}</p>
      </slot>
    </header>

    <div class="card__body">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="card__footer">
      <slot name="footer" />
    </footer>
  </component>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease;
}
.card--hover:hover {
  transform: translateY(-3px);
  border-color: var(--border-strong);
}
.card__header {
  padding: 1rem 1.15rem 0.35rem;
}
.card__title {
  margin: 0;
  font-size: 1.05rem;
}
.card__subtitle {
  margin: 0.15rem 0 0;
  font-size: 0.86rem;
  color: var(--text-muted);
}
.card__body {
  padding: 0.9rem 1.15rem 1.15rem;
  flex: 1 1 auto;
}
.card--flush .card__body {
  padding: 0;
}
.card__footer {
  padding: 0.85rem 1.15rem;
  border-top: 1px solid var(--border);
  background: var(--surface-2);
}
</style>
