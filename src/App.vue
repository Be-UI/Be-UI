<template>
    <div id="App">
        <!--<be-loading
            :show="isLoading"
            text="测试loading"
            size="large"
            round="10"
            color="red"
            :isBackground="false"
            :customRender="customRender"
            customClass="asdwq"
            colorText="white">

        </be-loading>-->
        <!--    <be-ellipsis
                    placement="left"
                    text="qcwqwd"
                    content="电灯熄灭 物换星移 泥牛入海 黑暗好像 一颗巨石 按在胸口独脚大盗
            百万富翁 摸爬滚打 黑暗好像 一颗巨石 按在胸口电灯熄灭 物换星移 泥牛入海 黑暗好像 一颗巨石 按在胸口独脚大盗
            百万富翁 摸爬滚打 黑暗好像 一颗巨石 按在胸口"
                    expandTrigger>
            </be-ellipsis>-->

        <!--      <be-popover trigger="click" width="300" customClass="asdwq" >
                  <template #trigger>
        &lt;!&ndash;            <div width="25" height="25"  @click="test" style="position: absolute;left: 20%;top: 100px;">++</div>&ndash;&gt;
                    <be-icon icon="delete" @click="testclose" style="position: absolute;left: 20%;top: 100px;"></be-icon>
                  </template>
                   <panda width="25" height="25"  @click="test"></panda>
              </be-popover>-->
        <!--    <be-tooltip content="'qwddddddddddddddddddd" placement="left" x="300" y="300" trigger="manual">
              <div width="25" height="25"  @click="test" style="position: absolute;left: 20%;top: 100px;">++</div>
            </be-tooltip>-->
        <!--    <div width="25" height="25" style="position: absolute;left: 20%;top: 100px;">
                <be-button
                    @click="test"
                    prevIcon="delete"
                    nextIcon="delete"
                    type="warning "
                    size="large">
                    测试
                </be-button>
                <div style="margin-top: 10px">
                    &lt;!&ndash;  layout,isFront,pageData,isDynamic,disabledJump,disabled    //:pageSize="pageParams.pageSize"&ndash;&gt;
        &lt;!&ndash;            <be-pagination
                                   :pageSize="pageParams.pageSize"
                                   :pageCount="pageParams.total"
                                   :pagerShowCount="5"
                                   @changePage="pageChange"
                                   :currentPage="pageParams.currentPage">
        &lt;!&ndash;                <template #prev>
                            <be-button
                                @click="test"
                                prevIcon="delete"
                                nextIcon="delete"
                                type="warning "
                                size="large">
                                测试
                            </be-button>
                        </template>
                        <template #next>
                            <be-button
                                @click="test"
                                prevIcon="delete"
                                nextIcon="delete"
                                type="warning "
                                size="large">
                                测试
                            </be-button>
                        </template>&ndash;&gt;
                    </be-pagination>&ndash;&gt;
        &lt;!&ndash;            <be-pagination
                        :pageSize="pageParams.pageSize"
                        :pageCount="pageParams.total"
                        isDynamic
                        :pagerShowCount="5"
                        @changePage="pageChange"
                        :currentPage="pageParams.currentPage">
                        <template #prev>
                            <be-button
                                @click="test"
                                prevIcon="delete"
                                nextIcon="delete"
                                type="warning "
                                size="large">
                                测试
                            </be-button>
                        </template>
                        <template #next>
                            <be-button
                                @click="test"
                                prevIcon="delete"
                                nextIcon="delete"
                                type="warning "
                                size="large">
                                测试
                            </be-button>
                        </template>
                    </be-pagination>&ndash;&gt;
                    <be-pagination
                        :pageSize="pageParams.pageSize"
                        :pageCount="pageParams.total"
                        :pagerShowCount="5"
                        @changePage="pageChange"
                        @updatePage="updatePage"
                        @updateNum = 'updateNum'
                        :page-data="pageData"
                        isFront
                        :currentPage="pageParams.currentPage">
                        <template #prev>
                            <be-button
                                @click="test"
                                prevIcon="delete"
                                nextIcon="delete"
                                type="warning "
                                size="large">
                                测试
                            </be-button>
                        </template>
                        <template #next>
                            <be-button
                                @click="test"
                                prevIcon="delete"
                                nextIcon="delete"
                                type="warning "
                                size="large">
                                测试
                            </be-button>
                        </template>
                    </be-pagination>
                </div>
            </div>-->

        <!--        <div style="width:100px;height: 30px;background: #4F62A7" id="qwq">cesas</div>
            <div style="width: 60px;height: 30px;background: #4F62A7" id="aaa">top</div>-->
        <!--    <be-icon icon="delete" @click="testclose"></be-icon>-->

        <!--<div class='be-icon-container'>
          <svg class="be-icon"
               :width="30"
               :height="30"
               aria-hidden="true">
            <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
              <path d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z" fill="#6B676E" p-id="1143" />
              <path d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z" fill="#FFEBD2" p-id="1144" />
              <path d="M330.324 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.324z" fill="#E9D7C3" p-id="1145" />
              <path d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-132.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.032 181.678 33.032 16.516 0 115.614 49.548 181.678-33.032 29.18-36.476-7.064-176.93-49.55-247.74z" fill="#FFFFFF" p-id="1146" />
              <path d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.032-132.128-148.646-132.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.032 132.128-148.646 132.128-181.678z" fill="#6B676E" p-id="1147" />
              <path d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.032 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-32.944 115.614-82.58-0.002-27.366-85.556-33.032-115.614-33.032z" fill="#464655" p-id="1148" />
              <path d="M330.324 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z" fill="#464655" p-id="1149" />
              <path d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z" fill="#464655" p-id="1150" />
            </svg>
          </svg>
        </div>-->
        <!--      <be-dialog
                  titles="测试Dialog"
                  ref='moreNodeDialog'
                  v-model:is-show="showDialog"
                  customClass="asdwq"
                   escExit
                  :is-open-modal="true">
        &lt;!&ndash;          <template #headerIcon>
                    <be-icon icon="error" @click="showDialog = false"></be-icon>
                  </template>&ndash;&gt;
                <template #body>
                  <div slot="body" class="plus-dialog-body">
                    这是一个弹窗哦
                  </div>
                </template>
                <template #footer>
                <be-button type="primary"
                           bordered
                           round="3">确定
                </be-button>
                </template>
              </be-dialog>-->
        <div width="25" height="25" style="position: absolute;left: 20%;top: 100px;">
