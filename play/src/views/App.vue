<template>
  <be-button @click="msgByType('success')" style="margin-right: 5px" customClass="sm:mb-4" type="success">
    乡愁(success)
  </be-button>
  <be-button @click="msgByType('info')" style="margin-right: 5px" customClass="sm:mb-4" type="info"
             bordered>天国的夜市(info)
  </be-button>
  <be-button @click="msgByType('warning')" style="margin-right: 5px" customClass="sm:mb-4" type="warning">
    白玉苦瓜(warning)
  </be-button>
  <be-button @click="msgByType('error')" style="margin-right: 5px" customClass="sm:mb-4" type="error">
    隔水观音(error)
  </be-button>
</template>
<script lang="ts" setup>
import { BeNotification, BeMessage } from '@be-ui/components'
const notify = BeNotification.service
const msgByType = (type: string): void => {
  notify({
    titles:`与永恒拔河(${type})`,
    description:`无关风月`,
    msgType:type,
    duration: 9999999
  })
}


const message = BeMessage.service
message({
  titles: `准风月谈()`,
  msgType:'info',
  duration: 9999999
})
</script>
<style lang="scss">
@import "../../../play/src/test.css";
</style>