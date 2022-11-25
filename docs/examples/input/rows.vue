<template>
  <div class="exp-input">
    <be-input v-model="value" type="textarea" :rows="5" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref<string>('湖心亭看雪')
</script>

<style lang="scss">
.exp-input{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .be-input{
    width: 230px;
    margin: 0 6px;
  }
}
</style>
