<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const escEvtTest = () => {
  console.log('ESC')
}
</script>

<template>
  <be-button style="margin-right: 5px" custom-class="sm:mb-4" bordered @click="show = true">
    小坡
  </be-button>
  <be-dialog
    v-model:is-show="show"
    titles="青霞丹雪"
    esc-exit
    @esc-evt="escEvtTest"
  >
    <p>邪气升，正气落，杀害清官！</p>
    <p>老娘亲，在何方，孤身避难？</p>
    <p>难道说，抬头望，无有青天？</p>
    <p>难道说，不报仇，只把天怨？</p>
  </be-dialog>
</template>
