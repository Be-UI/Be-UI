<template>
  <div class="bg-pink-50 relative flex justify-center items-center" style="width: 300px;height: 300px" v-contextmenu:autoHideContextmenuItem>
    右键点我~
    <be-contextmenu ref="autoHideContextmenuItem">
      <be-contextmenu-item :autoHide="true" >醉里挑灯看剑，梦回吹角连营。</be-contextmenu-item>
      <be-contextmenu-item :autoHide="false" >八百里分麾下炙，五十弦翻塞外声。沙场秋点兵。</be-contextmenu-item>
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