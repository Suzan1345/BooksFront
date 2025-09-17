<template>
  <Header />

  <section v-if="book" class="book-details">

    <div class="BNAME">
      <h2 class="buchtitel">Buchtitel:</h2>
      <p>{{ book.title }}</p>
    </div>

    <div class="ANAME">
      <h2 class="Autor">Autor:</h2>
      <p>{{ book.author }}</p>
    </div>

    <div class="GNAME">
      <h2 class="Genre">Genre:</h2>
      <p>{{ book.genre }}</p>
    </div>

    <div class="ISBN">
      <h2 class="ISBN-Label">ISBN:</h2>
      <p>{{ book.isbn }}</p>
    </div>

    <div class="BEW">
      <h2 class="Bewe">Bewertung:</h2>
      <p>{{ book.rating }}/10</p>
    </div>

    <div class="BESCH">
      <h2 class="besch">Beschreibung:</h2>
      <p>{{ book.desch }}</p>
    </div>

  </section>

  <div v-else-if="loading" class="info">Lade Buch…</div>
  <div v-else-if="error" class="error">⚠️ {{ error }}</div>
  <div v-else class="info">Kein Buch gefunden.</div>
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
  desch: string
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
      desch: api.desch, // Backend-Feldname "desch"
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
.BNAME{ position: absolute; left:28%; top:23%; color: #664e2f}
.ANAME{ position: absolute; left:28%; top:35%;color: #664e2f }
.GNAME{ position: absolute; left:28%; top:48%; color: #664e2f}
.ISBN{ position: absolute; left:28%; top:61%;color: #664e2f }
.BEW{  position: absolute; left:28%; top:72%; color: #664e2f }
.BESCH{ position: absolute; left:50%; top:23%;color: #664e2f }
.Kommentare{ position: absolute; left:20%; top:79%;color: #664e2f }
@media (max-width: 900px) {

.buchtitel{position: absolute; left:70px;top:17%}
.Autor{position: absolute; left:28%; top:25%}
.Genre{position: absolute;left:28%;top:23%}
.ISBN{}
.Bewe{}
.besch{}
}

</style>
