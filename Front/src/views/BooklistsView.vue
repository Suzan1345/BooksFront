<template>
  <Header>

  </Header>
  <a href="A" class="ANAME" @click="goToA">Bücher mit A</a>
  <a href="B" class="BNAME" @click="goToB">Bücher mit B</a>
  <a href="C" class="CNAME" @click="goToC">Bücher mit C</a>
  <a href="D" class="DNAME" @click="goToD">Bücher mit D</a>
  <a href="E" class="ENAME" @click="goToE">Bücher mit E</a>
  <a href="F" class="FNAME" @click="goToF">Bücher mit F</a>
  <a href="G" class="GNAME" @click="goToG">Bücher mit G</a>
  <a href="H" class="HNAME" @click="goToH">Bücher mit H</a>
  <a href="I" class="INAME" @click="goToI">Bücher mit I</a>
  <a href="J" class="JNAME" @click="goToJ">Bücher mit J</a>
  <a href="K" class="KNAME" @click="goToK">Bücher mit K</a>
  <a href="L" class="LNAME" @click="goToL">Bücher mit L</a>
  <a href="M" class="MNAME" @click="goToM">Bücher mit M</a>
  <a href="N" class="NNAME" @click="goToN">Bücher mit N</a>
  <a href="O" class="ONAME" @click="goToO">Bücher mit O</a>
  <a href="P" class="PNAME" @click="goToP">Bücher mit P</a>
  <a href="Q" class="QNAME" @click="goToQ">Bücher mit Q</a>
  <a href="R" class="RNAME" @click="goToR">Bücher mit R</a>
  <a href="S" class="SNAME" @click="goToS">Bücher mit S</a>
  <a href="T" class="TNAME" @click="goToT">Bücher mit T</a>
  <a href="U" class="UNAME" @click="goToU">Bücher mit U</a>
  <a href="V" class="VNAME" @click="goToV">Bücher mit V</a>
  <a href="W" class="WNAME" @click="goToW">Bücher mit W</a>
  <a href="X" class="XNAME" @click="goToX">Bücher mit X</a>
  <a href="Y" class="YNAME" @click="goToY">Bücher mit Y</a>
  <a href="Z" class="ZNAME" @click="goToZ">Bücher mit Z</a>



</template>


<script setup lang="ts">
import router from '@/router'

function goToA(){
  router.push('/A');
}
function goToB(){
  router.push('/B');
}
function goToC(){
  router.push('/C');
}
function goToD(){
  router.push('/D');
}
function goToE(){
  router.push('/E');
}
function goToF(){
  router.push('/F');
}
function goToG(){
  router.push('/G');
}
function goToH(){
  router.push('/H');
}
function goToI(){
  router.push('/I');
}
function goToJ(){
  router.push('/J');
}
function goToK(){
  router.push('/K');
}
function goToL(){
  router.push('/L');
}
function goToM(){
  router.push('/M');
}
function goToN(){
  router.push('/N');
}
function goToO(){
  router.push('/O');
}
function goToP(){
  router.push('/P');
}
function goToQ(){
  router.push('/Q');
}
function goToR(){
  router.push('/R');
}
function goToS(){
  router.push('/S');
}
function goToT(){
  router.push('/T');
}
function goToU(){
  router.push('/U');
}
function goToV(){
  router.push('/V');
}
function goToW(){
  router.push('/W');
}
function goToX(){
  router.push('/X');
}
function goToY(){
  router.push('/Y');
}
function goToZ(){
  router.push('/Z');
}

import Header from '@/components/Header.vue'
</script>


<style scoped>
.ANAME{
  position: absolute;
  left:20%;
  top:25%;
}
.BNAME{
  position: absolute;
  left:20%;
  top:30%;
}
.CNAME{
  position: absolute;
  left:20%;
  top:35%;
}
.DNAME{
  position: absolute;
  left:20%;
  top:40%;
}
.ENAME{
  position: absolute;
  left:20%;
  top:45%;
}
.FNAME{
  position: absolute;
  left:20%;
  top:50%;
}
.GNAME{
  position: absolute;
  left:20%;
  top:55%;
}
.HNAME{
  position: absolute;
  left:20%;
  top:60%;
}
.INAME{
  position: absolute;
  left:20%;
  top:65%;
}
.JNAME{
  position: absolute;
  left:20%;
  top:70%;
}
.KNAME{position: absolute;
  left:20%;
  top:75%;}
.LNAME{position: absolute;
  left:35%;
  top:25%;}
.MNAME{position: absolute;
  left:35%;
  top:30%;}
.NNAME{position: absolute;
  left:35%;
  top:35%;}
.ONAME{position: absolute;
  left:35%;
  top:40%;}
.PNAME{position: absolute;
  left:35%;
  top:45%;}
.QNAME{position: absolute;
  left:35%;
  top:50%;}
.RNAME{position: absolute;
  left:35%;
  top:55%;}
.SNAME{position: absolute;
  left:35%;
  top:60%;}
.TNAME{position: absolute;
  left:35%;
  top:65%;}
.UNAME{position: absolute;
  left:35%;
  top:70%;}
.VNAME{position: absolute;
  left:35%;
  top:75%;}
.WNAME{position: absolute;
  left:50%;
  top:25%;}
.XNAME{position: absolute;
  left:50%;
  top:30%;}
.YNAME{position: absolute;
  left:50%;
  top:35%;}
.ZNAME{position: absolute;
  left:50%;
  top:40%;}


</style>
