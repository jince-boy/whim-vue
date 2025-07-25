import '@/assets/style.css'
import { createApp } from 'vue'

import App from '@/App.vue'
import store from '@/stores'

import router from '@/router'
import '@/router/permission'

import naive from 'naive-ui'
import 'vfonts/Inter.css'
import 'vfonts/FiraCode.css'

import { setupNaiveDiscreteApi } from '@/plugins'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(naive)
// 挂载 naive-ui 脱离上下文的 Api
setupNaiveDiscreteApi()
app.mount('#app')
