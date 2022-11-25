<template>
  <be-button custom-class="mr-4" type="warning" @click="openMsg('warning')">
    云台三落（warning）
  </be-button>
  <be-button custom-class="mr-4" bordered type="info" @click="openMsg('info')">
    （info）飞燕啄月
  </be-button>
  <be-button custom-class="mr-4" type="success" @click="openMsg('success')">
    苍龙出水（success）
  </be-button>
  <be-button custom-class="mr-4" type="error" @click="openMsg('error')">
    （error）风雷一剑
  </be-button>
</template>

<script lang="tsx" setup>
import { BeMsg } from 'be-ui'
const msgBox = BeMsg.service
const openMsg = (type: string): void => {
  msgBox({
    titles: type,
    msgType: type,
    footerRender: null,
    iconPreRender: null,
    iconNextRender: null,
    bodyRender: () => {
      return (<p style="font-size:14px;font-weight:400;font-family: Microsoft YaHei;letter-spacing: 2px;">
        消灭人类暴政，世界属于三体！
      </p>)
    },
  })
}
</script>