<!--            <be-input
                ref="sssinput"
                clearable
                showPassword
                type="password"
                size="mini"
                prevIcon="delete"
                nextIcon="delete"
                @prevIconClick="handlePrevIcon"
                @nextIconClick="handlenextIcon"
                @change="handleChange"
                @input="handleinput"
                @focus="handlefocus"
                @blur="handleblur"
                v-model="num">
                <template #prev>
                    <be-button
                        @click="test"
                        prevIcon="delete"
                        nextIcon="delete"
                        type="warning "
                        size="large">
                        测试
                    </be-button>
                </template>
                <template #next>
                    <be-button
                        @click="test"
                        prevIcon="delete"
                        nextIcon="delete"
                        type="warning "
                        size="large">
                        测试
                    </be-button>
                </template>
            </be-input>-->
            <be-autocomplete
                clearable
                showPassword
                type="password"
                size="mini"
                prevIcon="delete"
                nextIcon="delete"
                @prevIconClick="handlePrevIcon"
                @nextIconClick="handlenextIcon"
                @change="handleChange"
                @input="handleinput"
                @focus="handlefocus"
                @blur="handleblur"
                v-model="num">
                <template #prev>
                    <be-button
                        @click="test"
                        prevIcon="delete"
                        nextIcon="delete"
                        type="warning "
                        size="large">
                        测试
                    </be-button>
                </template>
                <template #next>
                    <be-button
                        @click="test"
                        prevIcon="delete"
                        nextIcon="delete"
                        type="warning "
                        size="large">
                        测试
                    </be-button>
                </template>
            </be-autocomplete>

        </div>
    </div>

</template>

<script lang="tsx">
import {panda} from './test'
import {BeNotify} from "./components/notification/src/be-notification-service";
import {BeMsg} from "./components/message-box/src/be-message-box-service";
import BePopover from "./components/popover/src/be-popover.vue";
import {createPopper} from '@popperjs/core'
import {BeLoadingSer} from './components'


export default {
    name: 'App',
    data() {
        return {
            num: 0,
            notify: null,
            isLoading: true,
            showDialog: false,
            loadingInst: null,
            pageData: [],
            pageParams: {
                currentPage: 1,
                pageNum: 1,
                pageSize: 5,
                total: 50
            },
        }

    },
    components: {

        panda
    },
    mounted() {
        /* const tr = document.getElementById('qwq')
         const po = document.getElementById('aaa')
         createPopper(tr, po, {
               placement: 'top',
         })*/


        for (let i = 0; i < 50; i++) {
            this.pageData.push({num: i})
        }
    },
    methods: {
        handleblur(){

        },
        handlefocus(){

        },
        handlenextIcon(){

        },
        handlePrevIcon(){

        },
        handleinput(data) {
            console.log(data)
        },
        handleChange(data) {
            console.log(data)
        },
        pageChange(data) {
            console.log(data)
            this.pageParams.currentPage = data.currentPage
        },
        updatePage(data) {
            console.log(data)
        },
        updateNum(data) {
            console.log(data)
        },
        customRender() {
            return (<be-icon icon="delete" style="position: absolute;left: 20%;top: 100px;"></be-icon>)
        },
        test(qw) {
            this.showDialog = !this.showDialog
            /*this.loadingInst = BeLoadingSer.init({
                isBackground:false,
                bgColor:'#F2F4F5',
                text:'正在访问中，请稍候…',
                color:'#b1b1b1',
            })
            setTimeout(()=>{
                BeLoadingSer.close(this.loadingInst)
            },3000)*/

            // this.isLoading = !this.isLoading
            /* BeMsg({
               isDrag:true,
               titles:'MessageBox',
               customClass:'q1qwdsaddddddd',
               msgType:'warning',
               footerType:'center',
               footerRender:null,
               bodyRender:()=>{
                 return <p style="font-size:14px;font-weight:400;font-family: Microsoft YaHei;letter-spacing: 2px;">
                   您的体验时间仅剩
                 </p>
               },
               onConfirm:()=>console.log('click'),
               onClose:()=>console.log('close'),
               iconPreRender:null,
               iconNextRender:null,
               isOpenModal:true,
             })*/
            /* this.notify = BeNotify({
                 titles:'Notification',
                 bodyRender:()=>{
                     return <p style="font-size:14px;font-weight:400;font-family: Microsoft YaHei;letter-spacing: 2px;">
                         您的体验时间仅剩
                     </p>
                 },
                 msgType:'info',
                 onClick:()=>console.log('click'),
                 onClose:()=>console.log('close'),
                 offsetBottom:10,
                 placement:'bottomRight',
                 duration:0,
                 key:1
             })*/
        },
        testclose() {
            this.notify.close()
        }
    }
}
</script>
<style lang="scss">
body {
    height: 100%;
    position: fixed;
    width: 100%;
}

#App {
    background: $info;
    height: 100%;
    width: 100%;
    position: fixed;
}

.asdwq {
    background-color: red;
}
</style>