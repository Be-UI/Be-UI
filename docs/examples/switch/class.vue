<template>
  <div class="flex">
    <be-switch size="default" v-model="defaultSwitch" customClass="custom-class--switch"></be-switch>
  </div>

</template>
<script setup>
import {ref} from "vue";

const defaultSwitch = ref(false)
</script>
<style lang="css">
.custom-class--switch{
  background: #ffcced;
}

</style>