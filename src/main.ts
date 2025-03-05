import { createApp } from 'vue';
import { createPinia } from 'pinia';

import '@/styles/index.less';

import App from './App';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
