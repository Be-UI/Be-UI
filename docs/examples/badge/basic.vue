<template>
  <div class="flex">
    <div class="demo">
      <be-badge :value="number">
        <be-button type="primary">
          没关系的
        </be-button>
      </be-badge>
    </div>
    <div class="demo">
      <be-badge :value="string">
        <be-button type="primary">
          都一样
        </be-button>
      </be-badge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from  'vue'
const number = ref(90)
const string = ref('歌者')
</script>
<style>
.demo{
  margin: 0 20px
}
</style>
