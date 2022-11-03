<template>
  <div class="exp-input">
    <be-input prevIcon="search" nextIcon="coin" v-model="value" ></be-input>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
const value = ref<string>('大梦荒唐 两鬓风霜')
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
