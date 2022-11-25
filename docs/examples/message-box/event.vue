<template>
  <be-button custom-class="mr-4" bordered @click="openMsg">
    逍遥
  </be-button>
</template>

<script lang="tsx" setup>
import { BeMsg } from 'be-ui'
const msgBox = BeMsg.service
const openMsg = (): void => {
  msgBox({
    titles: '逍遥',
    onConfirm: () => console.log('北冥有鱼，其名为鲲。鲲之大，不知其几千里也；化而为鸟，其名为鹏。鹏之背，不知其几千里也；怒而飞，其翼若垂天之云。'),
    onClose: () => console.log('化而为鸟，其名为鹏。鹏之背，不知其几千里也；怒而飞，其翼若垂天之云'),
    bodyRender: () => {
      return (<p style="font-size:14px;font-weight:400;font-family: Microsoft YaHei;letter-spacing: 2px;">
        卑身而伏，以候敖者；东西跳梁，不辟高下；中于机辟，死于罔罟。
      </p>)
    },
    footerRender: null,
    iconPreRender: null,
    iconNextRender: null,
  })
}
</script>
