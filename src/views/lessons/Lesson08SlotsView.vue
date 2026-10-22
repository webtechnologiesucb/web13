<script setup lang="ts">
// Lección 08 · Slots y provide/inject
import { useTheme } from '@/composables/useTheme'

import ChallengeList from '@/components/lesson/ChallengeList.vue'
import LessonShell from '@/components/lesson/LessonShell.vue'
import DataList from '@/components/demo/DataList.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import CodeBlock from '@/components/ui/CodeBlock.vue'
import { getLesson } from '@/data/lessons'

const lesson = getLesson('08-slots-provide')!

// El tema se inyecta desde App.vue: este componente NO lo recibe por props.
const { theme, setTheme } = useTheme()

const crew = [
  { name: 'Din Djarin', role: 'Mandaloriano' },
  { name: 'Grogu', role: 'Padawan' },
  { name: 'Cara Dune', role: 'Mercenaria' },
]

const snippet = `<!-- BaseCard: contenedor con slots con nombre -->
<BaseCard>
  <template #header>Mi cabecera</template>
  Contenido por defecto
  <template #footer>Pie de tarjeta</template>
</BaseCard>

<!-- DataList: slot con scope (expone datos al padre) -->
<DataList :items="crew">
  <template #default="{ item, index }">
    {{ index + 1 }}. {{ item.name }} — {{ item.role }}
  </template>
</DataList>

<!-- provide/inject: evita pasar props por 5 niveles -->
// App.vue
provideTheme()
// cualquier descendiente
const { theme } = useTheme()`

const challenges = [
  'Añade un slot #actions a BaseCard para botones.',
  'Crea un componente Modal que reciba su contenido por slot por defecto.',
  'Haz que DataList muestre un encabezado distinto por slot con nombre.',
  'Sustituye el tema por props en un componente y compara el ruido generado.',
]
</script>

<template>
  <LessonShell :lesson="lesson">
    <div class="stack">
      <BaseCard
        title="Slots con nombre"
        subtitle="Un componente define los huecos; tú decides qué va en cada uno."
      >
        <template #header>
          <div class="row">
            <span aria-hidden="true">🧩</span>
            <h3 style="margin: 0">Slot #header personalizado</h3>
          </div>
        </template>

        <p class="muted">
          Este texto es el <strong>slot por defecto</strong>. La cabecera de arriba se inyectó
          por el slot <span class="inline-code">#header</span>.
        </p>

        <template #footer>
          <div class="row">
            <span class="dim">Slot #footer con acciones →</span>
            <BaseButton size="sm" variant="primary">Acción</BaseButton>
          </div>
        </template>
      </BaseCard>

      <BaseCard
        title="Slot con scope"
        subtitle="DataList itera y expone { item, index }; el padre decide el formato."
      >
        <DataList :items="crew">
          <template #default="{ item, index }">
            <span class="dim">{{ index + 1 }}.</span>
            <strong>{{ item.name }}</strong>
            <span class="muted"> — {{ item.role }}</span>
          </template>
        </DataList>
      </BaseCard>

      <BaseCard
        title="provide / inject"
        subtitle="Dependencia compartida sin 'prop drilling'."
      >
        <p class="muted">
          El tema actual es <strong>{{ theme }}</strong>. Lo provee
          <span class="inline-code">App.vue</span> y lo inyecta cualquier descendiente, incluida
          la cabecera del sitio y este mismo componente.
        </p>
        <div class="row">
          <BaseButton
            size="sm"
            :variant="theme === 'dark' ? 'primary' : 'subtle'"
            @click="setTheme('dark')"
          >
            🌙 Oscuro
          </BaseButton>
          <BaseButton
            size="sm"
            :variant="theme === 'light' ? 'primary' : 'subtle'"
            @click="setTheme('light')"
          >
            ☀️ Claro
          </BaseButton>
        </div>
      </BaseCard>
    </div>

    <template #code>
      <CodeBlock :code="snippet" title="Slots (con nombre y con scope) + provide/inject" />
    </template>

    <template #challenges>
      <ChallengeList :items="challenges" />
    </template>
  </LessonShell>
</template>
