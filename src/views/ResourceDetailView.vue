<script setup lang="ts">
// Ficha de detalle de un recurso SWAPI con sus relaciones.
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import FavoriteButton from '@/components/swapi/FavoriteButton.vue'
import ResourceField from '@/components/swapi/ResourceField.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import ErrorState from '@/components/ui/ErrorState.vue'
import LoadingState from '@/components/ui/LoadingState.vue'
import {
  RESOURCE_META,
  idFromUrl,
  resourceFromUrl,
  type Film,
  type Person,
  type Planet,
  type ResourceName,
  type Species,
  type Starship,
} from '@/api/types'
import { useSwapiDetail } from '@/composables/useSwapi'

const route = useRoute()
const resource = String(route.params.resource) as ResourceName
const meta = RESOURCE_META[resource]
const id = computed(() => String(route.params.id))

const { data, error, loading, reload } = useSwapiDetail(resource, id)

const title = computed(() => {
  const value = data.value
  if (!value) return meta.singular
  return 'title' in value ? value.title : value.name
})

interface Field {
  label: string
  value: string | number | null
}
interface ResourceLink {
  label: string
  resource: ResourceName
  id: string
}
interface Group {
  label: string
  links: ResourceLink[]
}

function toLinks(urls: string[]): ResourceLink[] {
  const links: ResourceLink[] = []
  for (const url of urls) {
    const target = resourceFromUrl(url)
    if (!target) continue
    links.push({
      label: `${RESOURCE_META[target].icon} ${idFromUrl(url)}`,
      resource: target,
      id: idFromUrl(url),
    })
  }
  return links
}

function toGroups(entries: Array<[string, string[]]>): Group[] {
  return entries
    .map(([label, urls]) => ({ label, links: toLinks(urls) }))
    .filter((group) => group.links.length > 0)
}

const fields = computed<Field[]>(() => {
  const value = data.value
  if (!value) return []
  switch (resource) {
    case 'people': {
      const person = value as Person
      return [
        { label: 'Nacimiento', value: person.birth_year },
        { label: 'Género', value: person.gender },
        { label: 'Altura', value: `${person.height} cm` },
        { label: 'Masa', value: `${person.mass} kg` },
        { label: 'Color de pelo', value: person.hair_color },
        { label: 'Color de ojos', value: person.eye_color },
      ]
    }
    case 'planets': {
      const planet = value as Planet
      return [
        { label: 'Clima', value: planet.climate },
        { label: 'Terreno', value: planet.terrain },
        { label: 'Población', value: planet.population },
        { label: 'Diámetro', value: `${planet.diameter} km` },
        { label: 'Gravedad', value: planet.gravity },
        { label: 'Periodo orbital', value: `${planet.orbital_period} días` },
      ]
    }
    case 'films': {
      const film = value as Film
      return [
        { label: 'Episodio', value: film.episode_id },
        { label: 'Director', value: film.director },
        { label: 'Productor', value: film.producer },
        { label: 'Estreno', value: film.release_date },
      ]
    }
    case 'starships': {
      const ship = value as Starship
      return [
        { label: 'Modelo', value: ship.model },
        { label: 'Fabricante', value: ship.manufacturer },
        { label: 'Clase', value: ship.starship_class },
        { label: 'Coste', value: `${ship.cost_in_credits} créditos` },
        { label: 'Tripulación', value: ship.crew },
        { label: 'Pasajeros', value: ship.passengers },
      ]
    }
    case 'species': {
      const species = value as Species
      return [
        { label: 'Clasificación', value: species.classification },
        { label: 'Designación', value: species.designation },
        { label: 'Altura media', value: `${species.average_height} cm` },
        { label: 'Idioma', value: species.language },
        { label: 'Vida media', value: species.average_lifespan },
      ]
    }
    default:
      return []
  }
})

