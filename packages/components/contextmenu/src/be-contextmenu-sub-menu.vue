/* * @be-contextmenu--submenu.vue * @deprecated 右键菜单-菜单子菜单容器组件
使用时配合Contextmenu.vue和ContextmenuItem.vue * @author czh * @update (czh 2021/4/10) */
<template>
  <li :class="classname" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
    <span class="be-contextmenu--submenu__title">
      <slot name="title">{{ title }}</slot>
      <!-- <span class="be-contextmenu__iconfont be-contextmenu--submenu__icon" /> -->
    </span>
    <div v-show="hover" ref="submenu" :class="submenuCls">
      <ul>
        <!-- @slot 插槽 嵌套使用组件 be-contextmenu-item、be-contextmenu--submenu-->
        <slot />
      </ul>
    </div>
  </li>
</template>

<script lang="ts">
  import { computed, defineComponent, getCurrentInstance, nextTick, ref } from 'vue'
  import { IContextMenu } from './be-contextmenu-type'

  /**
   * 右键菜单公共组件-子菜单内容容器组件
   */
  export default defineComponent({
    name: 'BeContextmenuSubMenu',
    props: {
      /**
       * 是否禁用
       */
      disabled: {
        type: Boolean,
        default: false,
      },
      /**
       * 子菜单名称
       */
      title: {
        type: String,
        default: '',
      },
    },
    emits: ['mouseenter', 'mouseleave'],
    setup(props, ctx) {
      const hover = ref<boolean>(false)
      const submenuPlacement = ref<Array<any>>([])
      const internalInstance = getCurrentInstance() as IContextMenu
      const classname = computed(() => {
        return {
          'be-contextmenu--item': true,
          'be-contextmenu--submenu': true,
          'be-contextmenu--item__hover': hover.value,
          'be-contextmenu--item__disabled': props.disabled,
        }
      })
      const submenuCls = computed(() => {
        return ['be-contextmenu', ...submenuPlacement.value]
      })
      /**
       * 鼠标移入子菜单方法方法
       * @param {MouseEvent} event 事件对象
       */
      const handleMouseenter = (event: MouseEvent): void => {
        //禁用直接返回
        if (props.disabled) return
        const { target } = event
        //获取事件元素相对于浏览器视窗位置
        const targetDimension = (target as HTMLElement).getBoundingClientRect()
        //hover效果
        hover.value = true
        /** 鼠标移入方法
         * @event mouseenter
         * @param {Event} event - 事件对象
         */
        ctx.emit('mouseenter', internalInstance, event)

        nextTick(() => {
          //获取submenu Ul标签宽高
          const internalInstanceSubMenu = internalInstance.refs.submenu as Element
          const submenuWidth: number = internalInstanceSubMenu.clientWidth
          const submenuHeight: number = internalInstanceSubMenu.clientHeight
          const submenuPlacementInner: Array<string> = []
          //适应展示不同位置的子菜单 并设置相应的class样式
          if (targetDimension.right + submenuWidth >= window.innerWidth) {
            submenuPlacementInner.push('left')
          } else {
            submenuPlacementInner.push('right')
          }
          if (targetDimension.bottom + submenuHeight >= window.innerHeight) {
            submenuPlacementInner.push('bottom')
          } else {
            submenuPlacementInner.push('top')
          }

          submenuPlacement.value = submenuPlacementInner
        })
      }
      /**
       * 鼠标移出子菜单方法方法
       * @param {MouseEvent} event 事件对象
       */
      const handleMouseleave = (event: MouseEvent): void => {
        if (props.disabled) return
        hover.value = false
        /** 鼠标移入方法
         * @event mouseleave
         * @param {Event} event - 事件对象
         */
        ctx.emit('mouseleave', internalInstance, event)
      }
      return {
        hover,
        classname,
        submenuCls,
        handleMouseenter,
        handleMouseleave,
      }
    },
  })
</script>
