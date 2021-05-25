import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persistedstate'
import getters from './getters'
Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  modules,
  getters,
  plugins: [
    VuexPersistence({
      storage: window.localStorage,
      // 配置缓存的内容
      reducer(val) {
        return {
          user: {
            token: val.user.token,
            size: val.user.size,
          },
          guarder: {
            moduleName: val.guarder.moduleName,
            indexPath: val.guarder.indexPath,
          }
        }
      }
    })
  ]
})
