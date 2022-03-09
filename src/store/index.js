import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    setUser(state,user) {
      state.user = user
    }
  },
  actions: {

  },
  getters: {

  },
  modules: {

  }
})

export default store
