<template>
  <img class="header" src='@/assets/pics/leiste.png'>
  <img class="plus" src='@/assets/pics/plus.png'@click="goToNewBook">
  <img class="search" src='@/assets/pics/search.png'@click="goToSearch">
  <img class="list" src='@/assets/pics/list.png'@click="goToList">
  <img class="genre" src='@/assets/pics/Genre.png'@click="goToGenre">
  <img class="charts" src='@/assets/pics/charts.png'@click="goToCharts">
  <img class="home" src='@/assets/pics/home.png'@click="goToHome">

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
  left:-18%;
  width:70vh;
}
.plus{
  position: absolute;
  top:30%;
  left:57px;
  width:8vh;
}
.search{
  position: absolute;
  top:40%;
  left:90px;
  width:8vh;
}
.list{
  position: absolute;
  top:50%;
  left:100px;
  width:8vh;
}
.genre{
  position: absolute;
  top:60%;
  left:90px;
  width:8vh;
}
.charts{
  position: absolute;
  top:70%;
  left:57px;
  width:8vh;
}
.home{
  position: absolute;
  top:50%;
  left:25px;
  width: 8vh;
}

</style>


