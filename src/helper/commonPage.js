import Vue from 'vue'

import XdhTable from '@com/xdh-table'
import XdhPager from '@com/xdh-pager'
import XdhListPanel from '@com/xdh-list-panel'
Vue.use(XdhTable);
Vue.use(XdhPager);
Vue.use(XdhListPanel);

// 扫描当前目录下.vue结尾的文件，并扫描子文件夹
const componentsContext = require.context('../components/common', true, /\.vue$/)
// 枚举componentsContext对象组
componentsContext.keys().forEach(component => {
    const componentConfig = componentsContext(component)
    const ctrl = componentConfig.default || componentConfig
    Vue.component(ctrl.name, ctrl)
})