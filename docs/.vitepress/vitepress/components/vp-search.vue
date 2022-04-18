<script setup lang="ts">
import docsearch from '@docsearch/js';
import '@docsearch/css';
import {getCurrentInstance, onMounted, watch} from 'vue'
import {useRoute, useRouter} from 'vitepress'
import {isClient} from '@vueuse/core'
import type {DocSearchHit} from '@docsearch/react/dist/esm/types'

const props = defineProps<{
    options: any
    multilang?: boolean
}>()

const vm = getCurrentInstance()
const route = useRoute()
const router = useRouter()

watch(
    () => props.options,
    (value) => {
        update(value)
    }
)

onMounted(() => {
    initialize(props.options)
})

function isSpecialClick(event: MouseEvent) {
    return (
        event.button === 1 ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
    )
}

function getRelativePath(absoluteUrl: string) {
    const {pathname, hash} = new URL(absoluteUrl)

    return pathname + hash
}

function update(options: any) {
    if (vm && vm.vnode.el) {
        vm.vnode.el.innerHTML =
            '<div class="algolia-search-box" id="docsearch"></div>'
        initialize(options)
    }
}


function initialize(userOptions: any) {

    docsearch(
        Object.assign({}, userOptions, {
            container: '#docsearch',
            indexName: 'be_ui3',
            searchParameters: userOptions.searchParameters,
            navigator: {
                navigate: ({suggestionUrl}: { suggestionUrl: string }) => {
                    if (!isClient) return

                    const {pathname: hitPathname} = new URL(
                        window.location.origin + suggestionUrl
                    )

                    // Router doesn't handle same-page navigation so we use the native
                    // browser location API for anchor navigation
                    if (route.path === hitPathname) {
                        window.location.assign(window.location.origin + suggestionUrl)
                    } else {
                        router.go(suggestionUrl)
                    }
                },
            },

            transformItems: (items: DocSearchHit[]) => {
                return items.map((item) => {
                    return Object.assign({}, item, {
                        url: getRelativePath(item.url),
                    })
                })
            },

            hitComponent: ({
                               hit,
                               children,
                           }: {
                hit: DocSearchHit
                children: any
            }) => {
                const relativeHit = hit.url.startsWith('http')
                    ? getRelativePath(hit.url as string)
                    : hit.url

                return {
                    type: 'a',
                    ref: undefined,
                    constructor: undefined,
                    key: undefined,
                    props: {
                        href: hit.url,
                        onClick: (event: MouseEvent) => {
                            if (isSpecialClick(event)) {
                                return
                            }

                            // we rely on the native link scrolling when user is already on
                            // the right anchor because Router doesn't support duplicated
                            // history entries
                            if (route.path === relativeHit) {
                                return
                            }

                            // if the hits goes to another page, we prevent the native link
                            // behavior to leverage the Router loading feature
                            if (route.path !== relativeHit) {
                                event.preventDefault()
                            }

                            router.go(relativeHit)
                        },
                        children,
                    },
                    __v: null,
                }
            },
        })
    )
}
</script>

<template>
    <div id="docsearch" class="algolia-search-box"/>
</template>

<style lang="scss">

.algolia-search-box {

    @include respond-to('md') {
        min-width: 176.3px;
    }
}

.DocSearch {
    --docsearch-primary-color: #ec4899;
    --docsearch-searchbox-shadow: inset 0 0 0 2px #ec4899;
    --docsearch-searchbox-shadow-de: inset 0 0 0 2px #f2f2f2;
    --docsearch-key-gradient: rgba(125, 125, 125, 0.1);
    --docsearch-footer-height: 44px;
    --docsearch-footer-background: #fff;
    --docsearch-footer-shadow: 0 -1px 0 0 #e0e3e8,
    0 -3px 6px 0 rgba(69, 98, 155, 0.12);
    --docsearch-searchbox-background: #fff;
    --docsearch-searchbox-focus-background: #f2f2f2;
    --docsearch-muted-color:  #909399;
    --docsearch-text-color: #606266;
    --docsearch-modal-background: #fafafa;;


    &.DocSearch-Button {
        margin-right: 8px;
        box-shadow: var(--docsearch-searchbox-shadow-de);
        &:hover{
            box-shadow: var(--docsearch-searchbox-shadow);
        }
    }

    @media (max-width: 749px) {
        &.DocSearch-Button {
            margin: 0 12px;
            padding: 0;
        }
    }

    .dark & {
        --docsearch-text-color: var(--text-color-light);
        --docsearch-key-shadow: none;
        --docsearch-modal-shadow: none;
        --docsearch-footer-shadow: none;

        .DocSearch-Button {
            .DocSearch-Button-Key {
                box-shadow: unset;
            }
        }
    }

    background-color: transparent;

    @include respond-to('md') {
        background-color: var(--docsearch-searchbox-background);
    }

    .DocSearch-MagnifierLabel {
        color: var(--docsearch-primary-color);
    }
}
</style>
