<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
  <be-button @click="show = true" style="margin-right: 5px" customClass="sm:mb-4" bordered>
    老舍
  </be-button>
  <be-dialog
      titles="樱海集"
      layout="right"
      v-model:is-show="show">
    <p>是的，我又看见月牙儿了，带着点寒气的一钩儿浅金。多少次了，我看见跟现在这个月牙儿一样的月牙儿；</p>
    <p>多少次了。它带着种种不同的感情，种种不同的景物，当我坐定了看它，它一次一次的在我记忆中的碧云上斜挂着。</p>
    <p>它唤醒了我的记忆，象一阵晚风吹破一朵欲睡的花。</p>
  </be-dialog>
</template>
