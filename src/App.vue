<template>
    <div id="app" ref="chart" @click="opennin(cuP++)">
        <!--      <be-loading :show="true">
                <div style="width: 100%;height: 100px;background: #4D60B2" @click="()=>{console.log(111111111)}"></div>
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
    </div>
</template>

<script>
//import {BeLoading} from "../src/components/Loading/be-loading-service.js";
import {BeNotify} from "../src/components/notification/be-notification-service.js";
//import BeInput from "../src/components/input/be-input";
export default {
    name: 'app',
    data () {
        return {
            show:false,
            isEdit:true,
            links:null,
            cuP:1,
            text:''
        }
    },
    components:{
       // BeInput,
    },
    mounted() {
    },
    methods:{
        opennin(num){
           /* BeNotify({
                titles:'qwdddddd',
                offsetTop:'50px'
            })*/

          let BeNotifys = BeNotify({
            titles: num,//
            customClass: 'bottomRight完全顶顶顶顶顶顶顶顶顶顶大大大',//
            msgType: 'error',//
            offsetBottom: 150,//
            placement: 'bottomRight',//
            bodyRender: ()=><div>1</div>,//
            iconPreRender:()=><div>2</div>,//
            closeRender: ()=><div>3</div>,//
            duration:0,
            description: '完全顶顶顶顶顶顶顶顶顶顶大大大',//
            onClick:()=>{
              console.log('点击方法')
            }
          })
        /*  setTimeout(()=>{
            BeNotifys.close()
          },3000)*/
        },
        customRender(){
            return (<svg-icon iconClass='Unfold_left' className="iconTitle"></svg-icon>);
        },
        getData(string,cb){
            /*  let data = [
                  {label:'asd',id:'wefheuihf'},
                  {label:'asdqdq强无敌群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群weed',id:'wefheerytuihf'},
                  {label:'qwdwqdqqwwd',id:'wefhefsduihf'},
                  {label:'qwdwqdqwrrd',id:'wefheudfgihf'},
              ]
              cb(data,'label','id')*/
            setTimeout(()=>{
                let data = [
                    {label:'asd',id:'wefheuihf'},
                    {label:'asdqdq强无敌群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群群weed',id:'wefheefewrytuihf'},
                    {label:'qwdwqdqqwwd',id:'wefhefsdeuihf'},
                    {label:'qwdwqdqwrrd',id:'wefheusddfgihf'},
                ]
                cb(data,'label','id')
            },1000)
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
    width: 30%;
    height: calc(90%) ;
    background-color: burlywood;
    margin-left: 10px;
    position: absolute;
    left: 25%;
    top:10%;
    padding: 10px;
    box-sizing: border-box;
}
</style>
