<script setup lang="ts">
// Pie de página con créditos y enlaces de referencia.
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p class="dim">
        Showcase didáctico de <strong>Vue 3 + Vite + TypeScript</strong>. Datos de
        <a href="https://swapi.dev" target="_blank" rel="noopener">SWAPI</a> · hecho para aprender.
      </p>
      <p class="dim footer__links">
        <a href="https://vuejs.org" target="_blank" rel="noopener">Vue</a> ·
        <a href="https://router.vuejs.org" target="_blank" rel="noopener">Vue Router</a> ·
        <a href="https://pinia.vuejs.org" target="_blank" rel="noopener">Pinia</a> ·
        <a href="https://vite.dev" target="_blank" rel="noopener">Vite</a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding-block: 1.25rem;
  margin-top: 2rem;
  background: color-mix(in srgb, var(--bg) 85%, transparent);
}
.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.footer p {
  margin: 0;
  font-size: 0.82rem;
}
</style>
