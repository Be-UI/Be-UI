
<template>
  <div style="display: flex">
    <!--***************** 上页按钮 **********************-->
    <ul
      class="be-pager"
      :class="{ 'be-pager__disabled': pagerProps.disabled }"
    >
      <li @click="prePage">
        <be-icon icon="left" />
      </li>
    </ul>
    <!--***************** 常规分页 **********************-->
    <ul
      v-if="!pagerProps.isDynamic && !pagerProps.isFront"
      class="be-pager"
      :class="{ 'be-pager__disabled': pagerProps.disabled }"
      @click="onPagerClick"
    >
      <!--第一页-->
      <li
        v-if="pagerProps.pageCount > 0"
        :class="{ active: pagerProps.currentPage === 1, disabled: pagerProps.disabled }"
        class="number"
      >
        1
      </li>
      <!--更多上页缩略翻页-->
      <li
        v-if="showPrevMore"
        :class="[quickprevIconClass, { disabled: pagerProps.disabled }]"
        @mouseenter="onMouseenter('left')"
        @mouseleave="
          () => {
            hoverprevIconClass = '#303133'
            quickprevIconClass = 'more'
          }
        "
      >
        <be-icon
          :icon="quickprevIconClass"
          class="more btn-quickprev"
          :color="hoverprevIconClass"
          @click.stop="onPagerClick"
        />
      </li>
      <!--分页主体-->
      <li
        v-for="pager in pagers"
        :key="pager"
        :class="{ active: pagerProps.currentPage === pager, disabled: pagerProps.disabled }"
        class="number"
      >
        {{ pager }}
      </li>
      <!--更多下页缩略翻页-->
      <li
        v-if="showNextMore"
        :class="[quicknextIconClass, { disabled: pagerProps.disabled }]"
        @mouseenter="onMouseenter('right')"
        @mouseleave="
          () => {
            hoverNextIconClass = '#303133'
            quicknextIconClass = 'more'
          }
        "
      >
        <be-icon
          :icon="quicknextIconClass"
          class="more btn-quicknext"
          :color="hoverNextIconClass"
          @click.stop="onPagerClick"
        />
      </li>
      <!--最后一页-->
      <li
        v-if="maxPageNum > 1"
        :class="{
          active: pagerProps.currentPage < maxPageNum ? false : true,
          disabled: pagerProps.disabled,
        }"
        class="number"
      >
        {{ maxPageNum }}
      </li>
    </ul>
    <!--***************** 动态分页 **********************-->
    <ul
      v-else-if="pagerProps.isDynamic && !pagerProps.isFront"
      class="be-pager"
      :class="{ 'be-pager__disabled': pagerProps.disabled }"
      @click="onPagerClick"
    >
      <li
        v-for="pager in pagersDynamic"
        :key="pager"
        :class="{ active: pagerProps.currentPage === pager, disabled: pagerProps.disabled }"
        class="number"
      >
        {{ pager }}
      </li>
    </ul>
    <!--***************** 前端分页 **********************-->
    <ul
      v-else-if="!pagerProps.isDynamic && pagerProps.isFront"
      class="be-pager"
      :class="{ 'be-pager__disabled': pagerProps.disabled }"
      @click="onPagerClick"
    >
      <!--第一页-->
      <li
        v-if="pagerMix.pageParamsFront.maxPageNum > 0"
        :class="{ active: pagerProps.currentPage === 1, disabled: pagerProps.disabled }"
        class="number"
      >
        1
      </li>
      <!--更多上页缩略翻页-->
      <li
        v-if="showPrevMore"
        :class="[quickprevIconClass, { disabled: pagerProps.disabled }]"
        @mouseenter="onMouseenter('left')"
        @mouseleave="
          () => {
            hoverprevIconClass = '#303133'
            quickprevIconClass = 'more'
          }
        "
      >
        <be-icon
          :icon="quickprevIconClass"
          class="more btn-quickprev"
          :color="hoverprevIconClass"
          @click.stop="onPagerClick"
        />
      </li>
      <li
        v-for="pager in frontList"
        :key="pager"
        :class="{ active: pagerProps.currentPage === pager, disabled: pagerProps.disabled }"
        class="number"
      >
        {{ pager }}
      </li>
      <!--更多下页缩略翻页-->
      <li
        v-if="showNextMore"
        :class="[quicknextIconClass, { disabled: pagerProps.disabled }]"
        @mouseenter="onMouseenter('right')"
        @mouseleave="
          () => {
            hoverNextIconClass = '#303133'
            quicknextIconClass = 'more'
          }
        "
      >
        <be-icon
          :icon="quicknextIconClass"
          class="more btn-quicknext"
          :color="hoverNextIconClass"
          @click.stop="onPagerClick"
        />
      </li>
      <!--最后一页-->
      <li
        v-if="pagerMix.pageParamsFront.maxPageNum > 1"
        :class="{
          active:
            pagerProps.currentPage < maxPageNum
              ? pagerProps.currentPage === pagerMix.pageParamsFront.maxPageNum
              : maxPageNum === pagerMix.pageParamsFront.maxPageNum,
          disabled: pagerProps.disabled,
        }"
        class="number"
      >
        {{ pagerMix.pageParamsFront.maxPageNum }}
      </li>
    </ul>
    <!--***************** 下页按钮 **********************-->
    <ul
      class="be-pager"
      :class="{ 'be-pager__disabled': pagerProps.disabled }"
    >
      <li @click="nextPage">
        <be-icon icon="right" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    inject,
    ref,
    onMounted,
    watchEffect,
    watch,
    Ref,
    computed,
    reactive,
  } from 'vue'
  import { pagersDynamicList } from '../src/pager-dynamic'
  import { pagersList } from '../src/pager-ordinary'
  import { pagerFront } from '../src/pager-front'
  import { IPageData, IPageProvide, IPagesFront } from './be-pagination-type'
  import {BeIcon} from '@be-ui/components'
  export default defineComponent({
    name: 'BePager',
    components: { BeIcon },
    emits: ['changePage', 'updatePage'],
    setup(props, ctx) {
      /************************************** 翻页事件方法 ******************************/
      const $$BePaginMix = inject('$$BePaginMix') as IPageProvide
      const $$BePaginProps = inject('$$BePaginProps') as IPageProvide
      // 最大页码
      let maxPageNum = ref<number>(0)
      // 下页缩略显示控制
      let showPrevMore = ref<boolean>(false)
      // 上页缩略显示控制
      let showNextMore = ref<boolean>(false)
      // 处理获得常规分页页码数据
      let pagers = computed((): Array<number> => {
        return pagersList($$BePaginProps, maxPageNum, showPrevMore, showNextMore)
      })
      // 处理获得动态分页页码数据
      let pagersDynamic = computed((): Array<number> => {
        return pagersDynamicList($$BePaginProps)
      })
      // 处理获得前端分页页码数据、分页切片、前端分页的前后翻页方法
      let pagerFrontParam: IPagesFront | undefined = reactive(
        pagerFront($$BePaginProps, $$BePaginMix, maxPageNum, showPrevMore, showNextMore, ctx)
      )
      let sliceList = ref(pagerFrontParam ? pagerFrontParam.sliceList : null)
      let frontList = ref(pagerFrontParam ? pagerFrontParam.frontList : null)
      let nextPageFront = ref(pagerFrontParam ? pagerFrontParam.nextPageFront : null)
      let prePageFront = ref(pagerFrontParam ? pagerFrontParam.prePageFront : null)
      watch($$BePaginProps, nva => {
        pagerFrontParam = pagerFront(nva, $$BePaginMix, maxPageNum, showPrevMore, showNextMore, ctx)
        frontList.value = pagerFrontParam ? pagerFrontParam.frontList : null
        sliceList.value = pagerFrontParam ? pagerFrontParam.sliceList : null
        nextPageFront.value = pagerFrontParam ? pagerFrontParam.nextPageFront : null
        prePageFront.value = pagerFrontParam ? pagerFrontParam.prePageFront : null
      })
      /**
       * 缩略翻页 可能会超出页数范围，这里做限制
       * @param {number} newPage - 當前頁
       * @param {Ref} maxPageNum - 最大頁數
       * @param {IPageProvide} $$BePaginProps - provide/inject的 page Props
       */
      const isNaNPage = (newPage: number, maxPageNum: Ref, $$BePaginProps: IPageProvide): void => {
        if (!isNaN(newPage)) {
          if (newPage < 1) {
            newPage = 1
          }
          if (newPage > maxPageNum.value && !$$BePaginProps.isDynamic) {
            newPage = maxPageNum.value
          }
        }
      }
      /**
       * 翻页事件
       * @param {String} type - 类型
       */
      const changePage = (type: string): void => {
        let currentPage = 0
        // 动态分页不需要处理
        if ($$BePaginProps.isDynamic) {
          currentPage = Number($$BePaginProps.currentPage)
        } else {
          currentPage =
            Number($$BePaginProps.currentPage) > maxPageNum.value
              ? maxPageNum.value
              : Number($$BePaginProps.currentPage)
        }
        let newPage = 0
        if (type === 'next') {
          newPage = $$BePaginProps.isDynamic
            ? currentPage + 1
            : currentPage >= maxPageNum.value
            ? currentPage
            : currentPage + 1
        } else {
          newPage = currentPage - 1
          newPage = newPage <= 0 ? 1 : newPage
        }
        // 点击缩略翻页时的偏移量
        // 缩略翻页 可能会超出页数范围，这里做限制
        isNaNPage(newPage, maxPageNum, $$BePaginProps)

        if (newPage !== currentPage) {
          // 调用前端分页方法
          if ($$BePaginProps.isFront) {
            if (type === 'next') {
              nextPageFront.value && nextPageFront.value()
            } else {
              prePageFront.value && prePageFront.value()
            }
          }
          /**
           * 返回新页码
           */
          const resData: IPageData = {
            currentPage: newPage,
            pageCount: $$BePaginProps.isFront
              ? $$BePaginMix.pageParamsFront.maxPageNum
              : $$BePaginProps.pageCount,
            pageSize: $$BePaginMix.pageNumVal
              ? Number($$BePaginMix.pageNumVal.split('/')[0])
              : $$BePaginProps.pageSize,
          }
          ctx.emit('changePage', resData)
        }
      }
      /**
       * 页码点击、跳转事件
       * @param {Event} event - 事件对象
       * @param {number | string} jump - 是否时输入指定跳转
       */
      const onPagerClick = (event: MouseEvent | null, jump: number | string): void => {
        let currentPage = 0
        // 动态分页不需要处理
        if ($$BePaginProps.isDynamic) {
          currentPage = Number($$BePaginProps.currentPage)
        } else {
          currentPage =
            Number($$BePaginProps.currentPage) > maxPageNum.value
              ? maxPageNum.value
              : Number($$BePaginProps.currentPage)
        }
        let newPage: number | string = jump
        if (!jump) {
          let target = event?.target as HTMLElement
          // 禁用或触发为ul标签 阻止事件
          if (target.tagName === 'UL' || $$BePaginProps.disabled) {
            return
          }
          newPage = Number(target.textContent)
          // 点击缩略翻页时的偏移量
          const pagerCountOffset = $$BePaginProps.pagerShowCount
          // 判断点击的元素class 是否为缩略翻页，并设置对应偏移页码 newPage
          if (
            target.className &&
            Object.prototype.toString.call(target.className) === '[object String]' &&
            (target.className.indexOf('pageLast') !== -1 ||
              target.className.indexOf('pageFirst') !== -1)
          ) {
            const childNodes = target.childNodes[0] as HTMLElement
            if (childNodes.className.indexOf('quickprev') !== -1) {
              newPage = currentPage - pagerCountOffset
              // 小于第一页 修正
              newPage = newPage < 1 ? 1 : newPage
            } else if (childNodes.className.indexOf('quicknext') !== -1) {
              newPage = currentPage + pagerCountOffset
              // 大于第末页 修正
              newPage = newPage > maxPageNum.value ? maxPageNum.value : newPage
            }
          }
          const classNameSVG = event?.target as SVGAElement
          if (
            target.className &&
            Object.prototype.toString.call(target.className) === '[object SVGAnimatedString]' &&
            classNameSVG.className.baseVal &&
            classNameSVG.className.baseVal.toString().indexOf('be-icon') !== -1
          ) {
            if (
              target.parentElement &&
              target.parentElement.className.indexOf('quickprev') !== -1
            ) {
              newPage = currentPage - pagerCountOffset
              // 小于第一页 修正
              newPage = newPage < 1 ? 1 : newPage
            } else if (
              target.parentElement &&
              target.parentElement.className.indexOf('quicknext') !== -1
            ) {
              newPage = currentPage + pagerCountOffset
              // 大于第末页 修正
              newPage = newPage > maxPageNum.value ? maxPageNum.value : newPage
            }
          }
        }

        // 缩略翻页 可能会超出页数范围，这里做限制
        isNaNPage(Number(newPage), maxPageNum, $$BePaginProps)
        if (newPage !== currentPage) {
          // 前端分页返回分页数据
          if ($$BePaginProps.isFront && sliceList.value) {
            ctx.emit('updatePage', { data: sliceList.value.get(Number(newPage)) })
          }
          /**
           * 返回新页码
           */
          const resData: IPageData = {
            currentPage: Number(newPage),
            pageCount: $$BePaginProps.isFront
              ? $$BePaginMix.pageParamsFront.maxPageNum
              : $$BePaginProps.pageCount,
            pageSize: $$BePaginMix.pageNumVal
              ? Number($$BePaginMix.pageNumVal.split('/')[0])
              : $$BePaginProps.pageSize,
          }
          ctx.emit('changePage', resData)
        }
      }
      /**
       * 上页方法
       */
      const prePage = (): void => {
        if ($$BePaginProps.disabled) return
        changePage('pre')
      }
      /**
       * 下页方法
       */
      const nextPage = (): void => {
        if ($$BePaginProps.disabled) return
        changePage('next')
      }
      /************************************** 上下缩略翻页样式控制 ******************************/
      let quicknextIconClass = ref<string>('more')
      let quickprevIconClass = ref<string>('more')
      let hoverNextIconClass = ref<string>('#303133')
      let hoverprevIconClass = ref<string>('#303133')
      watchEffect(() => {
        if (!showPrevMore.value) {
          quickprevIconClass.value = 'more'
        }
      })
      watchEffect(() => {
        if (!showNextMore.value) {
          quicknextIconClass.value = 'more'
        }
      })
      watch([showNextMore, showPrevMore], ([valNext, valPre]) => {
        if (!valNext) {
          quicknextIconClass.value = 'more'
        }
        if (!valPre) {
          quickprevIconClass.value = 'more'
        }
      })
      /**
       * 鼠标移入上下页缩略翻页按钮的方法 改变样式
       * @param {String} direction - 方向
       * @value right - 下页缩略 left - 上页缩略
       */
      const onMouseenter = (direction: string): void => {
        if ($$BePaginProps.disabled) return
        if (direction === 'left') {
          hoverprevIconClass.value = '#409EFF'
          quickprevIconClass.value = 'pageFirst'
        } else {
          hoverNextIconClass.value = '#409EFF'
          quicknextIconClass.value = 'pageLast'
        }
      }
      onMounted(() => {
        if ($$BePaginProps.isFront) {
          const pageSize = $$BePaginMix.pageNumVal
            ? Number($$BePaginMix.pageNumVal.split('/')[0])
            : $$BePaginProps.pageSize
          maxPageNum.value = Math.ceil($$BePaginProps.pageData.length / pageSize)
        } else {
          const pageCount = Number($$BePaginProps.pageCount)
          maxPageNum.value = Math.ceil(pageCount / Number($$BePaginProps.pageSize))
        }
      })
      return {
        pagerMix: $$BePaginMix,
        pagerProps: $$BePaginProps,
        frontList,
        quickprevIconClass,
        hoverprevIconClass,
        quicknextIconClass,
        hoverNextIconClass,
        pagers,
        pagersDynamic,
        showPrevMore,
        showNextMore,
        maxPageNum,
        prePage,
        nextPage,
        onPagerClick,
        onMouseenter,
      }
    },
  })
</script>
