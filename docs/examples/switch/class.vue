<template>
  <div class="flex">
    <be-switch v-model="defaultSwitch" size="default" custom-class="custom-class--switch" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const defaultSwitch = ref(false)
</script>

<style lang="css">
.custom-class--switch{
  background: #ffcced;
}
</style>
