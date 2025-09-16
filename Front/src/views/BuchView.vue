<!-- src/views/BuchView.vue -->
<template>
  <Header />

  <!-- Zustände -->
  <div v-if="loading" style="padding:1rem">Lade Buch…</div>
  <div v-else-if="error" style="padding:1rem; color:crimson">Fehler: {{ error }}</div>

  <!-- Inhalt -->
  <template v-else-if="book">
    <!-- Cover nur anzeigen, wenn du später eins hast -->
    <img
      v-if="book.cover"
      class="PLACEHOLDER"
      :src="book.cover"
      alt="Buchcover"
    />

    <div class="BNAME">
      <p>{{ book.title }}</p>
    </div>

    <div class="ANAME">
      <p>{{ book.author }}</p>
    </div>

    <div class="GNAME">
      <p>{{ book.genre }}</p>
    </div>

    <div class="ISBN">
      <p>{{ book.isbn }}</p>
    </div>

    <div class="BEW">
      <p>{{ book.rating }}/10</p>
    </div>

    <div class="BESCH">
      <p>{{ book.description }}</p>
    </div>

    <div class="Kommentare">
      <template v-if="book.comments && book.comments.length">
        <p v-for="(comment, i) in book.comments" :key="i">💬 {{ comment }}</p>
      </template>
      <p v-else>Keine Kommentare vorhanden.</p>
    </div>
  </template>

  <div v-else style="padding:1rem">Kein Buch gefunden.</div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

/**
 * Frontend-Typ (schöner benannt):
 * - isbn ist Zahl (weil Backend Long sendet)
 * - description statt "desch"
 * - cover/comments optional für später
 */
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

const route = useRoute()
const idFromRoute = route.params.id as string | undefined

onMounted(async () => {
  try {
    // WICHTIG: dein Backend liefert unter /books (ohne /api)
    const url = idFromRoute
      ? `/books/${encodeURIComponent(idFromRoute)}`
      : `/books/only`

    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      // credentials: 'include' // nur falls du Cookies/Sessions brauchst
    })

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} – ${res.statusText}`)
    }

    // Backend-Form: ModelBooks -> { id, title, author, genre, isbn, desch, rating }
    const api = await res.json() as {
      id: number | string
      title: string
      author: string
      genre: string
      isbn: number
      desch: string
      rating: number
      // evtl. weitere Felder ignorieren
    }

    // In hübschen Frontend-Typ mappen (desch -> description)
    book.value = {
      id: api.id,
      title: api.title,
      author: api.author,
      genre: api.genre,
      isbn: api.isbn,
      rating: api.rating,
      description: api.desch,
      // cover/comments kannst du später nachrüsten
    }
  } catch (e: any) {
    error.value = e?.message ?? 'Unbekannter Fehler beim Laden.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.BNAME{
  position: absolute;
  left:20%;
  top:35%;
}

.ANAME{
  position: absolute;
  left: 20%;
  top:42%;
}

.GNAME{
  position: absolute;
  left:20%;
  top:53%;
}

.ISBN{
  position: absolute;
  left:20%;
  top:64%;
}

.BEW{
  position: absolute;
  left:20%;
  top:75%;
}

.BESCH{
  position: absolute;
  left:35%;
  top:35%;
}
.Kommentare{
  position: absolute;
  left:20%;
  top:79%;
}

/* Optional: kleines Responsive-Feintuning */
@media (max-width: 900px) {
  .BESCH { left: 20%; top: 85%; max-width: 70%; }
}
</style>
