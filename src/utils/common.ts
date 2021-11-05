import {
    isArray,
    isObject,
    toRawType,
} from '@vue/shared'

import type { Ref } from 'vue'
import {TimeoutHandle} from "./types";
/**
 * id生成方法
 * @return {string}
 */
export const getUuid = ():string =>{
    let s:Array<any> = [];
    let hexDigits:string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for (let i:number = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = "4"
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
    s[8] = s[13] = s[18] = s[23] = "-"
    return s.join("")
}
export function isEmpty(val: unknown) {
    if (
        (!val && val !== 0) ||
        (isArray(val) && !val.length) ||
        (isObject(val) && !Object.keys(val).length)
    )
        return true

    return false
}
export const clearTimer = (timer: Ref<TimeoutHandle>) => {
    clearTimeout(timer.value)
    // @ts-ignore
    timer.value = null
}
export function debounce(func:Function,wait:number) {
    let timeout:TimeoutHandle;
    return function () {
        const context = this;
        const args = [...arguments];
        if (timeout) clearTimeout(timeout);
        const callNow = !timeout;
        timeout = setTimeout(() => {
            // @ts-ignore
            timeout = null;
        }, wait)
        if (callNow) func.apply(context, args)
    }
}
export const isBool = (val: unknown) => typeof val === 'boolean'
export const isString = (val: unknown) => (typeof val=='string')&&val.constructor==String;
export const isNumber = (val: unknown) => typeof val === 'number'
export const isHTMLElement = (val: unknown) => toRawType(val).startsWith('HTML')
export const isFunction = (val: unknown) => typeof val === 'function'