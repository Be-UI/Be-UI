<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const handleClose = () =>{
  show.value = false
}
const handleConfirm = () =>{
  show.value = false
}
</script>

<template>
  <be-button @click="show = true" style="margin-right: 5px" customClass="sm:mb-4" bordered>
    惶惑
  </be-button>
  <be-dialog
      titles="剑北篇"
      v-model:is-show="show">
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
