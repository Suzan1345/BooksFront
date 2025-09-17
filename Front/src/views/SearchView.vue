<template>
  <div class="page">
    <Header />

    <h1 class="Über">Suche:</h1>


    <!-- Suche -->
    <form @submit.prevent="onSubmit">
      <label for="suche" class="SUCHE"></label>
      <input
        type="text"
        id="suche"
        class="suche"
        v-model="form.name"
        placeholder="Buchtitel"
      />
      <button class="search" type="submit" :disabled="loading">
        {{ loading ? 'Lade…' : 'Suchen' }}
      </button>
    </form>



    <ul class="books-list"> <!--
      <li v-if="!loading && !error && books.length === 0" style="color:#777">
        Kein Buch gefunden. (Hast du schon eins angelegt?)
      </li> -->

      <li v-for="b in books" :key="b.id">
        <RouterLink :to="{ name: 'Buch', params: { id: b.id } }">
          {{ b.title }} – {{ b.author }}
        </RouterLink>
      </li>
    </ul>
    </div>
    <!-- Beispiel: Erstellen (POST) -->
    <button class="Erstellen" type="button" @click="createBook" :disabled="loading">
      {{ loading ? 'Speichere…' : 'Erstellen' }}
    </button>

    <p v-if="error" class="error">⚠️ {{ error }}</p>

</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Header from '@/components/Header.vue'
import { RouterLink } from 'vue-router' // optional, gut für Type-Checks

type Book = {
  id: string|number
  title: string
  author: string
  genre?: string
  isbn?: number|string
  desch?: string
  rating?: number
}

const API_BASE = import.meta.env.VITE_API_BASE ?? 'https://books-1-1ljs.onrender.com'

const form = reactive({
  name: '',
  author: '',
  genre: '',
  isbn: '',
  desch: '',
  rating: undefined as number | undefined,
})

const loading = ref(false)
const error = ref<string | null>(null)
const books = ref<Book[]>([]) // <-- HIER anlegen

async function onSubmit() {
  error.value = null
  loading.value = true
  try {
    const url = new URL(`${API_BASE}/books`)
    if (form.name.trim()) url.searchParams.set('title', form.name.trim())

    const res = await fetch(url.toString(), { method: 'GET' })
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)

    const json = await res.json()
    // Robust: akzeptiere Array oder Objekte mit Feld 'books'/'data'
    const list = Array.isArray(json) ? json : (json.books ?? json.data ?? [])
    if (!Array.isArray(list)) throw new Error('Unerwartetes Antwortformat')
    books.value = list
  } catch (e: any) {
    error.value = e?.message ?? 'Unbekannter Fehler'
  } finally {
    loading.value = false
  }
}

async function createBook() {
  error.value = null
  loading.value = true
  try {
    const payload = {
      title: form.name,
      author: form.author,
      genre: form.genre,
      isbn: form.isbn ? Number(form.isbn) : undefined,
      desch: form.desch,
      rating: form.rating != null ? Number(form.rating) : undefined,
    }

    const res = await fetch(`${API_BASE}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)
    const created: Book = await res.json()

    // Optional: neu erstelltes Buch in die Liste schieben
    books.value.unshift(created)
  } catch (e: any) {
    error.value = e?.message ?? 'Unbekannter Fehler'
  } finally {
    loading.value = false
  }
}
</script>




<style scoped>

 .text{
   position: absolute;
   top: 30%;
   left: 30%;
 }
 .Erstellen{
   position: absolute;
   top:70%;
   left:30%;
   background-color: #bd9f3e;
   border-radius: 20%;
   padding: 1%;
   border-color: #bd9f3e;
   cursor: pointer;
 }
 .Über{
   position: absolute;
   top:25%;
   left:30%;
   color: #664e2f;
   font-family: "Times New Roman";
   animation: reverse;
   animation-duration: 3s;
   animation-delay: 2s;

 }


 .suche{
   position: absolute;
   top:40%;
   left:30%;
   border-radius: 10%;
   animation: forwards;

 }
 .search{
   position:absolute;
   top:50%;
   left:30%;
   background-color: #bd9f3e;
   border-radius: 20%;
   padding: 1%;
   border-color: #bd9f3e;
   cursor: pointer;
 }


 </style>
