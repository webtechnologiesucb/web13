// src/composables/useTheme.ts
// Tema claro/oscuro compartido con provide/inject (ver lección 08).
import { inject, provide, ref, watch, type InjectionKey, type Ref } from 'vue'

export type Theme = 'dark' | 'light'

export interface ThemeContext {
  theme: Ref<Theme>
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const STORAGE_KEY = 'web13-theme'

// Clave tipada: inject() sabrá qué forma tiene el valor inyectado.
const THEME_KEY: InjectionKey<ThemeContext> = Symbol('web13-theme')

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* localStorage no disponible */
  }
  return 'dark'
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
}

/**
 * Registra el contexto del tema en el árbol de componentes.
 * Debe llamarse una sola vez, en el componente raíz (App.vue).
 */
export function provideTheme(): ThemeContext {
  const theme = ref<Theme>(readStoredTheme())
  applyTheme(theme.value)

  watch(theme, (value) => {
    applyTheme(value)
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignora cuotas / modo privado */
    }
  })

  const context: ThemeContext = {
    theme,
    setTheme: (value) => {
      theme.value = value
    },
    toggleTheme: () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
    },
  }

  provide(THEME_KEY, context)
  return context
}

/** Consume el contexto del tema desde cualquier descendiente de App.vue. */
export function useTheme(): ThemeContext {
  const context = inject(THEME_KEY)
  if (!context) {
    throw new Error('useTheme() requiere que provideTheme() se haya llamado en un ancestro (App.vue).')
  }
  return context
}
