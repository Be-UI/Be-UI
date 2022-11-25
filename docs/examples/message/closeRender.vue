<template>
  <be-button
    style="margin-right: 5px"
    bordered
    @click="msgByClosePreRender()"
  >
    不知为什么忽然爱上你
  </be-button>
</template>

<script lang="tsx" setup>
import { BeMessage } from 'be-ui'
const message = BeMessage.service
const msgByClosePreRender = (): void => {
  message({
    titles: '蜜柑',
    msgType: 'warning',
    closeRender: <span style="color:red">🪷</span>,
  })
}
</script>
