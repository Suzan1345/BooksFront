<template>
  <img class="header" src='@/assets/pics/leiste.png'>
  <img class="plus" src='@/assets/pics/plusi.png'@click="goToNewBook">
  <img class="search" src='@/assets/pics/searchhh.png'@click="goToSearch">
  <img class="home" src='@/assets/pics/start.png'@click="goToHome">
  <img class="genre" src='@/assets/pics/listen.png'@click="goToGenre">
  <img class="charts" src='@/assets/pics/pod.png'@click="goToCharts">

  <img  class="back" src="@/assets/pics/background.png">

</template>

<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  function goToNewBook() {
  router.push('/new-book');}

  function goToSearch(){
    router.push('/search');}

  function goToList(){
    router.push('/listen');}

  function goToGenre(){
    router.push('/genre');}

  function goToCharts(){
    router.push('/charts');}

  function goToHome(){
    router.push('/');}

</script>



<style scoped>
.header{
  position: absolute;
  top:20%;
  left:-25%;
  width:70vh;
  z-index: 0;
}
.plus{
  position: absolute;
  top:34%;
  left:1%;
  width:6vh;
  z-index:1;
  cursor: pointer;


}
.search{
  position: absolute;
  top:43%;
  left:3%;
  width:6vh;
  cursor: pointer;
}
.home{
  position: absolute;
  top:51%;
  left:4%;
  width:6vh;
  cursor: pointer;
}
.genre{
  position: absolute;
  top:60%;
  left:3%;
  width:6vh;
  cursor: pointer;
}
.charts{
  position: absolute;
  top:68%;
  left:1%;
  width:6vh;
  cursor: pointer;
}
.back{
  position: absolute;
  top:10%;
  left:15%;
  z-index: 0;
}

</style>


