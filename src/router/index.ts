// src/router/index.ts
// Vue Router (lección 05): rutas de la ruta de aprendizaje, explorador SWAPI
// y páginas auxiliares. Todas las vistas se cargan de forma diferida (lazy):
// el navegador sólo descarga el código de la página que visita.
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Ruta de aprendizaje' },
  },

  // --- Ruta de aprendizaje -------------------------------------------------
  {
    path: '/lecciones/01-reactividad',
    name: 'lesson-01-reactividad',
    component: () => import('@/views/lessons/Lesson01ReactivityView.vue'),
    meta: { title: 'Reactividad esencial' },
  },
  {
    path: '/lecciones/02-componentes',
    name: 'lesson-02-componentes',
    component: () => import('@/views/lessons/Lesson02ComponentsView.vue'),
    meta: { title: 'Componentes, props y eventos' },
  },
  {
    path: '/lecciones/03-datos-asincronos',
    name: 'lesson-03-datos-asincronos',
    component: () => import('@/views/lessons/Lesson03AsyncDataView.vue'),
    meta: { title: 'Datos asíncronos' },
  },
  {
    path: '/lecciones/04-composables',
    name: 'lesson-04-composables',
    component: () => import('@/views/lessons/Lesson04ComposablesView.vue'),
    meta: { title: 'Composables' },
  },
  {
    path: '/lecciones/05-router',
    name: 'lesson-05-router',
    component: () => import('@/views/lessons/Lesson05RouterView.vue'),
    meta: { title: 'Vue Router' },
  },
  {
    path: '/lecciones/06-estado-pinia',
    name: 'lesson-06-estado-pinia',
    component: () => import('@/views/lessons/Lesson06StateView.vue'),
    meta: { title: 'Estado global con Pinia' },
  },
  {
    path: '/lecciones/07-formularios',
    name: 'lesson-07-formularios',
    component: () => import('@/views/lessons/Lesson07FormsView.vue'),
    meta: { title: 'Formularios y búsqueda' },
  },
  {
    path: '/lecciones/08-slots-provide',
    name: 'lesson-08-slots-provide',
    component: () => import('@/views/lessons/Lesson08SlotsView.vue'),
    meta: { title: 'Slots y provide/inject' },
  },
  {
    path: '/lecciones/09-transiciones',
    name: 'lesson-09-transiciones',
    component: () => import('@/views/lessons/Lesson09TransitionsView.vue'),
    meta: { title: 'Transiciones y UX de carga' },
  },
  {
    path: '/lecciones/10-rendimiento',
    name: 'lesson-10-rendimiento',
    component: () => import('@/views/lessons/Lesson10PerformanceView.vue'),
    meta: { title: 'Rendimiento y buenas prácticas' },
  },

  // --- Explorador SWAPI ----------------------------------------------------
  {
    path: '/:resource(people|planets|films|starships|species)',
    name: 'resource-list',
    component: () => import('@/views/ResourceListView.vue'),
  },
  {
    path: '/:resource(people|planets|films|starships|species)/:id',
    name: 'resource-detail',
    component: () => import('@/views/ResourceDetailView.vue'),
  },

  // --- Otros ---------------------------------------------------------------
  {
    path: '/favoritos',
    name: 'favorites',
    component: () => import('@/views/FavoritesView.vue'),
    meta: { title: 'Favoritos' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Página no encontrada' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

// Título del documento a partir de meta.title.
router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Vue 3 + SWAPI'
  document.title = `${title} · Ruta de aprendizaje Vue`
})

export default router
