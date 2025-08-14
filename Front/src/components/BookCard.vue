<template>
  <article class="card">
    <div class="card__cover">
      <img :src="book.coverUrl" :alt="`Cover von ${book.title}`" loading="lazy" />
    </div>
    <div class="card__body">
      <h3 class="card__title" :title="book.title">{{ book.title }}</h3>
      <p class="card__meta">{{ book.author }} • {{ book.year }}</p>
      <p class="card__desc">{{ book.description }}</p>
      <div class="card__footer">
        <span class="price">{{ book.price.toFixed(2) }} €</span>
        <BaseButton @click="$emit('add-to-cart', book)">In den Warenkorb</BaseButton>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import BaseButton from '@/components/Buttons/BaseButton.vue'
import type { Book } from '@/types/Book'

defineProps<{ book: Book }>()
defineEmits<{ (e: 'add-to-cart', book: Book): void }>()
</script>

<style scoped>
.card {
  background: #fff; border: 1px solid #e7ecf5; border-radius: 16px; overflow: hidden;
  display: grid; grid-template-rows: 220px 1fr;
  transition: box-shadow .2s ease, transform .05s ease;
}
.card:hover { box-shadow: 0 10px 30px rgba(20, 34, 70, .08); }

.card__cover { background: #f4f6fb; display: grid; place-items: center; }
.card__cover img { width: 100%; height: 100%; object-fit: cover; }

.card__body { padding: .9rem; display: grid; gap: .5rem; }
.card__title { font-size: 1rem; font-weight: 700; line-height: 1.25; margin: 0; }
.card__meta { color: #6a7691; font-size: .9rem; margin: 0; }
.card__desc {
  color: #53607a; font-size: .9rem; max-height: 3.6em; overflow: hidden;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
}
.card__footer { display: flex; justify-content: space-between; align-items: center; margin-top: .25rem; }
.price { font-weight: 800; color: #1a1f2e; }
</style>
