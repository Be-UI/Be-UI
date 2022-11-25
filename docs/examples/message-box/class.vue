<template>
  <be-button custom-class="mr-4" bordered @click="openMsg">
    离渊
  </be-button>
</template>

<script lang="tsx" setup>
import { BeMsg } from 'be-ui'
const msgBox = BeMsg.service
const openMsg = (): void => {
  msgBox({
    titles: '离渊',
    customClass: 'custom-class-msg',
    bodyRender: () => {
      return (<p style="font-size:14px;font-weight:400;font-family: Microsoft YaHei;letter-spacing: 2px;">
        春梦了无痕
      </p>)
    },
    footerRender: null,
    iconPreRender: null,
    iconNextRender: null,
  })
}
</script>
