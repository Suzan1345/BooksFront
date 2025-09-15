<template>
  <Header>
  </Header>
  <div class="MBuch">
    <p>Buch des Monats</p>
  </div>

  <div class="WBuch">
    <p>Buch der Woche</p>
  </div>

  <div class="TBuch">
    <p>Buch des Tages</p>
  </div>
</template>


<script setup lang="ts">


import Header from '@/components/Header.vue'
</script>





<style scoped>
.MBuch{
  position: absolute;
  left:28%;
  top:30%;
}
.WBuch{
  position: absolute;
  left:50%;
  top:30%;
}
.TBuch{
  position: absolute;
  left:72%;
  top:30%
}




</style>
