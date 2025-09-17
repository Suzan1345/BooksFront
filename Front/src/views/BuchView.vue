<template>
  <Header />

  <section>
    <div v-if="loading" style="padding:1rem">Lade Buch…</div>
    <div v-else-if="error" style="padding:1rem; color:crimson">Fehler: {{ error }}</div>

    <div v-else-if="book" class="content">
      <img v-if="book.cover" class="PLACEHOLDER" :src="book.cover" alt="Buchcover" />

      <div class="BNAME"><p>{{ book.title }}</p></div>
      <div class="ANAME"><p>{{ book.author }}</p></div>
      <div class="GNAME"><p>{{ book.genre }}</p></div>
      <div class="ISBN"><p>{{ book.isbn }}</p></div>
      <div class="BEW"><p>{{ book.rating }}/10</p></div>
      <div class="BESCH"><p>{{ book.description }}</p></div>


      <pre style="margin-top:1rem; background:#f7f7f7; padding:.75rem; overflow:auto;">
{{ book }}
      </pre>
    </div>

    <div v-else style="padding:1rem">Kein Buch gefunden.</div>
  </section>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

type Book = {
  id: number | string
  title: string
  author: string
  genre: string
  isbn: number
  rating: number
  description: string
  cover?: string
  comments?: string[]
}

const loading = ref(true)
const error = ref<string | null>(null)
const book = ref<Book | null>(null)

// Kommentar-Status (NEU)
const submitting = ref(false)
const comment = ref('')

const route = useRoute()
const id = route.params.id as string | undefined

// Prod (Render) = absolute Backend-URL, lokal = leer (Proxy übernimmt)
const isRender =
  typeof window !== 'undefined' && window.location.hostname.endsWith('onrender.com')
const BACKEND = isRender ? 'https://books-1-1ljs.onrender.com' : '' // ggf. anpassen

async function fetchWithWake(url: string) {
  for (let i = 0; i < 3; i++) {
    const res = await fetch(url, { headers: { Accept: 'application/json' } })
    if (res.ok) return res
    if (res.status === 404) return res
    if (res.status === 502 || res.status === 504) {
      await new Promise(r => setTimeout(r, 1500))
      continue
    }
    return res
  }
  throw new Error('Backend schläft noch oder ist nicht erreichbar.')
}

// Buch laden (unverändert, nur TS-Rückgabetyp ergänzt)
onMounted(async (): Promise<void> => {
  try {
    if (!id) throw new Error('Keine Buch-ID in der URL.')
    const url = `${BACKEND}/books/${encodeURIComponent(id)}`
    const res = await fetchWithWake(url)

    if (res.status === 404) {
      error.value = `Buch mit ID ${id} nicht gefunden (404).`
      return
    }
    if (!res.ok) throw new Error(`HTTP ${res.status} – ${res.statusText}`)

    const api = (await res.json()) as {
      id: number | string
      title: string
      author: string
      genre: string
      isbn: number
      desch: string
      rating: number
      cover?: string
      comments?: string[]
    }

    book.value = {
      id: api.id,
      title: api.title,
      author: api.author,
      genre: api.genre,
      isbn: api.isbn,
      rating: api.rating,
      description: api.desch, // Backend-Feldname "desch"
      cover: api.cover,
      comments: api.comments ?? []
    }
  } catch (e: any) {
    error.value = e?.message ?? 'Unbekannter Fehler beim Laden.'
  } finally {
    loading.value = false
  }
})


</script>

<style scoped>
.BNAME{ position: absolute; left:28%; top:30%; }
.ANAME{ position: absolute; left:28%; top:42%; }
.GNAME{ position: absolute; left:28%; top:53%; }
.ISBN{ position: absolute; left:28%; top:64%; }
.BEW{  position: absolute; left:28%; top:75%; }
.BESCH{ position: absolute; left:35%; top:35%; }
.Kommentare{ position: absolute; left:20%; top:79%; }
@media (max-width: 900px) {

}

</style>
