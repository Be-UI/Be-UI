<template>
  <div class="exp-input">
    <be-select
      v-model="miniVal"
      size="mini"
      :list="baseList"
      key-value="id"
      label-value="label"
    />

    <be-select
      v-model="mediumVal"
      size="medium"
      :list="baseList"
      key-value="id"
      label-value="label"
    />

    <be-select
      v-model="largeVal"
      size="large"
      :list="baseList"
      key-value="id"
      label-value="label"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const baseList = ref<Array<{ id: string, label: string }>>([
  { id: '君埋泉下泥销骨', label: '君埋泉下泥销骨' },
  { id: '我寄人间雪满头', label: '我寄人间雪满头' },
  { id: '满堂花醉三千客', label: '满堂花醉三千客' },
  { id: '一剑霜寒十四州', label: '一剑霜寒十四州' },
  { id: '两人对酌山花开', label: '两人对酌山花开' },
  { id: '一杯一杯复一杯', label: '一杯一杯复一杯' },
  { id: '我醉欲眠卿且去', label: '我醉欲眠卿且去' },
  { id: '明朝有意抱琴来', label: '明朝有意抱琴来' },
])
const miniVal = ref<string>('')
const mediumVal = ref<string>('')
const largeVal = ref<string>('')
</script>

<style lang="scss">
.exp-input{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .be-select{
    width: 230px;
    margin: 0 6px;
  }
}
</style>
