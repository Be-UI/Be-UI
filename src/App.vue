<template>
    <div id="app" ref="chart">
      <div @click="show = true">qwdqwdqw</div>
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
      <be-dialog
        :is-show.sync="show"
        layout="right"
        titles="测试弹窗">
      </be-dialog>
    </div>
</template>

<script>

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

    },
    mounted() {

    },
    methods:{

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
