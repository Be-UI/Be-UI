<template>
  <div class="flex">
    <be-switch v-model="smallSwitch" size="small" custom-class="mr-4" />
    <be-switch v-model="defaultSwitch" size="default" custom-class="mr-4" />
    <be-switch v-model="largeSwitch" size="large" custom-class="mr-4" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const smallSwitch = ref(false)
const defaultSwitch = ref(false)
const largeSwitch = ref(false)
</script>
