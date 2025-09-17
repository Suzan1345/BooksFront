<template>
  <section class="wrap">
    <h1 class="title">{{ title ?? genre }}</h1>

    <div v-if="loading" class="info">Lade Bücher…</div>
    <div v-else-if="error" class="error">Fehler: {{ error }}</div>

    <ul v-else class="list">
      <li v-if="filtered.length === 0" class="muted">Keine Bücher gefunden.</li>

      <li v-for="b in filtered" :key="b.id">
        <RouterLink :to="{ name: 'Buch', params: { id: b.id } }" class="item">
          <span class="book">{{ b.title }}</span>
          <span class="by"> – {{ b.author }}</span>
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
  genre: string
  isbn?: number
  rating?: number
  desch?: string
}

const props = defineProps<{ genre: string; title?: string }>()

// Prod (Render) → absolute URL; Dev → Proxy (API_BASE = '')
const isRender =
  typeof window !== 'undefined' && window.location.hostname.endsWith('onrender.com')
const API_BASE = isRender ? 'https://books-1-1ljs.onrender.com' : ''

const loading = ref(true)
const error   = ref<string | null>(null)
const books   = ref<Book[]>([])

const collator = new Intl.Collator('de', { sensitivity: 'base' })

// robuster Genre-Vergleich (z. B. "Horror" matcht "Horrorbücher")
const norm = (s: string) =>
  (s ?? '').normalize('NFKD').toLowerCase().trim().replace(/[\u0300-\u036f]/g, '')

const filtered = computed(() => {
  const target = norm(props.genre)
  return books.value
    .filter(b => {
      const g = norm(b.genre)
      return g === target || g.startsWith(target)
    })
    .slice()
    .sort((a, b) => collator.compare(a.title ?? '', b.title ?? ''))
})

onMounted(async () => {
  loading.value = true
  error.value = null
  try {
    // WICHTIG: überall dasselbe API_BASE verwenden (kein harter URL-String)
    const res = await fetch(`${API_BASE}/books`, { headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    const json = await res.json()
    books.value = Array.isArray(json) ? json : (json.data ?? json.books ?? [])
    // Debug: verfügbare Genres anzeigen
    // console.log('Genres:', [...new Set(books.value.map(b => b.genre))])
  } catch (e: any) {
    error.value = e.message ?? 'Unbekannter Fehler'
  } finally {
    loading.value = false
  }
})
</script>


<style scoped>
.wrap  {
  position: absolute;
  top:23%;
  left:27%;
}
</style>
