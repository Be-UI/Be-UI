
import { BeMsg } from '../src/be-message-box-service'
import { asyncExpect } from '@be-ui/utils'
import {describe, test, expect, vi } from "vitest";

describe('test-be-message-box-props', () => {
  test('props-customClass', () => {
    BeMsg({
      customClass: 'props-customClass',
      footerRender: null,
      bodyRender: null,
      iconPreRender: null,
      iconNextRender: null,
    })
    expect(document.body.querySelector('.props-customClass')).toBeTruthy()
  })

  test('props-titles', () => {
    BeMsg({
      customClass: 'props-titles',
      titles: 'test-titles',
      footerRender: null,
      bodyRender: null,
      iconPreRender: null,
      iconNextRender: null,
    })
    const elm: HTMLElement = document.body.querySelector('.props-titles') as HTMLElement
    const span: HTMLElement = elm.querySelector('.text-info') as HTMLElement
    asyncExpect(() => {
      const title = span.innerHTML
      expect(title === 'test-titles').toBeTruthy()
    }, null)
  })

  test('props-isOpenModal', () => {
    BeMsg({
      customClass: 'props-isOpenModal-true',
      footerRender: null,
      bodyRender: null,
      iconPreRender: null,
      iconNextRender: null,
    })
    BeMsg({
      customClass: 'props-isOpenModal-false',
      isOpenModal: false,
      footerRender: null,
      bodyRender: null,
      iconPreRender: null,
      iconNextRender: null,
    })
    const elmModal: HTMLElement = document.body.querySelector(
      '.props-isOpenModal-true'
    ) as HTMLElement
    const elmUnModal: HTMLElement = document.body.querySelector(
      '.props-isOpenModal-false'
    ) as HTMLElement
    asyncExpect(() => {
      expect(elmModal.className.indexOf('be-modal') > -1).toBeTruthy()
      expect(elmUnModal.className.indexOf('be-modal') === -1).toBeTruthy()
    }, null)
  })
  test('props-type', () => {
    BeMsg({
      customClass: 'props-type-warning',
      msgType: 'warning',
      footerRender: null,
      bodyRender: null,
      iconPreRender: null,
      iconNextRender: null,
    })
    BeMsg({
      customClass: 'props-type-info',
      msgType: 'info',
      footerRender: null,
      bodyRender: null,
      iconPreRender: null,
      iconNextRender: null,
    })
    BeMsg({
      customClass: 'props-type-success',
      msgType: 'success',
      footerRender: null,
      bodyRender: null,
      iconPreRender: null,
      iconNextRender: null,
    })
    BeMsg({
      customClass: 'props-type-error',
      msgType: 'error',
      footerRender: null,
      bodyRender: null,
      iconPreRender: null,
      iconNextRender: null,
    })
    const elmWarning: HTMLElement = document.body.querySelector(
      '.props-type-warning'
    ) as HTMLElement
    const elmInfo: HTMLElement = document.body.querySelector('.props-type-info') as HTMLElement
    const elmSuccess: HTMLElement = document.body.querySelector(
      '.props-type-success'
    ) as HTMLElement
    const elmError: HTMLElement = document.body.querySelector('.props-type-error') as HTMLElement
    asyncExpect(() => {
      expect(elmWarning.className.indexOf('be-message-box__warning') > -1).toBeTruthy()
      expect(elmInfo.className.indexOf('be-message-box__info') > -1).toBeTruthy()
      expect(elmSuccess.className.indexOf('be-message-box__success') > -1).toBeTruthy()
      expect(elmError.className.indexOf('be-message-box__error') > -1).toBeTruthy()
    }, null)
  })
  test('props-footerType', () => {
    BeMsg({
      customClass: 'props-footerType',
      footerRender: null,
      bodyRender: null,
      iconPreRender: null,
      iconNextRender: null,
      footerType: 'right',
    })

    const elm: HTMLElement = document.body.querySelector('.props-footerType') as HTMLElement
    const elmFooter: HTMLElement = elm.querySelector('.be-message-box--footer__right') as HTMLElement
    asyncExpect(() => {
      expect(elmFooter).toBeTruthy()
    }, null)
  })
  test('props-footerRender', () => {
    BeMsg({
      customClass: 'props-footerRender',
      footerRender: () => <span id="props_footerRender">自定義底部渲染</span>,
      bodyRender: null,
      iconPreRender: null,
      iconNextRender: null,
    })
    const elm: HTMLElement = document.body.querySelector('#props_footerRender') as HTMLElement
    asyncExpect(() => {
      expect(elm).toBeTruthy()
    }, null)
  })
  test('props-bodyRender', () => {
    BeMsg({
      customClass: 'props-bodyRender',
      footerRender: null,
      bodyRender: () => <span id="props_bodyRender">自定義渲染</span>,
      iconPreRender: null,
      iconNextRender: null,
    })
    const elm: HTMLElement = document.body.querySelector('#props_bodyRender') as HTMLElement
    asyncExpect(() => {
      expect(elm).toBeTruthy()
    }, null)
  })
  test('props-iconPreRender-iconNextRender', () => {
    BeMsg({
      customClass: 'props-iconPreRender-iconNextRender',
      footerRender: null,
      bodyRender: null,
      iconPreRender: () => <span id="props_iconNextRender">自定義渲染</span>,
      iconNextRender: () => <span id="props_iconPreRender">自定義渲染</span>,
    })
    const elmIconNext: HTMLElement = document.body.querySelector(
      '#props_iconNextRender'
    ) as HTMLElement
    const elmIconPre: HTMLElement = document.body.querySelector(
      '#props_iconPreRender'
    ) as HTMLElement
    asyncExpect(() => {
      expect(elmIconNext).toBeTruthy()
      expect(elmIconPre).toBeTruthy()
    }, null)
  })
})
describe('test-be-message-box-event', () => {
  test('event:onClose', () => {
    const handleClick = vi.fn(() => {})
    BeMsg({
      customClass: 'msg-event-onClose',
      footerRender: null,
      onClose: handleClick,
      bodyRender: null,
      iconPreRender: null,
      iconNextRender: null,
    })
    const elm = document.body.querySelector('.msg-event-onClose') as HTMLElement
    const closeElm = elm.querySelector('.be-message-box--head-close') as HTMLElement
    const closeIcon = closeElm.querySelector('.be-icon--container') as HTMLElement
    closeIcon.dispatchEvent(new Event('click'))
    asyncExpect(() => {
      expect(handleClick).toBeCalled()
    }, null)
  })
  test('event:onConfirm', () => {
    const handleClick = vi.fn()
    BeMsg({
      customClass: 'msg-event-onConfirm',
      footerRender: null,
      bodyRender: null,
      iconPreRender: null,
      iconNextRender: null,
      onConfirm: handleClick,
    })
    const elm = document.body.querySelector('.msg-event-onConfirm') as HTMLElement
    const confirmElm = elm.querySelector('.be-message-box--footer')?.childNodes[0] as HTMLElement
    confirmElm.dispatchEvent(new Event('click'))
    asyncExpect(() => {
      expect(handleClick).toBeCalled()
    }, null)
  })
})
