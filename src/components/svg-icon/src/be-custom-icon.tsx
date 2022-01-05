import {h, computed, useAttrs} from 'vue'

export const createCustom = (template: string): object => {
    return {
        name: 'BeCustomIcon',
        props: {
            /**
             * 是否旋转
             */
            spin: {
                type: Boolean,
                default: false
            }
        },
        setup(props: any) {
            const attrs = useAttrs()
            const customClass = props.customClass ? props.customClass : ''
            const spinClass = computed(() => props.spin ? 'be-icon-spin ' + customClass : '' + customClass)
            return () => {
                return <div class={`be-icon-container ${spinClass.value}`} {...attrs}>
                    {template}
                </div>
            }
        },
    }
};
