/*
* @be-breadcrumb.test.ts
* @deprecated 
* @author czh
* @update (czh 2021/11/24)
*/
import {mount} from '@vue/test-utils'
import BeBreadcrumb from '../src/be-breadcrumb'
import BeBreadcrumbItem from '../src/be-breadcrumb-item'
import {ClickOutside} from '../../../utils/direactives/custom-direactives/click-outside';
import {ref} from "vue";
import {asyncExpect} from "../../../utils/utils";
const clickEvt = new Event('click')
const _mount = (options: any) =>
    mount({
        components: {
            'BeBreadcrumb': BeBreadcrumb,
            'BeBreadcrumbItem': BeBreadcrumbItem,
        },
        directives: {ClickOutside},
        ...options,
    })
/**
 * 测试props生效
 * @param options
 */
describe('test-be-breadcrumb-props', () => {
    test('props-disabled', async () => {
        const handleClick = jest.fn()
        const wrapper =  await _mount({
            template: `
                <be-breadcrumb>
                    <be-breadcrumb-item disabled to="/test">柳丁</be-breadcrumb-item>
                    <be-breadcrumb-item disabled :click="handleClick">普通朋友</be-breadcrumb-item>
                    <be-breadcrumb-item :disabled="isDisabled" :option="testList">似曾相识</be-breadcrumb-item>
                </be-breadcrumb>
`,
            setup() {
                interface IOptionItem{
                    label:string
                    id:string
                }
                const testList = ref<Array<IOptionItem>>([
                    {label: '落日绣帘卷', id: '落日绣帘卷'},
                ])
                const testClick = ()=>{
                    debugger
                }
                const isDisabled = ref<boolean>(false)
                return {
                    isDisabled,
                    handleClick,
                    testList,
                    testClick
                }
            },
        })
        const itemList = wrapper.findAll('.be-breadcrumb-item__content')
        // 测试禁用点击跳转

        // 测试禁用点击
        await itemList[1].trigger('click');
        expect(handleClick).not.toBeCalled()
        // 测试禁用 popover
        // 模拟点击开启 popover
        await asyncExpect(()=>{
            itemList[2].trigger('click');
        },null)
        await asyncExpect(()=>{
            expect(document.body.querySelectorAll('.be-popover').length).toBe(1)
        },1000)
        // 模拟点击其他div 关闭 popover
        await document.body.dispatchEvent(clickEvt)
        await asyncExpect(()=>{
            expect(document.body.querySelectorAll('.be-popover').length).toBe(0)

        },1000)
        // 设置禁用再次模拟点击
        await asyncExpect(()=>{
            wrapper.vm.isDisabled = true
            itemList[2].trigger('click');
        },null)
        await asyncExpect(()=>{
            expect(document.body.querySelectorAll('.be-popover').length).toBe(0)
        },null)
    })
})
describe('test-be-breadcrumb-event', () => {
    test('event:click',  async () => {
        const handleClick = jest.fn()
        const wrapper =   _mount({
            template: `
                <be-breadcrumb>
                    <be-breadcrumb-item :click="handleClick" to="/test">
                        小镇姑娘
                    </be-breadcrumb-item>
                    <be-breadcrumb-item :click="handleClick" to="/test">
                        普通朋友
                    </be-breadcrumb-item>
                
                </be-breadcrumb>`,
            setup() {
                return {
                    handleClick,
                }
            },
        })
        const itemList = wrapper.findAll('.be-breadcrumb-item__content')
        await itemList[0].trigger('click');
        expect(handleClick).toBeCalled()
    })
})

