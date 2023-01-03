import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import "bootstrap/dist/css/bootstrap.min.css"
import localStorageService from "@/utils/localStorageService";

axios.interceptors.request.use(
    config => {
        const token = localStorageService.getToken();
        if (token) {
            axios.defaults.headers.post['authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

const app = createApp(App).use(VueAxios, axios).use(store).use(router)
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
