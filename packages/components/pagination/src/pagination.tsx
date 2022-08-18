import Pager from '@be-ui/components/pagination/src//be-pager.vue'
import {BeSelect} from '../../select'
import { defineComponent, getCurrentInstance, provide, ref, reactive } from 'vue'
import {
  IPage,
  IPageData,
  IPageParamsFront,
  IPagerEvt,
  IPagerInst,
  IPagerMix,
  IPagerrenderList,
} from './be-pagenation-type'
import { arrayDeduplicationt } from '@be-ui/utils/common'

export default defineComponent({
  name: 'BePagination',
  components: {
    Pager,
    BeSelect,
  },
  props: {
    /**
     * 每页条数
     */
    pageSize: {
      type: Number,
      default: 5,
      validator: (value: number): boolean => {
        return value <= 0 ? false : true
      },
    },
    /**
     * 当前页
     */
    currentPage: {
      type: Number,
      default: 1,
      validator: (value: number): boolean => {
        return value <= 0 ? false : true
      },
    },
    /**
     * 总數據数
     */
    pageCount: {
      type: Number,
    },
    /**
     * 是否禁用
     */
    disabled: Boolean,
    /**
     * 是否禁用输入跳转
     */
    disabledJump: Boolean,
    /**
     * 页数过多时，显示的页数
     * 例如3 则显示第一第二和最后页
     * 参数有效必须大于2
     * 当传入isDynamic 动态分页时，此值则是动态分页最大显示数量
     */
    pagerShowCount: {
      type: Number,
      validator: (value: number): boolean => {
        return value > 2 ? true : false
      },
    },
    /**
     * 每页显示数量
     */
    pageNum: {
      type: Array,
      default: () => [{ label: 100 }, { label: 200 }, { label: 300 }, { label: 400 }],
    },
    /**
     * 自定义布局
     * ['page','jump','info','pNum','prev','next']
     */
    layout: {
      type: Array,
      default: () => ['prev', 'page', 'jump', 'info', 'next', 'pNum'],
    },
    /**
     * 常規分頁
     */
    isOrdianry: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否开启动态分页
     * 开启后类似于百度分页
     * 适用于分页总页数未知或动态变化场景
     */
    isDynamic: {
      type: Boolean,
      default: false,
    },

    /**
     * 是否开启前端分页
     */
    isFront: {
      type: Boolean,
      default: false,
    },
    /**
     * 前端分页数据，开启前端分页后，会针对这些数据进行切片
     * 每翻页，则会返回对于页数据
     */
    pageData: {
      type: Array,
      default: () => [],
    },
    pageUnit: {
      type: String,
      default: '页',
    },
  },
  emits: ['updateNum', 'updatePage', 'changePage'],
  setup(props, ctx) {
    const curInst = getCurrentInstance() as IPage
    let pageParamsFront = reactive<IPageParamsFront>({ maxPageNum: 0 })
    /********************************* 输入指定页码跳转 *****************************************/
    const jumpPage = ref<string>('')
    /**
     * 分页跳转方法
     * @param {Number | String} value - 跳转页码
     * @public
     */
    const jumpTo = (value: number | string): void => {
      const curInstRefs = curInst.refs.pager as IPagerInst
      curInstRefs.onPagerClick(null, value)
    }
    /**
     * 分页参数传递方法
     * @param {KeyboardEvent} e - 输入事件
     */
    const handleEnterEvn = (e: KeyboardEvent): void => {
      if (e.key === 'Enter' && e.target !== null) {
        const pageCount: number = props.pageCount ? props.pageCount : 0
        const maxPageNum: number = Math.ceil(pageCount / Number(props.pageSize))
        const total: number = props.isFront ? pageParamsFront.maxPageNum : maxPageNum
        const value: string = (e.target as HTMLInputElement).value
        // 只处理小于最大页码的正整数
        if (/^\d+$/.test(value) && Number(value) <= total) {
          jumpTo(value)
        } else {
          (e.target as HTMLInputElement).value = ''
        }
      }
    }
    /********************************* 每页显示数量设置 *****************************************/
    // 每页显示数量
    const pageNumVal = ref<string>('')
    /**
     * 获取每页显示数量设置类别的选择结果
     * @param {Object} data - 页面设置数据
     * @public
     */
    const getPageNum = (data: any): void => {
      const pageCount: number = props.pageCount ? props.pageCount : 0
      const maxPageNum: number = Math.ceil(pageCount / Number(data.label))
      const total: number = props.isFront ? pageParamsFront.maxPageNum : maxPageNum
      pageNumVal.value = data.label
      ctx.emit('updateNum', {
        pageSize: Number(data.label.split(' / ')[0]),
        currentPage: props.currentPage > total ? total : props.currentPage,
      })
    }
    /**
     * 初始化下拉
     */
    const pageNumInner = ref<Array<any>>([])
    const initPageSelect = (): void => {
      pageNumVal.value = props.pageSize + ' / ' + props.pageUnit //disabled
      // 把pagesize加到下拉选择pageNum中
      pageNumInner.value = props.pageNum
      pageNumInner.value.unshift({ label: props.pageSize })
      pageNumInner.value = arrayDeduplicationt(pageNumInner.value, 'label')
      pageNumInner.value.sort((a, b) => a.label - b.label)
      pageNumInner.value.map((val: any) => {
        val.label = val.label + ' / ' + props.pageUnit
      })
    }
    if (props.layout?.includes('pNum')) {
      initPageSelect()
    }
    /********************************* 分页事件emit *****************************************/
    /**
     * 前端分页 数据传递方法
     * @param {Object} data - 分页数据
     */
    const handleUpdatePage = (data: Array<number>): void => {
      ctx.emit('updatePage', data)
    }
    /**
     * 前端分页数据更新
     * @param {Object} data - 分页参数
     */
    const getPageCount = (data: IPageParamsFront): void => {
      pageParamsFront = data
    }
    /**
     * 分页参数传递方法
     * @param {Object} data - 分页参数
     */
    const handleChange = (data: IPageData): void => {
      ctx.emit('changePage', data)
    }

    /********************************* 分页 内置渲染组件，页码信息、输入跳转 *****************************************/
    /**
     * 页码信息组件
     * @return {JSX.Element | undefined}
     */
    const pageInfoComponent = (): JSX.Element | undefined => {
      if (props.isDynamic) {
        return
      }
      const pageCount: number = props.pageCount ? props.pageCount : 0
      const maxPageNum: number = Math.ceil(pageCount / Number(props.pageSize))
      const total: number = props.isFront ? pageParamsFront.maxPageNum : maxPageNum
      return (
        <span class="be-pager--info">
          第{props.currentPage > total ? total : props.currentPage}页/共{total}页
        </span>
      )
    }
    /**
     * 页码跳转组件
     * @return {JSX.Element}
     */
    const pageJumpComponent = (): JSX.Element | undefined => {
      const disabled: boolean = props.disabled ? true : props.disabledJump ? true : false
      return (
        <div class="be-pager--jump">
          跳至
          <input
            disabled={disabled}
            class="be-pager--jump__input"
            type="text"
            value={jumpPage.value}
            onKeyup={handleEnterEvn}
          />
          页
        </div>
      )
    }
    /********************************* provide 注入 *****************************************/
    provide('$$BePaginProps', props)
    const pagerMix = reactive<IPagerMix>({
      jumpPage: jumpPage.value,
      pageParamsFront: pageParamsFront,
      pageNumVal: pageNumVal.value,
    })
    provide('$$BePaginMix', pagerMix)

    return () => {
      // 定义传入事件（必须on开头，原因请阅读vue3 v-bind 解析）
      const onEvt: IPagerEvt = {
        onUpdatePage: handleUpdatePage,
        onChangePage: handleChange,
        onGetPageCount: getPageCount,
      }
      const nextSlot: Function = curInst.slots.next ? curInst.slots.next : () => {}
      const prevSlot: Function = curInst.slots.prev ? curInst.slots.prev : () => {}
      // 定义布局渲染列表
      const renderList: IPagerrenderList = {
        page: <Pager ref="pager" {...onEvt}></Pager>,
        jump: pageJumpComponent.call(this),
        info: pageInfoComponent.call(this),
        next: nextSlot(),
        prev: prevSlot(),
        pNum: undefined,
      }
      // 非动态布局才支持页面数量显示设置
      if (!props.isDynamic && props.layout?.includes('pNum')) {
        renderList.pNum = (
          <be-select
            v-model={pageNumVal.value}
            keyValue="id"
            disabled={props.disabled}
            labelValue="label"
            custom-class={'be-pager-select'}
            list={pageNumInner.value}
            onSelect={getPageNum}></be-select>
        )
      }
      return (
        <div class="be-pager-container">
          {/*根据渲染布局props渲染renderList，实现自定义布局*/}
          {props.layout.map((v: any) => {
            return Object(renderList)[v]
          })}
        </div>
      )
    }
  },
})
