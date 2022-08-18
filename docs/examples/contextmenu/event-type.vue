<template>
  <div class="bg-pink-50 relative flex justify-center items-center" style="width: 300px;height: 300px"
       v-contextmenu:clickContextmenu>
    左键点我~
    <be-contextmenu ref="clickContextmenu" eventType="click" >
      <be-contextmenu-item>听风听雨小窗眠。过了春光太半</be-contextmenu-item>
      <be-contextmenu-item>往事如寻去鸟，清愁难解连环。</be-contextmenu-item>
      <be-contextmenu-item>流莺不肯入西园。唤起画梁飞燕。</be-contextmenu-item>
    </be-contextmenu>

  </div>
</template>
<script>
import {contextmenu} from "@be-ui/utils/index.ts"

import {defineComponent} from "vue";
export default defineComponent({
  directives: {contextmenu},
})


</script>