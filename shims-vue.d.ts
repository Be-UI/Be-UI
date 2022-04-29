
declare module '*.vue' {
    import { DefineComponent } from 'vue'
    interface Vue {}
    const component: DefineComponent<{}, {}, Vue, any>
    export default component
}
