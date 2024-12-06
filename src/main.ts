import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './app.vue';
import { router } from './router';

import './styles/base.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount('#app');
