<template>
  <div class="flex items-center">
    <be-switch
      v-model="defaultSwitch"
      size="default"
      checked-value="剑来"
      un-checked-value="剑去"
    >
      <template #unCheckedRender>
        <span style="word-break: keep-all;">剑来</span>
      </template>
      <template #checkedRender>
        <span style="word-break: keep-all;">剑去</span>
      </template>
    </be-switch>
    <span style="margin-left: 4px">{{ defaultSwitch }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const defaultSwitch = ref('剑来')
</script>
