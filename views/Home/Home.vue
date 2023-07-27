<template>
    <div class="contain">
        <View />
        <div
            class="vertical-divider"
            :style="{display: store.toolbarSelection === 'preview' ? 'none' : 'flex'}"
            @mousedown="startVerticalShift"
        ></div>
        <div
            class="editor"
            ref="sideMenuEl"
            :style="{
                flexBasis: 'calc(' + verticalDivider + '% - 0.3em)',
                display: store.toolbarSelection === 'preview' ? 'none' : 'flex'
            }"
        >
            <StyleEditor />
            <div class="horizontal-divider" @mousedown="startHorizonatlShift"></div>
            <div class="layers" :style="{flexBasis: horizontalDivider + '%'}">
                <div class="absolute-wrapper">
                    <Layer v-for="(el, i) in store.elements.slice().reverse()" :el="el" :position="[store.elements.length - 1 - i]" />
                </div>
            </div>
        </div>
    </div>
    <Toolbar />
</template>

<script setup lang="ts">
import Toolbar from "./components/Toolbar.vue";
import View from "./components/View.vue";
import StyleEditor from "./components/StyleEditor.vue";
import Layer from "./components/Layer.vue";
import store from "./store";

import { ref } from "vue";

const sideMenuEl = ref<HTMLDivElement | null>(null);

const horizontalDivider = ref(50);
const verticalDivider = ref(20);

function startVerticalShift() {
    document.body.addEventListener('mousemove', move);
    document.body.addEventListener('mouseup', end);

    function move(e:MouseEvent) {
        verticalDivider.value = Math.min(Math.max((1 - (e.clientX / window.innerWidth)) * 100, 1), 99);
    }

    function end() {
        document.body.removeEventListener('mousemove', move);
        document.body.removeEventListener('mouseup', end);
    }
}

function startHorizonatlShift() {
    document.body.addEventListener('mousemove', move);
    document.body.addEventListener('mouseup', end);

    function move(e:MouseEvent) {
        if(!sideMenuEl.value) return;
        horizontalDivider.value = Math.min(Math.max((1 - ((e.clientY + (window.innerHeight - sideMenuEl.value.getBoundingClientRect().bottom)) / sideMenuEl.value.clientHeight)) * 100, 1), 99);
    }

    function end() {
        document.body.removeEventListener('mousemove', move);
        document.body.removeEventListener('mouseup', end);
    }
}

</script>

<style scoped lang="scss">
    .contain {
        flex-direction: row;
        flex-wrap: wrap;
        flex-grow: 1;
        align-self: stretch;

        .vertical-divider {
            flex-basis: 1em;
            background-image: linear-gradient(to right, transparent 0em 0.4em, var(--dark) 0.4em 0.6em, transparent 0.6em 1em);
            cursor: ew-resize;
            z-index: 1;

            &:hover, &:focus {
                background-image: linear-gradient(to right, transparent 0em 0.3em, var(--selectionColor) 0.3em 0.7em, transparent 0.7em 1em);
            }
        }

        .editor {
            margin-left: -0.4em;

            .horizontal-divider {
                width: 100%;
                flex-basis: 1em;
                background-image: linear-gradient(to bottom, transparent 0em 0.4em, var(--dark) 0.4em 0.6em, transparent 0.6em 1em);
                cursor: ns-resize;
                z-index: 1;

                &:hover, &:focus {
                    background-image: linear-gradient(to bottom, transparent 0em 0.3em, var(--selectionColor) 0.3em 0.7em, transparent 0.7em 1em);
                }
            }

            .layers {
                flex-direction: row;
                flex-wrap: wrap;
                width: 100%;
                margin-top: -0.4em;
                padding: 1em 0.75em;

                .absolute-wrapper {
                    position: absolute;
                    display: flex;
                    gap: 0.75em;
                    height: fit-content;
                    max-height: calc(100% - 2em);
                    width: calc(100% - 2em);
                    top: 0;
                    left: 0;
                    padding: 1em;
                    overflow-y: scroll;
                    overflow-x: hidden;
                }
            }
        }
    }

    @media (max-width: 800px) {
        .contain {
            flex-direction: column;

            .vertical-divider {
                background-image: linear-gradient(to bottom, transparent 0em 0.4em, var(--dark) 0.4em 0.6em, transparent 0.6em 1em);
                cursor: ns-resize;

                &:hover, &:focus {
                background-image: linear-gradient(to bottom, transparent 0em 0.3em, var(--selectionColor) 0.3em 0.7em, transparent 0.7em 1em);
            }
            }
        }
    }
</style>