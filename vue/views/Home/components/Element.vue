<template>
    <div
        :data-position="props.position.join(':')"
        :class="{
            element: true,
            hoverable: store.toolbarSelection !== 'select' && store.toolbarSelection !== 'create'
        }"
        :style="{...props.el.styles,
            cursor: getCursor()
        }"
    >
        <Element v-for="(el, i) in props.el.children" :el="el" :position="[...props.position, i]" />
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import store from '../store';

const props = defineProps({
    el: {
        type: Object as PropType<ElementObject>,
        required: true
    },
    position: {
        type: Array<number>,
        required: true
    }
});
function getCursor() {
    switch(store.toolbarSelection) {
        case 'move':
            return 'pointer';
        case 'select':
        case 'create':
            return 'crosshair';
        case 'image':
        case 'video':
        case 'link':
            return 'copy';
        case 'text':
            return 'text';
    }   
    return '';
}
</script>

<style scoped lang="scss">
    .element {
        transition: box-shadow 0.1s linear;

        &.activated, &.hoverable:hover {
            box-shadow: 0 0 0 0.3em var(--selectionColor), 0 0 0.3em 0 rgba(0,0,0, 0.1) inset, 0 0 0.3em 0.3em rgba(0,0,0, 0.1);
        }
    }
</style>