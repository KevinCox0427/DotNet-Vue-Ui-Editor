<template>
    <div
        class="layer"
        :data-position="props.position.join(':')"
        :style="setLayerStyles(el.menuColor, props.position)"
    >
        <button><i class="fa-solid fa-caret-down"></i></button>
        <input :value="el.name" />
        <button><i class="fa-solid fa-trash-can"></i></button>
    </div>
    <Layer
        v-for="(el, i) in props.el.children.slice().reverse()"
        :el="el"
        :position="[...props.position, props.el.children.length - 1 - i]"
    />
</template>

<script setup lang="ts">
import { PropType } from 'vue';

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

const setLayerStyles = (menuColor:string, position:number[]) => `--menucolor: ${menuColor}; margin-left: ${(position.length-1)*2.5}em;`;
</script>

<style lang="scss" scoped>
    .layer {
        color: var(--menucolor);
        flex-direction: row;
        flex-basis: 100%;
        gap: 1em;
        height: fit-content;
        justify-content: space-between;
        align-items: center;
        padding: 0em 1em;
        border: 0.2em solid;
        border-radius: 10em;
        overflow: hidden;

        input {
            color: var(--dark);
            font-weight: 600;
            font-size: 1.3em;
            flex-basis: 1px;
            flex-grow: 1;
            min-width: 1px;

            &:focus-visible {
                border-bottom: 0.15em dashed;
            }
        }

        button {
            padding: 0.3em 0.2em;
            font-size: 1.35em;
            cursor: pointer;
            transition: background-color 0.1s linear, color 0.1s linear, transform 0.1s linear;

            &:first-child {
                font-size: 2em;
                padding: 0 0.2em;

                &.activated {
                    transform: rotate(90deg);

                    &:hover, &.activated {
                        transform: scale(1.15) rotate(90deg);
                    }
                }
            }

            &:hover, &:focus-visible {
                color: var(--light);
                background-color: var(--menucolor);
                transform: scale(1.15);
            }
        }
    }
</style>