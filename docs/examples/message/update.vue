<template>
  <be-button
    style="margin-right: 5px"
    bordered
    @click="msgByUpdate()"
  >
    边城
  </be-button>
  <be-button
    style="margin-right: 5px"
    bordered
    @click="updateMsg()"
  >
    update
  </be-button>
</template>

<script lang="ts" setup>
import { BeMessage } from 'be-ui'
const message = BeMessage.service
const msgByUpdate = (): void => {
  message({
    titles: '雪晴(点击更新按钮)',
    msgType: 'info',
    key: 'msgByUpdate',
  })
}
const updateMsg = (): void => {
  message({
    titles: '长河',
    msgType: 'warning',
    key: 'msgByUpdate',
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
