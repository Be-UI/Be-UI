<template>
  <div class="flex">
    <div class="demo">
      <be-badge :value="number" is-dot>
        <be-button type="primary">
          你的无畏来源于无知
        </be-button>
      </be-badge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from  'vue'
const number = ref(110)
</script>
<style>
.demo{
  margin: 0 20px
}
</style>
