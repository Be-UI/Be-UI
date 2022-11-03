<template>
  <be-button customClass='mr-4' @click="openMsg('info')" bordered type="info">秋词</be-button>
</template>
<script lang="tsx" setup>
import { BeMsg } from 'be-ui'
const msgBox = BeMsg.service
const openMsg = (type: string): void => {
  msgBox({
    titles: type,
    msgType: type,
    footerRender: () => <div>刘禹锡</div>,
    iconPreRender: () => <div>❥(^_-)</div>,
    iconNextRender: () => <div>❤</div>,
    bodyRender: () => {
      return (<p style="font-size:14px;font-weight:400;font-family: Microsoft YaHei;letter-spacing: 2px;">
        自古逢秋悲寂寥，我言秋日胜春朝。
        晴空一鹤排云上，便引诗情到碧霄。
      </p>)
    },
  })
}
</script>