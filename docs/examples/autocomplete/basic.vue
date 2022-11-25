<template>
  <div class="exp-input">
    <be-autocomplete
      v-model="baseVal"
      :suggestion-list="baseList"
      key-value="id"
      label-value="label"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const baseList = ref<Array<{id:string, label:string}>>([
  { id: '君埋泉下泥销骨', label: '君埋泉下泥销骨' },
  { id: '我寄人间雪满头', label: '我寄人间雪满头' },
  { id: '满堂花醉三千客', label: '满堂花醉三千客' },
  { id: '一剑霜寒十四州', label: '一剑霜寒十四州' },
])
// const baseVal = ref<string>('君埋泉下泥销骨')
const baseVal = ref<{id:string, label:string}>({ id: '君埋泉下泥销骨', label: '君埋泉下泥销骨' })
</script>

<style lang="scss">
.exp-input{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .be-input{
    width: 300px;
    margin: 0 6px;
  }
}
</style>
