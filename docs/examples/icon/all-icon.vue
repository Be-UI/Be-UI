<template>
    <div class="w-full grid grid-cols-4 gap-2">
      <div v-for="item in iconNameList"
           title="点击复制"
           @click="copy(item)"
           class="flex items-center justify-center font-mono flex-col cursor-pointer border-1 rounded shadows icon-items"
           :key="item + 'keys'">
        <be-icon :icon="item" width="25" height="25"></be-icon>
        <p class="mt-4">{{item}}</p>
      </div>
    </div>
</template>

<script setup>
import {ref } from 'vue'
import {BeMessage} from '../../../dist/index.esm.js'
import svgDict from '../../utils/svg-dict'
const iconNameList = ref(Object.keys(svgDict).sort())
const message = BeMessage.service
const copy = (name) =>{
  let oInput = document.createElement('input')
  oInput.value = name;
  document.body.appendChild(oInput)
  oInput.select()
  document.execCommand("Copy")
  oInput.style.display = 'none'
  document.body.removeChild(oInput)
  message({
    closeRender: undefined,
    compType: "",
    iconPreRender: undefined,
    titles: `复制成功`,
    msgType: 'success'
  })
}
</script>

<style>
.gap-2 {
  grid-gap: 0.5rem;
  gap: 0.5rem;
}
.grid {
  display: -ms-grid;
  display: grid;
}
.grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.border-1 {
  border-width: 1px;
}
.rounded {
  border-radius: 0.25rem;
  padding: 1rem;
}
.icon-items{
  background: #fff;
}
.icon-items:hover{
  transform: scale(1.3);
  transition: all .3s;
}
</style>