import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Link from '../src/be-link.vue'
import {ref, nextTick} from "vue";

const _mount = (options: any) =>
    mount({
        components: {
            BeLink: Link,
        },
        ...options,
    })

describe('be-Link', () => {

    test('props type', async () => {
        const type = ref('error')
        const wrapper = _mount({
            template: `<BeLink :type="type"></BeLink>`,
            setup() {
                return {
                    type
                }
            },
        })
        await nextTick()
        expect(wrapper.find('.be-link__error').exists()).toBeTruthy()

        type.value = 'info'
        await nextTick()
        expect(wrapper.find('.be-link__info').exists()).toBeTruthy()

        type.value = 'warning'
        await nextTick()
        expect(wrapper.find('.be-link__warning').exists()).toBeTruthy()

        type.value = 'success'
        await nextTick()
        expect(wrapper.find('.be-link__success').exists()).toBeTruthy()

        type.value = 'primary'
        await nextTick()
        expect(wrapper.find('.be-link__primary').exists()).toBeTruthy()
    })

    test('props content', async () => {
        const wrapper = _mount({
            template: `<BeLink content="content"></BeLink>`,
        })
        await nextTick()
        expect(wrapper.find('.be-link--content').element.innerHTML).toBe('content')
    })

    test('props content', async () => {
        const wrapper = _mount({
            template: `<BeLink content="content"></BeLink>`,
        })
        await nextTick()
        expect(wrapper.find('.be-link--content').element.innerHTML).toBe('content')
    })

    test('props disabled', async () => {
        const wrapper = _mount({
            template: `<BeLink disabled></BeLink>`,
        })
        await nextTick()
        expect(wrapper.find('.be-link--disabled')).toBeTruthy()
    })

    test('props underline', async () => {
        const wrapper = _mount({
            template: `<BeLink underline></BeLink>`,
        })
        await nextTick()
        expect(wrapper.find('.be-link--underline')).toBeTruthy()
    })

    test('props href', async () => {
        const wrapper = _mount({
            template: `<BeLink href="href"></BeLink>`,
        })
        await nextTick()
        expect(wrapper.find('.be-link').element.getAttribute('href')).toBe('href')
    })

    test('props prevIcon and nextIcon', async () => {
        const wrapper = _mount({
            template: `<BeLink href="href" prevIcon="add" nextIcon="card"></BeLink>`,
        })
        await nextTick()
        expect(wrapper.findAll('.be-icon').length).toBe(2)
    })

    test('slot prevIcon and nextIcon', async () => {
        const wrapper = _mount({
            template: `
                <BeLink href="href">
                    <template #prevIcon><div class="be-icon"></div></template>
                    <template #nextIcon><div class="be-icon"></div></template>
                </BeLink>`,
        })
        await nextTick()
        expect(wrapper.findAll('.be-icon').length).toBe(2)
    })

})
