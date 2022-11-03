<template>
  <be-button @click="notifyByOffsetTop(60)" style="margin-right: 5px" customClass="btn sm:mb-4" bordered
             type="info">梦与地理(60)
  </be-button>
  <be-button @click="notifyByOffsetBottom(80)" style="margin-right: 5px" customClass="btn sm:mb-4" type="info"
             bordered>安石榴(80))
  </be-button>
  <be-button @click="notifyByOffsetTop(120)" style="margin-right: 5px" customClass="btn sm:mb-4" bordered
             type="info">五行无阻(120)
  </be-button>
</template>
<script lang="ts" setup>
import { BeNotification } from 'be-ui'
const notify = BeNotification.service
const notifyByOffsetTop  = (offsetTop: number): void => {
  notify({
    titles: `藕神(${offsetTop})`,
    msgType: 'info',
    offsetTop: offsetTop,
  })
}

const notifyByOffsetBottom = (offsetBottom: number): void => {
  notify({
    titles: `高楼对海(${offsetBottom})`,
    msgType: 'info',
    placement: 'bottomRight',
    offsetBottom: offsetBottom,
  })
}
</script>
