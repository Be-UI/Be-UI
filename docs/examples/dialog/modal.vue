<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
  <be-button style="margin-right: 5px" custom-class="sm:mb-4" bordered @click="show = true">
    微神
  </be-button>
  <be-dialog
    v-model:is-show="show"
    titles="月牙集"
    :is-open-modal="false"
  >
    <p>它养着一群混饭吃的人，作些个混饭吃的事。</p>
  </be-dialog>
</template>
