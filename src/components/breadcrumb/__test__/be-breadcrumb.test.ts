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

const _mount = (options: any) =>{
    return mount({
        components: {
            'BeBreadcrumb': BeBreadcrumb,
            'BeBreadcrumbItem': BeBreadcrumbItem,
        },
        directives: {ClickOutside},
        ...options,
    })
}


interface IOptionItem {
    label: string
    id: string
}

/**
 * 测试props生效
 * @param options
 */
describe('test-be-breadcrumb-props', () => {
    test('props-to', () => {
        const wrapper = _mount({
            template: `
                <be-breadcrumb>
                <be-breadcrumb-item to="/test">柳丁</be-breadcrumb-item>
                <be-breadcrumb-item>普通朋友</be-breadcrumb-item>
                </be-breadcrumb>`,
            setup() {
                return {}
            },
        })
        const itemList = wrapper.findAll('.be-breadcrumb-item__content')
        const nodeName: string = itemList[0].element.childNodes[0].nodeName
        const href: string = (itemList[0].element.childNodes[0] as HTMLAnchorElement).href
        expect(nodeName).toBe('A')
        expect(href.indexOf('/test') > 0).toBeTruthy()
    })
    test('props-separator', () => {
        const wrapper = _mount({
            template: `
                <be-breadcrumb>
                <be-breadcrumb-item disabled separator="#">柳丁</be-breadcrumb-item>
                <be-breadcrumb-item separator="#">
                    小镇姑娘
                    <template #separator>❀</template>
                </be-breadcrumb-item>
                <be-breadcrumb-item>普通朋友</be-breadcrumb-item>
                </be-breadcrumb>`,
            setup() {
                return {}
            },
        })
        const itemList = wrapper.findAll('.be-breadcrumb-item__separator')
        expect(itemList[0].element.innerHTML === '#').toBeTruthy()
        expect(itemList[1].element.innerHTML === '❀').toBeTruthy()
    })
    test('props-disabled', async () => {
        const handleClick = jest.fn()
        const wrapper = await _mount({
            template: `
                <be-breadcrumb>
                <be-breadcrumb-item disabled :click="handleClick">普通朋友</be-breadcrumb-item>
                <be-breadcrumb-item :disabled="isDisabled" :option="testList">似曾相识</be-breadcrumb-item>
                </be-breadcrumb>
            `,
            setup() {

                const testList = ref<Array<IOptionItem>>([
                    {label: '落日绣帘卷', id: '落日绣帘卷'},
                ])
                const isDisabled = ref<boolean>(false)
                return {
                    isDisabled,
                    handleClick,
                    testList,
                }
            },
        })
        const itemList = wrapper.findAll('.be-breadcrumb-item__content')

        // 测试禁用点击
        await itemList[0].trigger('click');
        expect(handleClick).not.toBeCalled()
        // 测试禁用 popover
        // 模拟点击开启 popover
        await asyncExpect(() => {
            itemList[1].trigger('click');
        }, null)
        await asyncExpect(() => {
            expect(document.body.querySelectorAll('.be-popover').length).toBe(1)
        }, 1000)
        // 模拟点击其他div 关闭 popover
        await document.body.dispatchEvent(new Event('click'))
        await asyncExpect(() => {
            expect(document.body.querySelectorAll('.be-popover').length).toBe(0)

        }, 1000)
        // 设置禁用再次模拟点击
        await asyncExpect(() => {
            wrapper.vm.isDisabled = true
            itemList[1].trigger('click');
        }, null)
        await asyncExpect(() => {
            expect(document.body.querySelectorAll('.be-popover').length).toBe(0)
        }, null)
    })
})
describe('test-be-breadcrumb-event', () => {
    test('event:click', async () => {
        const handleClick = jest.fn()
        const wrapper = _mount({
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
    test('event:clickOption', async () => {
        const handleClick = jest.fn()
        const wrapper = await _mount({
            template: `

                <be-breadcrumb>
                <be-breadcrumb-item :option="testList" :clickOption="handleClick">似曾相识</be-breadcrumb-item>
                </be-breadcrumb>
            `,
            setup() {
                const testList = ref<Array<IOptionItem>>([
                    {label: 'be-breadcrumb-item__content', id: '落日绣帘卷item__content'},
                ])
                return {
                    handleClick,
                    testList,
                }
            },
        })
        const itemList = wrapper.findAll('.be-breadcrumb-item__content')
        // 测试禁用 popover
        // 模拟点击开启 popover
        await asyncExpect(() => {
            itemList[0].trigger('click');
        }, null)
        await asyncExpect(() => {
            expect(document.body.querySelectorAll('.be-popover').length).toBe(2)
        }, 1000)
        const popover = document.body.querySelectorAll('.be-popover')[1]
        const popoverItemElm = popover.querySelector('.be-breadcrumb-item-li') as HTMLElement
        popoverItemElm.dispatchEvent(new Event('click'))
        await asyncExpect(() => {
            expect(handleClick).toBeCalled()
        }, 1000)
    })
})

