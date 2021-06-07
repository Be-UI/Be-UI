/*
* be-container.vue
* @deprecated 公共的容器组件
* @author czh
* @create (czh 2021/5/19)
* @update (czh 2021/5/19)
*/
<template>
    <section class="be-container" :class="{ 'is-vertical': isVertical }">
        <slot></slot>
    </section>
</template>

<script>
    export default {
        name: "be-container",
        data() {
            return {}
        },
        props: {
            direction: String
        },

        computed: {
            isVertical() {
                if (this.direction === 'vertical') {
                    return true;
                } else {
                    return false;
                }
            }
        },
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .be-container {
        display: flex;
        flex-direction: row;
        flex-basis: auto;
        box-sizing: border-box;
        min-width: 0;
        width: 100%;
        height: 100%;
      /*
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;*/
    }
    .is-vertical {
        flex-direction: column;
    }
</style>