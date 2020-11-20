import Vue from 'vue'
import Vuex from './h-vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1
  },
  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  },
  mutations: {
    UPDATE_COUNT (state, data) {
      state.count++
    }
  },
  actions: {
    add ({ state, commit }) {
      setTimeout(() => {
        commit('UPDATE_COUNT')
      }, 2000)
    }
  },
  modules: {
  }
})
