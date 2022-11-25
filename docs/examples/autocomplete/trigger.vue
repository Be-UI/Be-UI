<template>
  <div class="exp-input">
    <be-autocomplete
      v-model="baseVal"
      :suggestion-list="baseList"
      key-value="id"
      label-value="label"
      :focus-trigger="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const baseList = ref<Array<{id:string, label:string}>>([
  { id: '两人对酌山花开', label: '两人对酌山花开' },
  { id: '一杯一杯复一杯', label: '一杯一杯复一杯' },
  { id: '我醉欲眠卿且去', label: '我醉欲眠卿且去' },
  { id: '明朝有意抱琴来', label: '明朝有意抱琴来' },
])

const baseVal = ref<{id:string, label:string}>({ id: '我醉欲眠卿且去', label: '我醉欲眠卿且去' })
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
