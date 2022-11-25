<template>
  <div class="exp-input">
    <be-input v-model="value" size="medium" show-password type="password" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref<string>('唱着人们心头的曲折')
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
