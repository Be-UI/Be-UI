
import { mount } from '@vue/test-utils'
import BeButton from '../src/be-button'
import {describe, test, expect, vi } from "vitest";
import {defineComponent} from "vue";
const _mount = (options: any) =>
  mount({
    components: {
      BeButton: BeButton,
    },
    ...options,
  })
describe('test-be-button-props', () => {
  test('props-size-mini', () => {
    const wrapper = mount(defineComponent(BeButton), {
      props: {
        size: 'mini',
      },
    })
    expect(wrapper.find('.be-button__mini').exists()).toBeTruthy()
  })
  test('props-size-medium', () => {
    const wrapper = mount(defineComponent(BeButton), {
      props: {
        size: 'medium',
      },
    })
    expect(wrapper.find('.be-button__medium').exists()).toBeTruthy()
  })
  test('props-size-large', () => {
    const wrapper = mount(defineComponent(BeButton), {
      props: {
        size: 'large',
      },
    })
    expect(wrapper.find('.be-button__large').exists()).toBeTruthy()
  })
  test('props-size-round', () => {
    const wrapper = mount(defineComponent(BeButton), {
      props: {
        round: 5,
      },
    })
    const elm = wrapper.element as HTMLElement
    expect(elm.style.borderRadius).toBe('5px')
  })
  test('props-type-default', () => {
    const wrapper = mount(defineComponent(BeButton), {
      props: {
        type: 'default',
      },
    })
    expect(wrapper.find('.be-button__default').exists()).toBeTruthy()
  })
  test('props-type-primary', () => {
    const wrapper = mount(defineComponent(BeButton), {
      props: {
        type: 'primary',
      },
    })
    expect(wrapper.find('.be-button__primary').exists()).toBeTruthy()
  })
  test('props-type-success', () => {
    const wrapper = mount(defineComponent(BeButton), {
      props: {
        type: 'success',
      },
    })
    expect(wrapper.find('.be-button__success').exists()).toBeTruthy()
  })
  test('props-type-info', () => {
    const wrapper = mount(defineComponent(BeButton), {
      props: {
        type: 'info',
      },
    })
    expect(wrapper.find('.be-button__info').exists()).toBeTruthy()
  })
  test('props-type-warning', () => {
    const wrapper = mount(defineComponent(BeButton), {
      props: {
        type: 'warning',
      },
    })
    expect(wrapper.find('.be-button__warning').exists()).toBeTruthy()
  })
  test('props-type-error', () => {
    const wrapper = mount(defineComponent(BeButton), {
      props: {
        type: 'error',
      },
    })
    expect(wrapper.find('.be-button__error').exists()).toBeTruthy()
  })
  test('props-bordered', () => {
    const wrapper = mount(defineComponent(BeButton), {
      props: {
        bordered: true,
      },
    })
    expect(wrapper.find('.be-button__default__border').exists()).toBeTruthy()
  })
  test('props-ghost', () => {
    const wrapper = mount(defineComponent(BeButton), {
      props: {
        ghost: true,
      },
    })
    const elm = wrapper.element as HTMLElement
    expect(elm.style.backgroundColor === 'transparent').toBeTruthy()
  })
  test('props-dashed', () => {
    const wrapper = mount(defineComponent(BeButton), {
      props: {
        dashed: true,
      },
    })
    const elm = wrapper.element as HTMLElement
    expect(elm.style.borderStyle === 'dashed').toBeTruthy()
  })
  test('props-customClass', () => {
    const wrapper = mount(defineComponent(BeButton), {
      props: {
        customClass: 'props-customClass',
      },
    })
    expect(wrapper.find('.props-customClass').exists()).toBeTruthy()
  })
  test('props-flex', () => {
    const wrapper = mount(defineComponent(BeButton), {
      props: {
        flex: true,
      },
    })
    const elm = wrapper.element as HTMLElement
    expect(elm.style.display === 'flex').toBeTruthy()
  })
  test('props-disabled', () => {
    const handleClick = vi.fn()
    const wrapper = _mount({
      template: `
              <BeButton disabled @click="handleClick"></BeButton>`,
      setup() {
        return {
          handleClick,
        }
      },
    })
    expect(wrapper.find('.be-button__inner__disabled').exists()).toBeTruthy()
    wrapper.find('.be-button').trigger('click')
    expect(handleClick).not.toBeCalled()
  })
  test('props-prevIcon', () => {
    const wrapper = _mount({
      template: `<BeButton prevIcon="warning"></BeButton>`,
    })
    expect(wrapper.find('.be-button--prevIcon').exists()).toBeTruthy()
    const iconUse = wrapper.find('.be-button--prevIcon').element.querySelector('use')
    expect(iconUse?.getAttribute('xlink:href') === '#warning').toBeTruthy()
  })
  test('props-nextIcon', () => {
    const wrapper = _mount({
      template: `<BeButton nextIcon="warning"></BeButton>`,
    })
    expect(wrapper.find('.be-button--nextIcon').exists()).toBeTruthy()
    const iconUse = wrapper.find('.be-button--nextIcon').element.querySelector('use')
    expect(iconUse?.getAttribute('xlink:href') === '#warning').toBeTruthy()
  })
  test('props-loading', () => {
    const handleClick = vi.fn()
    const wrapper = _mount({
      template: `
              <BeButton @click="handleClick" loading></BeButton>`,
      setup() {
        return {
          handleClick,
        }
      },
    })
    expect(wrapper.find('.be-button--prevIcon').exists()).toBeTruthy()
    const iconUse = wrapper.find('.be-button--prevIcon').element.querySelector('use')
    expect(iconUse?.getAttribute('xlink:href') === '#loading').toBeTruthy()
    wrapper.find('.be-button').trigger('click')
    expect(handleClick).not.toBeCalled()
  })
})
describe('test-be-button-event', () => {
  test('event:click', () => {
    const handleClick = vi.fn()
    const wrapper = _mount({
      template: `
              <BeButton @click="handleClick"></BeButton>`,
      setup() {
        return {
          handleClick,
        }
      },
    })
    wrapper.find('.be-button').trigger('click')
    expect(handleClick).toBeCalled()
  })
})
