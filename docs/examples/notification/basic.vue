<template>
  <be-button style="margin-right: 5px" custom-class="sm:mb-4" type="success" @click="msgByType('success')">
    乡愁(success)
  </be-button>
  <be-button
    style="margin-right: 5px"
    custom-class="sm:mb-4"
    type="info"
    bordered
    @click="msgByType('info')"
  >
    天国的夜市(info)
  </be-button>
  <be-button style="margin-right: 5px" custom-class="sm:mb-4" type="warning" @click="msgByType('warning')">
    白玉苦瓜(warning)
  </be-button>
  <be-button style="margin-right: 5px" custom-class="sm:mb-4" type="error" @click="msgByType('error')">
    隔水观音(error)
  </be-button>
</template>

<script lang="ts" setup>
import { BeNotification } from 'be-ui'
const notify = BeNotification.service
const msgByType = (type: string): void => {
  notify({
    titles: `与永恒拔河(${type})`,
    description: '无关风月',
    msgType: type,
  })
}
</script>
