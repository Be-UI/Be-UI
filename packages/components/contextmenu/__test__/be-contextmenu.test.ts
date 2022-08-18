import { mount } from '@vue/test-utils'
import BeContextmenuItem from '../src/be-contextmenu-item.vue'
import BeContextmenu from '../src/be-contextmenu.vue'
import { contextmenu } from '../../../utils/direactives/contextmenu-directives'
import { asyncExpect } from '../../../utils/utils'

const _mount = (options: any) =>
  mount({
    components: {
      BeContextmenu: BeContextmenu,
      BeContextmenuItem: BeContextmenuItem,
    },
    directives: { contextmenu },
    ...options,
  })
/**
 * 测试props生效
 * @param options
 */
describe('test-be-contextmenu-props', () => {
  test('props-eventType-click', async () => {
    const wrapper = _mount({
      template: `
                 <div>
                     <div id="test_eventType_click" v-contextmenu:contextmenuEvt>
                         <be-contextmenu ref="contextmenuEvt" eventType="click" id="contextmenuEvt_click">
                             <be-contextmenu-item >临安小雨初霁</be-contextmenu-item>
                         </be-contextmenu>
                     </div>
                 </div>
             `,
    })
    const contextMenuElm: HTMLElement | null = document.getElementById('contextmenuEvt_click')
    expect(contextMenuElm && contextMenuElm.style.display === 'none').toBeTruthy()
    await asyncExpect(() => {
      wrapper.find('#test_eventType_click').trigger('click')
    }, null)
    await asyncExpect(() => {
      expect(contextMenuElm && contextMenuElm.style.display === '').toBeTruthy()
    }, null)
  })
  test('props-eventType-default', async () => {
    const wrapper = _mount({
      template: `
                <div id="test_eventType_default" v-contextmenu:contextmenuEvtDefault>
                     <be-contextmenu ref="contextmenuEvtDefault" id="contextmenuEvt_default">
                         <be-contextmenu-item >临安小雨初霁</be-contextmenu-item>
                    </be-contextmenu>
                </div>
            `,
    })
    const contextMenuElm: HTMLElement | null = document.getElementById('contextmenuEvt_default')
    expect(contextMenuElm && contextMenuElm.style.display === 'none').toBeTruthy()
    await asyncExpect(() => {
      wrapper.find('#test_eventType_default').trigger('contextmenu')
    }, null)
    await asyncExpect(() => {
      expect(contextMenuElm && contextMenuElm.style.display === '').toBeTruthy()
    }, null)
  })
  test('props-disabled', async () => {
    const wrapper = _mount({
      template: `
                <div id="test_disabled" v-contextmenu:contextmenuDisabled>
                     <be-contextmenu ref="contextmenuDisabled" id="contextmenu_disabled" disabled>
                         <be-contextmenu-item >临安小雨初霁</be-contextmenu-item>
                    </be-contextmenu>
                </div>
            `,
    })
    const contextMenuElm: HTMLElement | null = document.getElementById('contextmenu_disabled')
    expect(contextMenuElm && contextMenuElm.style.display === 'none').toBeTruthy()
    await asyncExpect(() => {
      wrapper.find('#test_disabled').trigger('contextmenu')
    }, null)
    await asyncExpect(() => {
      expect(contextMenuElm && contextMenuElm.style.display === 'none').toBeTruthy()
    }, null)
  })
  test('props-theme', async () => {
    const wrapper = _mount({
      template: `
                <div id="test_theme" v-contextmenu:contextmenuTheme>
                     <be-contextmenu ref="contextmenuTheme" id="contextmenu_theme" theme="blues"> 
                         <be-contextmenu-item >临安小雨初霁</be-contextmenu-item>
                    </be-contextmenu>
                </div>
            `,
    })
    const contextMenuElm: HTMLElement | null = document.getElementById('contextmenu_theme')
    expect(contextMenuElm && contextMenuElm.className.indexOf('__blues') > 0).toBeTruthy()
  })
})
describe('test-be-contextmenu-event', () => {
  test('event:show', async () => {
    const handleEvent = jest.fn()
    const wrapper = _mount({
      template: `
                <div id="test_evt_show" v-contextmenu:contextmenuEvtShow>
                     <be-contextmenu ref="contextmenuEvtShow" id="contextmenuEvt_show" @show="handleEvent"> 
                         <be-contextmenu-item >临安小雨初霁</be-contextmenu-item>
                    </be-contextmenu>
                </div>
            `,
      setup() {
        return {
          handleEvent,
        }
      },
    })
    const contextMenuElm: HTMLElement | null = document.getElementById('contextmenuEvt_show')
    expect(contextMenuElm && contextMenuElm.style.display === 'none').toBeTruthy()
    await asyncExpect(() => {
      wrapper.find('#test_evt_show').trigger('contextmenu')
    }, null)
    await asyncExpect(() => {
      expect(contextMenuElm && contextMenuElm.style.display === '').toBeTruthy()
      expect(handleEvent).toBeCalled()
    }, null)
  })
  test('event:contextmenu', async () => {
    const handleEvent = jest.fn()
    const wrapper = _mount({
      template: `
                <div id="test_evt_contextmenu" v-contextmenu:contextmenuEvtContextmenu>
                     <be-contextmenu ref="contextmenuEvtContextmenu" id="contextmenuEvt_contextmenu" @contextmenu="handleEvent"> 
                         <be-contextmenu-item >临安小雨初霁</be-contextmenu-item>
                    </be-contextmenu>
                </div>
            `,
      setup() {
        return {
          handleEvent,
        }
      },
    })
    const contextMenuElm: HTMLElement | null = document.getElementById('contextmenuEvt_contextmenu')
    expect(contextMenuElm && contextMenuElm.style.display === 'none').toBeTruthy()
    await asyncExpect(() => {
      wrapper.find('#test_evt_contextmenu').trigger('contextmenu')
    }, null)
    await asyncExpect(() => {
      expect(contextMenuElm && contextMenuElm.style.display === '').toBeTruthy()
      expect(handleEvent).toBeCalled()
    }, null)
  })
  test('event:hide', async () => {
    const handleEvent = jest.fn()
    const wrapper = _mount({
      template: `
                <div id="test_evt_hide" v-contextmenu:contextmenuEvtHide>
                     <be-contextmenu ref="contextmenuEvtHide" id="contextmenuEvt_hide" @hide="handleEvent"> 
                         <be-contextmenu-item >临安小雨初霁</be-contextmenu-item>
                    </be-contextmenu>
                </div>
            `,
      setup() {
        return {
          handleEvent,
        }
      },
    })
    const contextMenuElm: HTMLElement | null = document.getElementById('contextmenuEvt_hide')
    expect(contextMenuElm && contextMenuElm.style.display === 'none').toBeTruthy()
    await asyncExpect(() => {
      wrapper.find('#test_evt_hide').trigger('contextmenu')
    }, null)
    await asyncExpect(() => {
      expect(contextMenuElm && contextMenuElm.style.display === '').toBeTruthy()
    }, null)

    await asyncExpect(() => {
      document.body.dispatchEvent(new Event('click'))
    }, null)
    await asyncExpect(() => {
      expect(contextMenuElm && contextMenuElm.style.display === 'none').toBeTruthy()
      expect(handleEvent).toBeCalled()
    }, 1000)
  })
})
describe('test-be-contextmenu-slot', () => {
  test('slot', async () => {
    const wrapper = _mount({
      template: `
                <div id="test_slot" v-contextmenu:contextmenuSlots>
                     <be-contextmenu ref="contextmenuSlots" id="contextmenu_slot"> 
                         <be-contextmenu-item >临安小雨初霁</be-contextmenu-item>
                    </be-contextmenu>
                </div>
            `,
    })
    const contextMenuElm: HTMLElement | null = document.getElementById('contextmenu_slot')
    expect(contextMenuElm && contextMenuElm.style.display === 'none').toBeTruthy()
    await asyncExpect(() => {
      wrapper.find('#test_slot').trigger('contextmenu')
    }, null)
    await asyncExpect(() => {
      expect(
        contextMenuElm && contextMenuElm?.querySelectorAll('.be-contextmenu--item').length > 0
      ).toBeTruthy()
    }, 1000)
  })
})
