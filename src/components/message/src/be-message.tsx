import {defineComponent} from "vue";

export default defineComponent({
    name: "BeMessage",
    props:{
        option:{
            type: Object,
            default: {
                isShow:false,
                style: {},
                placementSelf:'',
                titles:'',//
                customClass:'',//
                msgType:'warning',//
                offsetTop:0,//
                offsetBottom:0,//
                placement:'topRight',//
                bodyRender:null,//
                iconPreRender:null,//
                closeRender:null,//
                description:'',//
                duration:4500,//
                key:'',//
                timer:0,//
                //关闭回调方法
                onClose: null,
                //点击回调方法
                onClick:null
            }
        }
    },
    setup(props,ctx){
        return ()=>{
            return (
                <></>
            )
        }
    }
})