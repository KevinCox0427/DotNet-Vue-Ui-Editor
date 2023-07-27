<template>
    <div class="contain">
        <View />
        <div class="vertical-divider"></div>
        <div class="editor" :style="{flexBasis: verticalDivider + '%'}">
            <StyleEditor />
            <div class="horizontal-divider"></div>
            <Layers :horizontalDivider="horizontalDivider" />
        </div>
    </div>
    <Toolbar />
</template>

<script setup lang="ts">
import Toolbar from "./components/Toolbar.vue";
import View from "./components/View.vue";
import StyleEditor from "./components/StyleEditor.vue";
import Layers from "./components/Layers.vue";

import { ref } from "vue";

const horizontalDivider = ref(50);
const verticalDivider = ref(20);

</script>

<style scoped lang="scss">
    .contain {
        flex-direction: row;
        flex-wrap: wrap;
        flex-grow: 1;
        align-self: stretch;

        .vertical-divider {
            height: 100%;
            flex-basis: 1em;
            background-image: linear-gradient(to right, transparent 0em 0.4em, var(--dark) 0.4em 0.6em, transparent 0.6em 1em);
            cursor: ew-resize;
            z-index: 1;

            &:hover, &:focus {
                background-image: linear-gradient(to right, transparent 0em 0.3em, red 0.3em 0.7em, transparent 0.7em 1em);
            }
        }

        .editor {
            margin-left: -0.4em;
            height: 100%;

            .horizontal-divider {
                width: 100%;
                flex-basis: 1em;
                background-image: linear-gradient(to bottom, transparent 0em 0.4em, var(--dark) 0.4em 0.6em, transparent 0.6em 1em);
                cursor: ns-resize;
                z-index: 1;

                &:hover, &:focus {
                    background-image: linear-gradient(to bottom, transparent 0em 0.3em, red 0.3em 0.7em, transparent 0.7em 1em);
                }
            }
        }
    }
</style>