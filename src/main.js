/**
 * 程序入口
 * @author chenhuachun@xdh.net.cn
 *
 */
import Vue from 'vue'

// ie浏览器兼容问题处理
import 'babel-polyfill'

// 按需加载ui
import './helper/ui'

//公用组件
import './helper/commonPage'

// 根组件
import App from './App.vue'

// 初始路由
import router from './router'

// 初始化store
import store from './store'

// 注入路由守卫
import guarder from './helper/guarder'

// 引入字体图标
import './assets/icon/style.css'

// 引入特殊字体
import './assets/title/index.css'

// 引入全局资源
import plugin from './utils/plugin'
Vue.use(plugin)

// 注册路由守卫
guarder(router)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})