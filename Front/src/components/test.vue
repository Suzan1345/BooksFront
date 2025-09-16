<template>
  <div>
    <h1>Neues Buch hinzufügen</h1>
    <form @submit.prevent="submitBook">
      <input v-model="title" placeholder="Titel" />
      <input v-model="author" placeholder="Autor" />
      <button type="submit">Speichern</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'AddBook',
  setup() {
    const title = ref<string>('');
    const author = ref<string>('');

    const submitBook = async (): Promise<void> => {
      try {
        const response = await fetch('https://books-1-1ljs.onrender.comF/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title.value,
            author: author.value,
          }),
        });

        const data = await response.json();
        console.log('Gespeichert:', data);
        alert('Buch gespeichert!');
      } catch (error) {
        console.error('Fehler beim Speichern:', error);
        alert('Fehler!');
      }
    };

    return {
      title,
      author,
      submitBook,
    };
  },
};
</script>
