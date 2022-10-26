<template>
  <div class="flex items-center">
    <be-switch size="default"
               checkedValue="剑来"
               unCheckedValue="剑去"
               v-model="defaultSwitch">
    </be-switch>
    <span style="margin-left: 4px">{{defaultSwitch}}</span>
  </div>

</template>
<script setup>
import {ref} from "vue";

const defaultSwitch = ref('剑来')
</script>
