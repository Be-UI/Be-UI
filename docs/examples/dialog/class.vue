<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
  <be-button style="margin-right: 5px" custom-class="sm:mb-4" bordered @click="show = true">
    茶馆
  </be-button>
  <be-dialog
    v-model:is-show="show"
    titles="西望长安"
    custom-class="customClass-dialog"
  >
    <p>我要是在北京，逛一趟天桥或是东安市场，就会买到比这更多更好看的牌牌儿！</p>
    <p>看，这个是小学生的帽花，他也戴了这幺好几年！</p>
  </be-dialog>
</template>

<style>
.be-dialog .be-dialog--container.customClass-dialog .be-dialog--title {
  background: aliceblue;
}
</style>
