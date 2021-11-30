import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		documentView: 'list',
		isloggedIn: false,
		isCurator: false,
		filtersVisibility: false
	},

	mutations: {
		CHANGE_VIEW: (state, payload) => {
			state.documentView = payload;
		},
		CHANGE_LOGIN: (state, payload) => {
			state.isloggedIn = payload;
		},
		CHANGE_CURATOR: (state, payload) => {
			state.isCurator = payload;
		},
		CHANGE_FILTERS: (state, payload) => {
			state.filtersVisibility = payload;
		}
	},

	actions: {
		changeView({ commit }, value) {
			commit('CHANGE_VIEW', value);
		},
		setLogin({ commit }, value) {
			commit('CHANGE_LOGIN', value);
		},
		setCurator({ commit }, value) {
			commit('CHANGE_CURATOR', value);
		},
		changeFiltersVisibility({ commit }, value) {
			commit('CHANGE_FILTERS', value);
		}
	},

	getters: {
		getDocumentView: (state) => state.documentView,
		getLogin: (state) => state.isloggedIn,
		getCurator: (state) => state.isCurator,
		getFiltersVisibility: (state) => state.filtersVisibility
	}
});
