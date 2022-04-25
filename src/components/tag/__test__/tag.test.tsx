import { mount } from '@vue/test-utils'
import BeTag from '../src/be-tag.vue'

/**
 * 测试props生效
 * @param options
 */
describe('test-be-tag-props', () => {
  test('props-round-number', () => {
    const wrapper = mount(BeTag, {
      props: {
        round: 25,
      },
    })
    const elm = wrapper.element as HTMLElement
    expect(elm.style.borderRadius).toBe(`25px`)
  })
  test('props-round-string', () => {
    const wrapper = mount(BeTag, {
      props: {
        round: '25',
      },
    })
    const elm = wrapper.element as HTMLElement
    expect(elm.style.borderRadius).toBe(`25px`)
  })
  test('props-size', () => {
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
  })
  test('props-type', () => {
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
  })
  test('props-option', () => {
    const wrapper = mount(BeTag, {
      props: {
        option: {
          border: '1px solid #00ffff',
          backgroundColor: 'red',
          color: 'green',
        },
      },
    })
    const elm = wrapper.element as HTMLElement
    expect(elm.style.border).toBe(`1px solid #00ffff`)
    expect(elm.style.backgroundColor).toBe(`red`)
    expect(elm.style.color).toBe(`green`)
  })
  test('props-disabled', () => {
    const wrapper = mount(BeTag, {
      props: {
        disabled: true,
      },
    })
    const elm = wrapper.element as HTMLElement
    expect(elm.className.indexOf('be-tag__disabled') > 0).toBeTruthy()
  })
})
/**
 * 关闭方法
 * @param options
 */
const _mount = (options: any) =>
  mount({
    components: {
      BeTag: BeTag,
    },
    ...options,
  })
describe('test-be-tag-close-event', () => {
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
    wrapper.find('.be-tag_close').trigger('click')
    expect(handleClick).toBeCalled()
  })
})
