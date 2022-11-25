<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const handleClose = () => {
  show.value = false
}
const handleConfirm = () => {
  show.value = false
}
</script>

<template>
  <be-button style="margin-right: 5px" custom-class="sm:mb-4" bordered @click="show = true">
    惶惑
  </be-button>
  <be-dialog
    v-model:is-show="show"
    titles="剑北篇"
  >
    <template #headerIcon>
      <i @click="handleClose">🌸</i>
    </template>
    看，那是什么？在山下，在山间，灯光闪闪，火炬团团？
    <template #footer>
      <be-button bordered @click="handleConfirm">
        星星之火
      </be-button>
    </template>
  </be-dialog>
</template>
