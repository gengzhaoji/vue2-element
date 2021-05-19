import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import getters from './getters'
/**vuex持续存储插件 */
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['user', 'menu']
})
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
  plugins: [vuexLocal.plugin]
})
