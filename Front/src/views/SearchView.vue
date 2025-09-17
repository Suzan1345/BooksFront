<template>
  <Header />

  <form @submit.prevent="onSubmit">
    <label for="suche" class="SUCHE"></label>
    <input id="suche" class="suche" v-model="form.name" placeholder="Buchtitel" />
    <button class="search" type="submit">{{ loading ? 'Lade…' : 'Suchen' }}</button>
  </form>

  <p v-if="loading">Lade…</p>
  <p v-else-if="error" class="error">Fehler: {{ error }}</p>

  <!-- Ergebnisliste erst nach einer Suche anzeigen -->
  <ul class="books-list" v-else-if="hasSearched">
    <li v-if="books.length === 0" class="muted">Kein Buch gefunden.</li>
    <li v-for="b in books" :key="b.id">
      <RouterLink :to="{ name: 'Buch', params: { id: b.id } }">
        {{ b.title }} – {{ b.author }}
      </RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import { ref, reactive } from 'vue'

type Book = {
  id: number | string
  title: string
  author: string
  genre?: string
  isbn?: number | string
  desch?: string
  rating?: number
}

/** Einheitliche API-URL für Dev/Prod */
const API_BASE =
  import.meta.env.VITE_API_BASE ??
  (typeof window !== 'undefined' && window.location.hostname.endsWith('onrender.com')
    ? 'https://books-1-1ljs.onrender.com'
    : '')

const form = reactive({ name: '' })
const loading = ref(false)
const error = ref<string | null>(null)
const books = ref<Book[]>([])     // <-- HIER definiert
const hasSearched = ref(false)    // Liste erst nach erster Suche zeigen

async function onSubmit() {
  error.value = null
  hasSearched.value = true

  const q = form.name.trim()
  if (!q) { books.value = []; return }

  loading.value = true
  try {
    let requestUrl: string

    if (API_BASE) {
      // Absoluter Host vorhanden → URL-Objekt verwenden
      const u = new URL('/books', API_BASE) // base + Pfad sicher zusammenbauen
      u.searchParams.set('title', q)        // oder 'genre', wenn Backend nur genre filtert
      requestUrl = u.toString()
    } else {
      // Dev/Proxy → relativer String
      requestUrl = `/books?title=${encodeURIComponent(q)}`
      // falls Backend nur 'genre' unterstützt: `/books?genre=${encodeURIComponent(q)}`
    }

    const res = await fetch(requestUrl, { method: 'GET' })
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`)

    const json = await res.json()
    books.value = Array.isArray(json) ? json : (json.books ?? json.data ?? [])
  } catch (e:any) {
    error.value = e.message ?? 'Unbekannter Fehler'
    books.value = []
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
   top:22%;
   left:23%;
   color: #664e2f;
   font-family: "Times New Roman";
   animation: reverse;
   animation-duration: 3s;
   animation-delay: 2s;
   font-size: 400%;

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
   top:38%;
   left:45%;
   background-color: #bd9f3e;
   border-radius: 20%;
   padding: 1%;
   border-color: #bd9f3e;
   cursor: pointer;
 }
 .SUCHE{
   position: absolute;
   top:40%;
   left:30%;
   border-radius: 10%;
   animation: forwards;
 }
 .books-list{
   position: absolute;
   top:45%;
   left:28%;
   border-radius: 10%;
   animation: forwards;
 }


 </style>
