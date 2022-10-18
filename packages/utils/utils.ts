import {nextTick} from "vue";
/**
 * id生成方法
 * @return {string}
 */
export const getUuid = (): string => {
  const s: Array<any> = []
  const hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}
export const jsonClone = <T>(val: T): T => JSON.parse(JSON.stringify(val))
export const isFunction = (val: unknown) =>
  Object.prototype.toString.call(val) === '[object Function]'
export function asyncExpect(fn: Function, timeout: number | null) {
  return new Promise((resolve: Function) => {
    if (typeof timeout === 'number') {
      setTimeout(() => {
        fn()
        resolve()
      }, timeout)
    } else {
      nextTick(() => {
        fn()
        resolve()
      })
    }
  })
}