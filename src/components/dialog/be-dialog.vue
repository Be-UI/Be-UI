/*
* be-dialog.vue
* @deprecated 可拖拽弹窗
* @author czh
* @create (czh 2021/5/8)
* @update (czh 2021/5/8)
*/
<template>
    <div class="be-dialog" :class="dialogModels" v-show="!isMinus && isShow">
        <div class="be-dialog-container animate__animated"
             :id="`be_dialog_container${this._uid}`"
             :class="animateClass"
             v-drag = "{isDrag:isDrag}">
            <div class="be-dialog-title">
                <div class="be-dialog-contanter-head" :id="`be-head${this._uid}`">
                    <span>{{titles}}</span>
                    <!-- @slot 弹窗头部按钮 -->
                    <slot name="headerIcon">
                        <i class="fa el-icon-close" @click="close"></i>
                        <i class="fa el-icon-minus" @click="minusPanel($event)" v-show="isMinus"></i>
                    </slot>
                </div>
            </div>
            <!-- @slot 弹窗主体-->
            <slot name="body"></slot>
            <!-- @slot 弹窗底部-->
            <slot name="footer"></slot>
        </div>
        <div class="be-dialog-container animate__animated"
             :id="`be_dialog_container_minus${this._uid}`"
             :class="animateClass"
             v-drag = "{isDrag:isDrag}"
             v-show="isMinus && isShow">
            <div class="be-dialog-title">
                <div class="be-dialog-contanter-head">
                    <span>{{titles}}</span>
                    <i class="fa el-icon-close" @click="close"></i>
                    <i class="fa el-icon-copy-document" @click="plusPanel($event)"></i>
                </div>
            </div>
        </div>
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
                isMinus: false,
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
             * 弹入动画
             */
            'animIn': {
                type: String,
                default: 'animate__fadeInDownBig'
            },
            /**
             * 弹出动画
             */
            'animOut': {
                type: String,
                default: 'animate__fadeOutUp'
            },
            /**
             * 是否支持最小化
             */
            'isMinu': {
                type: Boolean,
                default: false
            },
            /**
             * 是否开启遮罩层
             */
            'isOpenModal': {
                type: Boolean,
                default: false
            },
            /**
             * 是否开启esc退出
             */
            'escExit': {
                type: Boolean,
                default: false
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
                let _this = this
                this.animate = this.animOut
                setTimeout(() => {
                    if (_this.$listeners.close) {
                        /** 弹窗关闭事件
                         * @event close
                         */
                        this.$emit('close')
                    } else {
                        this.$emit('update:isShow', false)
                    }
                    this.animate = this.animIn
                }, 500)
            },
            /**
             * 最小化态势展示列组件
             */
            minusPanel(e) {
                let elePath = e.path
                //清除掉v-drag 设置的偏移 否则class 无法生效
                if (elePath) {
                    elePath[3].style.top = null
                }
                this.animate = 'minusPanelAni'
                setTimeout(() => {
                    this.animate = 'minusPanel'
                    document.getElementById(`be_dialog_container_minus${this._uid}`).style.left = elePath[3].style.left
                    this.isMinus = true
                }, 500)
            },
            /**
             * 放大态势展示列组件
             */
            plusPanel(e) {
                let elePath = e.path
                //清除掉v-drag 设置的偏移 否则class 无法生效
                if (elePath) {
                    elePath[3].style.top = null
                }
                this.animate = 'plusPanelAni'
                setTimeout(() => {
                    this.animate = ''
                    document.getElementById(`be_dialog_container${this._uid}`).style.left = elePath[3].style.left
                    this.isMinus = false
                }, 500)
            },
            /**
             * 键盘esc 退出的监听
             */
            listenerEscExitFunc(){
                if(this.escExit){
                    document.onkeydown = (e)=>{
                        if(e && e.keyCode === 27){
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
            removeEscExitFunc(){
                document.onkeydown = null
            }
        },
        computed: {
            animateClass() {
                return this.animate + ' ' + this.customClass
            }
        },
        mounted() {
            this.animate = this.animIn
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

<style lang="scss" scoped>
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
            .el-icon-close,
            .el-icon-minus,
            .el-icon-arrow-left,
            .el-icon-copy-document {
                line-height: 35px;
                color: #000000;
                cursor: pointer;
                // font-size: @font-size-big;
                float: right;
            }
        }
        .be-dialog-container {
            box-sizing: border-box;
            position: absolute;
            left:calc(50% - 400px);
            top:calc(50% - 250px);
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
        }

        .plusPanel {
            top: 120px;
            left: 66px;
        }

        .plusPanelAni {
            top: 120px;
            transition: top .5s;
            -moz-transition: top .5s; /* Firefox 4 */
            -webkit-transition: top .5s; /* Safari 和 Chrome */
            -o-transition: top .5s; /* Opera */
        }

        .minusPanel {
            top: 850px;
            height: 40px;
            border: none;
        }

        .minusPanel .be-dialog-contanter-head {
            //   font-size: @font-size-big;
            margin: 10px 0;
            text-align: left;
            //  padding-left: 10px;
            cursor: move;
            font-size: 16px;
            .el-icon-close,
            .el-icon-minus,
            .el-icon-copy-document {
                color: #fff;
                cursor: pointer;
                // font-size: @font-size-big;
                float: right;
            }
        }

        .minusPanelAni {
            top: 850px;
            transition: top .5s;
            -moz-transition: top .5s; /* Firefox 4 */
            -webkit-transition: top .5s; /* Safari 和 Chrome */
            -o-transition: top .5s; /* Opera */
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
            :escExit = 'true'
            @escCb="closePanel()"
            custom-class="plus-dialog">
        <div slot="headerIcon" style="display: inline-block;float: right">
        </div>
        <div  slot="body" class="plus-dialog-body">
        </div>
    </be-dialog>
    ```
</docs>