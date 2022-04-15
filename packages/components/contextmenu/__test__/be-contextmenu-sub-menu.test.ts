/**
 * 7.be-contextmenu -  props -> disabled √,title √
 * 8.be-contextmenu - 事件觸發 'mouseenter' √, 'mouseleave' √
 * 9.be-contextmenu - 插槽渲染
 */
import { mount } from '@vue/test-utils'
import BeContextmenuItem from '../src/be-contextmenu-item.vue'
import BeContextmenu from '../src/be-contextmenu.vue'
import BeContextmenuSubMenu from '../src/be-contextmenu-sub-menu.vue'
import { contextmenu } from '../../../utils/direactives/contextmenu-directives'
import { asyncExpect } from '../../../utils/utils'

const _mount = (options: any) =>
  mount({
    components: {
      BeContextmenu: BeContextmenu,
      BeContextmenuItem: BeContextmenuItem,
      BeContextmenuSubMenu: BeContextmenuSubMenu,
    },
    directives: { contextmenu },
    ...options,
  })
/**
 * 测试props生效
 * @param options
 */
describe('test-be-contextmenu-sub-menu-props', () => {
  test('props-title', async () => {
    const wrapper = _mount({
      template: `
                 <div id="test_props_title" v-contextmenu:contextmenuTitle>
                    <be-contextmenu ref="contextmenuTitle"  id="contextmenuEvt_title">
                        <be-contextmenu-sub-menu title="宋词">
                            <be-contextmenu-item >临安小雨初霁</be-contextmenu-item>
                            <be-contextmenu-item divider></be-contextmenu-item>
                            <be-contextmenu-item>陆游</be-contextmenu-item>
                        </be-contextmenu-sub-menu>
                    </be-contextmenu>
                 </div>`,
    })
    const contextMenuElm: HTMLElement | null = document.getElementById('contextmenuEvt_title')
    expect(contextMenuElm && contextMenuElm.style.display === 'none').toBeTruthy()
    await asyncExpect(() => {
      wrapper.find('#test_props_title').trigger('contextmenu')
    }, null)
    await asyncExpect(() => {
      expect(contextMenuElm && contextMenuElm.style.display === '').toBeTruthy()
      const titleElm = contextMenuElm?.querySelector('.be-contextmenu-submenu__title')
      expect(titleElm && titleElm.innerHTML.indexOf('宋词') > -1).toBeTruthy()
    }, null)
  })
  test('props-disabled', async () => {
    const handleEventEnter = jest.fn()
    const handleEventLeave = jest.fn()
    const wrapper = _mount({
      template: `
                <div id="test_Sub_disabled" v-contextmenu:contextmenuEvtSubDisabled>
                    <be-contextmenu ref="contextmenuEvtSubDisabled"  id="contextmenuEvt_Sub_disabled">
                        <be-contextmenu-sub-menu @mouseleave="handleEventLeave"
                                                 disabled
                                                 @mouseenter="handleEventEnter" 
                                                 title="宋词">
                            <be-contextmenu-item >临安小雨初霁</be-contextmenu-item>
                            <be-contextmenu-item divider></be-contextmenu-item>
                            <be-contextmenu-item divider>陆游</be-contextmenu-item>
                        </be-contextmenu-sub-menu>
                    </be-contextmenu>
                </div>
            `,
      setup() {
        return {
          handleEventLeave,
          handleEventEnter,
        }
      },
    })
    const contextMenuElm: HTMLElement | null = document.getElementById(
      'contextmenuEvt_Sub_disabled'
    )
    expect(contextMenuElm && contextMenuElm.style.display === 'none').toBeTruthy()
    await asyncExpect(() => {
      wrapper.find('#test_Sub_disabled').trigger('contextmenu')
    }, null)
    await asyncExpect(() => {
      expect(contextMenuElm && contextMenuElm.style.display === '').toBeTruthy()
      expect(
        contextMenuElm &&
          contextMenuElm
            ?.querySelectorAll('.be-contextmenu-submenu')[0]
            .className.indexOf('be-contextmenu-item__disabled') > -1
      ).toBeTruthy()
    }, null)
    await asyncExpect(() => {
      contextMenuElm
        ?.querySelectorAll('.be-contextmenu-submenu')[0]
        .dispatchEvent(new MouseEvent('mouseenter'))
      expect(handleEventEnter).not.toBeCalled()
    }, null)
    await asyncExpect(() => {
      contextMenuElm
        ?.querySelectorAll('.be-contextmenu-submenu')[0]
        .dispatchEvent(new MouseEvent('mouseleave'))
      expect(handleEventLeave).not.toBeCalled()
    }, null)
  })
})
describe('test-be-contextmenu-sub-menu-event', () => {
  test('event:mouseenter - mouseleave', async () => {
    const handleEventEnter = jest.fn()
    const handleEventLeave = jest.fn()
    const wrapper = _mount({
      template: `
                <div id="test_evt_Sub_EL" v-contextmenu:contextmenuEvtSubEL>
                     <be-contextmenu ref="contextmenuEvtSubEL" id="contextmenuEvt_Sub_EL" >
                         <be-contextmenu-sub-menu @mouseleave="handleEventLeave"
                                                  @mouseenter="handleEventEnter" title="宋词">
                             <be-contextmenu-item >临安小雨初霁</be-contextmenu-item>
                             <be-contextmenu-item divider></be-contextmenu-item>
                             <be-contextmenu-item>陆游</be-contextmenu-item>
                         </be-contextmenu-sub-menu>
                    </be-contextmenu>
                </div>
            `,
      setup() {
        return {
          handleEventEnter,
          handleEventLeave,
        }
      },
    })
    const contextMenuElm: HTMLElement | null = document.getElementById('contextmenuEvt_Sub_EL')
    expect(contextMenuElm && contextMenuElm.style.display === 'none').toBeTruthy()
    await asyncExpect(() => {
      wrapper.find('#test_evt_Sub_EL').trigger('contextmenu')
    }, null)
    await asyncExpect(() => {
      expect(contextMenuElm && contextMenuElm.style.display === '').toBeTruthy()
    }, null)
    await asyncExpect(() => {
      contextMenuElm
        ?.querySelectorAll('.be-contextmenu-submenu')[0]
        .dispatchEvent(new MouseEvent('mouseenter'))
      expect(handleEventEnter).toBeCalled()
    }, null)
    await asyncExpect(() => {
      contextMenuElm
        ?.querySelectorAll('.be-contextmenu-submenu')[0]
        .dispatchEvent(new MouseEvent('mouseleave'))
      expect(handleEventLeave).toBeCalled()
    }, null)
  })
})
describe('test-be-contextmenu-sub-menu-slot', () => {
  test('slot', async () => {
    const wrapper = _mount({
      template: `
                <div id="test_sub_slot" v-contextmenu:contextmenuSubSlots>
                    <be-contextmenu ref="contextmenuSubSlots" id="contextmenuEvt_Sub_Slot" >
                         <be-contextmenu-sub-menu title="宋词">
                             <span id="laxycj">临安小雨初霁</span>
                             <be-contextmenu-item>陆游</be-contextmenu-item>
                             <be-contextmenu-sub-menu title="詞句"> 
                                  <be-contextmenu-item>谁家客马过京华</be-contextmenu-item>
                             </be-contextmenu-sub-menu>
                         </be-contextmenu-sub-menu>
                    </be-contextmenu>
                </div>
            `,
    })
    const contextMenuElm: HTMLElement | null = document.getElementById('contextmenuEvt_Sub_Slot')
    expect(contextMenuElm && contextMenuElm.style.display === 'none').toBeTruthy()
    await asyncExpect(() => {
      wrapper.find('#test_sub_slot').trigger('contextmenu')
    }, null)
    await asyncExpect(() => {
      expect(contextMenuElm && contextMenuElm.style.display === '').toBeTruthy()
    }, null)
    await asyncExpect(() => {
      contextMenuElm
        ?.querySelectorAll('.be-contextmenu-submenu')[0]
        .dispatchEvent(new MouseEvent('mouseenter'))
      expect(document.getElementById('laxycj')).toBeTruthy()
      const itemLi = contextMenuElm
        ?.querySelectorAll('.be-contextmenu-submenu')[0]
        .querySelectorAll('.be-contextmenu-item')[0].innerHTML
      expect(itemLi && itemLi.indexOf('陆游') > -1).toBeTruthy()
      const submenu = contextMenuElm?.querySelectorAll('.be-contextmenu-submenu')[1].innerHTML
      expect(submenu && submenu.indexOf('詞句') > -1).toBeTruthy()
    }, null)
  })
})
