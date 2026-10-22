<script setup lang="ts">
// Botón base reutilizable. Los atributos nativos (class, @click, aria-*)
// caen al <button> por fallthrough de atributos.
withDefaults(
  defineProps<{
    variant?: 'primary' | 'accent' | 'ghost' | 'subtle' | 'danger'
    size?: 'sm' | 'md'
    type?: 'button' | 'submit' | 'reset'
    block?: boolean
    disabled?: boolean
  }>(),
  {
    variant: 'ghost',
    size: 'md',
    type: 'button',
    block: false,
    disabled: false,
  },
)
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--block': block }]"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  border: 1px solid var(--border-strong);
  background: var(--surface-2);
  color: var(--text);
  border-radius: 999px;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    background 0.15s ease,
    border-color 0.15s ease,
    opacity 0.15s ease;
}
.btn:hover:not(:disabled) {
  transform: translateY(-1px);
  border-color: var(--primary);
}
.btn:active:not(:disabled) {
  transform: translateY(0);
}
.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.btn--sm {
  padding: 0.3rem 0.75rem;
  font-size: 0.82rem;
}
.btn--md {
  padding: 0.5rem 1.05rem;
  font-size: 0.92rem;
}
.btn--block {
  width: 100%;
}

.btn--primary {
  background: var(--primary);
  border-color: var(--primary);
  color: #04121f;
}
.btn--accent {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--accent-contrast);
}
.btn--accent:hover:not(:disabled),
.btn--primary:hover:not(:disabled) {
  border-color: transparent;
  filter: brightness(1.06);
}
.btn--subtle {
  background: transparent;
  border-color: var(--border);
  color: var(--text-muted);
}
.btn--danger {
  background: var(--danger-soft);
  border-color: var(--danger);
  color: var(--danger);
}
</style>
