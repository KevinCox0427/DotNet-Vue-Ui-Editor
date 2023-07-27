<template>
    <div class="layers" :style="{flexBasis: horizontalDivider + '%'}">

    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        horizontalDivider: Number
    });
</script>

<style lang="scss" scoped>
    .layers {
        width: 100%;
        margin-top: -0.4em;
    }
</style>