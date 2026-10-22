<script setup lang="ts">
// Cabecera fija con marca, acceso a favoritos y conmutador de tema.
// v-model:open controla el menú lateral en móvil (defineModel).
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import BaseButton from '@/components/ui/BaseButton.vue'
import { useTheme } from '@/composables/useTheme'
import { useFavoritesStore } from '@/stores/favorites'

const open = defineModel<boolean>('open', { default: false })

const { theme, toggleTheme } = useTheme()
const favorites = useFavoritesStore()

const themeLabel = computed(() =>
  theme.value === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro',
)
</script>

<template>
  <header class="header">
    <div class="header__inner container">
      <BaseButton
        class="header__burger"
        variant="subtle"
        size="sm"
        :aria-expanded="open"
        aria-controls="sidebar"
        @click="open = !open"
      >
        ☰<span class="visually-hidden">Abrir menú de navegación</span>
      </BaseButton>

      <RouterLink :to="{ name: 'home' }" class="brand">
        <span class="brand__icon" aria-hidden="true">🛸</span>
        <span class="brand__text">
          <strong>Ruta de Aprendizaje Vue</strong>
          <small>Vue 3 · Vite · TypeScript · SWAPI</small>
        </span>
      </RouterLink>

      <div class="spacer" />

      <RouterLink :to="{ name: 'favorites' }" class="fav-link" title="Ver favoritos">
        <span aria-hidden="true">⭐</span>
        <span class="fav-link__count">{{ favorites.count }}</span>
        <span class="visually-hidden">favoritos</span>
      </RouterLink>

      <BaseButton variant="subtle" size="sm" :title="themeLabel" @click="toggleTheme">
        <span aria-hidden="true">{{ theme === 'dark' ? '☀️' : '🌙' }}</span>
        <span class="visually-hidden">{{ themeLabel }}</span>
      </BaseButton>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 30;
  min-height: var(--header-height);
  display: flex;
  align-items: center;
  backdrop-filter: blur(12px);
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  border-bottom: 1px solid var(--border);
}
.header__inner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-block: 0.6rem;
}
.header__burger {
  display: none;
}
.brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  color: var(--text);
  text-decoration: none;
}
.brand:hover {
  text-decoration: none;
}
.brand__icon {
  font-size: 1.7rem;
  filter: drop-shadow(0 0 12px var(--glow-1));
}
.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}
.brand__text strong {
  font-size: 1.02rem;
}
.brand__text small {
  color: var(--text-muted);
  font-size: 0.72rem;
  letter-spacing: 0.02em;
}
.fav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text);
  text-decoration: none;
  font-weight: 600;
}
.fav-link:hover {
  border-color: var(--accent);
  text-decoration: none;
}
.fav-link__count {
  font-size: 0.82rem;
}

@media (max-width: 980px) {
  .header__burger {
    display: inline-flex;
  }
  .brand__text small {
    display: none;
  }
}
</style>
