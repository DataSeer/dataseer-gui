import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    documentView: 'list',
    isloggedIn: false
  },

  mutations: {
    CHANGE_VIEW: (state, payload) => {
      state.documentView = payload;
    },
    CHANGE_LOGIN: (state, payload) => {
      state.isloggedIn = payload;
    }
  },

  actions: {
    changeView({ commit }, value) {
      commit('CHANGE_VIEW', value);
    },
    login({ commit }, value) {
      commit('CHANGE_LOGIN', value);
    }
  },

  getters: {
    getDocumentView: state => state.documentView,
    getLogin: state => state.isloggedIn
  }
})
