<template>
  <be-button @click="notifyByUpdate()" style="margin-right: 5px"  bordered>不可儿戏</be-button>
  <be-button @click="updateMsg()" style="margin-right: 5px"  bordered>update</be-button>
</template>
<script lang="ts" setup>
import { BeNotification } from 'be-ui'
const notify = BeNotification.service
const notifyByUpdate = ():void =>{
  notify({
    titles:`守夜人(点击更新按钮)`,
    msgType:'info',
    key:'notifyByUpdate',
  })

}

const updateMsg = ():void =>{
  notify({
    titles:`温夫人的扇子`,
    msgType:'warning',
    key:'notifyByUpdate'
  })
}
</script>
