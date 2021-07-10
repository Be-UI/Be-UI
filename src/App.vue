<template>
    <div id="app" ref="chart" >
<!--      <be-pager
          @change="test"
          :currentPage="pageParams.currentPage"
          :pageCount="pageParams.pageCount"
          :pagerShowCount="pageParams.pagerCount">
      </be-pager>-->
<!--      <be-pager
          @change="test"
          :currentPage="pageParams.currentPage"
          :pageCount="pageParams.pageCount"
          is-dynamic
          :pagerShowCount="10">
      </be-pager>-->
      <BePagination
          @change="test"
          @updatePage="updatePage"
          isFront
          :page-size="10"
          :pagerShowCount = "5"
          :currentPage="pageParams.currentPage"
          :page-data="pageData">
        <div slot="prev">prev </div>
        <div slot="next">next </div>
      </BePagination>
<!--    <be-button size="medium"
               round="50"
               isIcon
               @click="()=>{loading = !loading}"
               type="error"
               preIcon="fill-in"
               :loading="loading">测试按钮</be-button>-->
<!--      <be-icon icon="coin"></be-icon>-->
<!--              <be-loading :show="true">
                <div style="width: 100%;height: 100px;background: #4D60B2"></div>
              </be-loading>-->
        <!-- <BePager
           :currentPage="10"
           :pageCount="10"
           :pagerCount="2"
           :disabled="false">
         </BePager>-->
        <!-- <BePager
           :currentPage="cuP"
           :is-dynamic="true"
           @change="(num)=>cuP = num"
           is-show-page-count="10"
           :disabled="false">
         </BePager>
         <el-button @click="cuP++ ">next</el-button>
         <el-button @click="cuP&#45;&#45; ">pre</el-button>-->
<!--        <be-input
            @change="changeTest"
            v-model="text"
            clearable
            next-icon="search"
            pre-icon="search"
            :fetch-suggestions="getData"
            @select="selectTest"
            placeholder="这是一个测试输入框">
        </be-input>-->
<!--      <be-dialog
        :is-show.sync="show"
        layout="right"
        titles="测试弹窗">
      </be-dialog>-->
    </div>
</template>

<script>
const PandaSvg = {
  template: `
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
  `,
};

//import {BeMsg} from "../src/components/message-box/be-message-box-service.js";
// import {BeLoading} from "../src/components/loading/be-loading-service.js";
// import BeInput from "../src/components/input/be-input";
// import {BeIconComponets} from "../src/components/svg-icon/index";
// let pandaicons = BeIconComponets('panda',PandaSvg)
import beIcon from '../src/components/svg-icon/index'
const myIcon = beIcon.createFromIconfontCN('/iconfont/iconfont.js')

export default {
    name: 'app',
    data () {
        return {
            show:false,
            isEdit:true,
            links:null,
            loading:false,
            cuP:1,
            text:'',
            pageData:[],
            pageParams:{
              currentPage:5,
              pageCount:77,
              pagerCount:10,
            }
        }
    },
    components:{
     // pandaicons
    },
    mounted() {
        for(let i = 1;i<=100;i ++){
          this.pageData.push({num:i})
        }
    },
    methods:{
      test(num){
        this.pageParams.currentPage = num.currentPage;
        console.log(num)
      },
      updatePage(page){
        console.log(page)
      }
    }
}
</script>

<style>
body,html{
    margin: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(52, 80, 91);
}
#app{
    width:40%;
    height: 110%;
    background-color: burlywood;
    margin-left: 10px;
    position: absolute;
    left: 25%;
    top:10%;
    padding: 10px;
    box-sizing: border-box;
}
</style>
