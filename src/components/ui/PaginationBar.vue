<script setup lang="ts">
// Controles de paginación. Usa defineModel (v-model:page) — lección 02.
import BaseButton from './BaseButton.vue'

const page = defineModel<number>('page', { required: true })

const props = withDefaults(defineProps<{ totalPages?: number }>(), { totalPages: 1 })

function goTo(target: number): void {
  page.value = Math.min(Math.max(1, target), props.totalPages)
}
</script>

<template>
  <nav class="pagination" aria-label="Paginación">
    <BaseButton size="sm" variant="subtle" :disabled="page <= 1" @click="goTo(1)">
      « Primera
    </BaseButton>
    <BaseButton size="sm" :disabled="page <= 1" @click="goTo(page - 1)">← Anterior</BaseButton>
    <span class="pagination__info muted">
      Página <strong>{{ page }}</strong> / {{ props.totalPages }}
    </span>
    <BaseButton size="sm" :disabled="page >= props.totalPages" @click="goTo(page + 1)">
      Siguiente →
    </BaseButton>
    <BaseButton
      size="sm"
      variant="subtle"
      :disabled="page >= props.totalPages"
      @click="goTo(props.totalPages)"
    >
      Última »
    </BaseButton>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 0.75rem 0;
}
.pagination__info {
  font-size: 0.88rem;
  padding-inline: 0.4rem;
}
</style>
