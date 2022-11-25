<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
  <be-button style="margin-right: 5px" custom-class="sm:mb-4" bordered @click="show = true">
    残雾
  </be-button>
  <be-dialog
    v-model:is-show="show"
    titles="骆驼祥子"
    is-drag
  >
    <p>夜还很黑，空中有些湿冷的雾气，心中更觉得渺茫。</p>
  </be-dialog>
</template>
