<template>
<Header>

</Header>
  <form action="/submit" method="post">
    <label for="name"class="NAME">Name:</label>
    <input type="text" id="name" name="Buchname" class="Buchname">

    <label for="author" class="AUTOR">Autor</label>
    <input type="text" id="author" name="Autorenname" class="Autorenname">

    <label for="genre" class="GENRE ">Genre</label>
    <input type="text" id="genre" name="GenreName" class="Genrename">

    <label for="isbn" class="ISBNNAME">ISBN</label>
    <input type="text" id="isbn" name="ISBN" class="ISBNname">

    <label for="beschreibung"class="BESCHR">Beschreibung</label><br>
    <textarea id="beschreibung" name="beschreibung" class="Beschreibung" rows="15" cols="60"></textarea>

    <label for="Bewertung" class="BEW">Bewertung</label>
    <input type="number" name="Bewertung" class="Bew">



    <button class="Erstellen" type="submit">Erstellen </button>
  </form>
  <PlaceholderPic></PlaceholderPic>
</template>


<script setup lang="ts">


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

</style>
