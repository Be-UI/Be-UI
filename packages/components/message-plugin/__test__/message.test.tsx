/*
import { BeMessage } from '../src/be-message-service'
import { IMessage, IMsgInst } from '../src/be-message-type'
import { asyncExpect } from '@be-ui/utils'
import {describe, test, expect, vi } from "vitest";
interface IMsgInstanceTest {
  message: {
    props: {
      option: {
        loading: boolean
        titles: string
      }
    }
    component: {
      uid: number
    }
    el: HTMLElement
  }
  update: Function
  close: Function
}

/!**
 * 测试props生效
 * @param options
 *!/
describe('test-be-message-props', () => {
  // 四种预设情感
  test('props-msgType', () => {
    const compInstWarning = BeMessage({ msgType: 'warning' } as IMessage) as IMsgInst
    const ElmWarning = compInstWarning.message.el as HTMLElement
    expect(ElmWarning.className.indexOf('be-message__warning') > 0).toBeTruthy()

    const compInstError = BeMessage({ msgType: 'error' } as IMessage) as IMsgInst
    const ElmError = compInstError.message.el as HTMLElement
    expect(ElmError.className.indexOf('be-message__error') > 0).toBeTruthy()

    const compInstSuccess = BeMessage({ msgType: 'success' } as IMessage) as IMsgInst
    const ElmSuccess = compInstSuccess.message.el as HTMLElement
    expect(ElmSuccess.className.indexOf('be-message__success') > 0).toBeTruthy()

    const compInstInfo = BeMessage({ msgType: 'info' } as IMessage) as IMsgInst
    const ElmInfo = compInstInfo.message.el as HTMLElement
    expect(ElmInfo.className.indexOf('be-message__info') > 0).toBeTruthy()
  })
  // 测试loading 开启与关闭
  test('props-loading', async () => {
    const compInst = BeMessage({
      loading: true,
      msgType: 'warning',
      key: 'test-loading',
    } as IMessage) as IMsgInstanceTest
    const elm = compInst.message.el as HTMLElement
    expect(compInst.message.props.option.loading as boolean).toBeTruthy()
    expect(elm.querySelectorAll('.be-icon').length === 1).toBeTruthy()
    const loading: Element | undefined = elm.querySelectorAll('.be-icon')[0].children[0]
    expect(loading?.getAttribute('xlink:href')).toBe(`#loading`)
    // 关闭
    const compInstLoadingClose = compInst.update({
      loading: false,
      key: 'test-loading',
    })
    await asyncExpect(() => {
      expect(compInstLoadingClose.notify.props.option.loading === false).toBeTruthy()
      compInstLoadingClose.notify.el.querySelectorAll('.be-icon').forEach((res: SVGAElement) => {
        expect(res?.getAttribute('xlink:href') !== '#loading').toBeTruthy()
      })
    }, 1000)
  })
  // 測試样式类
  test('props-customClass', () => {
    const compInst = BeMessage({
      titles: 'test-customClass',
      customClass: 'test-customClass',
    } as IMessage) as IMsgInstanceTest
    const elm = compInst.message.el as HTMLElement
    expect(elm).toBeTruthy()
    expect(elm.className.indexOf('test-customClass') > 0).toBeTruthy()
  })
  // 測試 是否可手动关闭，关闭按钮显示
  test('props-close', () => {
    const compInst = BeMessage({
      close: true,
      titles: 'test-close',
      key: 'test-close',
    } as IMessage) as IMsgInstanceTest
    const elm = compInst.message.el as HTMLElement
    expect(
      (elm.querySelectorAll('.be-icon')[1].childNodes[0] as SVGAElement).getAttribute(
        'xlink:href'
      ) === '#deleteIc'
    ).toBeTruthy()
    const compInstUnClose = compInst.update({
      close: false,
      titles: 'test-close',
      key: 'test-close',
    })
    const elmUnClose = compInstUnClose.notify.el as HTMLElement
    elmUnClose.querySelectorAll('.be-icon').forEach((res: Element) => {
      expect(
        (res.childNodes[0] as SVGAElement).getAttribute('xlink:href') !== '#deleteIc'
      ).toBeTruthy()
    })
  })
  // 測試 前置图标\关闭图标渲染
  test('props-iconRender', () => {
    const compInst = BeMessage({
      titles: 'test-iconRender',
      iconPreRender: <span id="test_iconPreRender">🐕</span>,
      closeRender: <span id="test_closeRender">❀</span>,
    } as IMessage) as IMsgInstanceTest
    const elm = compInst.message.el as HTMLElement
    expect(elm.querySelectorAll('#test_iconPreRender').length > 0).toBeTruthy()
    expect(elm.querySelectorAll('#test_closeRender').length > 0).toBeTruthy()
  })
})
describe('test-be-message-content-update', () => {
  // 測試内容更新
  test('props-content-update', async () => {
    const compInst = BeMessage({
      titles: 'test-info-example',
      key: 'test-info',
    } as IMessage) as IMsgInstanceTest
    debugger
    const textContent = compInst.message.el.querySelectorAll('.txt__info')[0].textContent
    const titles = compInst.message.props.option.titles
    expect(textContent === titles && textContent === 'test-info-example').toBeTruthy()
    // 关闭
    const compInstInfoUpdate = compInst.update({
      titles: 'test-info-example-update',
      key: 'test-info',
    })
    await asyncExpect(() => {
      const textContentUpdate =
        compInstInfoUpdate.notify.el.querySelectorAll('.txt__info')[0].textContent
      const titlesUpdate = compInstInfoUpdate.notify.props.option.titles
      expect(
        textContentUpdate === titlesUpdate && textContentUpdate === 'test-info-example-update'
      ).toBeTruthy()
    }, 1000)
  })
})
describe('test-be-message-close-event', () => {
  const handleClose = vi.fn()
  // 測試點擊按鈕關閉
  test('event:close-manual-click', () => {
    const compInst = BeMessage({
      iconPreRender: <span id="test_iconPreRender">🐕</span>,
      titles: 'test-close-manual-click',
      close: true,
      onClose: handleClose as Function,
    } as IMessage) as IMsgInstanceTest
    const closeIcon = document.getElementById(
      `be_message_close_icon${compInst.message.component.uid}`
    ) as HTMLElement
    ;(closeIcon.childNodes[0] as HTMLElement).click()
    expect(handleClose).toBeCalled()
    // dom是否銷毀
    /!*await asyncExpect(() => {
                expect(!document.getElementById(compInst.message.el.id)).toBeTruthy()
            }, 0)*!/
  })
  // 自動代碼調用關閉方法測試
  test('event:close-code-call', () => {
    const compInst = BeMessage({
      titles: 'test-close-code-call',
      close: true,
      onClose: handleClose as Function,
    } as IMessage) as IMsgInstanceTest
    compInst.close()
    expect(handleClose).toBeCalled()
    // dom是否銷毀
    /!*await asyncExpect(() => {
                expect(!document.getElementById(compInst.message.el.id)).toBeTruthy()
            }, 0)*!/
  })
  // 西東關閉測試
  test('event:close-auto', async () => {
    const compInst = BeMessage({
      titles: 'test-close-auto',
      duration: 300,
      onClose: handleClose as Function,
    } as IMessage) as IMsgInstanceTest
    // dom是否銷毀
    await asyncExpect(() => {
      expect(handleClose).toBeCalled()
    }, 500)
  })
})
*/
