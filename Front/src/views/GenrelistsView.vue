<template>
  <Header>

  </Header>
  <a href="Fantasy" class="Fantasy" @click="goToFantasy">Fantasy - Bücher</a>
  <a href="SciFi" class="SciFi" @click="goToSci">Sciencefiction - Bücher</a>
  <a href="Love" class="Love" @click="goToLove">Liebesromane</a>
  <a href="Family" class="Famliy" @click="goToFamily">Familienromane</a>
  <a href="Abenteuer" class="Abenteuer" @click="goToAben">Abendteuerromane</a>
  <a href="Historisch" class="Historisch" @click="goToHist">Historische Romane/ Klassiker</a>
  <a href="Thriller" class="Thriller" @click="goToThriller">Thriller-Bücher</a>
  <a href="Horror" class="Horror" @click="goToHorror">Horrorbücher </a>
  <a href="Psychologisch" class="Psych" @click="goToPsy">Psychologische Bücher</a>
  <a href="Sachbücher" class="Sach" @click="goToSach">Sachbücher</a>
  <a href="Fremdsprachen" class="Fremd" @click="goToFremd">Fremdpsrachen</a>
</template>


<script setup lang="ts">
import router from '@/router'

function goToFantasy(){
  router.push('/fan');
}
function goToSci(){
  router.push('/sci');
}
function goToLove(){
  router.push('/love');
}
function goToFamily(){
  router.push('/fami');
}
function goToAben(){
  router.push('/aben');
}
function goToHist(){
  router.push('/hist');
}
function goToThriller(){
  router.push('/thri');
}
function goToHorror(){
  router.push('/hor');
}
function goToPsy(){
  router.push('/psy');
}
function goToSach(){
  router.push('/sach');
}
function goToFremd(){
  router.push('/fremd');
}
import Header from '@/components/Header.vue'
</script>



<style scoped>
.Fantasy{
  Position:absolute;
  left:20%;
  top:25%;
}
.SciFi{
  position: absolute;
  left:20%;
  top:30%;
}
.Love{
  position: absolute;
  left: 20%;
  top:35%;
}
.Famliy{
  position: absolute;
  left:20%;
  top:40%;
}
.Abenteuer{
  position: absolute;
  left:20%;
  top:45%;
}
.Historisch{
  position: absolute;
  left:20%;
  top:50%;
}
.Thriller{
  position: absolute;
  left:20%;
  top:55%;
}
.Horror{
  position: absolute;
  left:40%;
  top:25%;
}
.Psych{
  position: absolute;
  left:40%;
  top:30%;
}
.Sach{
  position: absolute;
  left:40%;
  top:35%;
}
.Fremd{
  position: absolute;
  left:40%;
  top:40%;
}
</style>
