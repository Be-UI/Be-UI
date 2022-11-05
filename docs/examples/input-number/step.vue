<template>
   <div class="exp-input-num">
      <be-input-number size="medium" v-model="value" :step="0.3" ></be-input-number>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
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