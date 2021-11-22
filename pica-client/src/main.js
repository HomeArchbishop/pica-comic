import Vue from 'vue'
import less from 'less'
import router from './router'
import store from './store'
import * as $api from './api/index'
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
Vue.prototype.$api = $api
Vue.prototype.$util = $util
Vue.prototype.$dialog = $dialog
Vue.prototype.$darkmode = new Darkmode()

// $darkmode.showWidget()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
