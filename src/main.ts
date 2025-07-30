import { createApp } from 'vue'

import App from '@/App.vue'
import store from '@/stores'

import router from '@/router'
import '@/router/permission'

// 全局样式
import '@/assets/style/style.css'
// 动画
import 'animate.css'
// iconfont图标
import '@/assets/iconfont/iconfont.css'
// 字体
import 'vfonts/Inter.css'
import 'vfonts/FiraCode.css'

import naive from 'naive-ui'

import { setupNaiveDiscreteApi } from '@/plugins'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(naive)
// 挂载 naive-ui 脱离上下文的 Api
setupNaiveDiscreteApi()
app.mount('#app')
