import { createApp, VueElement } from 'vue'
import { createAuth0 } from '@auth0/auth0-vue';
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'

createApp(App).use(createAuth0({
      domain: "dev-mlhpkl87steqsy2q.eu.auth0.com",
      client_id: "YHkjAsF30FUUSlG6iohHFkk19K9UkV26",
      redirect_uri: window.location.origin
    })).use(router).use(store).mount('#app')
