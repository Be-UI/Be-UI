/*
* be-main.vue
* @deprecated 公共的主容器组件
* @author czh
* @create (czh 2021/5/19)
* @update (czh 2021/5/19)
*/
<template>
    <main class="be-main">
        <slot></slot>
    </main>
</template>

<script>
    export default {
        name: "be-main",
        data() {
            return {}
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .be-main {
        display: block;
        flex: 1;
        flex-basis: auto;
        background-color: rgb(242, 244, 245);
        box-sizing: border-box;
        height: calc(100vh - 120px);
        transition: width .5s;
        -moz-transition: width .5s;	/* Firefox 4 */
        -webkit-transition: width .5s;	/* Safari 和 Chrome */
        -o-transition: width .5s;	/* Opera */
    }
</style>