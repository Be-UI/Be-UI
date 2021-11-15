import {mount} from '@vue/test-utils'
import {BeMessage} from '../src/be-message-service'
import {IMessage, IMsgInst} from "../src/be-message-type";
import {ComponentInternalInstance} from "vue";
import {asyncExpect} from "../../../utils/utils";

/**
 * 测试props生效
 * @param options
 */
describe('test-be-message-props', () => {
    // 四种预设情感
    test('props-msgType', () => {
        const compInstWarning = BeMessage({msgType: 'warning'} as IMessage) as IMsgInst
        const ElmWarning = compInstWarning.message.el as HTMLElement
        expect(ElmWarning.className.indexOf('be-message__warning') > 0).toBeTruthy()

        const compInstError = BeMessage({msgType: 'error'} as IMessage) as IMsgInst
        const ElmError = compInstError.message.el as HTMLElement
        expect(ElmError.className.indexOf('be-message__error') > 0).toBeTruthy()

        const compInstSuccess = BeMessage({msgType: 'success'} as IMessage) as IMsgInst
        const ElmSuccess = compInstSuccess.message.el as HTMLElement
        expect(ElmSuccess.className.indexOf('be-message__success') > 0).toBeTruthy()

        const compInstInfo = BeMessage({msgType: 'info'} as IMessage) as IMsgInst
        const ElmInfo = compInstInfo.message.el as HTMLElement
        expect(ElmInfo.className.indexOf('be-message__info') > 0).toBeTruthy()
    })
    // 测试 开启与关闭
    test('props-loading', async () => {
        interface IMsgInstanceTest {
            message: {
                props: {
                    option: {
                        loading: boolean
                    }
                }
                el: HTMLElement
            },
            update: Function
        }

        let compInst = BeMessage({
            loading: true,
            msgType: 'warning',
            key: 'test-loading'
        } as IMessage) as IMsgInstanceTest
        let elm = compInst.message.el as HTMLElement
        expect(compInst.message.props.option.loading as boolean).toBeTruthy()
        expect(elm.querySelectorAll('.be-icon').length === 1).toBeTruthy()
        const loading: Element | undefined = elm.querySelectorAll('.be-icon')[0].children[0]
        expect(loading?.getAttribute('xlink:href')).toBe(`#loading`)
        // 关闭
        let compInstLoadingClose = compInst.update({
            loading: false,
            key: 'test-loading'
        })
        await asyncExpect(() => {
            expect((compInstLoadingClose.notify.props.option.loading === false)).toBeTruthy()
            compInstLoadingClose.notify.el.querySelectorAll('.be-icon').forEach((res: SVGAElement) => {
                expect(res?.getAttribute('xlink:href') !== '#loading').toBeTruthy()
            })

        }, 1000)
    }
)
/*test('props-round-number', () =>
    {
        const wrapper = mount(BeTag, {
            props: {
                round: 25,
            },
        })
        const Elm = wrapper.element as HTMLElement
        expect(Elm.style.borderRadius).toBe(`25px`)
    }
)
test('props-round-string', () =>
    {
        const wrapper = mount(BeTag, {
            props: {
                round: '25',
            },
        })
        const Elm = wrapper.element as HTMLElement
        expect(Elm.style.borderRadius).toBe(`25px`)
    }
)
test('props-size', () =>
    {
        const wrapperMini = mount(BeTag, {
            props: {
                size: 'mini',
            },
        })
        const ElmMini = wrapperMini.element as HTMLElement
        expect(ElmMini.className.indexOf('be-tag__mini') > 0).toBeTruthy()
        const wrapperMedium = mount(BeTag, {
            props: {
                size: 'medium',
            },
        })
        const ElmMedium = wrapperMedium.element as HTMLElement
        expect(ElmMedium.className.indexOf('be-tag__medium') > 0).toBeTruthy()
        const wrapperLarge = mount(BeTag, {
            props: {
                size: 'large',
            },
        })
        const ElmLarge = wrapperLarge.element as HTMLElement
        expect(ElmLarge.className.indexOf('be-tag__large') > 0).toBeTruthy()
    }
)
test('props-type', () =>
    {
        const wrapperPrimary = mount(BeTag, {
            props: {
                type: 'primary',
            },
        })
        const ElmPrimary = wrapperPrimary.element as HTMLElement
        expect(ElmPrimary.className.indexOf('be-tag__primary') > 0).toBeTruthy()

        const wrapperSuccess = mount(BeTag, {
            props: {
                type: 'success',
            },
        })
        const ElmSuccess = wrapperSuccess.element as HTMLElement
        expect(ElmSuccess.className.indexOf('be-tag__success') > 0).toBeTruthy()

        const wrapperDefault = mount(BeTag, {
            props: {
                type: 'default',
            },
        })
        const ElmDefault = wrapperDefault.element as HTMLElement
        expect(ElmDefault.className.indexOf('be-tag__default') > 0).toBeTruthy()

        const wrapperInfo = mount(BeTag, {
            props: {
                type: 'info',
            },
        })
        const ElmInfo = wrapperInfo.element as HTMLElement
        expect(ElmInfo.className.indexOf('be-tag__info') > 0).toBeTruthy()

        const wrapperWarning = mount(BeTag, {
            props: {
                type: 'warning',
            },
        })
        const ElmWarning = wrapperWarning.element as HTMLElement
        expect(ElmWarning.className.indexOf('be-tag__warning') > 0).toBeTruthy()

        const wrapperError = mount(BeTag, {
            props: {
                type: 'error',
            },
        })
        const ElmError = wrapperError.element as HTMLElement
        expect(ElmError.className.indexOf('be-tag__error') > 0).toBeTruthy()
    }
)
test('props-option', () =>
    {
        const wrapper = mount(BeTag, {
            props: {
                option: {
                    border: '1px solid #00ffff',
                    backgroundColor: 'red',
                    color: 'green'
                },
            },
        })
        const Elm = wrapper.element as HTMLElement
        expect(Elm.style.border).toBe(`1px solid #00ffff`)
        expect(Elm.style.backgroundColor).toBe(`red`)
        expect(Elm.style.color).toBe(`green`)
    }
)
test('props-disabled', () =>
    {
        const wrapper = mount(BeTag, {
            props: {
                disabled: true,
            },
        })
        const Elm = wrapper.element as HTMLElement
        expect(Elm.className.indexOf('be-tag__disabled') > 0).toBeTruthy()
    }
)*/
})
/**
* 关闭方法
* @param options
*/
/*const _mount = (options:any) =>
mount(
    {
        components: {
            'BeTag'
        :
            BeTag,
        }
    ,
    ...
        options,
    }
)
describe('test-be-tag-close-event', () =>
    {
        const handleClick = jest.fn()
        test('event:close', async () => {
            const wrapper = _mount({
                template: `
                    <BeTag
                        @close="handleClick" isClose></BeTag>`,
                setup() {
                    return {
                        handleClick,
                    }
                },
            })
            wrapper.find('.be-tag_close').trigger('click');
            expect(handleClick).toBeCalled()
        })
    }
)*/
