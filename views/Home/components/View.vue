<template>
    <main
        class="view"
        :style="{
            cursor: store.toolbarSelection === 'create' || store.toolbarSelection === 'select' ? 'crosshair' : ''
        }"
        @mousedown="handleSelection"
    >
        <Element
            v-for="(el, i) in store.elements"
            :el="el"
            :position="[i]"
        />
        <div class="selector" :style="{
            opacity: isSelecting ? 1 : 0,
            top: selection.top, 
            left: selection.left,
            height: selection.height,
            width: selection.width
        }"></div>
        <button v-if="store.toolbarSelection === 'preview'" @click="untogglePreview">
            <i class="fa-solid fa-eye-slash"></i>
        </button>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import store from '../store';
import Element from './Element.vue';

const selection = ref({
    top: 0,
    left: 0,
    height: 0,
    width: 0
});
const isSelecting = ref(false);

function handleSelection(e:MouseEvent) {
    if(store.toolbarSelection !== 'select' && store.toolbarSelection !== 'create') return;

    const startX = e.clientX;
    const startY = e.clientY;
    let endX = e.clientX;
    let endY = e.clientY;

    setSelection();
    isSelecting.value = true;

    document.body.addEventListener('mousemove', move);
    document.body.addEventListener('mouseup', end);

    function move(e:MouseEvent) {
        if(store.toolbarSelection !== 'select' && store.toolbarSelection !== 'create') {
            end();
            return;
        }

        endX = e.clientX;
        endY = e.clientY;
        setSelection();
    }

    function end() {
        isSelecting.value = false;
        document.body.removeEventListener('mousemove', move);
        document.body.removeEventListener('mouseend', end);
    }

    function setSelection() {
        selection.value = {
            top: startY < endY ? startY : endY,
            left: startX < endX ? startX : endX,
            height: Math.abs(startY - endY),
            width: Math.abs(startX - endX)
        }
    }
}

function untogglePreview() {
    store.toolbarSelection = 'move';
}
</script>

<style lang="scss" scoped>
    $gridColor: #f1f2f7;

    .view {
        flex-grow: 1;
        flex-basis: 1px;
        margin-right: -0.4em;
        background-image: linear-gradient(to right, transparent 0px 7px, $gridColor 7px 9px, transparent 9px 16px), linear-gradient(to bottom, transparent 0px 7px, $gridColor 7px 9px, transparent 9px 16px);
        background-size: 16px 16px;
        overflow-x: hidden;
        overflow-y: scroll;

        .selector {
            position: absolute;
            pointer-events: none;
            color: var(--dark);
            background-color: var(--darkOpacity);
            box-shadow: 0 0 0 0.2em;
            border-radius: 0.2em;
            transition: opacity 0.15s linear;
        }

        .element {

        }

        button {
            position: absolute;
            right: 0.5em;
            bottom: 0.5em;
            font-size: 1.8em;
            cursor: pointer;
            padding: 0.25em;
            border-radius: 0.2em;
            backdrop-filter: blur(5px);
            background-color: #ffffff30;
            transition: color 0.1s linear, background-color 0.1s linear, transform 0.1s linear;

            &:hover, &:focus-visible {
                background-color: var(--dark);
                color: var(--light);
                transform: scale(1.16);
            }
        }
    }
</style>