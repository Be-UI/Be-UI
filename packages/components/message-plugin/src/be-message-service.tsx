
import { service as BeNotify, reset as resetNotifyInstMap } from '@be-ui/components/notification-plugin'
// import type { INotifyInst, INotifyOption } from '@be-ui/components/notification-plugin'
import type { IMessage, IMsgInst } from './be-message-type'

const createMessage = function(options: IMessage): IMsgInst {
  const option: IMessage = {
    titles: options.titles || 'message',
    msgType: options.msgType || 'info',
    offsetTop: options.offsetTop,
    close: options.close || false,
    placement: 'topCenter',
    compType: 'message',
    customClass: options.customClass,
    duration: options.duration || options.duration === null ? options.duration : 4500,
    key: options.key,
    onClose: options.onClose,
    iconPreRender: options.iconPreRender,
    closeRender: options.closeRender,
    loading: options.loading,
  }
  const notifyInst = BeNotify(option)
  return {
    message: notifyInst.notify,
    close: notifyInst.close,
    update: (options: IMessage) => {
      const option: IMessage = {
        titles: options.titles,
        msgType: options.msgType,
        offsetTop: options.offsetTop,
        close: options.close,
        placement: 'topCenter',
        compType: 'message',
        customClass: options.customClass,
        duration: options.duration,
        key: options.key,
        onClose: options.onClose,
        iconPreRender: options.iconPreRender,
        closeRender: options.closeRender,
        loading: options.loading,
      }
      return BeNotify(option)
    },
  }
}
export const resetMessageInstMap = (): void => {
  resetNotifyInstMap()
}
export const BeMessage = (options: IMessage): object => {
  return createMessage(options)
}
