<template>
  <be-button @click="msgByClose()" style="margin-right: 5px"
             bordered>云南看云集
  </be-button>
</template>
<script lang="ts" setup>
import { BeMessage } from 'be-ui'
const message = BeMessage.service
const msgByClose = (): void => {
  message({
    titles: `湘行散记`,
    msgType: 'info',
    close: true,
    offsetTop: 60,
    onClose: () => console.log('我行过许多地方的桥,看过许多次数的云,喝过许多种类的酒,却只爱过一个正当最好年龄的人'),
  })
}
</script>
