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
import { BeNotification } from 'be-ui'
const notify = BeNotification.service
const msgByType = (type: string): void => {
  notify({
    titles:`与永恒拔河(${type})`,
    description:`无关风月`,
    msgType:type,
  })
}
</script>
