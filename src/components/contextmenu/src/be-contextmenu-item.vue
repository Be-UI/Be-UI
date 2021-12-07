/*
* @be-contextmenu-item.vue
* @deprecated 右键菜单-菜单内容组件
* @author czh
* @update (czh 2021/4/10)
*/
<template>
  <!--分隔符-->
  <li v-if="divider" class="be-contextmenu-divider"/>
  <!--菜单内容-->
  <li v-else
      :class="classname"
      @click="handleClick"
      @mouseenter="handleMouseenter"
      @mouseleave="handleMouseleave">
    <!-- @slot 插槽内容可以使用常规标签，
    也可以嵌套使用组件 be-contextmenu-item、be-contextmenu-SubMenu
    -->
    <slot/>
  </li>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  ref,
} from "vue";
import {IContextMenu} from "./be-contextmenu-type";

/**
 * 右键菜单公共组件-菜单内容组件
 */
export default defineComponent({
  name: 'BeContextmenuItem',
  emits: [
    'mouseenter',
    'mouseleave',
    'click',
  ],
  props: {
    /**
     * 是否显示分隔符
     */
    divider: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否禁用
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否自动隐藏
     */
    autoHide: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx) {
    const hover = ref<boolean>(false)
    const internalInstance = getCurrentInstance()
    const $$contextmenu = inject('$$contextmenu') as IContextMenu
    const classname = computed(() => {
      return {
        'be-contextmenu-item': !props.divider,
        'be-contextmenu-item__hover': hover.value,
        'be-contextmenu-item__disabled': props.disabled,
      }
    })
    /**
     * 鼠标移入
     * @param {MouseEvent} event 事件对象
     */
    const handleMouseenter = (event: MouseEvent): void => {
      //禁用返回
      if (props.disabled) return
      //hover效果
      hover.value = true
      /** 用户的自定义 contextmenu触发事件
       * @event contextmenu
       * @param {Object} 出发的虚拟节点对象
       */
      /**
       * 菜单鼠标移入事件
       * @event mouseenter
       * @param {Object} 当前节点上下文
       * @param {Event} 事件对象
       */
      ctx.emit('mouseenter', internalInstance, event)
    }
    /**
     * 鼠标移出
     * @param {MouseEvent} event 事件对象
     */
    const handleMouseleave = (event: MouseEvent): void => {
      //禁用返回
      if (props.disabled) return
      //hover效果
      hover.value = false
      /**
       * 菜单鼠标移出事件
       * @event mouseleave
       * @param {Object} 当前节点上下文
       * @param {Event} 事件对象
       */
      ctx.emit('mouseleave', internalInstance, event)
    }
    /**
     * 处理点击
     * @param {MouseEvent} event 事件对象
     */
    const handleClick = (event: MouseEvent): void => {
      //禁用返回
      if (props.disabled) return
      /**
       * 右键菜单点击事件
       * @event click
       * @param {Object} 当前节点上下文
       * @param {Event} 事件对象
       */
      ctx.emit('click', internalInstance, event)
      //如果自动隐藏设置，就调用父组件隐藏方法
      props.autoHide && $$contextmenu.proxy.hide()
    }
    return {
      classname,
      handleClick,
      handleMouseleave,
      handleMouseenter,
    }
  }
})

</script>
