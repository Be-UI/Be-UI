<template>
  <div class="flex">
    <be-switch size="default" v-model="defaultSwitch" :is-loading="loading"></be-switch>
  </div>

</template>
<script setup>
import {ref} from "vue";

const defaultSwitch = ref(false)
const loading = ref(true)
</script>
