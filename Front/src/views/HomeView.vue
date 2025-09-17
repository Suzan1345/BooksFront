<template>
  <Header />

  <div class="Welcome">
    <h1>Durchstöbere die ganzen Bücher!</h1>
    <p>Herzlichen willkommen auf meiner Website!</p>
    <p>Hier findest du Bücher, ihre Beschreibungen und ihre Bewertungen.</p>
    <p>Du kannst sogar selber welche anlegen!</p>
    <p>Um anzufangen, klicke auf den Reiter link.</p>
    <p> <---- </p>
  </div>

<!--
  <div v-if="loading" style="padding:1rem">Lade Bücher…</div>
  <div v-else-if="error" style="padding:1rem; color:crimson">
    Fehler: {{ error }}
  </div>

  <template v-else>
    <p style="margin: .5rem 0; color:#666">
      Gefundene Bücher: {{ books.length }}
    </p>

    <ul class="books-list">
      <li v-if="!books.length" style="color:#777">
        Kein Buch gefunden. (Hast du schon eins angelegt?)
      </li>

      <li v-for="b in books" :key="b.id">
        <RouterLink :to="{ name: 'Buch', params: { id: b.id } }">
          {{ b.title }} – {{ b.author }}
        </RouterLink>
      </li>
    </ul>  -->

    <!-- Debug-Block: zeigt dir die Rohdaten
    <pre style="margin-top:1rem; background:#f7f7f7; padding:.75rem; overflow:auto;">
{{ books }}
    </pre>
  </template>-->


</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import PlaceholderPic from '@/components/PlaceholderPic.vue'
import { ref, onMounted } from 'vue'
/**
type Book = {
  id: number
  title: string
  author: string
  genre: string
  isbn: number
  desch: string
  rating: number
}

const loading = ref(true)
const error = ref<string | null>(null)
const books = ref<Book[]>([])


 * Minimal: lokal per Proxy '/books'
 * In Prod (Render) brauchst du die volle Backend-URL.
 * => Für den Test: wenn Host auf onrender endet, nutze deine Backend-URL.
 * (Das ist KEINE "API-Basis", nur ein if – super simpel.)

const API_BASE =
  (typeof window !== 'undefined' && window.location.hostname.endsWith('onrender.com'))
    ? 'https://books-1-1ljs.onrender.com' // <-- HIER deine Render-Backend-URL einsetzen
    : ''

onMounted(async () => {
  try {
    const url = `${API_BASE}/books`
    console.log('GET', url)
    const res = await fetch('https://books-1-1ljs.onrender.com/books', {
      headers: { Accept: 'application/json' },
    })

    if (!res.ok) throw new Error(`HTTP ${res.status} – ${res.statusText}`)
    books.value = await res.json()
  } catch (e: any) {
    console.error('Fehler beim Laden der Bücher:', e)
    error.value = e?.message ?? 'Unbekannter Fehler'
  } finally {
    loading.value = false
  }
})**/
</script>


<style scoped>
.books-list { position: relative; z-index: 1; }

/* Falls irgendwas (z.B. absolut positionierte Bilder) die Links überdeckt: */
a { position: relative; z-index: 2; }
/* deine Styles */
.star {
  position: absolute;
  top: 40%;
  left: 35%;
  height: 10vh;
}

.pink {
  position: absolute;
  top: 50%;
  left: 35%;
  height: 10vh;
}
.Welcome{
position: absolute;
  top:30%;
  left:500px;
  z-index: 1;

}
.books{
  position: absolute;
  top: 30%;
  right:19%;
  width: 70vh;
}

</style>
