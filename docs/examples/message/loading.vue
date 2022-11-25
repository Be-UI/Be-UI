<template>
  <be-button
    style="margin-right: 5px"
    bordered
    @click="msgByLoading()"
  >
    阿丽思中国游记
  </be-button>
</template>

<script lang="ts" setup>
import { BeMessage } from 'be-ui'
const message = BeMessage.service
const msgByLoading = (): void => {
  message({
    titles: '黑凤集',
    msgType: 'error',
    key: 'msgByLoading',
    loading: true,
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
