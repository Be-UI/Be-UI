/* * @be-contextmenu.vue * @deprecated 右键菜单-菜单容器组件 * @author czh * @update (czh 2021/4/10)
*/
<template>
  <ul
    v-show="visible"
    ref="contextmenu"
    v-bind="attrs"
    :class="contextmenuCls"
    :style="style"
  >
    <!-- @slot 插槽请使用组件 be-contextmenu-item.vue-->
    <slot />
  </ul>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    getCurrentInstance,
    nextTick,
    onBeforeUnmount,
    onMounted,
    provide,
    reactive,
    ref,
    watch,
  } from 'vue'
  import { IPosition, IContextMenu, IPositionStr, refNode, MyWindow } from './be-contextmenu-type'

  declare var window: MyWindow

  /**
   * 右键菜单-菜单容器组件
   */
  export default defineComponent({
    name: 'BeContextmenu',
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
       * 是否禁用
       */
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['show', 'hide', 'contextmenu'],
    setup(props, ctx) {
      const internalInstance = getCurrentInstance() as IContextMenu
      const beContextmenuId: number = internalInstance.uid
      //把当前组件实例上下文传递给子组件使用
      provide('$$contextmenu', internalInstance)
      //主题内容class 设置
      const contextmenuCls = computed(() => ['be-contextmenu', `be-contextmenu__${props.theme}`])
      //点击空白关闭
      // const clickOutsideHandler = computed(() => (visible.value ? hide : () => {}))
      /************************************ 事件添加與移除 *****************************/
      //是否显示
      const visible = ref<boolean>(false)
      //上下文缓存
      const references = ref<Array<refNode>>([])
      watch(visible, nVal => {
        if (nVal) {
          /** 显示时提交触发show事件
           * @event show
           * @param {Object} 当前be-contextmenu组件上下文
           */
          ctx.emit('show', internalInstance)
          document.body.addEventListener('click', handleBodyClick)
          document.body.addEventListener('mousedown', handleBodyClick)
          document.body.addEventListener('mousewheel', handleBodyClick)
        } else {
          /** 隐藏时提交触发 hide 事件
           * @event hide
           * @param {Object} 当前be-contextmenu组件上下文
           */
          ctx.emit('hide', internalInstance)
          document.body.removeEventListener('click', handleBodyClick)
          document.body.removeEventListener('mousedown', handleBodyClick)
          document.body.removeEventListener('mousewheel', handleBodyClick)
        }
      })
      onMounted(() => {
        document.body.appendChild(internalInstance.vnode.el as Node)
        //在window上根据 $beContextmenuId 设置当前组件实例上下文
        //多个右键菜单 和 动态菜单时用于区分
        nextTick(() => {
          if (window.$BeContextmenu) {
            window.$BeContextmenu[beContextmenuId] = internalInstance
          } else {
            window.$BeContextmenu = { [beContextmenuId]: internalInstance }
          }
        })
      })

      onBeforeUnmount(() => {
        //销毁是移除节点
        document.body.removeChild(internalInstance.vnode.el as Node)
        //销毁是移除 window上指向
        delete window.$BeContextmenu[beContextmenuId]
        //遍历references 移除右键事件
        references.value.forEach((ref: refNode) => {
          ref.el.removeEventListener(props.eventType, handleReferenceContextmenu)
        })
        //销毁是移除 点击空白事件监听
        document.body.removeEventListener('click', handleBodyClick)
        document.body.removeEventListener('mousedown', handleBodyClick)
        document.body.removeEventListener('scroll', handleBodyClick)
      })
      /**
       * 给触发dom添加 右键事件，并缓存记录
       * @param {Object} ref - 节点对象
       */
      const addRef = (ref: refNode): void => {
        // 给触发dom添加 右键事件，并缓存记录
        references.value.push(ref)
        ref.el.addEventListener(props.eventType, handleReferenceContextmenu)
      }
      /************************************ 菜單位置計算方法 *****************************/
      //位置设置
      let style = reactive<IPosition>({ top: 0, left: 0 })
      /**
       * 处理右键点击方法
       * @param {Event} evt - 事件对象
       */
      const handleReferenceContextmenu = (evt: Event): void => {
        const event = evt as MouseEvent
        event.preventDefault()
        if (props.disabled) return
        const target: EventTarget | null = event.target
        const rootDom: HTMLElement = document.getElementById('app') || document.body
        //根据事件对象元素 获取到缓存的事件对象元素的vnode 和 dom对象
        const reference: refNode | undefined = references.value.find(ref => {
          // 这里是兼容ie
          ref.el.contains = rootDom.contains
          return ref.el.contains(target as Node)
        })
        /** 用户的自定义 contextmenu触发事件
         * @event contextmenu
         * @param {Object} 出发的虚拟节点对象
         */
        ctx.emit('contextmenu', reference ? reference.vnode : null)
        //获取事件位置坐标
        const eventX: number = event.pageX
        const eventY: number = event.pageY
        //显示
        show()
        nextTick(() => {
          let contextmenuPosition: IPositionStr = {
            top: eventY,
            left: eventX,
          }
          //设置自动布局显示则计算布局位置 并更新
          const curInst = internalInstance.refs.contextmenu as IContextMenu
          const contextmenuWidth: number = curInst.clientWidth
          const contextmenuHeight: number = curInst.clientHeight

          if (contextmenuHeight + eventY >= window.innerHeight) {
            contextmenuPosition.top -= contextmenuHeight
          }
          if (contextmenuWidth + eventX >= window.innerWidth) {
            contextmenuPosition.left -= contextmenuWidth
          }
          style.top = `${contextmenuPosition.top}px`
          style.left = `${contextmenuPosition.left + 3}px`
        })
      }
      /************************************ 顯示與隱藏方法 *****************************/
      /**
       * 显示菜单
       * @param {Object} position - 位置对象
       * @public
       */
      const show = (position?: IPosition): void => {
        // 根据window.$BeContextmenu 获取 $beContextmenuId缓存
        // 不等于当前触发的菜单时，隐藏其他菜单
        Object.keys(window.$BeContextmenu).forEach(key => {
          if (key !== beContextmenuId.toString()) {
            window.$BeContextmenu[key].proxy.hide()
          }
        })
        // 设置菜单位置
        if (position) {
          style.top = `${position.top}px`
          style.left = `${position.left}px`
        }
        // 显示菜单
        visible.value = true
      }

      // 是否点击
      const isClick = computed(() => props.eventType === 'click')
      /**
       * 处理点击其他dom 关闭菜单
       * @param {Event} event - 事件对象
       * @public
       */
      const handleBodyClick = (event: Event): void => {
        // 判断菜单组件下dom树是否包含点击事件触发dom元素
        const target = event.target as HTMLElement
        const notOutside: boolean =
          (internalInstance.vnode.el as Node).contains(target) ||
          (isClick.value && references.value.some(ref => ref.el.contains(target)))
        if (!notOutside) {
          visible.value = false
        }
      }
      /**
       * 隐藏菜单
       * @public
       */
      const hide = (): void => {
        visible.value = false
      }
      /**
       * 隐藏所有菜单
       * @public
       */
      const hideAll = (): void => {
        // 根据window.$BeContextmenu 获取 $beContextmenuId缓存 隐藏所有菜单
        Object.keys(window.$BeContextmenu).forEach(key => {
          window.$BeContextmenu[key].proxy.hide()
        })
      }
      return {
        addRef,
        hide,
        hideAll,
        beContextmenuId,
        visible,
        style,
        contextmenuCls,
        attrs: internalInstance.attrs,
      }
    },
  })
</script>
