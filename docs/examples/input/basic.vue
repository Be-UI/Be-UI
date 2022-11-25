<template>
  <div class="exp-input">
    <be-input v-model="value" size="mini" />
    <be-input v-model="value" size="medium" />
    <be-input v-model="value" size="large" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref<string>('')
</script>

<style lang="scss">
.exp-input{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .be-input{
    width: 200px;
    margin: 0 6px;
  }
}
</style>
