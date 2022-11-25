<template>
  <be-button style="margin-right: 5px" custom-class="sm:mb-4" type="success" @click="msgByType('success')">
    朝花夕拾(success)
  </be-button>
  <be-button
    style="margin-right: 5px"
    custom-class="sm:mb-4"
    type="info"
    bordered
    @click="msgByType('info')"
  >
    花边文学(info)
  </be-button>
  <be-button style="margin-right: 5px" custom-class="sm:mb-4" type="warning" @click="msgByType('warning')">
    热风(warning)
  </be-button>
  <be-button style="margin-right: 5px" custom-class="sm:mb-4" type="error" @click="msgByType('error')">
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
  })
}
</script>
