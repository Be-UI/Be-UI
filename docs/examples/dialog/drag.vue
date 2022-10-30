<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
  <be-button @click="show = true" style="margin-right: 5px" customClass="sm:mb-4" bordered>
    残雾
  </be-button>
  <be-dialog
      titles="骆驼祥子"
      isDrag
      v-model:is-show="show">
    <p>夜还很黑，空中有些湿冷的雾气，心中更觉得渺茫。</p>
  </be-dialog>
</template>
