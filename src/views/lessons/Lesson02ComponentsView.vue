<script setup lang="ts">
// Lección 02 · Componentes, props y eventos
import { ref } from 'vue'

import ChallengeList from '@/components/lesson/ChallengeList.vue'
import LessonShell from '@/components/lesson/LessonShell.vue'
import DataList from '@/components/demo/DataList.vue'
import LikeButton from '@/components/demo/LikeButton.vue'
import RatingStars from '@/components/demo/RatingStars.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import CodeBlock from '@/components/ui/CodeBlock.vue'
import { getLesson } from '@/data/lessons'

const lesson = getLesson('02-componentes')!

type BadgeVariant = 'default' | 'accent' | 'primary' | 'success' | 'danger'
const variants: BadgeVariant[] = ['default', 'accent', 'primary', 'success', 'danger']
const variant = ref<BadgeVariant>('accent')

// El hijo emite 'like'; el estado vive en el padre.
const likes = ref(0)

// v-model: el padre es dueño del dato y lo sincroniza con RatingStars.
const rating = ref(3)

const characters = ref([
  { name: 'Leia Organa', affiliation: 'Alianza Rebelde' },
  { name: 'Han Solo', affiliation: 'Alianza Rebelde' },
  { name: 'Darth Vader', affiliation: 'Imperio Galáctico' },
])

const snippet = `<!-- Hijo: declara sus props y lo que emite -->
<script setup lang="ts">
const props = defineProps<{ label: string; count?: number }>()
const emit = defineEmits<{ (e: 'like'): void }>()
<\/script>

<!-- Padre: pasa datos y escucha eventos -->
<LikeButton label="Me gusta" :count="likes" @like="likes++" />

<!-- v-model en componentes: azúcar de prop + evento -->
<RatingStars v-model="rating" :max="5" />`

const challenges = [
  'Crea un componente <Tag /> que reciba color y texto como props.',
  'Añade una prop `disabled` a LikeButton y desactiva el botón.',
  'Usa defineModel para construir un <Toggle /> de sí/no.',
  'Refactoriza la lista de personajes a un componente <CharacterChip />.',
]
</script>

<template>
  <LessonShell :lesson="lesson">
    <div class="stack">
      <BaseCard title="1 · Props: datos que bajan" subtitle="Un componente recibe datos por props (sólo lectura).">
        <p class="muted">
          El componente <span class="inline-code">BaseBadge</span> recibe la prop
          <span class="inline-code">variant</span>, que aquí controlamos desde un
          <span class="inline-code">select</span> reactivo.
        </p>
        <div class="row">
          <select v-model="variant" class="input">
            <option v-for="option in variants" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
          <BaseBadge :variant="variant">Insignia {{ variant }}</BaseBadge>
        </div>
      </BaseCard>

      <BaseCard title="2 · Eventos: datos que suben" subtitle="El hijo notifica; el padre decide qué hacer (emit).">
        <p class="muted">
          <span class="inline-code">LikeButton</span> recibe su conteo por prop y emite
          <span class="inline-code">like</span>. El estado se actualiza en este componente padre.
        </p>
        <div class="row">
          <LikeButton label="Me gusta la galaxia" :count="likes" @like="likes++" />
          <span class="muted">likes = {{ likes }}</span>
        </div>
      </BaseCard>

      <BaseCard
        title="3 · v-model en componentes (defineModel)"
        subtitle="Sincronización bidireccional sin escribir props + emits a mano."
      >
        <p class="muted">Valor actual: <strong>{{ rating }}</strong></p>
        <RatingStars v-model="rating" :max="5" />
      </BaseCard>

      <BaseCard title="Bonus · Composición con slot con scope" subtitle="DataList genera el bucle; tú decides cómo pintar cada item.">
        <DataList :items="characters">
          <template #default="{ item, index }">
            <span class="dim">{{ index + 1 }}.</span>
            <strong>{{ item.name }}</strong>
            <span class="muted"> — {{ item.affiliation }}</span>
          </template>
        </DataList>
      </BaseCard>
    </div>

    <template #code>
      <CodeBlock :code="snippet" title="Props, eventos y defineModel" />
    </template>

    <template #challenges>
      <ChallengeList :items="challenges" />
    </template>
  </LessonShell>
</template>

<style scoped>
.input {
  padding: 0.45rem 0.7rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-strong);
  background: var(--surface-2);
  color: var(--text);
  font: inherit;
}
</style>
