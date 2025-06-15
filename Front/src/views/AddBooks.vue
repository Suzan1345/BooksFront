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

<script>
export default {
  data() {
    return {
      title: '',
      author: ''
    };
  },
  methods: {
    async submitBook() {
      try {
        const res = await fetch('https://books-1-1ljs.onrender.com/api/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: this.title,
            author: this.author
          })
        });
        const data = await res.json();
        console.log('Gespeichert:', data);
        alert('Buch gespeichert!');
      } catch (err) {
        console.error('Fehler beim Speichern:', err);
        alert('Fehler!');
      }
    }
  }
};
</script>
