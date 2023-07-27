<template>
    <main class="view" :style="{cursor: getCursor()}"></main>
</template>

<script setup lang="ts">
import store from '../store';

function getCursor() {
    switch(store.toolbarSelection) {
        case 'move':
            return 'pointer';
        case 'create':
            return 'crosshair';
        case 'image':
        case 'video':
            return 'copy';
        case 'link':
        case 'text':
            return 'text';
    }   
}
</script>

<style lang="scss" scoped>
    .view {
        height: 100%;
        flex-grow: 1;
        flex-basis: 1px;
        margin-right: -0.4em;
        background-image: linear-gradient(to right, transparent 0px 7px, rgb(230, 230, 230) 7px 9px, transparent 9px 16px), linear-gradient(to bottom, transparent 0px 7px, rgba(230, 230, 230) 7px 9px, transparent 9px 16px);
        background-size: 16px 16px;
    }
</style>