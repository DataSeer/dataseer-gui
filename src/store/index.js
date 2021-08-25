import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    documentView: 'list'
  },

  mutations: {
    CHANGE_VIEW: (state, payload) => {
      state.documentView = payload;
    }
  },

  actions: {
    changeView({ commit }, value) {
      commit('CHANGE_VIEW', value);
    }
  },

  getters: {
    getDocumentView: state => state.documentView
  }
})
