import '../../../assets/style/be-popover.scss';
import {getUuid} from '../../../utils/common/common'
export default {
    name: 'BePopover',
    data(){
        return {
            placement:'top',
            raw:false,
            customClass:'',
            x:null,
            y:null,
            width:null,
            disabled:false,
            duration:100,
            delay: 100,
            trigger:'hover',

            triggerDom: null,
            show: false,
            outsideDisabled: false,
            place:'',
            style: {
                left: '0px',
                top: '0px',
            },
        }
    },
    methods:{

    },
    components:{

    },
    created(){

    },
    beforeDestroy() {
        // 取消事件监听
        if (this.triggerDom) {
            this.triggerDom.removeEventListener('click', () => this.changeDisplay(true), false)
            this.triggerDom.removeEventListener('mouseenter', () => this.changeDisplay(true), false)
            this.triggerDom.removeEventListener('mouseleave', () => this.changeDisplay(false), false)
        }
    },
    render(h) {
        const renderDom = (
            <div class={`be-popover ${this.customClass}`}
                                id={`be_popover_${this._uid}`}
                                key={`be_popover_${this._uid}`}
                                style="style">
                <div class="be-popover-body" id={`be_popover_body${this._uid}`}>
                    qwdqwdasdkjhhhhhhhhhhhhhhh
                </div>
               {/* <div className="be-popover-arrow" v-if="this.raw" className={`be-popover-arrow--${this.place}`}></div>*/}
            </div>
        )
        if(this.show){
            return (
                renderDom
            )
        }

    }
}