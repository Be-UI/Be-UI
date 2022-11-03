<template>
  <be-button @click="notifyByIconPreRender()" style="margin-right: 5px" customClass="btn sm:mb-4" type="info" bordered>
    青青边愁
  </be-button>
</template>
<script lang="tsx" setup>
import { BeNotification } from 'be-ui'
const notify = BeNotification.service
const notifyByIconPreRender  = (): void => {
  notify({
    titles:`听听那冷雨`,
    msgType:'warning',
    iconPreRender: <span style="color:red">🐕</span>,
  })
}
</script>
