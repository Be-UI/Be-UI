<template>
  <be-button @click="msgByType('success')" style="margin-right: 5px" customClass="sm:mb-4" type="success">
    朝花夕拾(success)
  </be-button>
  <be-button @click="msgByType('info')" style="margin-right: 5px" customClass="sm:mb-4" type="info"
             bordered>花边文学(info)
  </be-button>
  <be-button @click="msgByType('warning')" style="margin-right: 5px" customClass="sm:mb-4" type="warning">
    热风(warning)
  </be-button>
  <be-button @click="msgByType('error')" style="margin-right: 5px" customClass="sm:mb-4" type="error">
    三闲集(error)
  </be-button>
</template>
<script lang="ts" setup>
import { BeMessage } from 'be-ui'
const message = BeMessage.service
const msgByType = (type: string): void => {
  message({
    titles: `准风月谈(${type})`,
    msgType: type,
    offsetTop: 60,
  })
}
</script>
