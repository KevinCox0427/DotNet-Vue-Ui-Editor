<template>
    <div class="container">
        <h1 @click="handleClick">Click me</h1>
        <p>Click count: <span>{{ count }}</span></p>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);

const handleClick = (e:MouseEvent) => {
    count.value++;
};
</script>

<style scoped lang="scss">
.container {
    margin: auto;
    font-size: 4em;
    align-items: center;

    h1 {
        user-select: none;
    }

    p {
        flex-direction: row;
        gap: 0.25em;
        font-size: 0.5em;
        font-weight: 200;
        font-style: italic;

        span {
            font-style: normal;
        }
    }
}
</style>