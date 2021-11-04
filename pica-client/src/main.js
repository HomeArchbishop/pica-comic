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

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(less)
Vue.component('SideBar', SideBar)
Vue.component('ItemSmall', ItemSmall)
Vue.component('ItemLarge', ItemLarge)
Vue.component('Comment', Comment)
Vue.prototype.$api = $api
Vue.prototype.$util = $util
Vue.prototype.$dialog = $dialog
Vue.prototype.$darkmode = new Darkmode()

// $darkmode.showWidget()

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
