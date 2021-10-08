/*
* @be-loading-elm.tsx
* @description loading组件的动画组件
* @author czh
* @update (czh 2021/06/06)
*/
import '../../../assets/style/be-loading.scss'
import {defineComponent,VNode} from 'vue'
const renderCircle = function (color:string) :VNode{
    return (
            <div class="circleBox">
                <span style={`background-color:${color}`}></span>
                <span style={`background-color:${color}`}></span>
                <span style={`background-color:${color}`}></span>
                <span style={`background-color:${color}`}></span>
            </div>
        )
}
export default defineComponent({
    name: "BeLoadingAnimate",
    inject: ['$$BeLoading'],
    render() {
        const loadingAnim = []
        // 判断用户是否自定义渲染
        if(this.$$BeLoading.customRender()){
            loadingAnim[0] = this.$$BeLoading.customRender()
        }else{
            for(let i = 0;i<=2;i++){
                loadingAnim.push(renderCircle(this.$$BeLoading.color))
            }
        }
        return (
            <div
                 style={`left:${this.$$BeLoading.left};top:${this.$$BeLoading.top}`}
                 class={`be-loader be-loader__${this.$$BeLoading.sizeLoader} ${this.$$BeLoading.isBackgroundStyle}`}>
                {/*loading动画渲染*/}
                {loadingAnim}
            </div>
        )
    }
})