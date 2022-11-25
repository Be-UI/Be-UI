<template>
  <be-button style="margin-right: 5px" custom-class="btn sm:mb-4" type="info" bordered @click="notifyByLoading()">
    当我死时
  </be-button>
</template>

<script lang="tsx" setup>
import { BeNotification } from 'be-ui'
const notify = BeNotification.service
const notifyByLoading = (): void => {
  notify({
    titles: '新月和孤星',
    msgType: 'error',
    key: 'notifyByLoading',
    loading: true,
  })
}
</script>
