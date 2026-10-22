<script setup lang="ts">
// Favoritos guardados en el store de Pinia (persisten en localStorage).
import { RouterLink } from 'vue-router'

import BaseButton from '@/components/ui/BaseButton.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import FavoriteLink from '@/components/swapi/FavoriteLink.vue'
import { RESOURCE_META, RESOURCE_NAMES } from '@/api/types'
import { useFavoritesStore } from '@/stores/favorites'

const favorites = useFavoritesStore()
</script>

<template>
  <div class="favorites stack">
    <header class="head">
      <div>
        <h1>⭐ Favoritos</h1>
        <p class="muted">
          {{ favorites.count }} elementos guardados. Viven en el store de Pinia y se persisten
          en tu navegador.
        </p>
      </div>
      <BaseButton v-if="!favorites.isEmpty" variant="danger" size="sm" @click="favorites.clear()">
        Vaciar todo
      </BaseButton>
    </header>

    <ul v-if="!favorites.isEmpty" class="list">
      <li v-for="url in favorites.items" :key="url" class="list__item">
        <FavoriteLink :url="url" />
      </li>
    </ul>

    <EmptyState
      v-else
      icon="⭐"
      title="Todavía no hay favoritos"
      message="Explora un recurso y pulsa la estrella para guardarlo aquí."
    />

    <section class="explore surface">
      <h2 class="explore__title">Explorar recursos</h2>
      <div class="row">
        <RouterLink
          v-for="name in RESOURCE_NAMES"
          :key="name"
          class="chip"
          :to="{ name: 'resource-list', params: { resource: name } }"
        >
          {{ RESOURCE_META[name].icon }} {{ RESOURCE_META[name].plural }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.list__item {
  list-style: none;
}
.explore {
  padding: 1rem 1.15rem;
}
.explore__title {
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-dim);
  margin-bottom: 0.6rem;
}
.chip {
  display: inline-flex;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text);
  text-decoration: none;
  font-size: 0.85rem;
}
.chip:hover {
  border-color: var(--primary);
  text-decoration: none;
}
</style>
