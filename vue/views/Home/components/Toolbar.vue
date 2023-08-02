<template>
    <div
        class="topbar"
        :style="{
            display: store.toolbarSelection === 'preview' ? 'none' : 'flex'
        }"
    >
        <div class="group">
            <button :class="{activated: store.toolbarSelection === 'move'}" @click="updateToolbarSelection('move')">
                <i class="fa-solid fa-hand-pointer"></i>
            </button>
            <button :class="{activated: store.toolbarSelection === 'select'}" @click="updateToolbarSelection('select')">
                <i class="fa-solid fa-expand"></i>
            </button>
            <button :class="{activated: store.toolbarSelection === 'create'}" @click="updateToolbarSelection('create')">
                <i class="fa-solid fa-pencil"></i>
            </button>
            <button :class="{activated: store.toolbarSelection === 'text'}" @click="updateToolbarSelection('text')">
                <i class="fa-solid fa-paragraph"></i>
            </button>
            <button :class="{activated: store.toolbarSelection === 'link'}" @click="updateToolbarSelection('link')">
                <i class="fa-solid fa-link"></i>
            </button>
            <button :class="{activated: store.toolbarSelection === 'image'}" @click="updateToolbarSelection('image')">
                <i class="fa-solid fa-image"></i>
            </button>
            <button :class="{activated: store.toolbarSelection === 'video'}" @click="updateToolbarSelection('video')">
                <i class="fa-solid fa-film"></i>
            </button>
        </div>
        <div class="group">
            <input class="pagename" placeholder="Enter Title" />
        </div>
        <div class="group">
            <button>
                <i class="fa-solid fa-gear"></i>
            </button>
            <button @click="updateToolbarSelection('preview')">
                <i class="fa-solid fa-eye"></i>
            </button>
            <button>
                <i class="fa-solid fa-floppy-disk"></i>
            </button>
            <button>
                <i class="fa-solid fa-arrow-right-to-bracket"></i>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import store from '../store';

function updateToolbarSelection(selection: "move" | 'select' | "create" | "text" | "link" | "image" | "video" | "preview") {
    store.toolbarSelection = selection;
}
</script>

<style scoped lang="scss">
    .topbar {
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
        height: fit-content;
        box-shadow: 0 0 0 0.2em;
        z-index: 1;
        overflow: hidden;
        padding: 0.2em 1em;
        gap: 1em 2em;
        
        .group {
            flex-direction: row;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            flex-grow: 1;
            gap: 0.3em;

            &:nth-child(2) {
                flex-grow: 1000;
            }

            button {
                font-size: 1.7em;
                cursor: pointer;
                padding: 0.25em;
                border-radius: 0.2em;
                transition: color 0.1s linear, background-color 0.1s linear, transform 0.1s linear;

                &.activated, &:hover, &:focus-visible {
                    background-color: var(--dark);
                    color: var(--light);
                    transform: scale(1.16);
                }
            }
        }

        input {
            font-size: 1.5em;
            font-weight: 500;
            line-height: 100%;
            padding: 0em;
            border-bottom: 0.15em dashed;
            flex-basis: 10em;
            flex-grow: 1;
            max-width: 30em;

            &::placeholder {
                opacity: 0.5;
                font-weight: 400;
            }

            &:hover, &:focus-visible {
                border-bottom: 0.15em solid;
            }
        }
    }
</style>