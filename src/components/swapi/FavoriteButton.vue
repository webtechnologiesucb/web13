<script setup lang="ts">
// Botón de favorito conectado al store de Pinia (lección 06).
import { computed } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'

const props = defineProps<{ url: string; name?: string }>()

const favorites = useFavoritesStore()
const isFavorite = computed(() => favorites.has(props.url))
</script>

<template>
  <button
    type="button"
    class="fav"
    :class="{ 'fav--on': isFavorite }"
    :aria-pressed="isFavorite"
    :title="isFavorite ? `Quitar ${name ?? 'de favoritos'}` : `Añadir ${name ?? 'a favoritos'}`"
    @click.stop="favorites.toggle(props.url)"
  >
    <span aria-hidden="true">{{ isFavorite ? '★' : '☆' }}</span>
    <span class="visually-hidden">Alternar favorito</span>
  </button>
</template>

<style scoped>
.fav {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text-dim);
  font-size: 1rem;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease;
}
.fav:hover {
  transform: scale(1.08);
  border-color: var(--accent);
  color: var(--accent);
}
.fav--on {
  color: var(--accent);
  border-color: var(--accent);
  background: var(--accent-soft);
}
</style>
