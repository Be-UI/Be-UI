/**
 * 4.be-contextmenu-item -  props校驗 √
 * 5.be-contextmenu-item - 事件觸發 'mouseenter', 'mouseleave', 'click' √
 * 6.be-contextmenu-item - 插槽渲染 √
 */
import {mount} from '@vue/test-utils'
import BeContextmenuItem from '../src/be-contextmenu-item.vue'
import BeContextmenu from '../src/be-contextmenu.vue'
import {contextmenu} from '../../../utils/direactives/custom-direactives/contextmenu-directives';
import {asyncExpect} from "../../../utils/utils";

const _mount = (options: any) =>
    mount({
        components: {
            'BeContextmenu': BeContextmenu,
            'BeContextmenuItem': BeContextmenuItem,
        },
        directives: {contextmenu},
        ...options,
    })
/**
 * 测试props生效
 * @param options
 */
describe('test-be-contextmenu-item-props', () => {
    test('props-divider', async () => {
         const wrapper = _mount({
             template: `
                 <div id="test_props_divider" v-contextmenu:contextmenuEvt>
                    <be-contextmenu ref="contextmenuEvt"  id="contextmenuEvt_divider">
                       <be-contextmenu-item >临安小雨初霁</be-contextmenu-item>
                       <be-contextmenu-item divider></be-contextmenu-item>
                        <be-contextmenu-item divider>陆游</be-contextmenu-item>
                    </be-contextmenu>
                 </div>
             `,
         })
         const contextMenuElm:HTMLElement | null = document.getElementById('contextmenuEvt_divider')
         expect(contextMenuElm && contextMenuElm.style.display === 'none').toBeTruthy()
         await asyncExpect(()=>{
             wrapper.find('#test_props_divider').trigger('contextmenu')
         },null)
         await asyncExpect(()=>{
             expect(contextMenuElm && contextMenuElm.style.display === '').toBeTruthy()
             expect(contextMenuElm && contextMenuElm?.querySelectorAll('.be-contextmenu-divider').length > 0).toBeTruthy()
         },null)
     })
   test('props-autoHide', async () => {
       const wrapper = _mount({
           template: `
                <div id="test_eventType_autoHide" v-contextmenu:contextmenuEvtAutoHide>
                    <be-contextmenu ref="contextmenuEvtAutoHide"  id="contextmenuEvt_autoHide">
                        <be-contextmenu-item :autoHide="false">临安小雨初霁</be-contextmenu-item>
                        <be-contextmenu-item divider>陆游</be-contextmenu-item>
                    </be-contextmenu>
                </div>
            `
       })
       const contextMenuElm: HTMLElement | null = document.getElementById('contextmenuEvt_autoHide')
       expect(contextMenuElm && contextMenuElm.style.display === 'none').toBeTruthy()
       await asyncExpect(() => {
           wrapper.find('#test_eventType_autoHide').trigger('contextmenu')
       }, null)
       await asyncExpect(() => {
           expect(contextMenuElm && contextMenuElm.style.display === '').toBeTruthy()
       }, null)
       await asyncExpect(() => {
           contextMenuElm?.querySelectorAll('.be-contextmenu-item')[0].dispatchEvent(new Event('click'))
       }, null)
       await asyncExpect(() => {
           expect(contextMenuElm && contextMenuElm.style.display === '').toBeTruthy()
       }, null)
    })
     test('props-disabled', async () => {
         const handleEvent = jest.fn()
         const wrapper = _mount({
             template: `
                <div id="test_eventType_disabled" v-contextmenu:contextmenuEvtDisabled>
                    <be-contextmenu ref="contextmenuEvtDisabled"  id="contextmenuEvt_disabled">
                        <be-contextmenu-item @click="handleEvent" disabled>临安小雨初霁</be-contextmenu-item>
                        <be-contextmenu-item divider></be-contextmenu-item>
                        <be-contextmenu-item divider>陆游</be-contextmenu-item>
                    </be-contextmenu>
                </div>
            `,
             setup(){
                 return{
                     handleEvent
                 }
             }
         })
         const contextMenuElm: HTMLElement | null = document.getElementById('contextmenuEvt_disabled')
         expect(contextMenuElm && contextMenuElm.style.display === 'none').toBeTruthy()
         await asyncExpect(() => {
             wrapper.find('#test_eventType_disabled').trigger('contextmenu')
         }, null)
         await asyncExpect(() => {
             expect(contextMenuElm && contextMenuElm.style.display === '').toBeTruthy()
         }, null)
         await asyncExpect(() => {
             expect(contextMenuElm
                 && contextMenuElm?.querySelectorAll('.be-contextmenu-item')[0].className.indexOf('be-contextmenu-item__disabled') > 0).toBeTruthy()
             contextMenuElm?.querySelectorAll('.be-contextmenu-item')[0].dispatchEvent(new Event('click'))
             expect(handleEvent).not.toBeCalled()
         }, null)
    })
})
describe('test-be-contextmenu-item-event', () => {
    test('event:click',async ()=>{
        const handleEvent = jest.fn()
        const wrapper = _mount({
            template: `
                <div id="test_eventType_click" v-contextmenu:contextmenuEvtClick>
                    <be-contextmenu ref="contextmenuEvtClick"  id="contextmenuEvt_click">
                        <be-contextmenu-item @click="handleEvent">临安小雨初霁</be-contextmenu-item>
                        <be-contextmenu-item divider></be-contextmenu-item>
                        <be-contextmenu-item divider>陆游</be-contextmenu-item>
                    </be-contextmenu>
                </div>
            `,
            setup(){
                return{
                    handleEvent
                }
            }
        })
        const contextMenuElm: HTMLElement | null = document.getElementById('contextmenuEvt_click')
        expect(contextMenuElm && contextMenuElm.style.display === 'none').toBeTruthy()
        await asyncExpect(() => {
            wrapper.find('#test_eventType_click').trigger('contextmenu')
        }, null)
        await asyncExpect(() => {
            expect(contextMenuElm && contextMenuElm.style.display === '').toBeTruthy()
        }, null)
        await asyncExpect(() => {
            contextMenuElm?.querySelectorAll('.be-contextmenu-item')[0].dispatchEvent(new Event('click'))
            expect(handleEvent).toBeCalled()
        }, null)

    })
  test('event:mouseenter - mouseleave',async ()=>{
        const handleEventEnter = jest.fn()
        const handleEventLeave = jest.fn()
        const wrapper = _mount({
            template: `
                <div id="test_evt_EL" v-contextmenu:contextmenuEvtEL>
                     <be-contextmenu ref="contextmenuEvtEL" id="contextmenuEvt_EL" > 
                         <be-contextmenu-item @mouseleave="handleEventLeave" @mouseenter="handleEventEnter">临安小雨初霁</be-contextmenu-item>
                    </be-contextmenu>
                </div>
            `,
            setup(){
                return {
                    handleEventEnter,
                    handleEventLeave
                }
            }
        })
        const contextMenuElm: HTMLElement | null = document.getElementById('contextmenuEvt_EL')
        expect(contextMenuElm && contextMenuElm.style.display === 'none').toBeTruthy()
        await asyncExpect(() => {
            wrapper.find('#test_evt_EL').trigger('contextmenu')
        }, null)
        await asyncExpect(() => {
            expect(contextMenuElm && contextMenuElm.style.display === '').toBeTruthy()
        }, null)
      await asyncExpect(() => {
          contextMenuElm?.querySelectorAll('.be-contextmenu-item')[0].dispatchEvent(new MouseEvent('mouseenter'))
          expect(contextMenuElm && contextMenuElm.style.display === '').toBeTruthy()
          expect(handleEventEnter).toBeCalled()
      }, null)
      await asyncExpect(() => {
          contextMenuElm?.querySelectorAll('.be-contextmenu-item')[0].dispatchEvent(new MouseEvent('mouseleave'))
          expect(handleEventLeave).toBeCalled()
      }, null)
    })
})
describe('test-be-contextmenu-slot', () => {
    test('slot',async ()=>{
        const wrapper = _mount({
            template: `
                <div id="test_slot" v-contextmenu:contextmenuSlots>
                     <be-contextmenu ref="contextmenuSlots" id="contextmenu_slot"> 
                         <be-contextmenu-item ><span id="swnlbss">世味年来薄似纱</span></be-contextmenu-item>
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
            expect(document.getElementById('swnlbss')).toBeTruthy()
        }, 1000)
    })
})
