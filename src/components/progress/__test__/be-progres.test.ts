/*
* @be-progres.test.ts
*  @deprecated
* @author czh
* @update (czh 2022/3/2)
*/
import {mount} from '@vue/test-utils'
import BeProgress from '../src/be-progress'
const _mount = (options: any) =>
    mount({
        components: {
            'BeProgress': BeProgress,
        },
        ...options,
    })
describe('test-be-progress-type-line', () => {
    test('props-percent', () => {
        const wrapper = mount(BeProgress, {
            props: {
                percent: 60,
            },
        })
        const elm = wrapper.element as HTMLElement
        const percentElm = elm.querySelectorAll('.be-progress-line-path')[0] as HTMLElement
        expect(percentElm.style.width === '60%').toBeTruthy()
    })
    test('props-showInfo', () => {
        const wrapper = mount(BeProgress, {
            props: {
                percent: 60,
                showInfo:false
            },
        })
        const elm = wrapper.element as HTMLElement
        const showInfoElm = elm.querySelectorAll('.percent')
        expect(showInfoElm.length === 0).toBeTruthy()
    })
    test('props-trailColor', () => {
        const wrapper = mount(BeProgress, {
            props: {
                percent: 60,
                trailColor:'red'
            },
        })
        const elm = wrapper.element as HTMLElement
        const trailColorElm = elm.querySelector('.be-progress-line--track') as HTMLElement
        expect(trailColorElm.style.backgroundColor === 'red').toBeTruthy()
    })
    test('props-strokeLinecap', () => {
        const wrapper = mount(BeProgress, {
            props: {
                percent: 60,
                strokeLinecap:'square'
            },
        })
        const elm = wrapper.element as HTMLElement
        const strokeLinecapElm = elm.querySelectorAll('.be-progress-line-path__round')
        expect(strokeLinecapElm.length === 0).toBeTruthy()
    })
    test('props-status', () => {
        const wrapperSuccess = mount(BeProgress, {
            props: {
                percent: 60,
                status:'success'
            },
        })
        const elmSuccess = wrapperSuccess.element as HTMLElement
        const statusElmSuccess = elmSuccess.querySelectorAll('.be-progress__success')
        expect(statusElmSuccess.length === 1).toBeTruthy()
        const wrapperError = mount(BeProgress, {
            props: {
                percent: 60,
                status:'error'
            },
        })
        const elmError = wrapperError.element as HTMLElement
        const statusElmError = elmError.querySelectorAll('.be-progress__error')
        expect(statusElmError.length === 1).toBeTruthy()
    })
    test('props-color',  () => {
        const wrapperRed = mount(BeProgress, {
            props: {
                percent: 60,
                color:'red',
            },
        })
        const elmRed = wrapperRed.element as HTMLElement
        const colorElmRed = elmRed.querySelector('.be-progress-line-path') as HTMLElement
        expect(colorElmRed.style.backgroundColor === 'red').toBeTruthy()
    })
    test('props-strokeWidth', () => {
        const wrapper = mount(BeProgress, {
            props: {
                percent: 60,
                strokeWidth:30
            },
        })
        const elm = wrapper.element as HTMLElement
        const strokeWidthElm = elm.querySelector('.be-progress-line-path') as HTMLElement
        expect(strokeWidthElm.style.height === '30px').toBeTruthy()
    })
    test('props-success', () => {
        const wrapper = mount(BeProgress, {
            props: {
                percent: 60,
                success:{percent:10,color:'red'},
            },
        })
        const elm = wrapper.element as HTMLElement
        const successElm = elm.querySelector('.be-progress-line-path__success') as HTMLElement
        expect(successElm && successElm.style.backgroundColor === 'red').toBeTruthy()
        expect(successElm && successElm.style.width === '10%').toBeTruthy()
    })
})
describe('test-be-progress-type-circle', () => {
    test('props-showInfo', () => {
        const wrapper = mount(BeProgress, {
            props: {
                type: 'circle',
                percent: 60,
                showInfo: false
            },
        })
        const elm = wrapper.element as HTMLElement
        const showInfoElm = elm.querySelectorAll('.percent')
        expect(showInfoElm.length === 0).toBeTruthy()
    })
    test('props-trailColor', () => {
        const wrapper = mount(BeProgress, {
            props: {
                percent: 60,
                type: 'circle',
                trailColor: 'red'
            },
        })
        const elm = wrapper.element as HTMLElement
        const trailColorElm = elm.querySelector('.be-progress-circle__track') as HTMLElement
        expect(trailColorElm.getAttribute('stroke') === 'red').toBeTruthy()
    })
    test('props-strokeLinecap', () => {
        const wrapper = mount(BeProgress, {
            props: {
                percent: 60,
                type: 'circle',
                strokeLinecap: 'square'
            },
        })
        const elm = wrapper.element as HTMLElement
        const strokeLinecapElmTrack = elm.querySelector('.be-progress-circle__track') as HTMLElement
        expect(strokeLinecapElmTrack.getAttribute('stroke-linecap') === 'square').toBeTruthy()
        const strokeLinecapElmPath = elm.querySelector('.be-progress-circle__path') as HTMLElement
        expect(strokeLinecapElmPath.getAttribute('stroke-linecap') === 'square').toBeTruthy()
    })
    test('props-status', () => {
        const wrapperSuccess = mount(BeProgress, {
            props: {
                percent: 60,
                type: 'circle',
                status:'success'
            },
        })
        const elmSuccess = wrapperSuccess.element as HTMLElement
        const statusElmSuccess = elmSuccess.querySelector('.be-progress-circle__path') as HTMLElement
        expect(statusElmSuccess.getAttribute('stroke') === '#22C416FF').toBeTruthy()
        const wrapperError = mount(BeProgress, {
            props: {
                percent: 60,
                type: 'circle',
                status:'error'
            },
        })
        const elmError = wrapperError.element as HTMLElement
        const statusElmError = elmError.querySelector('.be-progress-circle__path') as HTMLElement
        expect(statusElmError.getAttribute('stroke') === '#F14E53FF').toBeTruthy()
    })
    test('props-color',  () => {
        const wrapperRed = mount(BeProgress, {
            props: {
                percent: 60,
                type: 'circle',
                color:'red',
            },
        })
        const elmRed = wrapperRed.element as HTMLElement
        const colorElmRed = elmRed.querySelector('.be-progress-circle__path') as HTMLElement
        expect(colorElmRed.getAttribute('stroke') === 'red').toBeTruthy()
    })
    test('props-strokeWidth', () => {
        const wrapper = mount(BeProgress, {
            props: {
                percent: 60,
                strokeWidth:30,
                type:'circle'
            },
        })
        const elm = wrapper.element as HTMLElement
        const strokeWidthElm = elm.querySelector('.be-progress-circle__path') as HTMLElement
        expect(strokeWidthElm.getAttribute('stroke-width') === ((30 / 132) * 100).toFixed(1)).toBeTruthy()
    })
    test('props-success', () => {
        const wrapper = mount(BeProgress, {
            props: {
                percent: 60,
                success:{percent:10,color:'red'},
                type:'circle'
            },
        })
        const elm = wrapper.element as HTMLElement
        const successElm = elm.querySelector('.be-progress-circle__success') as HTMLElement
        expect(successElm && successElm.getAttribute('stroke') === 'red').toBeTruthy()
    })
})