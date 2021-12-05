import Vue from 'vue'
import less from 'less'
import router from './router'
import store from './store'
import * as $api from './api/index'
import * as $apiElectron from './api/api-electron'
import $util from './assets/util/util'
import $dialog from './assets/js/dialog'
import Darkmode from 'darkmode-js'

import App from './App'
import SideBar from './components/SideBar'
import ItemSmall from './components/ItemSmall'
import ItemLarge from './components/ItemLarge'
import Comment from './components/Comment'
import LoadingRow from './components/LoadingRow'
import TipRow from './components/TipRow'
import TipRowBtn from './components/TipRowBtn'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(less)
Vue.component('SideBar', SideBar)
Vue.component('ItemSmall', ItemSmall)
Vue.component('ItemLarge', ItemLarge)
Vue.component('Comment', Comment)
Vue.component('LoadingRow', LoadingRow)
Vue.component('TipRow', TipRow)
Vue.component('TipRowBtn', TipRowBtn)
Vue.prototype.$util = $util
Vue.prototype.$dialog = $dialog
Vue.prototype.$darkmode = new Darkmode()
Vue.prototype.$api = process.env.ELECTRON
  ? $apiElectron
  : $api

console.log(process.env.NODE_ENV, process.env.ELECTRON)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
