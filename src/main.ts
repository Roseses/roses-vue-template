import { createApp } from "vue";
import App from './App.vue';
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const store = createPinia()

createApp(App).use(store).use(ElementPlus, { size: 'small', zIndex: 3000 }).mount('#app')
