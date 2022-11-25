<template>
  <div class="exp-input">
    <be-select
      v-model="value"
      size="medium"
      key-value="id"
      group
      :list="groupList"
      label-value="label"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref<string>('我寄人间雪满头')
const groupList = ref<Array<{ id: string, label: string, type?: string, children?:Array<any>}>>([
  { id: '分组一', label: '分组一', type: 'group', children: [{ id: '君埋泉下泥销骨', label: '君埋泉下泥销骨' }] },
  { id: '分组二', label: '分组二', type: 'group', children: [{ id: '我寄人间雪满头', label: '我寄人间雪满头' }] },
])
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
