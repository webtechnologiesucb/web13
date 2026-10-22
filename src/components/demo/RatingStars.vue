<script setup lang="ts">
// Componente de ejemplo (lección 02): v-model con defineModel.
// `model` es a la vez prop (lectura) y evento update:modelValue (escritura).
const model = defineModel<number>({ default: 0 })

withDefaults(
  defineProps<{
    max?: number
    label?: string
  }>(),
  { max: 5, label: 'Valoración' },
)

function set(value: number): void {
  // Volver a pulsar la misma estrella limpia la valoración.
  model.value = model.value === value ? 0 : value
}
</script>

<template>
  <div class="rating" role="radiogroup" :aria-label="label">
    <button
      v-for="star in max"
      :key="star"
      type="button"
      class="rating__star"
      :class="{ 'rating__star--on': star <= model }"
      :aria-pressed="star <= model"
      @click="set(star)"
    >
      <span aria-hidden="true">★</span>
      <span class="visually-hidden">Valorar con {{ star }}</span>
    </button>
    <span class="muted rating__value">{{ model }} / {{ max }}</span>
  </div>
</template>

<style scoped>
.rating {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
}
.rating__star {
  background: none;
  border: none;
  padding: 0 0.1rem;
  font-size: 1.4rem;
  line-height: 1;
  color: var(--border-strong);
  cursor: pointer;
  transition:
    transform 0.12s ease,
    color 0.12s ease;
}
.rating__star:hover {
  transform: scale(1.15);
}
.rating__star--on {
  color: var(--accent);
}
.rating__value {
  margin-left: 0.5rem;
  font-size: 0.85rem;
}
</style>
