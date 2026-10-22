<script setup lang="ts">
// Bloque de código con botón "copiar". El contenido se pinta con v-text,
// por lo que el HTML se escapa automáticamente.
import { ref } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps<{
  code: string
  title?: string
  lang?: string
}>()

const copied = ref(false)

async function copy(): Promise<void> {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 1500)
  } catch {
    /* el portapapeles puede no estar disponible según el contexto */
  }
}
</script>

<template>
  <figure class="code">
    <figcaption class="code__bar">
      <span class="code__title">{{ title ?? lang ?? 'código' }}</span>
      <BaseButton size="sm" variant="subtle" @click="copy">
        {{ copied ? '✓ Copiado' : 'Copiar' }}
      </BaseButton>
    </figcaption>
    <pre class="code__pre"><code v-text="code" /></pre>
  </figure>
</template>

<style scoped>
.code {
  margin: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  background: #060a18;
}
:root[data-theme='light'] .code {
  background: #0d1117;
}
.code__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.45rem 0.6rem 0.45rem 0.9rem;
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
}
.code__title {
  font-family: var(--font-mono);
  font-size: 0.76rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-dim);
}
.code__pre {
  margin: 0;
  padding: 1rem 1.1rem;
  overflow-x: auto;
  font-size: 0.84rem;
  line-height: 1.65;
  color: #d7e0ff;
}
</style>
