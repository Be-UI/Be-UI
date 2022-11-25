<template>
  <be-button style="margin-right: 5px" custom-class="btn sm:mb-4" type="info" bordered @click="notifyByPlacement('bottomRight')">
    石器时代(bottomRight)
  </be-button>
  <be-button
    style="margin-right: 5px"
    custom-class="btn sm:mb-4"
    type="info"
    bordered
    @click="notifyByPlacement('bottomLeft')"
  >
    五陵少年(bottomLeft)
  </be-button>
  <be-button style="margin-right: 5px" custom-class="btn sm:mb-4" type="info" bordered @click="notifyByPlacement('topRight')">
    敲打乐(topRight)
  </be-button>
  <be-button style="margin-right: 5px" custom-class="btn sm:mb-4" type="info" bordered @click="notifyByPlacement('topLeft')">
    天狼星(topLeft)
  </be-button>
</template>

<script lang="ts" setup>
import { BeNotification } from 'be-ui'
const notify = BeNotification.service
const notifyByPlacement = (type: string): void => {
  notify({
    titles: `紫荆赋(${type})`,
    description: '无关风月',
    placement: type,
  })
}
</script>
