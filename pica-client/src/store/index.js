import Vue from 'vue'
import Vuex from 'vuex'
import individual from './modules/individual'
import global from './modules/global'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    individual,
    global
  }
})
