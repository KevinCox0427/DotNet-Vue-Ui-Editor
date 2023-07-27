import { CSSProperties, reactive } from "vue";

declare global {
    type ElementObject = {
        name: string,
        menuColor: string,
        styles: CSSProperties,
        children: ElementObject[]
    }
}

/**
 * Storing a centralized state to store all the element objects.
 */
const store = reactive<{
    toolbarSelection: 'move' | 'select' | 'create' | 'text' | 'link' | 'image' | 'video' | 'preview',
    objects: ElementObject[]
}>({
    toolbarSelection: 'move',
    objects: [{
        name: 'First Object',
        menuColor: '#bec01f',
        styles: {
            height: '100px',
            width: '100px',
            backgroundColor: '#bec01f',
        },
        children: []
    }]
});

export default store;