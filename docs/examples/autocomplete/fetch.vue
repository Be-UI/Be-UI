<template>
  <div class="exp-input">
  <be-autocomplete
      :fetchSuggestions="fetchSuggestions"
      keyValue="id"
      labelValue="label"
      :focusTrigger="false"
      v-model="baseVal">
  </be-autocomplete>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
const fetchSuggestions = (cb:Function):void =>{
  setTimeout(()=>{
    cb([
      {id:'赵客缦胡缨，吴钩霜雪明。',label:'赵客缦胡缨，吴钩霜雪明。'},
      {id:'银鞍照白马，飒沓如流星。',label:'银鞍照白马，飒沓如流星。'},
      {id:'十步杀一人，千里不留行。',label:'十步杀一人，千里不留行。'},
      {id:'事了拂衣去，深藏身与名。',label:'事了拂衣去，深藏身与名。'},
    ])
  },2000)

}

const baseVal = ref<{id:string,label:string}>( {id:'十步杀一人，千里不留行',label:'十步杀一人，千里不留行'},)
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