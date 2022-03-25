<template>
  <!--  v-click-outside="{handler:close,isDisabled:outsideDisabled}"-->
  <div
    :id="`be_popover_trigger${uid}`"
    ref="bePopoverTrigger"
    aria-describedby="tooltip"
    class="be-popover--trigger">
    <slot name="trigger"></slot>
  </div>

  <teleport to="body">
    <div
      :class="customClass"
      @mouseenter="handlePopoverDomEnter"
      @mouseleave="handlePopoverDomLeave">
      <transition name="be-fade-in-linear">
        <div
          v-if="show"
          :id="`be_popover_${uid}`"
          :key="`be_popover_${uid}`"
          v-click-outside="{ handler: close, isDisabled: outsideDisabled }"
          class="be-popover"
          role="tooltip"
          :style="stylePopover">
          <div :id="`be_popover_body${uid}`" class="be-popover-body">
            <slot></slot>
          </div>
          <div v-if="raw" :id="`be_popover_arrow${uid}`" :class="`be-popover-arrow`"></div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script lang="ts">
  import {
    defineComponent,
    onMounted,
    onBeforeUnmount,
    ref,
    nextTick,
    getCurrentInstance,
    reactive,
    watch,
    computed,
  } from 'vue'
  import { ClickOutside } from '../../../utils/direactives/custom-direactives/click-outside'
  import { createPopper, Instance } from '@popperjs/core'
  import type { Options, Placement, PositioningStrategy } from '@popperjs/core'
  import { IPopover, TPopoverStyle, VirtualElement } from './be-popover-type'
  import { isString } from '../../../utils/common'

  export default defineComponent({
    name: 'BePopover',
    directives: { ClickOutside },
    props: {
      /**
       * 显示方向(完成)
       */
      placement: {
        type: String,
        default: 'top',
      },
      /**
       * 显示箭头(完成)
       */
      raw: {
        type: Boolean,
        default: true,
      },
      /**
       * 自定义样式覆盖
       */
      customClass: {
        type: String,
        default: '',
      },
      /**
       * 手动定位 x(完成)
       */
      x: {
        type: Number,
      },
      /**
       * 手动定位 y(完成)
       */
      y: {
        type: Number,
      },
      /**
       * 宽度(完成)
       */
      width: {
        type: Number,
      },
      /**
       * 是否禁用(完成)
       */
      disabled: {
        type: Boolean,
        default: false,
      },

      /**
       * 延时显示(完成)
       */
      delay: {
        type: Number,
        default: 100,
      },
      /**
       * 延时关闭(完成)
       */
      duration: {
        type: Number,
        default: 100,
      },
      /**
       * 触发方式
       */
      trigger: {
        type: String,
        default: 'hover',
      },
      /**
       * 触发元素
       */
      triggerElm: {
        type: String,
        default: '',
      },
    },
    emits: ['update'],
    setup(props, ctx) {
      const internalInstance = getCurrentInstance() as IPopover
      /******************************************** 显示控制相关 ************************************/
      // 是否显示
      let show = ref(false)
      /**
       * click-outside 指令使用的关闭方法
       * @public
       */
      const close = (): void => {
        setTimeout(() => {
          show.value = false
          isEnterPopover.value = false
          //show.value = false
          /** 提交触发 显示跟新 事件
           * @event update
           * @param {Boolean} 当前显示状态
           */
          ctx.emit('update', show.value)
        }, props.duration)
      }
      /**
       * 显示控制方法
       * @param {Boolean} showParams - 显示变量
       * @public
       */
      const changeDisplay = (showParams: boolean | string): void => {
        let delay = 0
        const isShow = showParams === 'manual' ? !show.value : (showParams as boolean)
        if (isShow) {
          delay = props.delay
        } else {
          delay = props.duration
        }
        setTimeout(() => {
          // 关闭时如果鼠标移入了popover的dom，则不关闭
          if (isEnterPopover.value && !isShow && props.trigger === 'hover') {
            return
          }
          // 设置 false 时通过 v-if 关闭卸载
          show.value = isShow
          // 关闭 observer
          observer.disconnect()
          nextTick(() => {
            if (show.value) {
              computePosition(props.placement)
            }
            ctx.emit('update', show.value)
          })
        }, delay)
      }
      /************************************** 使用popover.js设置箭头、popover ******************************/
      // 位置样式
      let stylePopover: TPopoverStyle = reactive({
        left: '0px',
        top: '0px',
        zIndex: '2000',
      })
      // popover.js 实例缓存
      let popperJS = ref<Instance>()
      /**
       * 计算显示位置
       * @param {String} placement - 位置
       */
      const computePosition = (placement: string, type = ''): void => {
        if (type === 'update') {
          popperJS.value?.update()
          return
        }
        // 使用popover.js 对popover进行定位
        if (popperJS.value && popperJS.value.destroy) {
          popperJS.value.destroy()
        }
        const popover: HTMLElement = document.getElementById(
          `be_popover_${internalInstance.uid}`
        ) as HTMLElement
        const arrow: HTMLElement = document.getElementById(
          `be_popover_arrow${internalInstance.uid}`
        ) as HTMLElement
        let popoverOption: Options = {
          placement: placement as Placement,

          modifiers: [
            {
              name: 'arrow',
              options: {
                element: arrow,
              },
            },
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['top', 'right', 'bottom'],
              },
            },
            {
              name: 'offset',
              options: {
                offset: [0, 10],
              },
            },
          ],
          strategy: 'fixed' as PositioningStrategy,
        }
        if (props.x && props.y) {
          // 传入了坐标就 创建虚拟trigger
          let VNodeTrigger: VirtualElement = {
            getBoundingClientRect: generateGetBoundingClientRect(),
          }
          popperJS.value = createPopper(VNodeTrigger, popover, popoverOption)
          VNodeTrigger.getBoundingClientRect = generateGetBoundingClientRect(props.x, props.y)
          popperJS.value.update()
        } else {
          popperJS.value = createPopper(computeDom, popover, popoverOption)
        }
        observer.observe(popover, {
          attributes: true,
          attributeFilter: ['style'],
        })
      }
      // 监听popover元素变化，强制更新，某些边界情况  @popperjs/core 位置定位是错误的
      let observer = new MutationObserver(() => {
        popperJS.value?.update()
      })
      /**
       * 用户传入指定坐标，创建vnode，用于popover.js定位
       * @param {number} x - 位置
       * @param {number} y - 位置
       */
      const generateGetBoundingClientRect = (x = 0, y = 0) => {
        const rect = {
          width: 0,
          height: 0,
          top: y,
          right: x,
          bottom: y,
          left: x,
        } as DOMRect
        return () => rect
      }
      /******************************************** dom操作相关 ************************************/
      // 触发元素dom
      let triggerDom: Element | any = null
      let computeDom: Element | any = null
      /**
       * 遍历dom树，找到合适的trigger元素
       * @param root
       * @return {*}
       */
      const matchDom = (root: any): any => {
        for (let i = 0; i < root.childNodes.length; i++) {
          let node: HTMLElement = root.childNodes[i]
          if (node.nodeType !== 3 && node.nodeType !== 8 && node.nodeName !== 'SCRIPT') {
            let triggerWidth = Number(window.getComputedStyle(node).width.split('px')[0])
            let triggerHeight: number = node.getBoundingClientRect().height
            if (triggerWidth !== 0 || triggerHeight !== 0) {
              return node
            } else {
              return matchDom(node)
            }
          }
        }
      }
      /**
       * 触发元素触发事件方法绑定
       */
      const evtList = {
        click: changeDisplay.bind(this, true),
        mouseenter: changeDisplay.bind(this, true),
        mouseleave: changeDisplay.bind(this, false),
        manual: changeDisplay.bind(this, 'manual'),
      }
      const addEvent = (trigger?: HTMLElement): void => {
        if (ctx.slots.trigger) {
          const triggerElm: string | HTMLElement = trigger || props.triggerElm
          if (triggerElm) {
            triggerDom = isString(triggerElm) ? document.getElementById(triggerElm) : triggerElm
            computeDom =
              matchDom(internalInstance.refs.bePopoverTrigger) ||
              triggerDom ||
              internalInstance.refs.bePopoverTrigger
          } else {
            triggerDom =
              matchDom(internalInstance.refs.bePopoverTrigger) ||
              internalInstance.refs.bePopoverTrigger
            computeDom = triggerDom || internalInstance.refs.bePopoverTrigger
          }
          // 根据触发类型 设置不同的事件监听
          if (triggerDom && props.trigger === 'click') {
            triggerDom.addEventListener('click', evtList['click'], false)
          }
          if (triggerDom && props.trigger === 'hover') {
            triggerDom.addEventListener('mouseenter', evtList['mouseenter'], false)
            triggerDom.addEventListener('mouseleave', evtList['mouseleave'], false)
          }
          if (triggerDom && props.trigger === 'manual') {
            triggerDom.addEventListener('click', evtList['manual'], false)
          }
        } else {
          console.error('Please set the trigger element')
        }
      }
      const isDisabled = computed(() => {
        return props.disabled
      })
      watch(isDisabled, nVal => {
        if (nVal) {
          removeEvt()
        } else {
          addEvent()
        }
      })
      /**
       * 触发元素触发事件方法移除
       */
      const removeEvt = (): void => {
        if (triggerDom) {
          triggerDom.removeEventListener('click', evtList['click'], false)
          triggerDom.removeEventListener('mouseenter', evtList['mouseenter'], false)
          triggerDom.removeEventListener('mouseleave', evtList['mouseleave'], false)
          triggerDom.removeEventListener('mouseleave', evtList['manual'], false)
        }
      }
      // 是否禁用  click-outside 标识
      let outsideDisabled = ref<boolean>(false)
      onMounted((): void => {
        // 根据触发类型 设置是否禁用 click-outside,只有click触发类型时才使用
        if (props.trigger === 'hover' || props.trigger === 'manual') {
          outsideDisabled.value = true
        }
        // 禁用就不绑定触发事件了
        if (props.disabled) {
          return
        }
        if (props.width) {
          stylePopover.width = props.width + 'px'
        }
        nextTick(() => {
          addEvent()
        })
      })
      onBeforeUnmount(() => {
        // 取消事件监听
        removeEvt()
        if (popperJS.value && popperJS.value.destroy) {
          popperJS.value.destroy()
        }
        observer.disconnect()
      })
      /******************************************** popover元素 dom 操作相关 ************************************/
      const isEnterPopover = ref<boolean>(false)
      const handlePopoverDomEnter = (): void => {
        if (props.trigger === 'hover') {
          isEnterPopover.value = true
        }
      }
      const handlePopoverDomLeave = (): void => {
        if (props.trigger === 'hover') {
          isEnterPopover.value = false
          changeDisplay(false)
        }
      }
      return {
        handlePopoverDomLeave,
        handlePopoverDomEnter,
        uid: internalInstance.uid,
        addEvent,
        stylePopover,
        outsideDisabled,
        show,
        close,
        changeDisplay,
        computePosition,
      }
    },
  })
</script>

<style lang="scss">
  @import '../../../assets/style/be-popover';
</style>
