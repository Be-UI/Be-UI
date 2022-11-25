<template>
  <be-button
    style="margin-right: 5px"
    custom-class="btn sm:mb-4"
    bordered
    type="info"
    @click="notifyByOffsetTop(60)"
  >
    梦与地理(60)
  </be-button>
  <be-button
    style="margin-right: 5px"
    custom-class="btn sm:mb-4"
    type="info"
    bordered
    @click="notifyByOffsetBottom(80)"
  >
    安石榴(80))
  </be-button>
  <be-button
    style="margin-right: 5px"
    custom-class="btn sm:mb-4"
    bordered
    type="info"
    @click="notifyByOffsetTop(120)"
  >
    五行无阻(120)
  </be-button>
</template>

<script lang="ts" setup>
import { BeNotification } from 'be-ui'
const notify = BeNotification.service
const notifyByOffsetTop = (offsetTop: number): void => {
  notify({
    titles: `藕神(${offsetTop})`,
    msgType: 'info',
    offsetTop,
  })
}

const notifyByOffsetBottom = (offsetBottom: number): void => {
  notify({
    titles: `高楼对海(${offsetBottom})`,
    msgType: 'info',
    placement: 'bottomRight',
    offsetBottom,
  })
}
</script>
