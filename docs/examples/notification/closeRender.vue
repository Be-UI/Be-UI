<template>
  <be-button style="margin-right: 5px" custom-class="btn sm:mb-4" type="info" bordered @click="notifyByCloseRender()">
    望乡的牧神
  </be-button>
</template>

<script lang="tsx" setup>
import { BeNotification } from 'be-ui'
const notify = BeNotification.service
const notifyByCloseRender = (): void => {
  notify({
    titles: '等你，在雨中',
    msgType: 'warning',
    closeRender: <span style="color:red">🐕</span>,
  })
}
</script>
