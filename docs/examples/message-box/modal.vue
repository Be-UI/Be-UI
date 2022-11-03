<template>
  <be-button customClass='mr-4' @click="openMsg" bordered>天峰五云剑</be-button>
</template>
<script lang="tsx" setup>
import { BeMsg } from 'be-ui'
const msgBox = BeMsg.service
const openMsg = (): void => {
  msgBox({
    titles: '天峰五云剑',
    isOpenModal: false,
    bodyRender: () => {
      return (<p style="font-size:14px;font-weight:400;font-family: Microsoft YaHei;letter-spacing: 2px;">
        看那江山如画
      </p>)},
    footerRender: null,
    iconPreRender: null,
    iconNextRender: null,
  })
}
</script>