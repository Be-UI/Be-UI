<template>
  <div class="flex">
    <be-switch v-model="defaultSwitch" size="default" :is-loading="loading" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const defaultSwitch = ref(false)
const loading = ref(true)
</script>