const related = computed<Group[]>(() => {
  const value = data.value
  if (!value) return []
  switch (resource) {
    case 'people': {
      const person = value as Person
      return toGroups([
        ['Películas', person.films],
        ['Planeta natal', person.homeworld ? [person.homeworld] : []],
        ['Naves', person.starships],
        ['Especies', person.species],
      ])
    }
    case 'planets': {
      const planet = value as Planet
      return toGroups([
        ['Residentes', planet.residents],
        ['Películas', planet.films],
      ])
    }
    case 'films': {
      const film = value as Film
      return toGroups([
        ['Personajes', film.characters],
        ['Planetas', film.planets],
        ['Naves', film.starships],
        ['Especies', film.species],
      ])
    }
    case 'starships': {
      const ship = value as Starship
      return toGroups([
        ['Pilotos', ship.pilots],
        ['Películas', ship.films],
      ])
    }
    case 'species': {
      const species = value as Species
      return toGroups([
        ['Personas', species.people],
        ['Películas', species.films],
      ])
    }
    default:
      return []
  }
})

const openingCrawl = computed(() =>
  resource === 'films' && data.value ? (data.value as Film).opening_crawl : '',
)
</script>

<template>
  <div class="detail stack">
    <RouterLink class="back" :to="{ name: 'resource-list', params: { resource } }">
      ← Volver a {{ meta.plural }}
    </RouterLink>

    <LoadingState v-if="loading" :label="`Cargando ${meta.singular.toLowerCase()}…`" />
    <ErrorState
      v-else-if="error"
      :title="`No se pudo cargar el ${meta.singular.toLowerCase()}`"
      :message="error.message"
      @retry="reload"
    />

    <template v-else-if="data">
      <article class="sheet surface">
        <header class="sheet__head">
          <span class="sheet__icon" aria-hidden="true">{{ meta.icon }}</span>
          <div class="sheet__titles">
            <h1>{{ title }}</h1>
            <p class="dim">{{ meta.singular }} #{{ id }} · {{ data.url }}</p>
          </div>
          <FavoriteButton :url="data.url" :name="title" />
        </header>

        <dl class="sheet__fields">
          <ResourceField v-for="field in fields" :key="field.label" :label="field.label" :value="field.value" />
        </dl>

        <blockquote v-if="openingCrawl" class="crawl">{{ openingCrawl }}</blockquote>
      </article>

      <section v-for="group in related" :key="group.label" class="related surface">
        <h2 class="related__title">{{ group.label }}</h2>
        <div class="row">
          <RouterLink
            v-for="link in group.links"
            :key="link.id"
            class="chip"
            :to="{ name: 'resource-detail', params: { resource: link.resource, id: link.id } }"
          >
            {{ link.label }}
          </RouterLink>
        </div>
      </section>
    </template>

    <EmptyState v-else title="Sin datos" />
  </div>
</template>

<style scoped>
.back {
  font-size: 0.9rem;
  color: var(--text-muted);
  text-decoration: none;
  width: fit-content;
}
.back:hover {
  color: var(--text);
}
.sheet {
  padding: 1.4rem;
}
.sheet__head {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}
.sheet__icon {
  font-size: 2.6rem;
}
.sheet__titles {
  flex: 1 1 auto;
}
.sheet__titles h1 {
  margin: 0;
}
.sheet__titles p {
  margin: 0.2rem 0 0;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  word-break: break-all;
}
.sheet__fields {
  margin: 1rem 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0 1.5rem;
}
.crawl {
  margin: 1.2rem 0 0;
  padding: 1rem 1.2rem;
  border-left: 3px solid var(--accent);
  background: var(--surface-2);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  color: var(--text-muted);
  font-style: italic;
  white-space: pre-line;
}
.related {
  padding: 1rem 1.15rem;
}
.related__title {
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-dim);
  margin-bottom: 0.6rem;
}
.chip {
  display: inline-flex;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  border: 1px solid var(--border-strong);
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
