<script setup lang="ts">
// Explorador de recursos SWAPI: listado paginado + filtro local.
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import LoadingState from '@/components/ui/LoadingState.vue'
import ErrorState from '@/components/ui/ErrorState.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import PaginationBar from '@/components/ui/PaginationBar.vue'
import ResourceCard from '@/components/swapi/ResourceCard.vue'
import {
  RESOURCE_META,
  RESOURCE_NAMES,
  type ResourceName,
  type SwapiResources,
} from '@/api/types'
import { useDebouncedValue } from '@/composables/useDebouncedRef'
import { useSwapiList } from '@/composables/useSwapi'

const route = useRoute()
// El parámetro está restringido por la ruta, así que es un ResourceName válido.
const resource = String(route.params.resource) as ResourceName
const meta = RESOURCE_META[resource]

const { data, error, loading, page, totalPages, total, reload } = useSwapiList(resource)

const filter = ref('')
const debouncedFilter = useDebouncedValue(filter, 250)

function labelOf(item: SwapiResources[ResourceName]): string {
  return 'title' in item ? item.title : item.name
}

const results = computed(() => data.value?.results ?? [])
const visible = computed(() => {
  const query = debouncedFilter.value.trim().toLowerCase()
  if (!query) return results.value
  return results.value.filter((item) => labelOf(item).toLowerCase().includes(query))
})
</script>

<template>
  <div class="explorer-view stack">
    <header class="head">
      <div class="head__title">
        <span class="head__icon" aria-hidden="true">{{ meta.icon }}</span>
        <div>
          <h1>{{ meta.plural }}</h1>
          <p class="muted">
            {{ total }} registros en total. Datos servidos por la API SWAPI.
          </p>
        </div>
      </div>

      <nav class="tabs" aria-label="Cambiar de recurso">
        <RouterLink
          v-for="name in RESOURCE_NAMES"
          :key="name"
          class="tabs__item"
          :class="{ 'tabs__item--active': name === resource }"
          :to="{ name: 'resource-list', params: { resource: name } }"
        >
          {{ RESOURCE_META[name].icon }} {{ RESOURCE_META[name].plural }}
        </RouterLink>
      </nav>
    </header>

    <div class="toolbar surface">
      <label class="toolbar__label" for="filtro">Filtrar en esta página</label>
      <input
        id="filtro"
        v-model.trim="filter"
        class="toolbar__input"
        type="search"
        :placeholder="`Nombre de ${meta.singular.toLowerCase()}…`"
      />
      <span class="dim">Mostrando {{ visible.length }} de {{ results.length }}</span>
    </div>

    <LoadingState v-if="loading" variant="skeleton" :count="8" :label="`Cargando ${meta.plural.toLowerCase()}…`" />
    <ErrorState
      v-else-if="error"
      :title="`No se pudieron cargar ${meta.plural.toLowerCase()}`"
      :message="error.message"
      @retry="reload"
    />
    <EmptyState
      v-else-if="!visible.length"
      icon="🔍"
      :title="filter ? 'Sin coincidencias' : 'Sin resultados'"
      :message="filter ? `Nada coincide con “${filter}” en esta página.` : 'La API no devolvió resultados.'"
    />
    <template v-else>
      <div class="cards grid">
        <ResourceCard
          v-for="item in visible"
          :key="item.url"
          :resource="resource"
          :item="item"
          :url="item.url"
        />
      </div>

      <PaginationBar v-model:page="page" :total-pages="totalPages" />
      <p class="dim center">
        Página {{ page }} de {{ totalPages }} · el filtro sólo actúa sobre la página actual
        (SWAPI pagina en el servidor).
      </p>
    </template>
  </div>
</template>

<style scoped>
.head__title {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.head__icon {
  font-size: 2.4rem;
}
.head h1 {
  margin-bottom: 0.1rem;
}
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1rem;
}
.tabs__item {
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.85rem;
}
.tabs__item:hover {
  text-decoration: none;
  color: var(--text);
}
.tabs__item--active {
  border-color: var(--primary);
  background: var(--primary-soft);
  color: var(--text);
}
.toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding: 0.75rem 1rem;
}
.toolbar__label {
  font-size: 0.8rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.toolbar__input {
  flex: 1 1 220px;
  padding: 0.45rem 0.7rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-strong);
  background: var(--surface-2);
  color: var(--text);
  font: inherit;
}
.cards {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
.center {
  text-align: center;
}
</style>
