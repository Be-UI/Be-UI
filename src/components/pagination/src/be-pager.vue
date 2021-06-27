<template>
  <div>
    <ul class="be-pager">
      <li @click="prePage"><be-icon icon="left"></be-icon></li>
    </ul>
    <!--***************** 常规分页 **********************-->
    <ul @click="onPagerClick" class="be-pager" v-if="!isDynamic">
      <!--第一页-->
      <li :class="{ active: currentPage === 1, disabled }"
          class="number"
          v-if="pageCount > 0">1
      </li>
      <!--更多上页缩略翻页-->
      <li :class="[quickprevIconClass, { disabled }]"
          @mouseenter="onMouseenter('left')"
          @mouseleave="hoverPreIconClass = '#409EFF'"
          v-if="showPrevMore">
        <be-icon :icon="quickprevIconClass"
                 class="more btn-quickprev"
                 @click.stop="onPagerClick"
                 :color="hoverPreIconClass"></be-icon>
      </li>
      <!--分页主体-->
      <li :class="{ active: currentPage === pager, disabled }"
          :key="pager"
          class="number"
          v-for="pager in pagers">{{ pager }}
      </li>
      <!--更多下页缩略翻页-->
      <li :class="[quicknextIconClass, { disabled }]"
          @mouseenter="onMouseenter('right')"
          @mouseleave="hoverNextIconClass = '#303133'"
          v-if="showNextMore">
        <be-icon :icon="quicknextIconClass"
                 @click.stop="onPagerClick"
                 class="more btn-quicknext"
                 :color="hoverNextIconClass"></be-icon>
      </li>
      <!--最后一页-->
      <li :class="{ active: currentPage === pageCount, disabled }"
          class="number"
          v-if="pageCount > 1">{{ pageCount }}
      </li>
    </ul>
    <!--***************** 动态分页 **********************-->
    <ul @click="onPagerClick" class="be-pager" v-else-if="isDynamic">
      <li :class="{ active: currentPage === pager, disabled }"
          :key="pager"
          class="number"
          v-for="pager in pagersDynamic">{{ pager }}
      </li>
    </ul>
    <ul class="be-pager">
      <li @click="nextPage"><be-icon icon="right"></be-icon></li>
    </ul>
  </div>

</template>

<script type="text/babel">
  import pagerDynamic from "./be-pager-dynamic";
  import pagerOrdinary from "./be-pager-ordinary";
  export default {
    name: 'BePager',
    data() {
      return {
        current: null,
        showPrevMore: false,
        showNextMore: false,
        quicknextIconClass: 'more',
        quickprevIconClass: 'more',
        hoverNextIconClass: '#303133',
        hoverPreIconClass: '#303133'
      };
    },
    mixins: [pagerDynamic,pagerOrdinary],
    props: {
      /**
       * 当前页
       */
      currentPage: Number,
      /**
       * 总页数
       */
      pageCount: Number,
      /**
       * 页数过多时，显示的页数
       * 例如3 则显示第一第二和最后页
       * 参数有效必须大于2
       * 当传入isDynamic 动态分页时，此值则是动态分页最大显示数量
       */
      pagerShowCount: Number,
      /**
       * 是否禁用 缩略翻页
       */
      disabled: Boolean,
      /**
       * 是否开启动态分页
       * 开启后类似于百度分页
       * 适用于分页总页数未知或动态变化场景
       */
      isDynamic: {
        type: Boolean,
        default: false,
      },
    },

    watch: {
      showPrevMore(val) {
        if (!val) {
          this.quickprevIconClass = 'more';
        }
      },

      showNextMore(val) {
        if (!val) {
          this.quicknextIconClass = 'more';
        }
      }
    },

    methods: {
      /**
       * 翻页事件
       * @param {String} type - 类型
       */
      changePage(type){
        let newPage = 0
        if(type === 'next'){
           newPage = this.currentPage + 1
        }else{
          newPage = this.currentPage - 1
        }
        const pageCount = this.pageCount;
        const currentPage = this.currentPage;
        // 点击缩略翻页时的偏移量
        // 缩略翻页 可能会超出页数范围，这里做限制
        if (!isNaN(newPage)) {
          if (newPage < 1) {
            newPage = 1;
          }
          if (newPage > pageCount) {
            newPage = pageCount;
          }
        }
        if (newPage !== currentPage) {
          /**
           * 返回新页码
           */
          this.$emit('change', newPage);
        }
      },
      /**
       * 上页方法
       */
      prePage(){
        this.changePage('pre')
      },
      /**
       * 下页方法
       */
      nextPage(){
       this.changePage('next')
      },

      /**
       * 鼠标移入上下页缩略翻页按钮的方法 改变样式
       * @param {String} direction - 方向
       * @value right - 下页缩略 left - 上页缩略
       */
      onMouseenter(direction) {
        if (this.disabled) return;
        if (direction === 'left') {
          this.hoverPreIconClass = '#409EFF'
          //this.quickprevIconClass = 'be-icon-d-arrow-left';
        } else {
          this.hoverNextIconClass = '#409EFF'
          //this.quicknextIconClass = 'be-icon-d-arrow-right';
        }
      },
      /**
       * 页码点击事件
       * @param {Event} event - 事件对象
       */
      onPagerClick(event) {
        const target = event.target;
        // 禁用或触发为ul标签 阻止事件
        if (target.tagName === 'UL' || this.disabled) {
          return;
        }
        let newPage = Number(event.target.textContent);
        const pageCount = this.pageCount;
        const currentPage = this.currentPage;
        // 点击缩略翻页时的偏移量
        const pagerCountOffset = this.pagerShowCount;
        // 判断点击的元素class 是否为缩略翻页，并设置对应偏移页码 newPage
        if (target.className && Object.prototype.toString.call(target.className) === '[object String]' && target.className.indexOf('more') !== -1) {
          if (target.className.indexOf('quickprev') !== -1) {
            newPage = currentPage - pagerCountOffset;
          } else if (target.className.indexOf('quicknext') !== -1) {
            newPage = currentPage + pagerCountOffset;
          }
        }
        if (target.className && Object.prototype.toString.call(target.className) === '[object SVGAnimatedString]' && target.className.baseVal.indexOf('be-icon') !== -1) {
          if (target.parentElement.className.indexOf('quickprev') !== -1) {
            newPage = currentPage - pagerCountOffset;
          } else if (target.parentElement.className.indexOf('quicknext') !== -1) {
            newPage = currentPage + pagerCountOffset;
          }
        }
        // 缩略翻页 可能会超出页数范围，这里做限制
        if (!isNaN(newPage)) {
          if (newPage < 1) {
            newPage = 1;
          }
          if (newPage > pageCount) {
            newPage = pageCount;
          }
        }
        if (newPage !== currentPage) {
          /**
           * 返回新页码
           */
          this.$emit('change', newPage);
        }
      },
    },

  };
</script>
<style  lang="scss">
  @import 'src/assets/style/be-pager';
</style>