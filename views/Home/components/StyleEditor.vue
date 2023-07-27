<template>
    <div class="style-editor">
        <div class="absolute-wrapper">
            
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
    .style-editor {
        width: 100%;
        flex-grow: 1;
        flex-basis: 1px;
        margin-bottom: -0.4em;

        .absolute-wrapper {
            position: absolute;
            display: block;
            height: calc(100% - 2em);
            width: calc(100% - 2em);
            top: 0;
            left: 0;
            padding: 1em;
            overflow-y: scroll;
            overflow-x: hidden;
        }
    }
</style>