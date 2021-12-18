/*
* @be-loading.test.ts.ts
* @deprecated 
* @author czh
* @update (czh 2021/12/14)
*/
import {asyncExpect} from "../../../utils/utils";
import {mount} from '@vue/test-utils'
import BeLoading from "../src/be-loading.vue";
import {ref} from "vue";

const _mount = (options: any) =>
    mount({
        components: {
            'be-loading': BeLoading,
        },
        ...options,
    })
/**
 * 测试props生效
 * @param options
 */
describe('test-be-loading-props', () => {
    test('props-show', async () => {
        const wrapper = _mount({
            template: `
              <div>
              <be-loading :show="show"></be-loading>
              </div>
            `,
            setup() {
                const show = ref<boolean>(false)
                return {
                    show,
                }
            }
        })
        const vm = wrapper.vm
        await asyncExpect(() => {
            expect(document.body.querySelector('.be-load-container')).not.toBeTruthy()
        }, null)
        vm.show = true
        await asyncExpect(() => {
            expect(document.body.querySelector('.be-load-container')).toBeTruthy()
        }, null)
        vm.show = false
        await asyncExpect(() => {
            expect(document.body.querySelector('.be-load-container')).not.toBeTruthy()
        }, null)
    })
    test('props-customClass', async () => {
        _mount({
            template: `
                <div >
                <be-loading show customClass='test-beloading-custom-class'></be-loading>
                </div>
            `,
        })
        await asyncExpect(() => {
            expect(document.body.querySelector('.test-beloading-custom-class')).toBeTruthy()
        }, null)
    })
    test('props-round', async () => {
         _mount({
             template: `
                <div >
                <be-loading show customClass='test-beloading-round' :round="5"></be-loading>
                </div>
            `,
         })
         await asyncExpect(() => {
             const elm = document.body.querySelector('.test-beloading-round')?.querySelector('.be-loader') as HTMLElement
             expect(elm.style.borderRadius === '5px').toBeTruthy()
         }, null)
     })
   /* test('props-delay', () => {})
    test('props-color', () => {})
    test('props-colorText', () => {})
    test('props-size', () => {})
    test('props-text', () => {})
    test('props-delay', () => {})
    test('props-isFullScreen', () => {})
    test('props-isBackground', () => {})
    test('props-bgColor', () => {})
    test('props-customRender', () => {})*/
})