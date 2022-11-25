<template>
  <be-button style="margin-right: 5px" custom-class="btn sm:mb-4" type="info" bordered @click="notifyByCustomClass()">
    蓝墨水的下游
  </be-button>
</template>

<script lang="ts" setup>
import { BeNotification } from 'be-ui'
const notify = BeNotification.service
const notifyByCustomClass = (): void => {
  notify({
    titles: '老人和大海',
    msgType: 'info',
    customClass: 'test-msg',
  })
}
</script>

<style>
.be-notification.test-msg .be-notification--container .be-notification--title .be-notification--head div:nth-child(1) .txt__info{

  color:pink;

}
</style>
