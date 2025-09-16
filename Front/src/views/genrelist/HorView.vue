<!-- src/views/HorrorView.vue -->
<template>
  <Header />

  <ul class="books-list">
    <li v-if="loading" style="padding:1rem">Lade Horror-Bücher…</li>
    <li v-else-if="error" style="padding:1rem;color:crimson">Fehler: {{ error }}</li>
    <template v-else>
      <li v-if="!filtered.length" style="color:#777">Keine Horror-Bücher gefunden.</li>
      <li v-for="b in filtered" :key="b.id">
        <RouterLink :to="{ name: 'Buch', params: { id: b.id } }">
          {{ b.title }} – {{ b.author }}
        </RouterLink>
      </li>
    </template>
  </ul>

</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import { ref, computed, onMounted } from 'vue'

type Book = {
  id: number | string
  title: string
  author: string
  genre: string
  isbn: number
  desch: string
  rating: number
}

const loading = ref(true)
const error = ref<string|null>(null)
const books = ref<Book[]>([])

// Prod: volle Render-URL, lokal: leer (Vite-Proxy greift)
const isRender = typeof window !== 'undefined' && window.location.hostname.endsWith('onrender.com')
const BASE = isRender ? 'https://books-1-1ljs.onrender.com' : ''

// Horror-Filter (case-insensitive; matcht auch "Horrorbücher")
const filtered = computed(() =>
  books.value.filter(b => (b.genre ?? '').toLowerCase().includes('horror'))
)

async function fetchBooks() {
  // Versuch 1: "normale" URL (lokal per Proxy, prod direkt)
  const res = await fetch(`${BASE}/books?genre=horror`, {
    headers: { Accept: 'application/json' },
  })
  if (res.ok) return res.json()

  // Bei Cold-Start/404 auf Render einmal kurz warten & nochmal probieren
  if (isRender && [404, 502, 504].includes(res.status)) {
    await new Promise(r => setTimeout(r, 1200))
    let res = await fetch(`${BASE}/books`, { headers: { Accept: 'application/json' } })
    if (res.ok) return res.json()
  }

  // Fehlertext anzeigen
  const txt = await res.text().catch(() => '')
  throw new Error(`HTTP ${res.status} – ${res.statusText}${txt ? `\n${txt}` : ''}`)
}

onMounted(async () => {
  try {
    books.value = await fetchBooks()
  } catch (e:any) {
    console.error(e)
    error.value = e?.message ?? 'Unbekannter Fehler'
  } finally {
    loading.value = false
  }
})
</script>


<style scoped>
.books-list { position: relative; z-index: 2; margin-top: 1rem; }
/* Achtung: in deinem CSS war einmal "Position" großgeschrieben – muss klein sein */
</style>
