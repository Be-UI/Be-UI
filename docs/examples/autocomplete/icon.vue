<template>
  <div class="exp-input">
  <be-autocomplete
      :suggestionList="baseList"
      keyValue="id"
      labelValue="label"
      :focusTrigger="false"
      v-model="baseVal">
    <template #prev>
      <span style="margin: 0 4px">❀</span>
    </template>
    <template #next>
      <span style="margin: 0 4px">🐕</span>
    </template>
  </be-autocomplete>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
const baseList = ref<Array<{id:string,label:string}>>([
  {id:'荷风送香气',label:'荷风送香气'},
  {id:'竹露滴清响',label:'竹露滴清响'},
  {id:'当时明月在',label:'当时明月在'},
  {id:'曾照彩云归',label:'曾照彩云归'},
])

const baseVal = ref<{id:string,label:string}>( {id:'曾照彩云归',label:'曾照彩云归'},)
</script>
<style lang="scss">
.exp-input{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .be-input{
    width: 300px;
    margin: 0 6px;
  }
}
</style>