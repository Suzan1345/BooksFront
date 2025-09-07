 <template>
    <main class="page">
      <!-- Hero / Header -->
      <header class="hero">
        <div class="hero__content">
          <h1 class="hero__title">Finde dein nächstes Lieblingsbuch</h1>
          <p class="hero__subtitle">
            Stöbere durch Tausende Titel – kuratiert, bewertet und immer aktuell.
          </p>

          <form class="search" @submit.prevent="onSearch">
            <input
              v-model.trim="query"
              type="search"
              class="search__input"
              placeholder="Titel, Autor:in, Stichwort..."
              aria-label="Buchsuche"
            />
            <BaseButton type="submit" :loading="loading">Suchen</BaseButton>
          </form>

          <div class="filters">
            <BaseButton
              v-for="cat in categories"
              :key="cat"
              variant="ghost"
              :active="activeCategory === cat"
              @click="setCategory(cat)"
            >
              {{ cat }}
            </BaseButton>
          </div>
        </div>
      </header>

      <!-- Featured / Ergebnisse -->
      <section class="section">
        <div class="section__header">
          <h2 v-if="!query">Beliebt in {{ activeCategory || 'allen Kategorien' }}</h2>
          <h2 v-else>Suchergebnisse für „{{ query }}“</h2>
          <small v-if="!loading && !error">({{ books.length }} Bücher)</small>
        </div>

        <div v-if="error" class="state state--error">
          <p>Ups – {{ error }}</p>
          <BaseButton @click="reload">Erneut versuchen</BaseButton>
        </div>

        <div v-else-if="loading" class="grid">
          <div v-for="n in 8" :key="n" class="card skeleton"></div>
        </div>

        <div v-else class="grid">
          <BookCard
            v-for="b in books"
            :key="b.id"
            :book="b"
            @add-to-cart="addToCart"
          />
          <p v-if="books.length === 0" class="state">Keine Treffer gefunden.</p>
        </div>
      </section>
    </main>
  </template>


<script setup lang="ts">
  import TheWelcome from '../components/TheWelcome.vue'
  import { ref, onMounted, watch } from 'vue'
  import BaseButton from '@/components/Buttons/BaseButton.vue'
  import BookCard from '@/components/BookCard.vue'
  import { getFeaturedBooks, searchBooks, getCategories } from '@/service/bookService'
  import type { Book } from '@/types/Book'

    const books = ref<Book[]>([])
    const categories = ref<string[]>([])
    const activeCategory = ref<string | null>(null)
    const query = ref<string>('')

    const loading = ref(false)
    const error = ref<string | null>(null)

    async function loadFeatured() {
      loading.value = true
      error.value = null
      try {
        books.value = await getFeaturedBooks(activeCategory.value || undefined)
      } catch (e: any) {
        error.value = e?.message ?? 'Unbekannter Fehler beim Laden'
      } finally {
        loading.value = false
      }
    }

    async function onSearch() {
      loading.value = true
      error.value = null
      try {
        if (query.value) {
          books.value = await searchBooks({
            q: query.value,
            category: activeCategory.value || undefined
          })
        } else {
          await loadFeatured()
        }
      } catch (e: any) {
        error.value = e?.message ?? 'Suche fehlgeschlagen'
      } finally {
        loading.value = false
      }
    }

    function setCategory(cat: string) {
      activeCategory.value = activeCategory.value === cat ? null : cat
    }

    function reload() {
      if (query.value) onSearch()
      else loadFeatured()
    }

    function addToCart(book: Book) {
      // Platzhalter – hier würdest du z. B. einen Pinia-Store triggern
      alert(`„${book.title}“ wurde dem Warenkorb hinzugefügt.`)
    }

    // initial: Kategorien + Featured laden
    onMounted(async () => {
      try {
        categories.value = await getCategories()
      } catch { /* Kategorien sind optional */
      }
      await loadFeatured()
    })

    // wenn Kategorie geändert wird, neu laden (debounced wäre optional)
    watch(activeCategory, () => {
      if (query.value) onSearch()
      else loadFeatured()
    })
</script>

  <style scoped>
    .page {
      display: grid;
      gap: 2rem;
    }

    /* Hero */
    .hero {
      background: linear-gradient(135deg, #151c2e, #2f3b66);
      color: #fff;
      border-radius: 18px;
      padding: 3.5rem 1.5rem;
    }
    .hero__content { max-width: 1100px; margin: 0 auto; }
    .hero__title { font-size: clamp(2rem, 4vw, 3rem); margin: 0 0 .5rem; font-weight: 800; }
    .hero__subtitle { opacity: .9; margin: 0 0 1.5rem; }

    .search {
      display: flex; gap: .75rem; align-items: center; margin-bottom: 1rem;
    }
    .search__input {
      flex: 1;
      padding: .85rem 1rem;
      border: 1px solid #3c4b80;
      border-radius: 12px;
      background: rgba(255,255,255,.08);
      color: #fff;
      outline: none;
    }
    .search__input::placeholder { color: rgba(255,255,255,.7); }

    .filters { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: .25rem; }

    /* Section */
    .section { max-width: 1100px; margin: 0 auto; }
    .section__header { display: flex; align-items: baseline; gap: .5rem; margin-bottom: .75rem; }

    /* Grid */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
      gap: 1rem;
    }

    /* Card Skeleton */
    .card.skeleton {
      height: 280px; border-radius: 14px;
      background: linear-gradient(90deg, #e9edf3 25%, #f4f7fb 37%, #e9edf3 63%);
      background-size: 400% 100%;
      animation: shimmer 1.2s infinite linear;
    }
    @keyframes shimmer { 0% { background-position: 100% 0 } 100% { background-position: 0 0 } }

    /* States */
    .state { color: #5a667d; padding: .5rem; }
    .state--error { color: #b00020; display: flex; gap: .75rem; align-items: center; }

    /* Page spacing */
    @media (min-width: 768px) {
      .hero { padding: 4rem 2rem; }
    }
  </style>
