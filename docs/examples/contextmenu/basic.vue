<template>
  <div class="bg-pink-50 relative flex justify-center items-center" style="width: 300px;height: 300px"
       v-contextmenu:baseContextmenu>
    右键点我~
    <be-contextmenu ref="baseContextmenu">
      <be-contextmenu-item>宝马雕车香满路</be-contextmenu-item>
      <be-contextmenu-item>凤箫声动，玉壶光转</be-contextmenu-item>
      <be-contextmenu-item>一夜鱼龙舞</be-contextmenu-item>
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