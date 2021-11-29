/*
* @be-breadcrumb.test.ts
* @deprecated 
* @author czh
* @update (czh 2021/11/24)
*/
import {mount} from '@vue/test-utils'
import BeBreadcrumb from '../src/be-breadcrumb'
import BeBreadcrumbItem from '../src/be-breadcrumb-item'
import {ref} from "vue";

const _mount = (options: any) =>
    mount({
        components: {
            'BeBreadcrumb': BeBreadcrumb,
            'BeBreadcrumbItem': BeBreadcrumbItem,
        },
        ...options,
    })
/**
 * 测试props生效
 * @param options
 */
describe('test-be-breadcrumb-props', () => {
    test('props-separator', () => {
        const wrapper = _mount({
            template: `
                <be-breadcrumb>
                    <be-breadcrumb-item disabled  separator="#" >柳丁</be-breadcrumb-item>
                    <be-breadcrumb-item  separator="#">
                        小镇姑娘
                        <template #separator>❀</template>
                    </be-breadcrumb-item>
                    <be-breadcrumb-item >普通朋友</be-breadcrumb-item>
                </be-breadcrumb>`,
            setup() {
                return {

                }
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
                    <be-breadcrumb-item disabled to="/test">柳丁</be-breadcrumb-item>
                    <be-breadcrumb-item disabled :click="handleClick">普通朋友</be-breadcrumb-item>
                    <be-breadcrumb-item disabled :option="testList">似曾相识</be-breadcrumb-item>
                </be-breadcrumb>`,
            setup() {
                const testList = ref([
                    {label: '落日绣帘卷', id: '落日绣帘卷'},
                ])
                return {
                    handleClick,
                    testList
                }
            },
        })
        const itemList = wrapper.findAll('.be-breadcrumb-item__separator')
        await itemList[1].trigger('click');
        expect(handleClick).not.toBeCalled()
        await itemList[2].trigger('click');
        debugger
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

