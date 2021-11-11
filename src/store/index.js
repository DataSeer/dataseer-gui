import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		documentView: 'list',
		isloggedIn: false,
		filtersVisibility: false,
	},

	mutations: {
		CHANGE_VIEW: (state, payload) => {
			state.documentView = payload;
		},
		CHANGE_LOGIN: (state, payload) => {
			state.isloggedIn = payload;
		},
		CHANGE_FILTERS: (state, payload) => {
			state.filtersVisibility = payload;
		},
	},

	actions: {
		changeView({ commit }, value) {
			commit('CHANGE_VIEW', value);
		},
		login({ commit }, value) {
			commit('CHANGE_LOGIN', value);
		},
		changeFiltersVisibility({ commit }, value) {
			commit('CHANGE_FILTERS', value);
		},
	},

	getters: {
		getDocumentView: (state) => state.documentView,
		getLogin: (state) => state.isloggedIn,
		getFiltersVisibility: (state) => state.filtersVisibility,
	},
});
