<template>
  <be-button @click="msgByCustomClass()" style="margin-right: 5px"
             bordered>废邮存底
  </be-button>
</template>
<script lang="ts" setup>
import { BeMessage } from 'be-ui'
const message = BeMessage.service
const msgByCustomClass = (): void => {
  message({
    titles: `月下小景`,
    msgType: 'info',
    customClass: 'test-msg',
    offsetTop: 60,
  })
}
</script>
<style>
.be-message.test-msg
.be-message--container
.be-message--title
.be-message--head div:nth-child(1) .txt__info {
  color: pink;
}
</style>
