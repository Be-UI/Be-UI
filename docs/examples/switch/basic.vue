<template>
  <div class="flex">
    <be-switch size="small" v-model="smallSwitch" customClass="mr-4"></be-switch>
    <be-switch size="default" v-model="defaultSwitch" customClass="mr-4"></be-switch>
    <be-switch size="large" v-model="largeSwitch" customClass="mr-4"></be-switch>
  </div>

</template>
<script setup>
import {ref} from "vue";

const smallSwitch = ref(false)
const defaultSwitch = ref(false)
const largeSwitch = ref(false)

</script>