<template>
  <div>
<!--    <slot name="prev"></slot>-->
    <ul class="be-pager" :class="{'be-pager__disabled':pagerProps.disabled}">
      <li @click="prePage"><be-icon icon="left"></be-icon></li>
    </ul>
    <!--***************** 常规分页 **********************-->
    <ul @click="onPagerClick" class="be-pager" :class="{'be-pager__disabled':pagerProps.disabled}" v-if="!pagerProps.isDynamic && !pagerProps.isFront">
      <!--第一页-->
      <li :class="{ active: pagerProps.currentPage === 1, disabled:pagerProps.disabled }"
          class="number"
          v-if="pagerProps.pageCount > 0">1
      </li>
      <!--更多上页缩略翻页-->
      <li :class="[quickprevIconClass, { disabled:pagerProps.disabled }]"
          @mouseenter="onMouseenter('left')"
          @mouseleave="hoverPreIconClass = '#303133';quickprevIconClass = 'more'"
          v-if="showPrevMore">
        <be-icon :icon="quickprevIconClass"
                 class="more btn-quickprev"
                 @click.stop="onPagerClick"
                 :color="hoverPreIconClass"></be-icon>
      </li>
      <!--分页主体-->
      <li :class="{ active: pagerProps.currentPage === pager, disabled:pagerProps.disabled }"
          :key="pager"
          class="number"
          v-for="pager in pagers">{{ pager }}
      </li>
      <!--更多下页缩略翻页-->
      <li :class="[quicknextIconClass, { disabled:pagerProps.disabled }]"
          @mouseenter="onMouseenter('right')"
          @mouseleave="hoverNextIconClass = '#303133';quicknextIconClass = 'more'"
          v-if="showNextMore">
        <be-icon :icon="quicknextIconClass"
                 @click.stop="onPagerClick"
                 class="more btn-quicknext"
                 :color="hoverNextIconClass"></be-icon>
      </li>
      <!--最后一页-->
      {{maxPageNum}}
      {{pagerProps.currentPage}}
      {{pagerMix.pageParamsFront.pageCount}}
      <li :class=" { active: pagerProps.currentPage < maxPageNum ? false : true,
                    disabled:pagerProps.disabled }"
          class="number"
          v-if="pagerProps.pageCount > 1">{{ maxPageNum }}
      </li>
    </ul>
    <!--***************** 动态分页 **********************-->
<!--    <ul @click="onPagerClick" class="be-pager" :class="{'be-pager__disabled':pagerProps.disabled}" v-else-if="pagerProps.isDynamic && !pagerProps.isFront">
      <li :class="{ active: pagerProps.currentPage === pager, disabled:pagerProps.disabled }"
          :key="pager"
          class="number"
          v-for="pager in pagersDynamic">{{ pager }}
      </li>
    </ul>-->
    <!--***************** 前端分页 **********************-->
<!--    <ul @click="onPagerClick" class="be-pager" :class="{'be-pager__disabled':pagerProps.disabled}" v-else-if="!pagerProps.isDynamic && pagerProps.isFront">
      &lt;!&ndash;第一页&ndash;&gt;
      <li :class="{ active: pagerProps.currentPage === 1, disabled:pagerProps.disabled }"
          class="number"
          v-if="pagerMix.pageParamsFront.pageCount > 0">1
      </li>
      &lt;!&ndash;更多上页缩略翻页&ndash;&gt;
      <li :class="[quickprevIconClass, { disabled:pagerProps.disabled }]"
          @mouseenter="onMouseenter('left')"
          @mouseleave="hoverPreIconClass = '#303133';quickprevIconClass = 'more'"
          v-if="showPrevMore">
        <be-icon :icon="quickprevIconClass"
                 class="more btn-quickprev"
                 @click.stop="onPagerClick"
                 :color="hoverPreIconClass"></be-icon>
      </li>
      <li :class="{ active: pagerProps.currentPage === pager, disabled:pagerProps.disabled }"
          :key="pager"
          class="number"
          v-for="pager in frontList">{{ pager }}
      </li>
      &lt;!&ndash;更多下页缩略翻页&ndash;&gt;
      <li :class="[quicknextIconClass, { disabled:pagerProps.disabled }]"
          @mouseenter="onMouseenter('right')"
          @mouseleave="hoverNextIconClass = '#303133';quicknextIconClass = 'more'"
          v-if="showNextMore">
        <be-icon :icon="quicknextIconClass"
                 @click.stop="onPagerClick"
                 class="more btn-quicknext"
                 :color="hoverNextIconClass"></be-icon>
      </li>
      &lt;!&ndash;最后一页&ndash;&gt;
      <li :class=" { active: pagerProps.currentPage < maxPageNum ? (pagerProps.currentPage === pagerMix.pageParamsFront.pageCount) : (maxPageNum === pagerMix.pageParamsFront.pageCount),
                    disabled:pagerProps.disabled }"
          class="number"
          v-if="pagerMix.pageParamsFront.pageCount > 1">{{ pagerMix.pageParamsFront.pageCount }}
      </li>
    </ul>-->
    <ul class="be-pager" :class="{'be-pager__disabled':pagerProps.disabled}">
      <li @click="nextPage"><be-icon icon="right"></be-icon></li>
    </ul>
