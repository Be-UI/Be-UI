<template>
  <div class="exp-input-num">
    <be-input-number v-model="value" size="medium" keyboard />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(1)
</script>

<style lang="scss">
.exp-input-num{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .be-input-number{

    margin: 0 6px;
  }
}
</style>
