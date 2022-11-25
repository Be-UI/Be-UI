<template>
  <be-button style="margin-right: 5px" custom-class="btn sm:mb-4" type="info" bordered @click="notifyByBodyRender()">
    枫和雪
  </be-button>
</template>

<script lang="tsx" setup>
import { BeNotification } from 'be-ui'
const notify = BeNotification.service
const notifyByBodyRender = (): void => {
  notify({
    titles: '如果远方有战争',
    msgType: 'warning',
    bodyRender: () => <span>❥(^_-)</span>,
  })
}
</script>
