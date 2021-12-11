import {mount} from '@vue/test-utils'
import {asyncExpect} from "../../../utils/utils";
import BeDialog from "../src/be-dialog.vue";
import {getCurrentInstance, ref} from "vue";

const _mount = (options: any) =>
    mount({
        components: {
            'be-dialog': BeDialog,
        },
        ...options,
    })
/**
 * 测试props生效
 * @param options
 */
describe('test-be-dialog-props', () => {
    test('props-isShow', async () => {
        const wrapper = mount(BeDialog, {
            props: {
                isShow: true,
            },
        })
        await asyncExpect(() => {
            expect(wrapper.find('.be-dialog').exists()).toBeTruthy()
        }, null)
    })
    test('props-customClass', async () => {
        const wrapper = mount(BeDialog, {
            props: {
                isShow: true,
                customClass: 'test-customClass',
            },
        })
        await asyncExpect(() => {
            expect(wrapper.find('.test-customClass').exists()).toBeTruthy()
        }, null)

    })
    test('props-titles', async () => {
        const wrapper = await mount(BeDialog, {
            props: {
                isShow: true,
                titles: 'test-titles',
                customClass: 'test-titles-class',
            },
        })
        const titleElm = (wrapper.find('.test-titles-class').find('.be-dialog-container-head').element.childNodes[0]) as HTMLElement
        await asyncExpect(() => {
            expect(titleElm.innerHTML === 'test-titles').toBeTruthy()
        }, null)
    })
    test('props-isOpenModal', async () => {
        const wrapper = await mount(BeDialog, {
            props: {
                isShow: true,
            },
        })
        const modalElm = wrapper.find('.be-dialog-modal').exists()
        await asyncExpect(() => {
            expect(modalElm).toBeTruthy()
        }, null)
    })
    test('props-layout-right', async () => {
        const wrapper = await mount(BeDialog, {
            props: {
                isShow: true,
                layout: 'right'
            },
        })
        const modalElm = wrapper.find('.be-dialog-footer__right').exists()
        await asyncExpect(() => {
            expect(modalElm).toBeTruthy()
        }, null)
    })
    test('props-layout-center', async () => {
        const wrapper = await mount(BeDialog, {
            props: {
                isShow: true,
                layout: 'center'
            },
        })
        const modalElm = wrapper.find('.be-dialog-footer__center').exists()
        await asyncExpect(() => {
            expect(modalElm).toBeTruthy()
        }, null)
    })
    test('props-event-escCb', async () => {
        const handleEsc = jest.fn()
        const wrapper = _mount({
            template: `
              <div id="test_esc">
              <be-dialog @escEvt="handleEsc" customClass='test-esc' escExit ref="BeDialog" :isShow="show"></be-dialog>
              </div>
            `,
            setup() {
                const show = ref<boolean>(true)
                return {
                    show,
                    handleEsc,
                }
            }
        })
        await document.body.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
        await asyncExpect(() => {
            expect(handleEsc).toBeCalled()
        }, null)
    })
})
describe('test-be-dialog-event', () => {
    test('event:close', async () => {
        const handleClose = jest.fn()
        const wrapper = _mount({
            template: `
              <div id="test_esc">
              <be-dialog @close="handleClose" customClass='test-esc' escExit ref="BeDialog" :isShow="show"></be-dialog>
              </div>
            `,
            setup() {
                const show = ref<boolean>(true)
                return {
                    show,
                    handleClose,
                }
            }
        })
        wrapper.find('.be-dialog-close-btn').trigger('click')
        await asyncExpect(() => {
            expect(handleClose).toBeCalled()
        }, null)
    })
    test('event:confirm', async () => {
        const handleConfirm = jest.fn()
        const wrapper = _mount({
            template: `
              <div id="test_esc">
              <be-dialog @confirm="handleConfirm" customClass='test-esc' escExit ref="BeDialog"
                         :isShow="show"></be-dialog>
              </div>
            `,
            setup() {
                const show = ref<boolean>(true)
                return {
                    show,
                    handleConfirm,
                }
            }
        })
        wrapper.find('.be-dialog-footer-btn').trigger('click')
        await asyncExpect(() => {
            expect(handleConfirm).toBeCalled()
        }, null)
    })
})