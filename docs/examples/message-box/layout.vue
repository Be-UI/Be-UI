<template>
  <be-button customClass='mr-4' @click="openMsg" bordered>和光同尘</be-button>
</template>
<script lang="tsx" setup>
import { BeMsg } from 'be-ui'
const msgBox = BeMsg.service
const openMsg = (): void => {
  msgBox({
    titles: '和光同尘',
    footerType: 'right',
    bodyRender: () => {
      return (<p style="font-size:14px;font-weight:400;font-family: Microsoft YaHei;letter-spacing: 2px;">
        太上曰：祸福无门，惟人自召；善恶之报，如影随形。是以天地有司过之神，依人所犯轻重，以夺人算。算减则贫耗，多逢忧患，人皆恶之，刑祸随之，吉庆避之，恶星灾之，算尽则死。
      </p>)
    },
    footerRender: null,
    iconPreRender: null,
    iconNextRender: null,
  })
}
</script>