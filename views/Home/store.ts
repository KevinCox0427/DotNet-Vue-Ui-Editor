import { reactive } from "vue";

const store = reactive<{
    toolbarSelection: 'move' | 'create' | 'text' | 'link' | 'image' | 'video'
}>({
    toolbarSelection: 'move'
});

export default store;