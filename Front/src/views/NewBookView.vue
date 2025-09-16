<template>
<Header>

</Header>
  <form @submit.prevent="onSubmit">
    <!-- Feld für Name -->
    <label for="name" class="NAME">Name:</label>
    <input type="text" id="name" v-model="form.name" class="Buchname" />

    <!-- Feld für Autor -->
    <label for="author" class="AUTOR">Autor</label>
    <input type="text" id="author" v-model="form.author" class="Autorenname" />

    <!-- Feld für Genre -->
    <label for="genre" class="GENRE">Genre</label>
    <input type="text" id="genre" v-model="form.genre" class="Genrename" />

    <!-- Feld für ISBN -->
    <label for="isbn" class="ISBNNAME">ISBN</label>
    <input type="text" id="isbn" v-model="form.isbn" class="ISBNname" />

    <!-- Feld für Beschreibung -->
    <label for="beschreibung" class="BESCHR">Beschreibung</label><br />
    <textarea id="beschreibung" v-model="form.desc" class="Beschreibung" rows="15" cols="60"></textarea>

    <!-- Feld für Bewertung -->
    <label for="Bewertung" class="BEW">Bewertung</label>
    <input type="number" id="Bewertung" v-model.number="form.rating" class="Bew" />

    <!-- Button -->
    <button class="Erstellen" type="submit" :disabled="loading">
      {{ loading ? 'Erstelle…' : 'Erstellen' }}
    </button>

    <!-- Overlay -->
    <div id="overlay" v-show="showPopup" @click="closeFn"></div>

    <!-- Dialog -->
    <div id="popUpD" v-show="showPopup" role="dialog" aria-modal="true">
      <p>Du hast das Buch hinzugefügt!</p>
      <button type="button" @click="closeFn">Zurück</button>
    </div>

  </form>

  <PlaceholderPic></PlaceholderPic>
</template>


<script setup lang="ts">
import { ref, reactive } from 'vue'

const API_BASE = import.meta.env.VITE_API_BASE ?? 'https://books-1-1ljs.onrender.com/books' // 🔁 anpassen

const form = reactive({
  name: '',
  author: '',
  genre: '',
  isbn: '',
  desc: '',
  rating: undefined as number | undefined,
})

const loading = ref(false)
const showPopup = ref(false)
const error = ref<string | null>(null)

async function onSubmit() {
  error.value = null
  loading.value = true
  try {
    const res = await fetch(`${API_BASE}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // wenn Cookies/Session nötig: credentials: 'include',
      body: JSON.stringify({
        title: form.name,
        author: form.author,
        genre: form.genre,
        isbn: Number(form.isbn),
        desc: form.desc,
        rating: Number(form.rating),
      }),
    })

    if (!res.ok) {
      const msg = await safeText(res)
      throw new Error(`${res.status} ${res.statusText}${msg ? ` – ${msg}` : ''}`)
    }

    // Erfolg
    showPopup.value = true
    // optional: Felder leeren
    Object.assign(form, { name: '', author: '', genre: '', isbn: '', desc: '', rating: undefined })
    // optional: nach X Sekunden weiterleiten:
    // setTimeout(() => router.push('/books'), 1200)
  } catch (e:any) {
    error.value = e.message ?? 'Unbekannter Fehler'
  } finally {
    loading.value = false
  }
}

function closeFn() { showPopup.value = false }

// Hilfsfunktion: Antwort sicher lesen
async function safeText(res: Response) {
  try { return (await res.text()).slice(0, 300) } catch { return '' }
}

import Header from '@/components/Header.vue'
import PlaceholderPic from '@/components/PlaceholderPic.vue'
</script>


<style scoped>

.Buchname{
position: absolute;
  left:20%;
  top:35%;
}
.NAME{
  position: absolute;
  left:20%;
  top:32%;

}
.AUTOR{
  position: absolute;
  left: 20%;
  top:42%;
}
.Autorenname{
  position: absolute;
  left:20%;
  top:45%;
}
.GENRE{
  position: absolute;
  left:20%;
  top:53%;
}
.Genrename{
  position: absolute;
  left:20%;
  top:56%;
}
.ISBNNAME{
  position: absolute;
  left:20%;
  top:64%;
}
.ISBNname{
  position: absolute;
  left:20%;
  top:67%;
}
.BEW{
  position: absolute;
  left:20%;
  top:75%;
}
.Bew{
  position: absolute;
  left:20%;
  top:78%;
}
.BESCHR{
  position: absolute;
  left:35%;
  top:35%;
}
.Beschreibung{
  position: absolute;
  left:35%;
  top:38%;
}
.Erstellen{
  position: absolute;
  left:60%;
  top:75%;
}

#popUpD{

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
#overlay{

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

</style>
