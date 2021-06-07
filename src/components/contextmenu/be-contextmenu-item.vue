/*
* @be-contextmenu-item.vue
* @deprecated 右键菜单-菜单内容组件
* @author czh
* @update (czh 2021/4/10)
*/
<template>
  <!--分隔符-->
  <li v-if="divider" class="Be-contextmenu-divider"/>
  <!--菜单内容-->
  <li v-else
    :class="classname"
    @click="handleClick"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave">
    <!-- @slot 插槽内容可以使用常规标签，
    也可以嵌套使用组件 be-contextmenu-item、be-contextmenu-Submenu
    -->
    <slot />
  </li>
</template>

<script>
  /**
   * 右键菜单公共组件-菜单内容组件
   */
  export default {
    name: 'BeContextmenuItem',
    inject: ['$$contextmenu'],
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

    data () {
      return {
        hover: false,
      }
    },
    computed: {
      classname () {
        return {
          'Be-contextmenu-item': !this.divider,
          'Be-contextmenu-item--hover': this.hover,
          'Be-contextmenu-item--disabled': this.disabled,
        }
      },
    },

    methods: {
      /**
       * 鼠标移入
       * @param {Event} event 事件对象
       */
      handleMouseenter (event) {
        //禁用返回
        if (this.disabled) return
        //hover效果
        this.hover = true
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
        this.$emit('mouseenter', this, event)
      },
      /**
       * 鼠标移出
       * @param {Event} event 事件对象
       */
      handleMouseleave (event) {
        //禁用返回
        if (this.disabled) return
        //hover效果
        this.hover = false
        /**
         * 菜单鼠标移出事件
         * @event mouseleave
         * @param {Object} 当前节点上下文
         * @param {Event} 事件对象
         */
        this.$emit('mouseleave', this, event)
      },
      /**
       * 处理点击
       * @param {Event} event 事件对象
       */
      handleClick (event) {
        //禁用返回
        if (this.disabled) return
        /**
         * 右键菜单点击事件
         * @event click
         * @param {Object} 当前节点上下文
         * @param {Event} 事件对象
         */
        this.$emit('click', this, event)
        //如果没有自动隐藏设置，就调用父组件隐藏方法
        this.autoHide && this.$$contextmenu.hide()
      },
    },
  }
</script>
<docs>
  ## 事例
  配合be-contextmenu、be-contextmenu-submenu使用实现右键菜单:
  ```jsx
  <be-context-menu ref="contextmenu" :theme="'violet'">
    <be-contextmenu-item @click='copy' >复制</be-contextmenu-item>
    <be-contextmenu-submenu  title="发送" v-show="menuConfig.send">
      <be-contextmenu-item @click="jumpToOther('/browser','browser')" >浏览器</be-contextmenu-item>
      <be-contextmenu-item @click="jumpToOther('/analysis','analysis')">调查分析 </be-contextmenu-item>
      <be-contextmenu-item @click="openTrack" >地址监控</be-contextmenu-item>
      <be-contextmenu-item @click="jumpToOther('/investigation','investigation')" >调证分析</be-contextmenu-item>
      <be-contextmenu-item @click="jumpToOther('/debug/createDebug','createDebug')" >一键调证</be-contextmenu-item>
    </be-contextmenu-submenu>
  </be-context-menu>
  ```
</docs>