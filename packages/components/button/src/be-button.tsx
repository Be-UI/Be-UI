import {
  ComponentInternalInstance,
  computed,
  defineComponent,
  getCurrentInstance,
  ref,
  VNode,
} from 'vue'
import BeIcon from '../../svg-icon/src/be-icon.vue'
import { IButtonInst } from './be-button-type'
function useComponentId(Instance: ComponentInternalInstance) {
  return Instance.uid
}
export default defineComponent({
  name: 'BeButton',
  components: {
    BeIcon,
  },
  props: {
    /**
     * 按钮大小
     * @values 'mini' | 'medium' | 'large'
     */
    size: {
      type: String,
      default: 'medium',
    },
    /**
     * 按钮圆角
     */
    round: {
      type: [Number, String],
      default: 2,
    },
    /**
     * 定义情感颜色
     * @values 'default' | 'primary' | 'success' | 'info' | 'warning' | 'error'
     */
    type: {
      type: String,
      default: 'default',
    },

    /**
     * 边框
     */
    bordered: {
      type: Boolean,
      default: false,
    },
    /**
     * 透明
     */
    ghost: {
      type: Boolean,
      default: false,
    },
    /**
     * 虚线
     */
    dashed: {
      type: Boolean,
      default: false,
    },
    /**
     * 自定义样式类
     */
    customClass: {
      type: String,
      default: '',
    },
    /**
     * flex显示
     */
    flex: {
      type: Boolean,
      default: false,
    },
    /**
     * 禁用
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * 前置图标 （完成）
     */
    prevIcon: {
      type: String,
      default: '',
    },
    /**
     * 后置图标 （完成）
     */
    nextIcon: {
      type: String,
      default: '',
    },

    /**
     * loading 按钮
     */
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const internalInstance = getCurrentInstance() as IButtonInst
    const uid = ref<number>(useComponentId(internalInstance))
    const btnStyle = computed(() => {
      return {
        background: props.ghost ? 'transparent !important' : '',
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        'border-style': props.dashed ? 'dashed' : 'solid',
        'border-radius': `${props.round}px`,
        display: props.flex ? 'flex' : '',
      }
    })
    const borderStyle = computed(() => {
      return props.bordered ? '__border' : ''
    })
    const disabledStyle = computed(() => {
      return props.disabled || props.loading ? 'be-button__inner__disabled' : ''
    })
    const prevIconStyle = computed(() => {
      if (props.loading) {
        return 'loading'
      }
      if (props.prevIcon) {
        return props.prevIcon
      } else {
        return ''
      }
    })
    const nextIconStyle = computed(() => {
      if (props.nextIcon) {
        if (props.loading) {
          return ''
        } else {
          return props.nextIcon
        }
      } else {
        return ''
      }
    })
    const prevIconRender = (): VNode | '' => {
      return props.prevIcon || props.loading ? (
        <be-icon
          icon={prevIconStyle.value}
          spin={props.loading}
          custom-class={`be-button-prevIcon be-button-prevIcon__${props.type}`}></be-icon>
      ) : (
        ''
      )
    }
    const nextIconRender = (): VNode | '' => {
      return !props.nextIcon ? (
        ''
      ) : (
        <be-icon
          icon={nextIconStyle.value}
          custom-class={`be-button-nextIcon be-button-nextIcon__${props.type}`}></be-icon>
      )
    }
    return () => {
      return (
        <button
          type="button"
          {...ctx.attrs}
          style={btnStyle.value}
          id={`be_button_${uid.value}`}
          class={`
                    be-button 
                    be-button__inner ${disabledStyle.value} 
                    be-button__${props.size} 
                    be-button__${props.type}${borderStyle.value} 
                    ${props.customClass}`}
          disabled={props.disabled || props.loading}>
          <div class="be-button-body" style="margin: 0 auto;display: flex">
            {prevIconRender()}
            <div class="be-button-slot">{ctx.slots.default && ctx.slots.default()}</div>
            {nextIconRender()}
          </div>
        </button>
      )
    }
  },
})
