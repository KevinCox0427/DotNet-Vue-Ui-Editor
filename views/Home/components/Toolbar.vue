<template>
    <div class="topbar">
        <div class="group">
            <button :class="{activated: store.toolbarSelection === 'move'}" @click="updateToolbarSelection('move')">
                <i class="fa-solid fa-up-down-left-right"></i>
            </button>
            <button :class="{activated: store.toolbarSelection === 'create'}" @click="updateToolbarSelection('create')">
                <i class="fa-solid fa-expand"></i>
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
        <input class="pagename" placeholder="Enter Title" />
        <div class="group">
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

function updateToolbarSelection(selection: "move" | "create" | "text" | "link" | "image" | "video") {
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
        gap: 0 2em;
        
        .group {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 0.3em;

            button {
                font-size: 1.7em;
                cursor: pointer;
                padding: 0.25em;
                border-radius: 0.2em;
                transition: color 0.1s linear, background-color 0.1s linear, transform 0.1s linear;

                &.activated, &:hover, &:focus {
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

            &:hover, &:focus {
                border-bottom: 0.15em solid;
            }
        }
    }
</style>