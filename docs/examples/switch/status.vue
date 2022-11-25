<template>
  <div class="flex items-center">
    <be-switch
      v-model="defaultSwitch"
      size="default"
      checked-value="剑来"
      un-checked-value="剑去"
    />
    <span style="margin-left: 4px">{{ defaultSwitch }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const defaultSwitch = ref('剑来')
</script>
