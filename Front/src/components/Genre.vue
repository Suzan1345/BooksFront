<template>
  <section class="wrap">
    <h1 class="title">{{ title ?? genre }}</h1>

    <div v-if="loading" class="info">Lade Bücher…</div>
    <div v-else-if="error" class="error">Fehler: {{ error }}</div>

    <ul v-else class="list">
      <li v-if="filtered.length === 0" class="muted">Keine Bücher gefunden.</li>
      <li v-for="b in filtered" :key="b.id">
        <RouterLink :to="{ name: 'Buch', params: { id: b.id } }" class="item">
          <span class="title">{{ b.title }}</span>
          <span class="by"> – {{ b.author }}</span>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

type Book = { id: number|string; title: string; author: string; genre: string }

const props = defineProps<{ genre: string; title?: string }>()

const loading = ref(true)
const error   = ref<string|null>(null)
const books   = ref<Book[]>([])

const isRender = typeof window !== 'undefined' && window.location.hostname.endsWith('onrender.com')
const BACKEND  = isRender ? 'https://books-1-1ljs.onrender.com' : '' // Dev via Proxy

const collator = new Intl.Collator('de', { sensitivity: 'base' })

const filtered = computed(() =>
  books.value
    // Genre-Abgleich: exakt; falls nötig unten „normalize“ einsetzen
    .filter(b => b.genre === props.genre)
    .slice()
    .sort((a,b) => collator.compare(a.title ?? '', b.title ?? ''))
)

onMounted(async () => {
  try {
    const res = await fetch(`${BACKEND}/books`, { headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    books.value = await res.json()
  } catch (e:any) {
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
