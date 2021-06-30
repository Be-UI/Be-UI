/*
* be-dialog.vue
* @deprecated 可拖拽弹窗
* @author czh
* @create (czh 2021/5/8)
* @update (czh 2021/5/8)
*/
<template>

    <div class="be-dialog" :class="dialogModels" v-show="isShow">
      <transition name="be-zoom-in-top">
      <div class="be-dialog-container"
           v-show="isShow"
           :id="`be_dialog_container${this._uid}`"
           :class="customClassStyle"
           v-drag="{isDrag:isDrag}">
        <div class="be-dialog-title">
          <div class="be-dialog-contanter-head" :id="`be_head${this._uid}`">
            <span>{{ titles }}</span>
            <!-- @slot 弹窗头部按钮 -->
            <slot name="headerIcon">
              <be-icon icon='delete' @click="close" custom-class="be-dialog-close"></be-icon>
            </slot>
          </div>
        </div>
        <div class="be-dialog-body">
          <!-- @slot 弹窗主体-->
          <div class="be-dialog-body__inner">
            <slot name="body">

            </slot>
          </div>
        </div>
        <div :class="`be-dialog-footer be-dialog-footer__${layout}`">
          <!-- @slot 弹窗底部-->
          <slot name="footer">
            <button>确定</button>
          </slot>
        </div>
      </div>
      </transition>
    </div>
</template>

<script>
/**
 * 可拖拽、放大、缩小弹窗
 */
export default {
  name: "BeDialog",
  data() {
    return {
      animate: '',
      offsetData: {},
      dialogModels: ''
    }
  },
  props: {
    /**
     * 是否拖拽
     */
    'isDrag': {
      type: Boolean,
      default: true
    },
    /**
     * 标题
     */
    'titles': {
      type: String,
      default: ''
    },
    /**
     * 是否只是查看
     */
    'isShow': {
      type: Boolean,
      default: false
    },
    /**
     * 自定义样式类
     */
    'customClass': {
      type: String,
      default: ''
    },
    /**
     * 是否开启遮罩层
     */
    'isOpenModal': {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启esc退出
     */
    'escExit': {
      type: Boolean,
      default: false
    },
    /**
     * 是否开启esc退出
     */
    'layout': {
      type: String,
      default: 'center'
    }
  },
  methods: {
    /**
     * 获取 v-drag 移动后的位置数据
     * @param {Object} coordinateData - 移动路径数据
     */
    getCoordinate(coordinateData) {
      this.offsetData = coordinateData
    },
    /**
     * 关闭组件
     */
    close() {

      if (this.$listeners.close) {
        /** 弹窗关闭事件
         * @event close
         */
        this.$emit('close')
      } else {
        this.$emit('update:isShow', false)
      }
    },

    /**
     * 键盘esc 退出的监听
     */
    listenerEscExitFunc() {
      if (this.escExit) {
        document.onkeydown = (e) => {
          if (e && e.keyCode === 27) {
            /** esc按键弹窗关闭事件
             * @event escCb
             */
            this.$emit('escCb')
          }
        }
      }
    },
    /**
     * 键盘esc退出的监听取消
     */
    removeEscExitFunc() {
      document.onkeydown = null
    }
  },
  computed: {
    customClassStyle() {
      return this.customClass
    }
  },
  mounted() {
    if (this.isOpenModal) {
      this.dialogModels = 'be-dialog-modal'
    }
    this.listenerEscExitFunc()
  },
  beforeDestroy() {
    this.removeEscExitFunc()
  }
}
</script>

<style lang="scss">
.be-zoom-in-top-enter-active, .be-zoom-in-top-leave-active {
  opacity: 1;
  -webkit-transform: scaleY(1);
  transform: scaleY(1);
  -webkit-transition: opacity .3s cubic-bezier(.23, 1, .32, 1), -webkit-transform .3s cubic-bezier(.23, 1, .32, 1);
  transition: opacity .3s cubic-bezier(.23, 1, .32, 1), -webkit-transform .3s cubic-bezier(.23, 1, .32, 1);
  transition: transform .3s cubic-bezier(.23, 1, .32, 1), opacity .3s cubic-bezier(.23, 1, .32, 1);
  transition: transform .3s cubic-bezier(.23, 1, .32, 1), opacity .3s cubic-bezier(.23, 1, .32, 1), -webkit-transform .3s cubic-bezier(.23, 1, .32, 1);
  -webkit-transform-origin: center top;
  transform-origin: center top
}

.be-zoom-in-top-enter, .be-zoom-in-top-leave-active {
  opacity: 0;
  -webkit-transform: scaleY(0);
  transform: scaleY(0)
}
.be-dialog-modal {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2077;
  background-color: rgba(0, 0, 0, 0.5);
}

.be-dialog {
  .be-dialog-contanter-head {
    border-radius: 5px;
    border-bottom: none;
    height: 50px;
    color: #666;
    margin: 0 0 10px 0;
    text-align: left;
    font-weight: bold;
    /* cursor: move;*/
    font-size: 18px;
    padding: 10px;
    line-height: 30px;
    box-sizing: border-box;

    .be-dialog-close {
      line-height: 35px;
      color: #000000;
      cursor: pointer;
      float: right;
    }

  }

  .be-dialog-container {
    box-sizing: border-box;
    position: absolute;
    left: calc(50% - 400px);
    top: calc(50% - 250px);
    bottom: 60px;
    width: 800px;
    height: 500px;
    background: rgba(242, 244, 245, 1);
    box-shadow: 0px 6px 13px rgba(0, 0, 0, 0.16);
    border-radius: 5px;
    z-index: 998;

    .be-dialog-title {
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.77);

      span {
        color: #000000;
        font-size: 16px;
        font-family: "Microsoft YaHei";
      }

      span:nth-child(2) {
        font-size: 20px;
        font-weight: 400;
      }
    }

    .be-dialog-body {
      height: calc(100% - 115px);
      padding: 10px;
      box-sizing: border-box;
      margin-bottom: 10px;

      .be-dialog-body__inner {
        background: rgba(255, 255, 255, 0.77);
      }
    }

    .be-dialog-footer {
      height: 40px;
      line-height: 40px;
      padding: 0 30px;
    }

    .be-dialog-footer__center {
      display: flex;
      justify-content: center;
    }

    .be-dialog-footer__right {
      display: flex;
      justify-content: flex-end;
    }
  }


}


</style>
<docs>
## 事例
```jsx
<be-dialog
    titles="查看更多子节点"
    ref='moreNodeDialog'
    animIn='animate__fadeInBottomLeft'
    animOut='animate__fadeOutBottomLeft'
    :is-show.sync="isExpandMoreNode"
    :is-open-modal="true"
    :escExit='true'
    @escCb="closePanel()"
    custom-class="plus-dialog">
  <div slot="headerIcon" style="display: inline-block;float: right">
  </div>
  <div slot="body" class="plus-dialog-body">
  </div>
</be-dialog>
```
</docs>