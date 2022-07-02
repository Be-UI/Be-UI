<template>
  <div class="bg-pink-50 relative flex justify-center items-center" style="width: 300px;height: 300px" v-contextmenu:disabledContextmenuItemSub>
    右键点我~
    <be-contextmenu ref="disabledContextmenuItemSub">
      <be-contextmenu-item>莫向城头听漏点。说与行人，默默情千万。</be-contextmenu-item>
      <be-contextmenu-sub-menu disabled title="作者" >
        <be-contextmenu-item >
          辛弃疾
        </be-contextmenu-item>
      </be-contextmenu-sub-menu>
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