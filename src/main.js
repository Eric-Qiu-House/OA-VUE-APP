import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'; // 引入图标库

import scui from './scui'
import i18n from './locales'
import router from './router'
import store from './store'
import { createPinia } from 'pinia';
import App from './App.vue'

const app = createApp(App);
const pinia = createPinia();

// 注册所有图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// 设置一个全局按钮显示状态

app.use(store);
app.use(pinia);
app.use(router);
app.use(ElementPlus);
app.use(i18n);
app.use(scui);

//挂载app
app.mount('#app');
