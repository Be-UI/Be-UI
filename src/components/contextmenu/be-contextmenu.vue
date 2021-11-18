/*
* @be-contextmenu.vue
* @deprecated 右键菜单-菜单容器组件
* @author czh
* @update (czh 2021/4/10)
*/
<template>
  <ul v-show="visible"
      ref="contextmenu"
      :class="contextmenuCls"
      :style="style">
    <!-- @slot 插槽请使用组件 be-contextmenu-item.vue-->
    <slot/>
  </ul>
</template>

<script>
/**
 * 右键菜单-菜单容器组件
 */
export default {
  name: 'BeContextmenu',
  //把当前组件实例上下文传递给子组件使用
  provide() {
    return {
      $$contextmenu: this,
    }
  },

  props: {
    /**
     * 触发显示事件类型，默认是右键触发类型
     */
    eventType: {
      type: String,
      default: 'contextmenu',
    },
    /**
     * 主题
     */
    theme: {
      type: String,
      default: 'default',
    },
    /**
     * 开启自动位置适应
     * @values false true
     */
    autoPlacement: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否禁用
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      //是否显示
      visible: false,
      //上下文缓存
      references: [],
      //位置设置
      style: {
        top: 0,
        left: 0,
      },
    }
  },
  computed: {
    //点击空白关闭
    clickOutsideHandler() {
      return this.visible ? this.hide : () => {
      }
    },
    //是否点击
    isClick() {
      return this.eventType === 'click'
    },
    //主题内容class 设置
    contextmenuCls() {
      return [
        'Be-contextmenu',
        `Be-contextmenu--${this.theme}`,
      ]
    },
  },

  watch: {
    /**
     * 触发显示
     * @param {Boolean} value - 显示标记
     */
    visible(value) {
      if (value) {
        /** 显示时提交触发show事件
         * @event show
         * @param {Object} 当前be-contextmenu组件上下文
         */
        this.$emit('show', this)
        document.body.addEventListener('click', this.handleBodyClick)
        document.body.addEventListener('mousedown', this.handleBodyClick)
        document.body.addEventListener('mousewheel', this.handleBodyClick)
      } else {
        /** 隐藏时提交触发 hide 事件
         * @event hide
         * @param {Object} 当前be-contextmenu组件上下文
         */
        this.$emit('hide', this)
        document.body.removeEventListener('click', this.handleBodyClick)
        document.body.removeEventListener('mousedown', this.handleBodyClick)
        document.body.removeEventListener('mousewheel', this.handleBodyClick)
      }
    },
  },
  mounted() {
    document.body.appendChild(this.$el)
    //在window上根据 $beContextmenuId 设置当前组件实例上下文
    //多个右键菜单 和 动态菜单时用于区分
    this.$nextTick(() => {
      if (window.$BeContextmenu) {
        window.$BeContextmenu[this.$beContextmenuId] = this
      } else {
        window.$BeContextmenu = {[this.$beContextmenuId]: this}
      }
    })

  },
  beforeDestroy() {
    //销毁是移除节点
    document.body.removeChild(this.$el)
    //销毁是移除 window上指向
    delete window.$BeContextmenu[this.$beContextmenuId]
    //遍历references 移除右键事件
    this.references.forEach((ref) => {
      ref.el.removeEventListener(this.eventType, this.handleReferenceContextmenu)
    })
    //销毁是移除 点击空白事件监听
    document.body.removeEventListener('click', this.handleBodyClick)
    document.body.removeEventListener('mousedown', this.handleBodyClick)
    document.body.removeEventListener('mousewheel', this.handleBodyClick)

  },

  methods: {
    /**
     * 给触发dom添加 右键事件，并缓存记录
     * @param {Object} ref - 节点对象
     */
    addRef(ref) {
      // 给触发dom添加 右键事件，并缓存记录
      this.references.push(ref)
      ref.el.addEventListener(this.eventType, this.handleReferenceContextmenu)
    },
    /**
     * 处理右键点击方法
     * @param {Event} event - 事件对象
     */
    handleReferenceContextmenu(event) {
      event.preventDefault()
      if (this.disabled) return
      const rootDom = document.getElementById('app')
      //根据事件对象元素 获取到缓存的事件对象元素的vnode 和 dom对象
      const reference = this.references.find(ref => {
        // 这里是兼容ie
        ref.el.contains = rootDom.contains
        return ref.el.contains(event.target)
      })
      /** 用户的自定义 contextmenu触发事件
       * @event contextmenu
       * @param {Object} 出发的虚拟节点对象
       */
      this.$emit('contextmenu', reference ? reference.vnode : null)
      //获取事件位置坐标
      const eventX = event.pageX
      const eventY = event.pageY
      //显示
      this.show()
      this.$nextTick(() => {
        const contextmenuPosition = {
          top: eventY,
          left: eventX,
        }
        //设置自动布局显示则计算布局位置 并更新
        if (this.autoPlacement) {
          const contextmenuWidth = this.$refs.contextmenu.clientWidth
          const contextmenuHeight = this.$refs.contextmenu.clientHeight

          if (contextmenuHeight + eventY >= window.innerHeight) {
            contextmenuPosition.top -= contextmenuHeight
          }
          if (contextmenuWidth + eventX >= window.innerWidth) {
            contextmenuPosition.left -= contextmenuWidth
          }
        }
        this.style = {
          top: `${contextmenuPosition.top}px`,
          left: `${contextmenuPosition.left + 3}px`,
        }
      })
    },
    /**
     * 处理点击其他dom 关闭菜单
     * @param {Event} event - 事件对象
     * @public
     */
    handleBodyClick(event) {
      // 判断菜单组件下dom树是否包含点击事件触发dom元素
      const notOutside = this.$el.contains(event.target) ||
          (this.isClick && this.references.some(ref => ref.el.contains(event.target)))
      if (!notOutside) {
        this.visible = false
      }
    },
    /**
     * 显示菜单
     * @param {Object} position - 位置对象
     * @public
     */
    show(position) {
      // 根据window.$BeContextmenu 获取 $beContextmenuId缓存
      // 不等于当前触发的菜单时，隐藏其他菜单
      Object.keys(window.$BeContextmenu)
          .forEach((key) => {
            if (key !== this.$beContextmenuId) {
              window.$BeContextmenu[key].hide()
            }
          })
      // 设置菜单位置
      if (position) {
        this.style = {
          top: `${position.top}px`,
          left: `${position.left}px`,
        }
      }
      // 显示菜单
      this.visible = true
    },
    /**
     * 隐藏菜单
     * @public
     */
    hide() {
      this.visible = false
    },
    /**
     * 隐藏所有菜单
     * @public
     */
    hideAll() {
      // 根据window.$BeContextmenu 获取 $beContextmenuId缓存 隐藏所有菜单
      Object.keys(window.$BeContextmenu)
          .forEach((key) => {
            window.$BeContextmenu[key].hide()
          })
    },
  },
}
</script>
<style lang="scss">
@import "../../../assets/style/BeContextmenu";
</style>
<docs>
## 事例
配合be-contextmenu-item、be-contextmenu-submenu使用实现右键菜单:
```jsx
<be-context-menu ref="contextmenu" :theme="'violet'">
  <be-contextmenu-item @click='copy'>复制</be-contextmenu-item>
  <be-contextmenu-submenu title="发送" v-show="menuConfig.send">
    <be-contextmenu-item @click="jumpToOther('/browser','browser')">浏览器</be-contextmenu-item>
    <be-contextmenu-item @click="jumpToOther('/analysis','analysis')">调查分析</be-contextmenu-item>
    <be-contextmenu-item @click="openTrack">地址监控</be-contextmenu-item>
    <be-contextmenu-item @click="jumpToOther('/investigation','investigation')">调证分析</be-contextmenu-item>
    <be-contextmenu-item @click="jumpToOther('/debug/createDebug','createDebug')">一键调证</be-contextmenu-item>
  </be-contextmenu-submenu>
</be-context-menu>
```
</docs>