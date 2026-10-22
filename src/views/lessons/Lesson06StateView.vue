<script setup lang="ts">
// Lección 06 · Estado global con Pinia
import { computed } from 'vue'

import ChallengeList from '@/components/lesson/ChallengeList.vue'
import LessonShell from '@/components/lesson/LessonShell.vue'
import FavoriteButton from '@/components/swapi/FavoriteButton.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import CodeBlock from '@/components/ui/CodeBlock.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { useFavoritesStore } from '@/stores/favorites'
import { getLesson } from '@/data/lessons'

const lesson = getLesson('06-estado-pinia')!

const favorites = useFavoritesStore()

const samples = [
  { name: 'Luke Skywalker', icon: '🧑‍🚀', url: 'https://swapi.dev/api/people/1/' },
  { name: 'Darth Vader', icon: '🖤', url: 'https://swapi.dev/api/people/4/' },
  { name: 'Tatooine', icon: '🪐', url: 'https://swapi.dev/api/planets/1/' },
  { name: 'A New Hope', icon: '🎬', url: 'https://swapi.dev/api/films/1/' },
]

const summary = computed(() =>
  favorites.isEmpty ? 'Aún no has marcado favoritos.' : `${favorites.count} favoritos guardados.`,
)

const snippet = `// stores/favorites.ts — store estilo setup
export const useFavoritesStore = defineStore('favorites', () => {
  // estado
  const items = ref<string[]>(loadFavorites())

  // getters
  const count = computed(() => items.value.length)

  // acciones
  function toggle(url: string) {
    items.value = items.value.includes(url)
      ? items.value.filter((u) => u !== url)
      : [...items.value, url]
  }

  return { items, count, toggle }
})

// En cualquier componente
const favorites = useFavoritesStore()
favorites.toggle('https://swapi.dev/api/people/1/')`

const challenges = [
  'Añade un getter `byResource(name)` que filtre los favoritos de un tipo.',
  'Guarda también el nombre del recurso, no sólo la URL.',
  'Crea un segundo store `ui` con el tema y compáralo con provide/inject.',
  'Investiga los plugins de Pinia para centralizar la persistencia.',
]
</script>

<template>
  <LessonShell :lesson="lesson">
    <div class="stack">
      <section class="panel surface">
        <div class="head">
          <h3>Favoritos de la galaxia</h3>
          <span class="count">⭐ {{ favorites.count }}</span>
        </div>
        <p class="muted">
          Cada estrella escribe en el <strong>mismo store</strong> de Pinia. Navega a otra
          página y vuelve: los favoritos siguen ahí porque también se guardan en
          <span class="inline-code">localStorage</span>.
        </p>

        <ul class="samples">
          <li v-for="sample in samples" :key="sample.url" class="sample">
            <span class="sample__icon" aria-hidden="true">{{ sample.icon }}</span>
            <span class="sample__name">{{ sample.name }}</span>
            <FavoriteButton :url="sample.url" :name="sample.name" />
          </li>
        </ul>
      </section>

      <section class="panel surface">
        <h3>Estado actual del store</h3>
        <p class="muted">{{ summary }}</p>
        <ul v-if="!favorites.isEmpty" class="items">
          <li v-for="url in favorites.items" :key="url" class="items__item">{{ url }}</li>
        </ul>
        <EmptyState v-else icon="⭐" title="Sin favoritos" message="Marca una estrella arriba." />
        <div v-if="!favorites.isEmpty" class="row">
          <BaseButton size="sm" variant="danger" @click="favorites.clear()">
            Vaciar favoritos
          </BaseButton>
        </div>
      </section>
    </div>

    <template #code>
      <CodeBlock :code="snippet" title="defineStore con estado, getter y acción" />
    </template>

    <template #challenges>
      <ChallengeList :items="challenges" />
    </template>
  </LessonShell>
</template>

<style scoped>
.panel {
  padding: 1.15rem;
}
.panel h3 {
  margin-top: 0;
}
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.count {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent);
}
.samples {
  list-style: none;
  margin: 0.75rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}
.sample {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-2);
}
.sample__icon {
  font-size: 1.2rem;
}
.sample__name {
  flex: 1 1 auto;
  font-weight: 600;
}
.items {
  list-style: none;
  margin: 0 0 0.75rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.items__item {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-dim);
  word-break: break-all;
}
</style>
