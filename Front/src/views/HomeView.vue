<template>
<Header/>
<PlaceholderPic></PlaceholderPic>



  <img class="star" src='@/components/icons/starPL.png'/>
  <img class="pink" src='@/components/icons/pinkfolder.png'/>

</template>


<script setup lang="ts">
import Header from '@/components/Header.vue'
import search from '@/views/SearchView.vue'
import PlaceholderPic from '@/components/PlaceholderPic.vue'

// Typ: HTMLImageElement (speziell für <img>)
const star = document.getElementById("star") as HTMLImageElement;


</script>



<style scoped >



.star{
  position: absolute;
  top : 40%;
  left:  35%;
  height : 10vh;

}

.pink{
  position: absolute;
  top : 50%;
  left:  35%;
  height : 10vh;
}



</style>
