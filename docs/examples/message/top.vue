<template>
  <be-button @click="msgByOffsetTop(60)" style="margin-right: 5px"
             bordered>南腔北调集(60)
  </be-button>
  <be-button @click="msgByOffsetTop(80)" style="margin-right: 5px"
             bordered>华盖集续编(80))
  </be-button>
  <be-button @click="msgByOffsetTop(120)" style="margin-right: 5px"
             bordered>且介亭杂文(120)
  </be-button>
</template>
<script lang="ts" setup>
import { BeMessage } from 'be-ui'
const message = BeMessage.service
const msgByOffsetTop = (offsetTop: string): void => {
  message({
    titles: `俄罗斯的童话(${offsetTop})`,
    msgType: 'info',
    offsetTop: offsetTop,
  })
}
</script>
