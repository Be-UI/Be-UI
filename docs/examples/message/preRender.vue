<template>
  <be-button
    style="margin-right: 5px"
    bordered
    @click="msgByIconPreRender()"
  >
    萧萧
  </be-button>
</template>

<script lang="tsx" setup>
import { BeMessage } from 'be-ui'
const message = BeMessage.service
const msgByIconPreRender = (): void => {
  message({
    titles: '烛虚',
    msgType: 'warning',
    iconPreRender: <span style="color:red">🍃</span>,
  })
}
</script>
