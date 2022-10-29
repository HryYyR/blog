import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router/index'
import vuex from './store/index'
// import anime from 'animejs'
import lazyImg from 'vue-lazyload'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'

import i18n from './language/i18n'
import { log } from 'console'
import { ElMessage } from 'element-plus'

const app = createApp(App)


//dev开发，prod上线
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL
axios.interceptors.request.use(
  function (config: any) {
    if (config.url != '/api/verifyToken') {
      config.headers.Authorization = localStorage.getItem('token') || '-1'
    }
    // 在发送请求之前进行操作
    return config;
  },
  function (error) {
    // 对请求错误进行操作
    ElMessage.error('请求错误')
    return Promise.reject(error);
  }
);

app.config.globalProperties.$axios = axios


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(i18n)
app.use(vuex)
app.use(router)
// app.use(anime)
app.use(lazyImg)

app.mount('#app')
