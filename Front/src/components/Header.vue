<template>
  <div class="topnav">
    <RouterLink class="active" to="/">Home</RouterLink>
    <RouterLink to="/search">Suche</RouterLink>
  </div>
</template>

<script setup>
// kein TypeScript nötig, du kannst einfach JavaScript schreiben
// Die Views brauchst du hier nicht zu importieren – die werden vom Router geladen
</script>

<style scoped>
.topnav {

  top : 0%;
  background-color: #664e2f;
  padding: 18px;
  display: flex;
  gap: 100px;
  border-radius: 50px;
}
</style>


