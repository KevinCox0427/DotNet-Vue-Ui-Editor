import { createSSRApp } from 'vue';
import Home from './Home.vue';
const app = createSSRApp(Home);
app.mount('#root');