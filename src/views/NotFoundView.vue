<script setup lang="ts">
// 404: la ruta comodín captura cualquier URL no reconocida.
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="nf surface">
    <span class="nf__icon" aria-hidden="true">🛰️</span>
    <h1 class="nf__code">404</h1>
    <p class="muted">
      Esta ruta se perdió en el hiperespacio. La captura la ruta comodín
      <span class="inline-code">/:pathMatch(.*)*</span>.
    </p>
    <div class="row">
      <RouterLink class="btn btn--primary" :to="{ name: 'home' }">Volver al inicio</RouterLink>
      <RouterLink class="btn btn--ghost" :to="{ name: 'lesson-01-reactividad' }">
        Ir a la lección 01
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.nf {
  text-align: center;
  padding: 3rem 1.5rem;
}
.nf__icon {
  font-size: 3rem;
}
.nf__code {
  font-size: 3.5rem;
  margin: 0.2rem 0;
  color: var(--accent);
}
.nf .row {
  justify-content: center;
  margin-top: 1rem;
}
.btn {
  display: inline-flex;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid transparent;
}
.btn:hover {
  text-decoration: none;
  filter: brightness(1.06);
}
.btn--primary {
  background: var(--accent);
  color: var(--accent-contrast);
}
.btn--ghost {
  border-color: var(--border-strong);
  background: var(--surface-2);
  color: var(--text);
}
</style>
