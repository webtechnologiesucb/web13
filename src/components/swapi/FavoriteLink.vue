<script setup lang="ts">
// Un favorito guardado como URL. El componente se encarga de resolver el
// nombre (demuestra que un componente puede cargar sus propios datos).
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import BaseButton from '@/components/ui/BaseButton.vue'
import { getResourceByUrl } from '@/api/swapi'
import { RESOURCE_META, idFromUrl, resourceFromUrl } from '@/api/types'
import { useAsyncData } from '@/composables/useAsyncData'
import { useFavoritesStore } from '@/stores/favorites'

const props = defineProps<{ url: string }>()

const favorites = useFavoritesStore()

interface NamedResource {
  name?: string
  title?: string
}

const { data, loading, error } = useAsyncData<NamedResource>((signal) =>
  getResourceByUrl<NamedResource>(props.url, { signal }),
)

const resource = computed(() => resourceFromUrl(props.url))
const id = computed(() => idFromUrl(props.url))
const icon = computed(() => (resource.value ? RESOURCE_META[resource.value].icon : '🔗'))
const label = computed(() => data.value?.title ?? data.value?.name ?? `#${id.value}`)
const to = computed(() =>
  resource.value
    ? { name: 'resource-detail', params: { resource: resource.value, id: id.value } }
    : undefined,
)
</script>

<template>
  <div class="fav-row">
    <span class="fav-row__icon" aria-hidden="true">{{ icon }}</span>

    <div class="fav-row__body">
      <RouterLink v-if="to" :to="to" class="fav-row__link">{{ label }}</RouterLink>
      <span v-else class="fav-row__link">{{ label }}</span>
      <small class="dim">{{ props.url }}</small>
    </div>

    <span v-if="loading" class="dim fav-row__state">cargando…</span>
    <span v-else-if="error" class="dim fav-row__state">sin conexión</span>

    <BaseButton size="sm" variant="danger" @click="favorites.remove(props.url)">
      Quitar
    </BaseButton>
  </div>
</template>

<style scoped>
.fav-row {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 0.9rem;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
}
.fav-row__icon {
  font-size: 1.3rem;
}
.fav-row__body {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.fav-row__link {
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
}
.fav-row__link:hover {
  text-decoration: underline;
}
.fav-row__body small {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fav-row__state {
  font-size: 0.8rem;
}
</style>
