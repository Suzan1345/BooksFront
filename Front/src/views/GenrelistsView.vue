<template>
  <Header>

  </Header>
  <RouterLink class="Fantasy" to="/fan">Fantasy - Bücher</RouterLink>
  <RouterLink class="SciFi"   to="/sci">Sciencefiction - Bücher</RouterLink>
  <RouterLink class="Love"    to="/love">Liebesromane</RouterLink>
  <RouterLink class="Famliy"  to="/fami">Familienromane</RouterLink>
  <RouterLink class="Abenteuer" to="/aben">Abenteuerromane</RouterLink>
  <RouterLink class="Historisch" to="/hist">Historische Romane / Klassiker</RouterLink>
  <RouterLink class="Thriller" to="/thri">Thriller-Bücher</RouterLink>
  <RouterLink class="Horror"   to="/hor">Horrorbücher</RouterLink>
  <RouterLink class="Psych"    to="/psy">Psychologische Bücher</RouterLink>
  <RouterLink class="Sach"     to="/sach">Sachbücher</RouterLink>
  <RouterLink class="Fremd"    to="/fremd">Fremdsprachen</RouterLink>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

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
