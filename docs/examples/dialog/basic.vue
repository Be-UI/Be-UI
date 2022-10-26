<script setup lang="ts">
import { ref } from 'vue'
const show = ref(true)
</script>

<template>
  <be-dialog v-model:is-show="show" titles="方珍珠" />
</template>
