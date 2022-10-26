import { BeNotify, closeAll, resetNotifyInstMap } from './src/be-notification-service'
export * from './src/be-notification-type'
export default {
  service: BeNotify,
  reset: resetNotifyInstMap,
  closeAllNotify: closeAll,
}
export const service = BeNotify
export const reset = resetNotifyInstMap
export const closeAllNotify = closeAll
