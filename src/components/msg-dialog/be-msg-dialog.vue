/*
* @Author: yinian430
* @desc: 基于element的消息小弹窗
* @Date: 2020-07-21 17:06:49
* @Last Modified by: czh
* @Last Modified time: 2021-04-21 14:19:09
*/
<template>
    <div class="be-msg-dialog" :class="customClass" id="be_msg_dialog">
        <!--  <el-dialog width="436px" :custom-class="customClass"
                     :visible.sync="isShow"
                     @close="closeMsg">
              <img class="img" src="@/assets/image/pc/caveat.png" alt="">
              <p class="title" v-if="title">{{title}}</p>
              <p class="subTitle" v-if="subTitle">{{subTitle}}</p>
              <div slot="footer" class="dialog-footer" v-if="isShowBtn">
                  <el-button class="primary" type="primary" v-if="isShowConfirm" :loading="isLoading" @click="confirm">确认</el-button>
                  <el-button class="default" type="primary" v-if="isShowCancel" @click="closeMsg">取消</el-button>
              </div>
          </el-dialog>-->
        <be-dialog
                ref='beMsgDialog'
                animIn='animate__fadeIn'
                animOut='animate__fadeOut'
                :is-show.sync="isShow"
                :is-open-modal="true"
                :is-drag="false"
                :escExit = 'true'
                @escCb="closeMsg()"
                custom-class="msg-dialog">
            <div slot="headerIcon" style="display: inline-block;float: right">
                <i class="el-icon-close" @click="closeMsg"></i>
            </div>
            <div  slot="body" class="msg-dialog-body">
                <img class="img" src="@/assets/image/pc/caveat.png" alt="">
                <p class="title" v-if="title">{{title}}</p>
                <p class="subTitle" v-if="subTitle">{{subTitle}}</p>
            </div>
            <div slot="footer" class="dialog-footer" v-if="isShowBtn">
                <el-button class="primary" type="primary" v-if="isShowConfirm" :loading="isLoading" @click="confirm">确认</el-button>
                <el-button class="default" type="primary" v-if="isShowCancel" @click="closeMsg">取消</el-button>
            </div>
        </be-dialog>
    </div>
</template>

<script>
    import BeDialog from "../dialog/be-dialog";
    export default {
        /**
         * 基于element的消息小弹窗
         */
        name: 'BeMsgDialog',
        components: {BeDialog},
        props: {
            /**
             * 自定义主题
             */
            theme: {
                type: String,
                default: ''
            },
            /**
             * 弹窗标题
             */
            title: {
                type: String,
                default: ''
            },
            /**
             * 弹窗子标题
             */
            subTitle: {
                type: String,
                default: ''
            },
            /**
             * 是否显示下方按钮
             */
            isShowBtn: {
                type: Boolean,
                default: true
            },
            /**
             * 是否显示确认按钮
             */
            isShowConfirm: {
                type: Boolean,
                default: true
            },
            /**
             * 是否显示取消按钮
             */
            isShowCancel: {
                type: Boolean,
                default: true
            },
            /**
             * 是否显示
             */
            isShow: {
                type: Boolean,
                default: false
            },
            /**
             * 是否显示loading
             */
            isLoading:{
                type: Boolean,
                default: false
            }
        },
        computed: {
            //主题内容class 设置
            customClass() {
                return  `be-msg-dialog--${this.theme}`
            },
        },
        methods: {
            /**
             * 确认方法
             */
            confirm() {
                if (this.$listeners.confirm) {
                    /**
                     * 确认出发 confirm 事件
                     */
                    this.$emit('confirm');
                    this.closeMsg()
                } else {
                    this.$message.warning('请传入确认方法');
                }
            },
            /**
             * 关闭方法
             */
            closeMsg() {
                this.$emit('update:isShow', false);
            }
        }
    }
</script>

<style lang='scss' scoped>
    .be-msg-dialog {
        .img {
            display: block;
            width: 62px;
            margin: auto;
        }
        .title {
            text-align: center;
            margin-top: 20px;
            @include text($fz16, $textColor3, 21px, 400);
        }
        .subTitle {
            text-align: center;
            margin-top: 8px;
            @include text($fz16, $textColor5, 21px, 400);
        }
    }
</style>
<style lang='scss'>
    /*.be-msg-dialog {
          .el-dialog__title::before{
              width: 0;
          }
      }*/
    #be_msg_dialog {
        .msg-dialog{
            width: 436px;
            height: 240px;
            left: calc(50% - 218px);
            top: 15vh;
            background: white;
            .be-dialog-title{
                .be-dialog-contanter-head{
                    height: 30px;
                }
            }
            .el-icon-close{
                font-size: 25px;
                color: $textColor1;
            }
            .msg-dialog-body{
                padding: 0 22px;
                box-sizing: border-box;
            }
            .dialog-footer{
                display: flex;
                justify-content: center;
                margin-top: 15px;
            }
        }
    }
</style>

<docs>
    ## 事例:
    ```jsx
    <be-context-menu ref="contextmenu" :theme="'violet'">
        <be-contextmenu-item @click='copy' >复制</be-contextmenu-item>
        <be-contextmenu-submenu  title="发送" v-show="menuConfig.send">
            <be-contextmenu-item @click="jumpToOther('/browser','browser')" >浏览器</be-contextmenu-item>
            <be-contextmenu-item @click="jumpToOther('/analysis','analysis')">调查分析 </be-contextmenu-item>
            <be-contextmenu-item @click="openTrack" >地址监控</be-contextmenu-item>
            <be-contextmenu-item @click="jumpToOther('/investigation','investigation')" >调证分析</be-contextmenu-item>
            <be-contextmenu-item @click="jumpToOther('/debug/createDebug','createDebug')" >一键调证</be-contextmenu-item>
        </be-contextmenu-submenu>
    </be-context-menu>
    ```
</docs>