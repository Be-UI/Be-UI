<template>
    <!--  v-click-outside="{handler:close,isDisabled:outsideDisabled}"-->
    <div :id="`be_popover_trigger${uid}`" aria-describedby="tooltip">
        <slot name="trigger"></slot>
    </div>

    <teleport to="body">
            <transition  name="be-fade-in-linear">
                <div :class="customClass">
                    <div class="be-popover"
                         v-click-outside="{handler:close,isDisabled:outsideDisabled}"
                         role="tooltip"
                         :id="`be_popover_${uid}`"
                         :key="`be_popover_${uid}`"
                         v-if="show"
                         :style="stylePopover">
                        <div class="be-popover-body" :id="`be_popover_body${uid}`">
                            <slot></slot>
                        </div>
                        <div :id="`be_popover_arrow${uid}`"
                             :class="`be-popover-arrow`"
                             v-if="raw">
                        </div>
                    </div>
                </div>
            </transition>


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
    reactive
} from "vue";
import {ClickOutside } from '../../../utils/direactives/custom-direactives/click-outside';
import { createPopper} from '@popperjs/core';
import type {Options,Placement,PositioningStrategy} from '@popperjs/core';
import {IPopover, TPopoverStyle,VirtualElement} from './be-popover-type'
export default defineComponent({
    name: "BePopover",
    directives: { ClickOutside },
    props: {
        /**
         * 显示方向(完成)
         */
        'placement': {
            type: String,
            default: 'top'
        },
        /**
         * 显示箭头(完成)
         */
        'raw': {
            type: Boolean,
            default: true
        },
        /**
         * 自定义样式覆盖
         */
        'customClass': {
            type: String,
            default: ''
        },
        /**
         * 手动定位 x(完成)
         */
        'x': {
            type: Number,
        },
        /**
         * 手动定位 y(完成)
         */
        'y': {
            type: Number,
        },
        /**
         * 宽度(完成)
         */
        'width': {
            type: Number,
        },
        /**
         * 是否禁用(完成)
         */
        'disabled': {
            type: Boolean,
            default: false
        },
        /**
         * 延时显示(完成)
         */
        'delay': {
            type: Number,
            default: 100
        },
        /**
         * 延时关闭(完成)
         */
        'duration': {
            type: Number,
            default: 100
        },
        /**
         * 触发方式
         */
        'trigger': {
            type: String,
            default: 'hover'
        },
        /**
         * 触发元素
         */
        'triggerElm': {
          type: String,
          default: ''
        },
    },
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
         * @param {Boolean} isShow - 显示变量
         * @public
         */
        const changeDisplay = (isShow: boolean): void => {
            let delay:number = 0
            if (isShow) {
                delay = props.delay
            } else {
                delay = props.duration
            }
            setTimeout(() => {
                show.value = isShow
                nextTick(() => {
                    if (show.value) {
                        computePosition(props.placement)
                    }
                })
            }, delay)
        }
        /************************************** 使用popover.js设置箭头、popover ******************************/
            // 位置样式
        let stylePopover: TPopoverStyle = reactive({
                left: '0px',
                top: '0px',
            })
        // popover.js 实例缓存
        let popperJS:any = null
        /**
         * 计算显示位置
         * @param {String} placement - 位置
         */
        const computePosition = (placement: string): void => {
            // 使用popover.js 对popover进行定位
            if (popperJS && popperJS.destroy) {
                popperJS.destroy();
            }
            const popover: HTMLElement = document.getElementById(`be_popover_${internalInstance.uid}`) as HTMLElement
            const arrow: HTMLElement = document.getElementById(`be_popover_arrow${internalInstance.uid}`) as HTMLElement
            let popoverOption:Options = {
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
                            fallbackPlacements: ['top', 'right','bottom'],
                        },
                    },
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 10],
                        },
                    },
                ],
                strategy:'fixed' as PositioningStrategy
            }
            if (props.x && props.y) {
                // 传入了坐标就 创建虚拟trigger
                let VNodeTrigger:VirtualElement =  {
                    getBoundingClientRect:generateGetBoundingClientRect()
                }
                popperJS = createPopper(VNodeTrigger, popover, popoverOption);
                VNodeTrigger.getBoundingClientRect = generateGetBoundingClientRect(props.x,props.y);
                popperJS.update();
            }else{
                popperJS = createPopper(computeDom, popover, popoverOption);


            }
        }
        /**
         * 用户传入指定坐标，创建vnode，用于popover.js定位
         * @param {number} x - 位置
         * @param {number} y - 位置
         */
        const generateGetBoundingClientRect = (x:number = 0, y:number = 0) =>{
            const rect = {
                width: 0,
                height: 0,
                top: y,
                right: x,
                bottom: y,
                left: x,
            } as DOMRect
            return ()=>rect;
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
                let node:HTMLElement = root.childNodes[i];
                if ((node.nodeType !== 3) && (node.nodeType !== 8) && (node.nodeName !== 'SCRIPT')) {
                    let triggerWidth:number = Number(window.getComputedStyle(node).width.split('px')[0])
                    let triggerHeight:number = node.getBoundingClientRect().height
                    if (triggerWidth !== 0 || triggerHeight !== 0) {
                        return node
                        break;
                    } else {
                        return matchDom(node)
                    }
                }
            }
        }
        /**
         * 触发元素触发事件方法绑定
         */
        const addEvent = ():void=>{
            if (ctx.slots.trigger) {
              if(props.triggerElm){
                triggerDom = document.getElementById(props.triggerElm)
                computeDom =  matchDom(document.getElementById(`be_popover_trigger${internalInstance.uid}`))
              }else{
                triggerDom = matchDom(document.getElementById(`be_popover_trigger${internalInstance.uid}`))
                computeDom = triggerDom
              }
                // 根据触发类型 设置不同的事件监听
                if (triggerDom && props.trigger === 'click') {
                    triggerDom.addEventListener('click', () => changeDisplay(true), false)
                }
                if (triggerDom && props.trigger === 'hover') {
                    triggerDom.addEventListener('mouseenter', () => changeDisplay(true), false)
                    triggerDom.addEventListener('mouseleave', () => changeDisplay(false), false)
                }
                if (triggerDom && props.trigger === 'manual') {
                    triggerDom.addEventListener('click', () => changeDisplay(!show.value), false)
                }
            } else {
                console.error('Please set the trigger element')
            }
        }
        // 是否禁用  click-outside 标识
        let outsideDisabled = ref<Boolean>(false)
        onMounted(() :void => {
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
            addEvent()
        })
        onBeforeUnmount(() => {
            // 取消事件监听
            if (triggerDom) {
                triggerDom.removeEventListener('click', () => changeDisplay(true), false)
                triggerDom.removeEventListener('mouseenter', () => changeDisplay(true), false)
                triggerDom.removeEventListener('mouseleave', () => changeDisplay(false), false)
            }
            if (popperJS && popperJS.destroy) {
                popperJS.destroy();
            }
        })
        return {
            uid: internalInstance.uid,
            stylePopover,
            outsideDisabled,
            show,
            close,
            changeDisplay,
            raw: props.raw,
            customClass: props.customClass,
        }
    }
})
</script>

<style lang="scss">
@import "../../../assets/style/be-popover";

</style>