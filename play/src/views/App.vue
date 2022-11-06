<template>
  <be-button @click="notifyByPlacement('bottomRight')" style="margin-right: 5px" customClass="btn sm:mb-4" type="info" bordered>
    石器时代(bottomRight)
  </be-button>
  <be-button @click="notifyByPlacement('bottomLeft')" style="margin-right: 5px" customClass="btn sm:mb-4" type="info"
             bordered>五陵少年(bottomLeft)
  </be-button>
  <be-button @click="notifyByPlacement('topRight')" style="margin-right: 5px" customClass="btn sm:mb-4" type="info" bordered>
    敲打乐(topRight)
  </be-button>
  <be-button @click="notifyByPlacement('topLeft')" style="margin-right: 5px" customClass="btn sm:mb-4" type="info" bordered>
    天狼星(topLeft)
  </be-button>
</template>
<script lang="ts" setup>
import { BeNotification } from '@be-ui/components'
const notify = BeNotification.service
const notifyByPlacement = (type: string): void => {
  notify({
    titles: `紫荆赋(${type})`,
    description: '无关风月',
    placement: type,
    // duration:999999999
  })
}
</script>
