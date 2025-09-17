<template>
  <section class="wrap">
    <h2 class="title">Bücher mit „{{ letter }}“</h2>

    <div v-if="loading" class="info">Lade Bücher…</div>
    <div v-else-if="error" class="error">Fehler: {{ error }}</div>

    <ul v-else class="list">
      <li v-if="filtered.length === 0" class="muted">Keine Bücher gefunden.</li>
      <li v-for="b in filtered" :key="b.id">
        <RouterLink :to="{ name: 'Buch', params: { id: b.id } }">
          {{ b.title }} <span class="by">– {{ b.author }}</span>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

type Book = {
  id: number | string
  title: string
  author: string
  genre?: string
  isbn?: number
  rating?: number
  desch?: string
}

const props = defineProps<{ letter: string }>()
const L = props.letter.toUpperCase()

const loading = ref(true)
const error = ref<string | null>(null)
const books = ref<Book[]>([])

// Prod (Render) absolute URL; lokal leer + Dev-Proxy
const API_BASE =
  (typeof window !== 'undefined' && window.location.hostname.endsWith('onrender.com'))
    ? 'https://books-1-1ljs.onrender.com'
    : ''

onMounted(load)

async function load(): Promise<void> {
  loading.value = true
  error.value = null
  try {
    const res = await fetch(`${API_BASE}/books`, { headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    const json = await res.json()
    books.value = Array.isArray(json) ? json : (json.data ?? json.books ?? [])
  } catch (e: any) {
    error.value = e?.message ?? 'Unbekannter Fehler'
  } finally {
    loading.value = false
  }
}

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const collator = new Intl.Collator('de', { sensitivity: 'base' })

function firstLetter(title: string): string {
  if (!title) return '#'
  const t = title.trim()
  if (!t) return '#'
  let ch = t[0]
  const map: Record<string, string> = { Ä: 'A', Ö: 'O', Ü: 'U', ä: 'A', ö: 'O', ü: 'U', ß: 'S' }
  ch = map[ch] ?? ch
  ch = ch.toUpperCase()
  return letters.includes(ch) ? ch : '#'
}

const filtered = computed(() =>
  books.value
    .filter((b) => firstLetter(b.title) === L)
    .slice()
    .sort((a, b) => collator.compare(a.title ?? '', b.title ?? ''))
)
</script>

<style scoped>
.wrap { padding: 1.25rem; }
.title { margin: .25rem 0 1rem; }
.info { padding: .5rem 0; }
.error { color: crimson; padding: .5rem 0; }
.list { display: grid; gap: .35rem; padding-left: 1rem; }
.muted { color: #777; list-style: none; padding-left: 0; }
.by { color: #666; font-weight: normal; }
</style>
