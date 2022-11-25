<template>
  <be-button style="margin-right: 5px" custom-class="btn sm:mb-4" type="info" bordered @click="notifyByClose()">
    左手的缪思
  </be-button>
</template>

<script lang="ts" setup>
import { BeNotification } from 'be-ui'
const notify = BeNotification.service
const notifyByClose = (): void => {
  notify({
    titles: '隔水呼渡',
    msgType: 'info',
    close: true,
    onClose: () => console.log('隔水呼渡,关山无月,龙坑有雨,满亭星月'),
  })
}
</script>
