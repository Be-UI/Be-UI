/*
* @be-loading-elm.js
* @description loading组件的动画组件
* @author czh
* @update (czh 2021/06/06)
*/
import './loading.scss'

const renderCircle = function (h,color) {
    return (
            <div class="circleBox">
                <span style={`background-color:${color}`}></span>
                <span style={`background-color:${color}`}></span>
                <span style={`background-color:${color}`}></span>
                <span style={`background-color:${color}`}></span>
            </div>
        )
}
export default {
    name: "BeLoadingAnimate",
    inject: ['$$BeLoading'],
    render(h) {
        const loadingAnim = []
        // 判断用户是否自定义渲染
        if(this.$$BeLoading.customRender()){
            loadingAnim[0] = this.$$BeLoading.customRender()
        }else{
            for(let i = 0;i<=2;i++){
                loadingAnim.push(renderCircle(h,this.$$BeLoading.color))
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
}