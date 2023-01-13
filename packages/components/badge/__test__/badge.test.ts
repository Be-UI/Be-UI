import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Badge from '../src/be-badge.vue'
import {ref, nextTick} from "vue";

const _mount = (options: any) =>
    mount({
        components: {
            BeBadge: Badge,
        },
        ...options,
    })

describe('be-badge', () => {

    test('props value type is number', async () => {
        const wrapper = _mount({
            template: `<BeBadge :value="varBadge"></BeBadge>`,
            setup() {
                const varBadge = ref<number>(6)
                return {
                    varBadge,
                }
            },
        })
        await nextTick()
        expect(wrapper.find('.be-badge--sup').element.innerHTML).toBe('6')
    })

    test('value type is string', async () => {
        const wrapper = _mount({
            template: `<BeBadge :value="varBadge"></BeBadge>`,
            setup() {
                const varBadge = ref<string>('string foo')
                return {
                    varBadge,
                }
            },
        })
        await nextTick()
        expect(wrapper.find('.be-badge--sup').element.innerHTML).toBe('string foo')
    })

    test('props type', async () => {
        const type = ref('info')
        const wrapper = _mount({
            template: `<BeBadge :value="varBadge" :type="type"></BeBadge>`,
            setup() {
                const varBadge = ref<number>(666)
                return {
                    type,
                    varBadge,
                }
            },
        })
        await nextTick()
        expect(wrapper.find('.be-badge--sup__info')).toBeTruthy()

        type.value = 'primary'
        await nextTick()
        expect(wrapper.find('.be-badge--sup__primary')).toBeTruthy()

        type.value = 'success'
        await nextTick()
        expect(wrapper.find('.be-badge--sup__success')).toBeTruthy()

        type.value = 'warning'
        await nextTick()
        expect(wrapper.find('.be-badge--sup__warning')).toBeTruthy()

        type.value = 'error'
        await nextTick()
        expect(wrapper.find('.be-badge--sup__error')).toBeTruthy()
    })

    test('props max', async () => {
        const wrapper = _mount({
            template: `<BeBadge :value="varBadge" :max="500"></BeBadge>`,
            setup() {
                const varBadge = ref<number>(666)
                return {
                    varBadge,
                }
            },
        })
        await nextTick()
        expect(wrapper.find('.be-badge--sup').element.innerHTML).toBe('500+')
    })

    test('props show', async () => {
        const show = ref<boolean>(false)
        const wrapper = _mount({
            template: `<BeBadge :value="varBadge" :show="show"></BeBadge>`,
            setup() {
                const varBadge = ref<number>(666)
                return {
                    show,
                    varBadge,
                }
            },
        })
        await nextTick()
        expect(wrapper.find('.be-badge').element.innerHTML).toBe('<!--v-if-->')
        show.value = true
        await nextTick()
        expect(wrapper.find('.be-badge--sup')).toBeTruthy()
    })

    test('props dot', async () => {
        const isDot = ref<boolean>(false)
        const wrapper = _mount({
            template: `<BeBadge :value="varBadge" :is-dot="isDot"></BeBadge>`,
            setup() {
                const varBadge = ref<number>(6)
                return {
                    isDot,
                    varBadge,
                }
            },
        })
        await nextTick()
        expect(wrapper.find('.be-badge--sup').element.innerHTML).toBe('6')
        isDot.value = true
        await nextTick()
        expect(wrapper.find('.be-badge--sup').element.innerHTML).toBe('')
    })
})
