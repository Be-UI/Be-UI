<template>
  <div class="exp-input">
    <be-input type="textarea" v-model="value" ></be-input>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
const value = ref<string>('江岸垂钓的是洒脱')
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
