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
    focusedElement: number[],
    selectedElement: number[],
    elements: ElementObject[]
}>({
    toolbarSelection: 'move',
    focusedElement: [],
    selectedElement: [],
    elements: [{
        name: 'First Object',
        menuColor: '#bec01f',
        styles: {
            height: '100px',
            width: '100px',
            backgroundColor: '#bec01f',
        },
        children: [{
            name: 'Second Object',
            menuColor: '#197f0c',
            styles: {
                height: '50px',
                width: '50px',
                backgroundColor: '#197f0c',
            },
            children: []
        },{
            name: 'Third Object',
            menuColor: '#f0e3a7',
            styles: {
                height: '20px',
                width: '20px',
                backgroundColor: '#f0e3a7',
            },
            children: []
        }]
    }]
});

export default store;