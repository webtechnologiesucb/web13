<script setup lang="ts">
// src/App.vue
// Layout raíz del showcase: cabecera, barra lateral (ruta de aprendizaje),
// área de contenido con transición de página y pie.
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { provideTheme } from '@/composables/useTheme'

// Provee el tema (dark/light) a todo el árbol de componentes.
// Cualquier descendiente podrá consumirlo con useTheme() -> provide/inject.
provideTheme()

const route = useRoute()
const sidebarOpen = ref(false)

// En móvil, cerramos el menú lateral cada vez que cambia la ruta.
watch(
  () => route.fullPath,
  () => {
    sidebarOpen.value = false
  },
)
</script>

<template>
  <div class="app">
    <AppHeader v-model:open="sidebarOpen" />

    <div class="app__body container">
      <AppSidebar :open="sidebarOpen" @close="sidebarOpen = false" />

      <main id="contenido" class="app__main">
        <RouterView v-slot="{ Component, route: currentRoute }">
          <Transition name="page" mode="out-in">
            <component :is="Component" :key="currentRoute.path" />
          </Transition>
        </RouterView>
      </main>
    </div>

    <AppFooter />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app__body {
  display: grid;
  grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
  gap: 2rem;
  align-items: start;
  flex: 1 1 auto;
  padding-block: 1.75rem 3rem;
}

.app__main {
  min-width: 0; /* evita desbordes en grids/flex */
}

@media (max-width: 980px) {
  .app__body {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }
}
</style>
