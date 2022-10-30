<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
  <be-button @click="show = true" style="margin-right: 5px" customClass="sm:mb-4" bordered>
    微神
  </be-button>
  <be-dialog
      titles="月牙集"
      :isOpenModal="false"
      v-model:is-show="show">
    <p>它养着一群混饭吃的人，作些个混饭吃的事。</p>
  </be-dialog>
</template>
