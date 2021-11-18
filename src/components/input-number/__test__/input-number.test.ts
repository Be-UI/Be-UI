/*
* @input-number.test.ts.ts
* @deprecated be-input-number组件单元测试
* @author czh
* @update (czh 2021/11/18)
*/
import {mount} from '@vue/test-utils'
import BeInputNumber from '../src/be-input-number'
import {ComponentInternalInstance, getCurrentInstance, nextTick, ref} from "vue";
import {asyncExpect} from "../../../utils/utils";
const mousedown = new Event('mousedown')

interface IInputNumTest extends ComponentInternalInstance {
    blur: Function
    focus: Function
    select: Function
}

const _mount = (options: any) =>
    mount({
        components: {
            'BeInputNumber': BeInputNumber,
        },
        ...options,
    })
/**
 * 测试props生效
 * @param options
 */
describe('test-be-input-number-props', () => {
    test('props-size-mini', async () => {
        const wrapper = await mount(BeInputNumber, {
            props: {
                size: 'mini'
            },
        })

        expect(wrapper.find('.be-input-number__mini').exists()).toBeTruthy()
    })
    test('props-size-medium', async () => {
        const wrapper = await mount(BeInputNumber, {
            props: {
                size: 'medium'
            },
        })
        expect(wrapper.find('.be-input-number__medium').exists()).toBeTruthy()
    })
    test('props-size-large', async () => {
        const wrapper = await mount(BeInputNumber, {
            props: {
                size: 'large'
            },
        })
        expect(wrapper.find('.be-input-number__large').exists()).toBeTruthy()
    })
    test('props-disabled', async () => {
        const wrapper = await _mount({
            template: '<BeInputNumber :disabled="true" v-model="num" />',
            setup() {
                const num = ref(0)
                return {
                    num,
                }
            },
        })
        wrapper.find('.be-input-number__up').trigger('mousedown')
        document.dispatchEvent(mousedown)
        await nextTick()
        expect(wrapper.find('input').element.value).toEqual('0')
        wrapper.find('.be-input-number__down').trigger('mousedown')
        document.dispatchEvent(mousedown)
        await nextTick()
        expect(wrapper.find('input').element.value).toEqual('0')
    })
    test('props-render-pre-next', async () => {
        const wrapper = await _mount({
            template: `
                <BeInputNumber v-model="num">
                <template #next><span id="test_next">next</span></template>
                <template #pre><span id="test_pre">pre</span></template>
                </BeInputNumber>`,
            setup() {
                const num = ref(0)
                return {
                    num,
                }
            },
        })
        expect(wrapper.find('#test_next').exists()).toBeTruthy()
        expect(wrapper.find('#test_pre').exists()).toBeTruthy()
    })
    test('props-render-exceed', async () => {
        const wrapper = await _mount({
            template: `
                <BeInputNumber v-model="num" max="10">
                <template #next><span id="test_next">next</span></template>
                <template #pre><span id="test_pre">pre</span></template>
                </BeInputNumber>`,
            setup() {
                const num = ref(11)
                return {
                    num,
                }
            },
        })
        expect(wrapper.find('.be-input-number__limit').exists()).toBeTruthy()
    })
    test('props-render-max', async () => {
        const wrapper = await _mount({
            template: `
                <BeInputNumber v-model="num" max="10">
                </BeInputNumber>
            `,
            setup() {
                const num = ref(11)
                return {
                    num,
                }
            },
        })
         wrapper.find('.be-input-number__up').trigger('click')
        expect(wrapper.vm.num).toEqual(10)
    })
    test('props-render-min', async () => {
        const wrapper = await _mount({
            template: `
                <BeInputNumber v-model="num" min="10">
                </BeInputNumber>
            `,
            setup() {
                const num = ref(10)
                return {
                    num,
                }
            },
        })
        wrapper.find('.be-input-number__down').trigger('click')
        expect(wrapper.vm.num).toEqual(10)
    })
})
describe('test-be-input-number-event', () => {
    test('event:change', async () => {
        const handleChangeJest = jest.fn()
        const wrapper = await _mount({
            template: `
                <BeInputNumber v-model="num" ref="BeInputNumbers"
                               @change="handleChange">
                </BeInputNumber>`,
            setup() {
                const num = ref(1)
                const handleChange = (val:string): void => {
                    handleChangeJest(val)
                }
                return {
                    num,
                    handleChange,
                }
            },
        })
        const el = wrapper.find('input').element
        const simulateEvent = (text:string, event:string) => {
            el.value = text
            el.dispatchEvent(new Event(event))
        }
        simulateEvent('2', 'change')
        await asyncExpect(() => {
            expect(handleChangeJest).toBeCalled()
        }, 500)
    })
    test('event:step', async () => {
        debugger
        const handleStepJest = jest.fn()
        const wrapper = await _mount({
            template: `
                <BeInputNumber v-model="num" ref="BeInputNumbers"
                               @step="handleChange">
                </BeInputNumber>`,
            setup() {
                const num = ref(1)
                const handleStep = (val:string): void => {
                    debugger
                    handleStepJest(val)
                }
                debugger
                return {
                    num,
                    handleStep,
                }
            },
        })
        const el = wrapper.find('.be-input-number__up').element
        const simulateEvent = (event:string) => {
            el.dispatchEvent(new Event(event))
        }
        await simulateEvent('click')
        nextTick()
        expect(handleStepJest).toBeCalled()
       /* await asyncExpect(() => {
            expect(handleStepJest).toBeCalled()
        }, 0)*/
        /*wrapper.find('.be-input-number__down').trigger('click')
        await nextTick()
        await asyncExpect(() => {
            expect(handleStepJest).toBeCalled()
        }, 500)*/
    })
   /* test('event:change', async () => {

    })*/
})
/**
 * 测试公共方法
 */
describe('test-be-input-number-public-function', () => {
    test('public-function-focus-blur-select', async () => {
        const handleFocusJest = jest.fn()
        const handleBlurJest = jest.fn()
        const handleSelectJest = jest.fn()
        const wrapper = await _mount({
            template: `
                <BeInputNumber v-model="num" ref="BeInputNumbers"
                               @select="handleSelect"
                               @focus="handleFocus"
                               @blur="handleBlur">
                </BeInputNumber>`,
            setup() {
                const curInst = getCurrentInstance()
                const num = ref(1)
                const handleFocus = (): void => {
                    handleFocusJest()
                }
                const handleBlur = (): void => {
                    handleBlurJest()
                }
                const handleSelect = (): void => {
                    handleSelectJest()
                }
                const manualFocus = (): void => {
                    curInst && (curInst.refs.BeInputNumbers as IInputNumTest).focus()
                }
                const manualBlur = (): void => {
                    curInst && (curInst.refs.BeInputNumbers as IInputNumTest).blur()
                }
                const manualSelect = (): void => {
                    curInst && (curInst.refs.BeInputNumbers as IInputNumTest).select()
                }
                return {
                    num,
                    manualFocus,
                    manualBlur,
                    manualSelect,
                    handleFocus,
                    handleBlur,
                    handleSelect,
                }
            },
        })
        wrapper.vm.manualFocus()
        await nextTick()
        expect(handleFocusJest).toBeCalled()
        wrapper.vm.manualBlur()
        await nextTick()
        expect(handleBlurJest).toBeCalled()
        wrapper.vm.manualSelect()
        await nextTick()
        expect(handleSelectJest).toBeCalled()
    })
})