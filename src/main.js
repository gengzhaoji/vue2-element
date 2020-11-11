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

// 应用样式
import './style/index.scss'

//公用组件
import './helper/commonPage'

// 全局http请求拦截
import './helper/interceptor'

// 根组件
import App from './App.vue'

// 初始路由
import router from './router'

// 初始化store
import store from './store'

// 注入路由守卫
import guarder from './helper/guarder'

// 引入插件
import plugin from './utils/plugin'

//使用混入属性
import Mixin from './helper/mixins'

// 注册路由守卫
guarder(router)

// 使用混入属性
Vue.mixin(Mixin)

// 使用自定义功能插件
Vue.use(plugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')