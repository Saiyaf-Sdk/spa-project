import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './style.css';

import { storeError } from './lib/session';

const app = createApp(App);
app.config.errorHandler = (error) => {
  storeError.value = error instanceof Error ? error.message : 'The store could not complete that action.';
  console.error(error);
};
app.use(createPinia()).use(router).mount('#app');

