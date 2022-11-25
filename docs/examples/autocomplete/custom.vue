<template>
  <div class="exp-input">
    <be-autocomplete
      v-model="baseVal"
      :suggestion-list="baseList"
      key-value="id"
      label-value="label"
      :focus-trigger="false"
    >
      <template #cus-temp="slotProps">
        <div style="display: flex;justify-content: center;align-items: center">
          ❀
          {{ slotProps.item.label }}
          ❥
        </div>
      </template>
    </be-autocomplete>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const baseList = ref<Array<{id:string, label:string}>>([
  { id: '盛气光引炉烟', label: '盛气光引炉烟' },
  { id: '素草寒生玉佩', label: '素草寒生玉佩' },
  { id: '应是天仙狂醉', label: '应是天仙狂醉' },
  { id: '乱把白云揉碎', label: '乱把白云揉碎' },
])

const baseVal = ref<{id:string, label:string}>({ id: '乱把白云揉碎', label: '乱把白云揉碎' })
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
