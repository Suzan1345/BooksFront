
<template>
  <div>
    <ul>
      <li v-for="(book, index) in books" :key="index">
  {{ book.title }} von {{ book.author }}
</li>
</ul>
</div>
</template>

<script setup lang="ts">
  // Props typisieren
  interface Book {
  title: string
  author: string
}

// defineProps ist die neue Art Props in <script setup> zu definieren
const props = defineProps<{
  books: Book[]
}>()
</script>
