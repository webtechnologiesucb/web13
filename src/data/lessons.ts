// src/data/lessons.ts
// Metadatos de la ruta de aprendizaje. El componente de cada lección se
// asocia en src/router/index.ts mediante importaciones dinámicas (lazy).

export type LessonLevel = 'Inicial' | 'Intermedio' | 'Avanzado'

export interface Lesson {
  /** Identificador estable (también se usa como último segmento de la URL). */
  id: string
  /** Posición dentro de la ruta de aprendizaje (1..N). */
  order: number
  title: string
  subtitle: string
  summary: string
  /** Conceptos de Vue/TS que se practican en la lección. */
  concepts: string[]
  level: LessonLevel
  /** Duración estimada en minutos. */
  duration: number
}

export const lessons: Lesson[] = [
  {
    id: '01-reactividad',
    order: 1,
    title: 'Reactividad esencial',
    subtitle: 'ref, computed, watch y directivas',
    summary:
      'El corazón de Vue: declarar estado reactivo con ref(), derivar valores con computed(), reaccionar a cambios con watch() y pintar el resultado con v-if, v-for, v-bind y v-on.',
    concepts: ['ref()', 'computed()', 'watch()', 'v-if / v-else', 'v-for', 'v-bind', 'v-on'],
    level: 'Inicial',
    duration: 25,
  },
  {
    id: '02-componentes',
    order: 2,
    title: 'Componentes, props y eventos',
    subtitle: 'Dividir la interfaz en piezas reutilizables',
    summary:
      'Convertimos la interfaz en componentes. Veremos cómo recibir datos con defineProps, comunicar hacia arriba con defineEmits y sincronizar valores con v-model (defineModel).',
    concepts: ['defineProps', 'defineEmits', 'defineModel', 'composición de componentes'],
    level: 'Inicial',
    duration: 30,
  },
  {
    id: '03-datos-asincronos',
    order: 3,
    title: 'Datos asíncronos',
    subtitle: 'fetch, ciclo de vida y estados de carga',
    summary:
      'Consumimos la API SWAPI: onMounted para lanzar la petición, fetch con AbortController, y el patrón de tres estados (cargando / error / vacío) que toda vista real necesita.',
    concepts: ['onMounted', 'fetch()', 'AbortController', 'estados loading/error', 'v-if encadenado'],
    level: 'Intermedio',
    duration: 35,
  },
  {
    id: '04-composables',
    order: 4,
    title: 'Composables',
    subtitle: 'Extraer y reutilizar lógica reactiva',
    summary:
      'La lógica de datos se repite en cada vista. La extraemos a composables reutilizables y tipados con genéricos: useAsyncData(), useDebouncedRef() y useSwapiList().',
    concepts: ['composables', 'useAsyncData', 'genéricos en TS', 'customRef'],
    level: 'Intermedio',
    duration: 35,
  },
  {
    id: '05-router',
    order: 5,
    title: 'Vue Router',
    subtitle: 'Navegación, rutas dinámicas y parámetros',
    summary:
      'Navegación entre vistas con RouterLink y useRouter, rutas con parámetros dinámicos (:id), lectura de la URL con useRoute y carga diferida (lazy) de los componentes de ruta.',
    concepts: ['createRouter', 'RouterLink', 'useRoute / useRouter', 'rutas dinámicas', 'lazy loading'],
    level: 'Intermedio',
    duration: 40,
  },
  {
    id: '06-estado-pinia',
    order: 6,
    title: 'Estado global con Pinia',
    subtitle: 'Compartir estado entre componentes',
    summary:
      'Los favoritos de la galaxia deben sobrevivir a la navegación. Creamos un store de Pinia con estado, getters y acciones, y lo persistimos en localStorage.',
    concepts: ['defineStore', 'setup stores', 'getters', 'acciones', 'persistencia'],
    level: 'Intermedio',
    duration: 35,
  },
  {
    id: '07-formularios',
    order: 7,
    title: 'Formularios y búsqueda',
    subtitle: 'v-model, filtrado y debounce',
    summary:
      'Entrada de texto con v-model, filtrado local con computed y una búsqueda contra la API con retardo (debounce) implementada con customRef para no saturar el servidor.',
    concepts: ['v-model', 'customRef', 'debounce', 'computed de filtro', 'query params'],
    level: 'Intermedio',
    duration: 35,
  },
  {
    id: '08-slots-provide',
    order: 8,
    title: 'Slots y provide/inject',
    subtitle: 'Composición de UI y dependencias',
    summary:
      'Construimos componentes contenedores flexibles con slots (por defecto, con nombre y con scope) y compartimos dependencias por el árbol con provide/inject, sin prop drilling.',
    concepts: ['slots', 'slots con nombre', 'scoped slots', 'provide / inject', 'InjectionKey'],
    level: 'Avanzado',
    duration: 30,
  },
  {
    id: '09-transiciones',
    order: 9,
    title: 'Transiciones y UX de carga',
    subtitle: 'Transition, TransitionGroup y Suspense',
    summary:
      'Animamos la aparición de elementos con <Transition> y listas con <TransitionGroup>, mostramos skeletons mientras llegan los datos y comparamos la carga asíncrona frente a Suspense.',
    concepts: ['<Transition>', '<TransitionGroup>', 'skeletons', 'Suspense', 'prefers-reduced-motion'],
    level: 'Avanzado',
    duration: 35,
  },
  {
    id: '10-rendimiento',
    order: 10,
    title: 'Rendimiento y buenas prácticas',
    subtitle: 'Optimizar renders y organizar el proyecto',
    summary:
      'Cierres: memoización con computed, evitar re-renders con v-once/v-memo, shallowRef para listas grandes, code splitting por ruta y una checklist para tus proyectos.',
    concepts: ['computed memoizado', 'v-once / v-memo', 'shallowRef', 'code splitting', 'checklist'],
    level: 'Avanzado',
    duration: 30,
  },
]

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id)
}

export function getAdjacentLessons(id: string): { previous?: Lesson; next?: Lesson } {
  const index = lessons.findIndex((lesson) => lesson.id === id)
  if (index === -1) return {}
  return {
    previous: index > 0 ? lessons[index - 1] : undefined,
    next: index < lessons.length - 1 ? lessons[index + 1] : undefined,
  }
}

export const totalDuration = lessons.reduce((sum, lesson) => sum + lesson.duration, 0)
