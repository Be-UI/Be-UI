<template>
  <be-button customClass='mr-4' @click="openMsg()" bordered>无痕剑意</be-button>
</template>
<script lang="tsx" setup>
import { BeMsg } from 'be-ui'
const msgBox = BeMsg.service
const openMsg = (): void => {
  msgBox({
    titles: '无痕剑意',
    isDrag: true,
    footerRender: null,
    iconPreRender: null,
    iconNextRender: null,
    bodyRender: () => {
      return (<p style="font-size:14px;font-weight:400;font-family: Microsoft YaHei;letter-spacing: 2px;">
        一剑破万甲
      </p>)
    },
  })
}
</script>