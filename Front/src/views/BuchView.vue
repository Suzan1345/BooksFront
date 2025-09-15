<template>
  <Header>
  </Header>

  <img class="PLACEHOLDER" src='@/assets/pics/placeholder.png' />

  <div class="BNAME">
    <p>Buchname</p>
  </div>

  <div class="ANAME">
    <p>Autor</p>
  </div>

  <div class="GNAME">
    <p>Genre</p>
  </div>

  <div class="ISBN">
    <p>ISBN</p>
  </div>

  <div class="BEW">
    <p>Bewertung von 1-10</p>
  </div>

  <div class="BESCH">
    <p>Hier sollte die Buchbeschreibung stehen</p>
  </div>

  <div class="Kommentare">
    <p> Hier sollen die Kommentare stehen</p>
  </div>

</template>
<script setup lang="ts">
import Header from '@/components/Header.vue'
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

</style>
