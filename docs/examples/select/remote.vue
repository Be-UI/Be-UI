<template>
  <div class="exp-input">
    <be-select
      v-model="value"
      size="medium"
      key-value="id"
      search
      remote
      :remote-func="fetchSuggestions"
      label-value="label"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref<string>('十步杀一人，千里不留行')
const fetchSuggestions = (cb:Function):void => {
  setTimeout(() => {
    cb && cb([
      { id: '赵客缦胡缨，吴钩霜雪明。', label: '赵客缦胡缨，吴钩霜雪明。' },
      { id: '银鞍照白马，飒沓如流星。', label: '银鞍照白马，飒沓如流星。' },
      { id: '十步杀一人，千里不留行。', label: '十步杀一人，千里不留行。' },
      { id: '事了拂衣去，深藏身与名。', label: '事了拂衣去，深藏身与名。' },
    ])
  }, 2000)
}
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
