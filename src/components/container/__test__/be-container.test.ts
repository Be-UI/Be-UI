/*
 * @be-container.test.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/12/7)
 */
import { mount } from '@vue/test-utils'
import BeContainer from '../src/be-container.vue'
import BeHeader from '../src/be-header.vue'
import BeMain from '../src/be-main.vue'
import BeAside from '../src/be-aside.vue'
import BeFooter from '../src/be-footer.vue'

const TEST_TXT = '当黑夜吻白天 谢谢了时间 弄红了双眼'

describe('be-container-test', () => {
  test('be-container-test-slot', () => {
    const wrapper = mount(BeContainer, {
      slots: {
        default: TEST_TXT,
      },
    })
    expect(wrapper.text()).toEqual(TEST_TXT)
  })

  test('be-container-test-vertical', () => {
    const TestComponent = {
      template: `
                <be-container>
                    <be-header></be-header>
                    <be-main></be-main>
                </be-container>
            `,
      components: {
        'be-container': BeContainer,
        'be-header': BeHeader,
        'be-main': BeMain,
      },
    }
    const wrapper = mount(TestComponent)
    expect(wrapper.classes('be-container__vertical')).toBe(true)
  })

  test('be-container-test-props-direction', () => {
    const TestComponent = {
      template: `
                <be-container :direction="direction">
                    <be-header></be-header>
                    <be-main></be-main>
                </be-container>
            `,
      components: {
        'be-container': BeContainer,
        'be-header': BeHeader,
        'be-main': BeMain,
      },
      data() {
        return {
          direction: 'horizontal',
        }
      },
    }
    const wrapper = mount(TestComponent)
    expect(wrapper.vm.$el.classList.contains('be-container__vertical')).toBe(false)
    wrapper.vm.direction = 'vertical'
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$el.classList.contains('be-container__vertical')).toBe(true)
    })
  })
})

describe('be-header-test', () => {
  test('be-header-test-props-height', () => {
    const wrapper = mount(BeHeader, {
      props: {
        height: '100px',
      },
    })
    const vm = wrapper.vm
    expect(vm.$el.style.height).toEqual('100px')
  })
})

describe('be-aside-test', () => {
  test('be-header-test-props-width', () => {
    const wrapper = mount(BeAside, {
      props: {
        width: '200px',
      },
    })
    const vm = wrapper.vm
    expect(vm.$el.style.width).toEqual('200px')
  })
})

describe('be-main-test', () => {
  test('be-main-test-render', () => {
    const wrapper = mount(BeMain)
    expect(wrapper.classes()).toContain('be-main')
  })
})
describe('be-footer-test', () => {
  test('be-footer-test-props-height', () => {
    const wrapper = mount(BeFooter, {
      props: {
        height: '100px',
      },
    })
    const vm = wrapper.vm
    expect(vm.$el.style.height).toEqual('100px')
  })
})
