<script setup lang="ts">
// Tarjeta de un recurso de SWAPI. Recibe un item genérico y lo resume.
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import {
  RESOURCE_META,
  idFromUrl,
  type Film,
  type Person,
  type Planet,
  type ResourceName,
  type Species,
  type Starship,
  type SwapiResources,
} from '@/api/types'
import FavoriteButton from './FavoriteButton.vue'

const props = defineProps<{
  resource: ResourceName
  item: SwapiResources[ResourceName]
  url: string
}>()

const meta = computed(() => RESOURCE_META[props.resource])
const title = computed(() => ('title' in props.item ? props.item.title : props.item.name))
const to = computed(() => ({
  name: 'resource-detail',
  params: { resource: props.resource, id: idFromUrl(props.url) },
}))

// Los props `resource` e `item` son independientes, así que estrechamos el item
// según el recurso para acceder a sus campos específicos con seguridad de tipos.
const details = computed<Array<{ label: string; value: string }>>(() => {
  switch (props.resource) {
    case 'people': {
      const person = props.item as Person
      return [
        { label: 'Nacimiento', value: person.birth_year },
        { label: 'Género', value: person.gender },
        { label: 'Altura', value: `${person.height} cm` },
      ]
    }
    case 'planets': {
      const planet = props.item as Planet
      return [
        { label: 'Clima', value: planet.climate },
        { label: 'Terreno', value: planet.terrain },
        { label: 'Población', value: planet.population },
      ]
    }
    case 'films': {
      const film = props.item as Film
      return [
        { label: 'Episodio', value: `Ep. ${film.episode_id}` },
        { label: 'Director', value: film.director },
        { label: 'Estreno', value: film.release_date },
      ]
    }
    case 'starships': {
      const ship = props.item as Starship
      return [
        { label: 'Modelo', value: ship.model },
        { label: 'Clase', value: ship.starship_class },
        { label: 'Tripulación', value: ship.crew },
      ]
    }
    case 'species': {
      const species = props.item as Species
      return [
        { label: 'Clasificación', value: species.classification },
        { label: 'Idioma', value: species.language },
        { label: 'Vida media', value: species.average_lifespan },
      ]
    }
    default:
      return []
  }
})
</script>

<template>
  <article class="rcard">
    <RouterLink class="rcard__main" :to="to">
      <span class="rcard__icon" aria-hidden="true">{{ meta.icon }}</span>
      <span class="rcard__title">{{ title }}</span>
    </RouterLink>

    <FavoriteButton class="rcard__fav" :url="url" :name="title" />

    <dl class="rcard__details">
      <div v-for="detail in details" :key="detail.label" class="rcard__row">
        <dt>{{ detail.label }}</dt>
        <dd>{{ detail.value }}</dd>
      </div>
    </dl>
  </article>
</template>

<style scoped>
.rcard {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.35rem 0.5rem;
  padding: 1rem 1.05rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-soft);
  transition:
    transform 0.16s ease,
    border-color 0.16s ease;
}
.rcard:hover {
  transform: translateY(-3px);
  border-color: var(--border-strong);
}
.rcard__main {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--text);
  text-decoration: none;
  min-width: 0;
}
.rcard__main:hover {
  text-decoration: none;
}
.rcard__icon {
  font-size: 1.4rem;
}
.rcard__title {
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rcard__fav {
  align-self: start;
}
.rcard__details {
  grid-column: 1 / -1;
  margin: 0.35rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.rcard__row {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: 0.82rem;
}
.rcard__row dt {
  color: var(--text-dim);
}
.rcard__row dd {
  margin: 0;
  text-align: right;
  color: var(--text-muted);
}
</style>
