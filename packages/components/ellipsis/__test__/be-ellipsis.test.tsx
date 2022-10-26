/*
 * @be-ellipsis.test.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/12/7)
 */
import { mount } from '@vue/test-utils'
import { asyncExpect } from '@be-ui/utils'
import beEllipsis from '../src/be-ellipsis.vue'
import { ref } from 'vue'
import {describe, test, expect, vi} from "vitest";
const _mount = (options: any) =>
  mount({
    components: {
      'be-ellipsis': beEllipsis,
    },
    ...options,
  })
/**
 * 测试props生效
 * @param options
 */
describe('test-be-ellipsis-props', () => {
  // 提示内容
  test('props-content', async function (){
    const wrapper = _mount({
      template: `
                <be-ellipsis 
                    :forceUpdate = 'false'
                    data-test ="be_ellipsis_test_content"
                    content="自古逢秋悲寂寥" 
                    :elpNum = '0' 
                    text="我言秋日胜春朝">
                </be-ellipsis>
               `,
    })
    const elm: HTMLElement | null = wrapper.find('[data-test="be_ellipsis_test_content"]').element
      .parentElement
    await asyncExpect(() => {
      elm && elm.dispatchEvent(new Event('mouseenter'))

    }, null)
    await asyncExpect(() => {
      expect(document.body.innerHTML.indexOf('自古逢秋悲寂寥') > 0).toBeTruthy()

    }, 300)
  })
  // 显示内容
  test('props-text', async () => {
    const wrapper = _mount({
      template: `
                <be-ellipsis
                    :forceUpdate = 'false'
                    data-test ="be_ellipsis_test_text"
                    content="自古逢秋悲寂寥" 
                    :elpNum = '0' 
                    text="我言秋日胜春朝">
                </be-ellipsis>
               `,
    })
    const elm = wrapper.find('[data-test="be_ellipsis_test_text"]').element
    await asyncExpect(() => {
      expect(elm.innerHTML === '我言秋日胜春朝').toBeTruthy()
    }, null)
  })
  // 缩略数
  test('props-elpNum', async () => {
    const wrapper = _mount({
      template: `
                <be-ellipsis
                    :forceUpdate = 'false'
                    data-test ="be_ellipsis_test_elpNum"
                    content="自古逢秋悲寂寥" 
                    :elpNum = '3' 
                    text="我言秋日胜春朝">
                </be-ellipsis>
               `,
    })
    const elm = wrapper.find('[data-test="be_ellipsis_test_elpNum"]').element
    await asyncExpect(() => {
      expect(elm.innerHTML === '我言秋日...').toBeTruthy()
    }, null)
  })
  // 是否多行展开
  test('props-expandTrigger', async () => {
    const wrapper = _mount({
      template: `
                <be-ellipsis
                    :forceUpdate = 'false'
                    data-test ="be_ellipsis_test_expandTrigger"
                    content="自古逢秋悲寂寥" 
                     expandTrigger
                    :lineClamp="3"
                    :elpNum = '3' 
                    text="我言秋日胜春朝">
                </be-ellipsis>
               `,
    })
    const elm: HTMLElement = wrapper.find('[data-test="be_ellipsis_test_expandTrigger"]')
      .element as HTMLElement
    const elmStyle: CSSStyleDeclaration = elm.style
    await asyncExpect(() => {
      expect(elmStyle.display === '-webkit-inline-box').toBeTruthy()
    }, null)
    elm.dispatchEvent(new Event('click'))
    await asyncExpect(() => {
      expect(elmStyle.display === '').toBeTruthy()
    }, null)
    elm.dispatchEvent(new Event('click'))
    await asyncExpect(() => {
      expect(elmStyle.display === '-webkit-inline-box').toBeTruthy()
    }, null)
  })
  // 多行展开行数限制
  test('props-lineClamp', async () => {
    const wrapper = _mount({
      template: `
                <be-ellipsis
                  :forceUpdate = 'false'
                    data-test ="be_ellipsis_test_elpNum"
                    content="自古逢秋悲寂寥" 
                    expandTrigger
                    :lineClamp="3"
                    :elpNum = '3' 
                    text="我言秋日胜春朝">
                </be-ellipsis>
               `,
    })
    const elm: HTMLElement = wrapper.find('[data-test="be_ellipsis_test_elpNum"]')
      .element as HTMLElement
    const elmStyle: CSSStyleDeclaration = elm.style
    await asyncExpect(() => {
      expect(elmStyle.display === '-webkit-inline-box').toBeTruthy()
    }, null)
  })
  // 缩略位置
  test('props-placement', async () => {
    const wrapper = _mount({
      template: `
                <be-ellipsis
                    :forceUpdate = 'false'
                    :placement = 'placement'
                    data-test ="be_ellipsis_test_placement"
                    content="自古逢秋悲寂寥" 
                    :elpNum = '3' 
                    text="我言秋日胜春朝">
                </be-ellipsis>
               `,
      setup() {
        const placement = ref<string>('left')
        return {
          placement,
        }
      },
    })
    const elm = wrapper.find('[data-test="be_ellipsis_test_placement"]').element
    const vm = wrapper.vm
    await asyncExpect(() => {
      expect(elm.innerHTML === '我言秋日...').toBeTruthy()
    }, null)
    vm.placement = 'center'
    await asyncExpect(() => {
      expect(elm.innerHTML === '我言...春朝').toBeTruthy()
    }, null)
    vm.placement = 'right'
    await asyncExpect(() => {
      expect(elm.innerHTML === '...日胜春朝').toBeTruthy()
    }, null)
  })
})
