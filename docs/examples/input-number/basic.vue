<template>
   <div class="exp-input-num">
     <div>
      <be-input-number size="mini" v-model="value" >
        <template #pre>$</template>
      </be-input-number>
     </div>
     <div>
      <be-input-number size="medium" v-model="value" ></be-input-number>
     </div>
     <div>
      <be-input-number size="large" v-model="value" ></be-input-number>
     </div>
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