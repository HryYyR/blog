import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router/index'
import vuex from './store/index'
// import anime from 'animejs'
import lazyImg from 'vue-lazyload'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/src/message.scss'



const app = createApp(App)


//dev开发，prod上线
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL


app.config.globalProperties.$axios = axios


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(vuex)
app.use(router)
// app.use(anime)
app.use(lazyImg)

app.mount('#app')
