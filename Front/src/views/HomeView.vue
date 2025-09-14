<template>
<Header/>



<img class="PLACEHOLDER" src='@/assets/pics/placeholder.png' />
  <img class="star" src='@/components/icons/starPL.png'/>
  <img class="pink" src='@/components/icons/pinkfolder.png'/>
</template>


<script setup lang="ts">
import Header from '@/components/Header.vue'
import search from '@/views/search.vue'



</script>



<style scoped >

.PLACEHOLDER{
  position: absolute;
  top : 25%;
  right : 25%;
  height : 50vh;
}

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
