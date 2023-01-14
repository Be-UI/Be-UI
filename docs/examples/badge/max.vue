<template>
  <div class="flex">
    <div class="demo">
      <be-badge :value="number">
        <be-button type="primary">
          亲爱的 （{{number}}）
        </be-button>
      </be-badge>
    </div>
    <div class="demo">
      <be-badge :value="numberMax" :max="500">
        <be-button type="primary">
          我们在末日等你
        </be-button>
      </be-badge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from  'vue'
const number = ref(110)
const numberMax = ref(666)
</script>
<style>
.demo{
  margin: 0 20px
}
</style>
