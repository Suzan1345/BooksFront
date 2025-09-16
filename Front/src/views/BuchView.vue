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

const route = useRoute()
const id = route.params.id as string

// OHNE API-Basis, aber prod braucht absolute URL:
const isRender = typeof window !== 'undefined' && window.location.hostname.endsWith('onrender.com')
const BACKEND = isRender
  ? 'https://books-1-1ljs.onrender.com'    // <— DEINE Render-Backend-URL
  : ''                                      // lokal über Proxy

onMounted(async () => {
  try {
    if (!id) throw new Error('Keine Buch-ID in der URL')

    const url = `${BACKEND}/books/${encodeURIComponent(id)}`
    const res = await fetch(url, { headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`HTTP ${res.status} – ${res.statusText}`)

    // Backend liefert: { id, title, author, genre, isbn, desch, rating }
    const api = await res.json() as {
      id: number | string; title: string; author: string; genre: string;
      isbn: number; desch: string; rating: number;
    }

    book.value = {
      id: api.id,
      title: api.title,
      author: api.author,
      genre: api.genre,
      isbn: api.isbn,
      rating: api.rating,
      description: api.desch,
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
