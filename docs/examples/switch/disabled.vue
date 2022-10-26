<template>
  <div class="flex">
    <be-switch size="default" v-model="defaultSwitch" disabled customClass="mr-4"></be-switch>
  </div>

</template>
<script setup>
import {ref} from "vue";

const defaultSwitch = ref(false)
</script>
