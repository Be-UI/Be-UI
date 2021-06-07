/*
* be-aside.vue
* @deprecated 公共的侧边组件
* @author czh
* @create (czh 2021/5/20)
* @update (czh 2021/5/20)
*/
<template>
    <aside class="be-aside" :style="{ width }" :class="{ 'is-Unfold': isFold }" >
        <slot></slot>
    </aside>
</template>

<script>
    export default {
        name: "be-aside",
        data() {
            return {}
        },
        computed: {
            isFold() {
                if (!this.isUnfold) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        watch: {},
        props: {
            width: {
                type: String,
                default: '300px'
            },
            /**
             * 是否展开
             */
            isUnfold: {
                type: Boolean,
                default: true
            }
        },

        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .be-aside{
        box-sizing: border-box;
        flex:3;
        overflow: auto;
        transition: all .5s;
        -moz-transition: all .5s;	/* Firefox 4 */
        -webkit-transition: all .5s;	/* Safari 和 Chrome */
        -o-transition: all .5s;	/* Opera */
    }
    .is-Unfold{
       /* width: 10px !important;
        flex:1*/
        flex:0
    }
</style>