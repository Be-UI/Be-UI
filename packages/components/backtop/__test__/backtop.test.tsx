import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Backtop from '../src/be-backtop.vue'
import type { VNode } from 'vue'

const _mount = (render: () => VNode) =>
    mount(render, { attachTo: document.body })

describe('be-back-top', () => {
  test('render', async () => {
    const wrapper = _mount(() => (
        <div class="target" style="height: 100px; overflow: auto">
          <div style="height: 10000px; width: 100%">
            <Backtop
                target=".target"
                showHeight={2000}
                right={100}
                bottom={200}
            />
          </div>
        </div>
    ))
    await nextTick()

    expect(wrapper.find('.be-back-top').exists()).toBe(false)
    wrapper.element.scrollTop = 2000
    await wrapper.trigger('scroll')
    expect(wrapper.find('.be-back-top').exists()).toBe(true)

    expect(wrapper.find('.be-back-top').attributes('style')).toBe(
        'right: 100px; bottom: 200px;'
    )

    const icon = wrapper.find('.be-icon--container')
    expect(icon.exists()).toBe(true)
    expect(icon.html().includes('#up')).toBe(true)

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })

  test('slot', async () => {
    const wrapper = _mount(() => (
        <div class="targetSlot" style="height: 100px; overflow: auto">
          <div style="height: 10000px; width: 100%">
            <Backtop
                showHeight={2000}
                right={100}
                bottom={200}
                target=".targetSlot">
              <div id='test_backtop_slot'></div>
            </Backtop>
          </div>
        </div>
    ))
    await nextTick()

    expect(wrapper.find('.be-back-top').exists()).toBe(false)
    wrapper.element.scrollTop = 2000
    await wrapper.trigger('scroll')
 
    expect(wrapper.find('.be-back-top').exists()).toBe(true)
    const slotElm = wrapper.find('#test_backtop_slot')
    expect(slotElm.exists()).toBe(true)
    expect(slotElm.html().includes('#up')).toBe(false)

  })
})
