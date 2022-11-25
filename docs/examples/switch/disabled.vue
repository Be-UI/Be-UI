<template>
  <div class="flex">
    <be-switch v-model="defaultSwitch" size="default" disabled custom-class="mr-4" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const defaultSwitch = ref(false)
</script>
