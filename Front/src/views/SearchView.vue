 <template>
   <Header/>
 <div class="text"/>
      <h1> Keine Bücher gefunden!</h1>
   <form action="/submit" method="get">
     <label for="suche"class="SUCHE">Suche:</label>
     <input type="text" id="suche" name="Suche" class="suche">
   </form>

   <form action="/submit" method="post">
     <button class="Erstellen"type="submit">Erstellen</button>
   </form>

 </template>

 <script setup lang="ts">





 import Header from '@/components/Header.vue'
 </script>



 <style scoped>
 .text{
   position: absolute;
   top: 30%;
   left: 30%;
 }
 .Erstellen{
   position: absolute;
   top:30%;
   left:30%
 }


 </style>