<!--    <slot name="next"></slot>-->
  </div>

</template>

<script lang="ts">
import {
    defineComponent,
    inject,
    ref, computed, onMounted, onUnmounted, watchEffect, watch, reactive
} from "vue";
  import {pagersDynamicList} from "./pager-dynamic";
  import {pagersList} from "./pager-ordinary";
  import {pagerFront} from "./pager-front";
  import {IPageProvide} from "./be-pagenation-type";
  export default defineComponent({
    name: 'BePager',
    setup(props,ctx){
        const $$BePaginMix  = inject('$$BePaginMix') as IPageProvide
        const $$BePaginProps = inject('$$BePaginProps') as IPageProvide
        let maxPageNum = ref(0)
        let current = ref( null)
        let showPrevMore = ref( false)
        let showNextMore = ref( false)
        let quicknextIconClass = ref( 'more')
        let quickprevIconClass = ref( 'more')
        let hoverNextIconClass = ref( '#303133')
        let hoverPreIconClass = ref( '#303133')
        let pagers = pagersList($$BePaginProps,maxPageNum,showPrevMore,showNextMore)
        //let pagersDynamic = pagersDynamicList($$BePaginProps)
        //let pagerFrontParam = pagerFront($$BePaginProps,$$BePaginMix,maxPageNum,showPrevMore,showNextMore,ctx)
        //let sliceList = pagerFrontParam.sliceList
        //let frontList = pagerFrontParam.frontList
        //let nextPageFront = pagerFrontParam.nextPageFront
        //let prePageFront = pagerFrontParam.prePageFront
        watchEffect(()=>{
            if(!showPrevMore.value){
                quickprevIconClass.value = 'more';
            }
        })
        watchEffect(()=>{
            if(!showNextMore.value){
                quicknextIconClass.value = 'more';
            }
        })
        watch(showPrevMore,(val)=>{
            if (!val) {
                quickprevIconClass.value = 'more';
            }
        })
        watch(showNextMore,(val)=>{
            if (!val) {
                quicknextIconClass.value = 'more';
            }
        })
        /**
         * 翻页事件
         * @param {String} type - 类型
         */
        const changePage = (type:string):void =>{
            let currentPage:number = 0
            // 动态分页不需要处理
            if($$BePaginProps.isDynamic){
                currentPage = Number($$BePaginProps.currentPage)
            }else{
                currentPage = Number($$BePaginProps.currentPage) > maxPageNum.value ? maxPageNum.value : Number($$BePaginProps.currentPage);
            }
            let newPage:number = 0
            if(type === 'next'){
                newPage = currentPage >= maxPageNum.value ? currentPage : currentPage + 1
            }else{
                newPage = currentPage - 1
            }
            // 点击缩略翻页时的偏移量
            // 缩略翻页 可能会超出页数范围，这里做限制
            if (!isNaN(newPage)) {
                if (newPage < 1) {
                    newPage = 1;
                }
                if (newPage > maxPageNum.value) {
                    newPage = maxPageNum.value;
                }
            }
            if (newPage !== currentPage) {
                // 调用前端分页方法
                if ($$BePaginProps.isFront){
                    if(type === 'next'){
                        //nextPageFront()
                    }else{
                        //prePageFront()
                    }
                }
                /**
                 * 返回新页码
                 */
                const resData =  {
                    currentPage:newPage,
                    pageCount:$$BePaginProps.isFront ? $$BePaginMix.pageParamsFront.pageCount : $$BePaginProps.pageCount,
                    pageSize:$$BePaginMix.pageNumVal ? Number($$BePaginMix.pageNumVal.split('/')[0]) : $$BePaginProps.pageSize
                }
                 ctx.emit('changePage',resData);
            }
        }
        /**
         * 上页方法
         */
        const prePage = ():void=>{
            if ($$BePaginProps.disabled) return;
            changePage('pre')
        }
        /**
         * 下页方法
         */
         const nextPage = ():void=>{
            if ($$BePaginProps.disabled) return;
            changePage('next')
        }

        /**
         * 鼠标移入上下页缩略翻页按钮的方法 改变样式
         * @param {String} direction - 方向
         * @value right - 下页缩略 left - 上页缩略
         */
        const onMouseenter = (direction:string):void =>{
            if ($$BePaginProps.disabled) return;
            if (direction === 'left') {
                hoverPreIconClass.value = '#409EFF'
                quickprevIconClass.value = 'page-first';
            } else {
                hoverNextIconClass.value = '#409EFF'
                quicknextIconClass.value = 'page-last';
            }
        }
        /**
         * 页码点击、跳转事件
         * @param {Event} event - 事件对象
         *
         */
        const onPagerClick = (event:MouseEvent,jump:number | string):void => {
            let currentPage = 0
            // 动态分页不需要处理
            if($$BePaginProps.isDynamic){
                currentPage = Number($$BePaginProps.currentPage)
            }else{
                currentPage = Number($$BePaginProps.currentPage) > maxPageNum.value ? maxPageNum.value : Number($$BePaginProps.currentPage);
            }
            let newPage = jump;
            if(!jump){
                const target = event.target as HTMLElement;
                // 禁用或触发为ul标签 阻止事件
                if (target.tagName === 'UL' || $$BePaginProps.disabled) {
                    return;
                }
                newPage = Number(target.textContent);
                // 点击缩略翻页时的偏移量
                const pagerCountOffset = $$BePaginProps.pagerShowCount;
                // 判断点击的元素class 是否为缩略翻页，并设置对应偏移页码 newPage
                if (target.className && Object.prototype.toString.call(target.className) === '[object String]' && target.className.indexOf('more') !== -1) {
                    if (target.className.indexOf('quickprev') !== -1) {
                        newPage = currentPage - pagerCountOffset;
                    } else if (target.className.indexOf('quicknext') !== -1) {
                        newPage = currentPage + pagerCountOffset;
                    }
                }
                const classNameSVG = target
                if (target.className && Object.prototype.toString.call(target.className) === '[object SVGAnimatedString]'
                    && classNameSVG.className.baseVal && classNameSVG.className.baseVal.toString().indexOf('be-icon') !== -1) {
                    if (target.parentElement && target.parentElement.className.indexOf('quickprev') !== -1) {
                        newPage = currentPage - pagerCountOffset;
                    } else if (target.parentElement &&  target.parentElement.className.indexOf('quicknext') !== -1) {
                        newPage = currentPage + pagerCountOffset;
                    }
                }
            }

            // 缩略翻页 可能会超出页数范围，这里做限制
            if (!isNaN(Number(newPage))) {
                if (newPage < 1) {
                    newPage = 1;
                }
                if (newPage > maxPageNum.value) {
                    newPage = maxPageNum.value;
                }
            }
            if (newPage !== currentPage) {
                // 前端分页返回分页数据
                if ($$BePaginProps.isFront){
                    // ctx.emit("updatePage", {data: sliceList.get(newPage)});
                }
                /**
                 * 返回新页码
                 */
                const resData =  {
                    currentPage:Number(newPage),
                    pageCount:$$BePaginProps.isFront ? $$BePaginMix.pageParamsFront.pageCount : $$BePaginProps.pageCount,
                    pageSize:$$BePaginMix.pageNumVal ? Number($$BePaginMix.pageNumVal.split('/')[0]) : $$BePaginProps.pageSize
                }
                 ctx.emit('changePage',resData);
            }
        }
        onMounted(()=>{
            if($$BePaginProps.isFront){
                const pageSize = $$BePaginMix.pageNumVal ? Number($$BePaginMix.pageNumVal.split('/')[0]) : $$BePaginProps.pageSize
                maxPageNum.value = Math.ceil($$BePaginProps.pageData.length / pageSize)
            }else{
                const pageCount = Number($$BePaginProps.pageCount);
                maxPageNum.value = Math.ceil(pageCount / Number($$BePaginProps.pageSize))
            }
        })
      return{
          pagerMix:$$BePaginMix,
          pagerProps:$$BePaginProps,
          // frontList,
          quickprevIconClass,
          hoverPreIconClass,
          quicknextIconClass,
          hoverNextIconClass,
          pagers,
          // pagersDynamic,
          showPrevMore,
          showNextMore,
          maxPageNum,
          prePage,
          nextPage,
          onPagerClick,
          onMouseenter,
      }
    }
  })
</script>
