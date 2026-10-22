<script setup lang="ts">
// Lección 05 · Vue Router: navegación, parámetros y rutas dinámicas
import { computed, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import ChallengeList from '@/components/lesson/ChallengeList.vue'
import LessonShell from '@/components/lesson/LessonShell.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import CodeBlock from '@/components/ui/CodeBlock.vue'
import { getLesson } from '@/data/lessons'

const lesson = getLesson('05-router')!

const route = useRoute()
const router = useRouter()

const targetId = ref('1')

const routeInfo = computed(() => ({
  path: route.path,
  name: String(route.name ?? '—'),
  params: JSON.stringify(route.params),
  query: JSON.stringify(route.query),
}))

function openPerson(): void {
  // Navegación programática a una ruta con parámetros.
  void router.push({ name: 'resource-detail', params: { resource: 'people', id: targetId.value } })
}

const snippet = `// routes: rutas dinámicas con parámetro :id
{ path: '/:resource(people|planets|films|starships|species)/:id',
  name: 'resource-detail',
  component: () => import('@/views/ResourceDetailView.vue') }

// En un componente: leer la URL
const route = useRoute()
const id = computed(() => String(route.params.id))

// Navegar
const router = useRouter()
router.push({ name: 'resource-detail', params: { resource: 'people', id: 1 } })`

const challenges = [
  'Añade un enlace <RouterLink> a cada personaje de la lección 03.',
  'Usa route.query para leer ?page=2 y pasarlo a useSwapiList.',
  'Crea una ruta /about con su propio meta.title y comprueba el título.',
  'Investiga el guard onBeforeRouteLeave para confirmar cambios sin guardar.',
]
</script>

<template>
  <LessonShell :lesson="lesson">
    <div class="stack">
      <section class="panel surface">
        <h3>Dónde estás ahora</h3>
        <p class="muted">
          <span class="inline-code">useRoute()</span> es una ref reactiva con la ruta actual.
        </p>
        <dl class="info">
          <div><dt>path</dt><dd>{{ routeInfo.path }}</dd></div>
          <div><dt>name</dt><dd>{{ routeInfo.name }}</dd></div>
          <div><dt>params</dt><dd>{{ routeInfo.params }}</dd></div>
          <div><dt>query</dt><dd>{{ routeInfo.query }}</dd></div>
        </dl>
      </section>

      <section class="panel surface">
        <h3>Navegación declarativa (RouterLink)</h3>
        <div class="row">
          <RouterLink class="chip" :to="{ name: 'resource-list', params: { resource: 'people' } }">
            🧑‍🚀 Personajes
          </RouterLink>
          <RouterLink class="chip" :to="{ name: 'resource-list', params: { resource: 'planets' } }">
            🪐 Planetas
          </RouterLink>
          <RouterLink class="chip" :to="{ name: 'resource-list', params: { resource: 'films' } }">
            🎬 Películas
          </RouterLink>
          <RouterLink class="chip" :to="{ name: 'resource-detail', params: { resource: 'people', id: '1' } }">
            Luke Skywalker (people/1)
          </RouterLink>
        </div>
      </section>

      <section class="panel surface">
        <h3>Navegación programática (useRouter)</h3>
        <p class="muted">Escribe un id y navega a esa ficha.</p>
        <div class="row">
          <input v-model="targetId" class="input" type="number" min="1" max="83" />
          <BaseButton variant="primary" size="sm" @click="openPerson">
            Ir a /people/{{ targetId }}
          </BaseButton>
        </div>
      </section>

      <section class="note surface">
        <h3>🌙 Carga diferida (lazy loading)</h3>
        <p class="muted">
          Cada vista se importa con <span class="inline-code">() =&gt; import(...)</span>. Vite
          genera un archivo JavaScript por página y sólo lo descarga cuando la visitas.
        </p>
      </section>
    </div>

    <template #code>
      <CodeBlock :code="snippet" title="Rutas dinámicas + navegación" />
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
.info {
  margin: 0;
  display: grid;
  gap: 0.4rem;
}
.info > div {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 0.75rem;
  align-items: baseline;
}
.info dt {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-dim);
}
.info dd {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  word-break: break-all;
}
.chip {
  display: inline-flex;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  border: 1px solid var(--border-strong);
  background: var(--surface-2);
  color: var(--text);
  text-decoration: none;
  font-size: 0.88rem;
}
.chip:hover {
  border-color: var(--primary);
  text-decoration: none;
}
.input {
  width: 90px;
  padding: 0.45rem 0.6rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-strong);
  background: var(--surface-2);
  color: var(--text);
  font: inherit;
}
.note {
  padding: 1.15rem;
  border-left: 3px solid var(--primary);
}
.note h3 {
  margin-top: 0;
}
</style>
