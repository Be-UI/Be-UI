<template>
  <be-button @click="notifyByBodyRender()" style="margin-right: 5px" customClass="btn sm:mb-4" type="info" bordered>
    枫和雪
  </be-button>
</template>
<script lang="tsx" setup>
import { BeNotification } from 'be-ui'
const notify = BeNotification.service
const notifyByBodyRender  = (): void => {
  notify({
    titles:`如果远方有战争`,
    msgType:'warning',
    bodyRender: ()=><span>❥(^_-)</span>,
  })
}
</script>
