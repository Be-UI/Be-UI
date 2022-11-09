import { nextTick } from 'vue'
import type { IOption, TimeoutHandle } from './types'
/**
 * id生成方法
 * @return {string}
 */
export const getUuid = (): string => {
  const s: Array<any> = []
  const hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0; i < 36; i++)
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)

  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}
export const jsonClone = <T>(val: T): T => JSON.parse(JSON.stringify(val))
export const isBool = (val: unknown) => typeof val === 'boolean'
export const isString = (val: unknown): val is string =>
  typeof val == 'string' && val.constructor === String
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isFunction = (val: unknown) =>
  Object.prototype.toString.call(val) === '[object Function]'
export function asyncExpect(fn: Function, timeout: number | null) {
  return new Promise((resolve: Function) => {
    if (typeof timeout === 'number') {
      setTimeout(() => {
        fn()
        resolve()
      }, timeout)
    }
    else {
      nextTick(() => {
        fn()
        resolve()
      })
    }
  })
}

export const accAdd = (arg1: number, arg2: number): number => {
  let r1: number, r2: number
  let m = 0
  try {
    r1 = arg1.toString().split('.')[1].length
  }
  catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  }
  catch (e) {
    r2 = 0
  }
  m = 10 ** Math.max(r1, r2)
  return (arg1 * m + arg2 * m) / m
}
/*
 * 获取小数位数
 */
export const getMaxDecimalLength = (val: Array<number>): number => {
  // 最大小数位长度
  let maxDecimalLength = 0
  val.forEach((x) => {
    const strVal = x.toString()
    const dotIndex = strVal.indexOf('.')
    if (dotIndex > -1) {
      // 获取当前值小数位长度
      const curDecimalLength = strVal.length - 1 - dotIndex

      if (curDecimalLength > maxDecimalLength)
        maxDecimalLength = curDecimalLength
    }
  })
  return maxDecimalLength
}
/**
 * 减法
 */
export const accSub = (arg: Array<number>): number => {
  let sum = 0
  const maxDecimalLength: number = getMaxDecimalLength(arg)
  arg.forEach((x: number, index: number) => {
    const nurVal = Math.round(x * 10 ** maxDecimalLength)

    if (index === 0)
      sum = nurVal
    else sum -= nurVal
  })

  return sum / 10 ** maxDecimalLength
}
/**
 * 校验字符纯数字
 * @param str
 */
export const checkNumber = (str: string): boolean => {
  const reg = /^(([1-9][0-9]*\.[0-9][0-9]*)|([0]\.[0-9][0-9]*)|([1-9][0-9]*)|([0]{1}))$/
  if (reg.test(str))
    return true

  return false
}

export const mapToArr = (map: any): Array<any> => {
  return Array.from(map)
}
export const arrDupRemov = (arr: Array<any>, key: string): Array<any> => {
  const newObj: IOption = {}
  return arr.reduce((preVal, curVal) => {
    newObj[curVal[key]] ? '' : (newObj[curVal[key]] = preVal.push(curVal))
    return preVal
  }, [])
}

export function debounce(func: Function, wait: number) {
  let timer: TimeoutHandle
  return function (...argument) {
    const args = argument
    clearTimeout(timer)
    timer = setTimeout(function () {
      func.apply(this, args)
    }, wait)
  }
}

export const arrayDeduplicationSet = (val: Array<any>): Array<any> => Array.from(new Set(val))
export const arrayDeduplicationt = (val: Array<any>, key: string): Array<any> => {
  const obj = {}
  return val.reduce((cur, next) => {
    obj[next[key]] ? '' : (obj[next[key]] = true && cur.push(next))
    return cur
  }, [])
}

export function throttle(fn,wait){
  let timer = null;
  return function(){
    let context = this;
    let args = arguments;
    if(!timer){
      timer = setTimeout(function(){
        fn.apply(context,args);
        timer = null;
      },wait)
    }
  }

}

