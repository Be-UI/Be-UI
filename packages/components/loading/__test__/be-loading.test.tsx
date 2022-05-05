/*
 * @be-loading.test.ts.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/12/14)
 */
import { asyncExpect } from '../../../utils/utils'
import { mount } from '@vue/test-utils'
import BeLoading from '../src/be-loading.vue'
import { ref } from 'vue'

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
              <be-loading :show="show" customClass='test-beloading-show'></be-loading>
              </div>
            `,
      setup() {
        const show = ref<boolean>(false)
        return {
          show,
        }
      },
    })
    const vm = wrapper.vm
    await asyncExpect(() => {
      expect(wrapper.find('.test-beloading-show').exists()).not.toBeTruthy()
    }, null)
    vm.show = true
    await asyncExpect(() => {
      expect(wrapper.find('.test-beloading-show').exists()).toBeTruthy()
    }, 300)
    vm.show = false
    await asyncExpect(() => {
      expect(wrapper.find('.test-beloading-show').exists()).not.toBeTruthy()
    }, 300)
  })
  test('props-customClass', async () => {
    const wrapper = _mount({
      template: `
                <div >
                <be-loading show customClass='test-beloading-custom-class'></be-loading>
                </div>
            `,
    })
    await asyncExpect(() => {
      expect(wrapper.find('.test-beloading-custom-class').exists()).toBeTruthy()
    }, 300)
  })
  test('props-round', async () => {
    const wrapper = _mount({
      template: `
                <div >
                <be-loading show customClass='test-beloading-round' :round="5"></be-loading>
                </div>
            `,
    })
    await asyncExpect(() => {
      const elm = wrapper
        .find('.test-beloading-round')
        .element?.querySelector('.be-load--container') as HTMLElement
      debugger
      expect(elm.style.borderRadius === '5px').toBeTruthy()
    }, 300)
  })
  test('props-color', async () => {
    const wrapper = _mount({
      template: `
                <div >
                <be-loading show customClass='test-beloading-color' color="red" :round="5"></be-loading>
                </div>
            `,
    })
    await asyncExpect(() => {
      const elm = wrapper
        .find('.test-beloading-color')
        .element?.querySelector('.circle--box') as HTMLElement
      expect(elm.querySelector('span')?.style.backgroundColor === 'red').toBeTruthy()
    }, 300)
  })
  test('props-text', async () => {
    const wrapper = _mount({
      template: `
                <div >
                <be-loading show customClass='test-beloading-text' text="testText"></be-loading>
                </div>
            `,
    })
    await asyncExpect(() => {
      const elm = wrapper
        .find('.test-beloading-text')
        .element?.querySelector('.be-load--text') as HTMLElement
      expect(elm.textContent === 'testText').toBeTruthy()
    }, 300)
  })
  test('props-colorText', async () => {
    const wrapper = _mount({
      template: `
                <div >
                <be-loading show customClass='test-beloading-colorText' text="testText" colorText="red"></be-loading>
                </div>
            `,
    })
    await asyncExpect(() => {
      const elm = wrapper
        .find('.test-beloading-colorText')
        .element?.querySelector('.be-load--text') as HTMLElement
      expect(elm.style.color === 'red').toBeTruthy()
    }, 300)
  })
  test('props-isBackground', async () => {
    const wrapper = _mount({
      template: `
              <div>
              <be-loading show customClass='test-beloading-isBackground' :isBackground="show"></be-loading>
              </div>
            `,
      setup() {
        const show = ref<boolean>(false)
        return {
          show,
        }
      },
    })
    const vm = wrapper.vm
    await asyncExpect(() => {
      const elm = wrapper
        .find('.test-beloading-isBackground')
        .element?.querySelector('.be-load__bg') as HTMLElement
      expect(elm).not.toBeTruthy()
    }, 300)
    vm.show = true
    await asyncExpect(() => {
      const elm = wrapper
        .find('.test-beloading-isBackground')
        .element?.querySelector('.be-load__bg') as HTMLElement
      expect(elm).toBeTruthy()
    }, 300)
  })
  test('props-mdColor', async () => {
    const wrapper = _mount({
      template: `
                <div >
                <be-loading show customClass='test-beloading-mdColor' mdColor="red"></be-loading>
                </div>
            `,
    })
    await asyncExpect(() => {
      const elm = wrapper.find('.test-beloading-mdColor').element as HTMLElement
      expect(elm.style.backgroundColor === 'red').toBeTruthy()
    }, 1000)
  })
  test('props-isFullScreen', async () => {
    const wrapper = _mount({
      template: `
                <div >
                <be-loading show customClass='test-beloading-isFullScreen' isFullScreen></be-loading>
                </div>
            `,
    })
    await asyncExpect(() => {
      const elm = wrapper.find('.test-beloading-isFullScreen').element as HTMLElement
      expect(elm.className.indexOf('be-load__full') > 0).toBeTruthy()
    }, 1000)
  })
  test('props-customRender', async () => {
    const wrapper = _mount({
      template: `
              <div>
              <be-loading show :customRender="renderElm"></be-loading>
              </div>
            `,
      setup() {
        const renderElm = () => <div id="test_beloading_customRender"></div>
        return {
          renderElm,
        }
      },
    })
    await asyncExpect(() => {
      const elm = wrapper.find('#test_beloading_customRender').element as HTMLElement
      expect(elm).toBeTruthy()
    }, 1000)
  })
  test('props-size-large', async () => {
    const wrapper = _mount({
      template: `
                <div >
                <be-loading show size="large"></be-loading>
                </div>
            `,
    })
    await asyncExpect(() => {
      const elm = wrapper.find('.be-load__large').element as HTMLElement
      expect(elm).toBeTruthy()
    }, 1000)
  })
  test('props-size-small', async () => {
    const wrapper = _mount({
      template: `
                <div >
                <be-loading show size="small"></be-loading>
                </div>
            `,
    })
    await asyncExpect(() => {
      const elm = wrapper.find('.be-load__small').element as HTMLElement
      expect(elm).toBeTruthy()
    }, 1000)
  })
  test('props-delay', async () => {
    const wrapper = await _mount({
      template: `
              <div style="width: 300px;height: 200px">
              <be-loading :show="true" :delay='1000' customClass='test-beloading-delay'></be-loading>
              </div>
            `,
      setup() {
        const show = ref<boolean>(false)
        return {
          show,
        }
      },
    })
    const vm = wrapper.vm
    vm.show = true
    await asyncExpect(() => {
      expect(wrapper.find('.test-beloading-delay').exists()).not.toBeTruthy()
    }, null)
    await asyncExpect(() => {
      expect(wrapper.find('.test-beloading-delay').exists()).toBeTruthy()
    }, 3000)
  })
})
