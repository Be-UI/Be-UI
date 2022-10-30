<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const escEvtTest = ()=>{
  console.log('ESC')
}
</script>

<template>
  <be-button @click="show = true" style="margin-right: 5px" customClass="sm:mb-4" bordered>
    小坡
  </be-button>
  <be-dialog
      titles="青霞丹雪"
      escExit
      @escEvt="escEvtTest"
      v-model:is-show="show">
    <p>邪气升，正气落，杀害清官！</p>
    <p>老娘亲，在何方，孤身避难？</p>
    <p>难道说，抬头望，无有青天？</p>
    <p>难道说，不报仇，只把天怨？</p>
  </be-dialog>
</template>
