import accountService from '@/services/account/auth-account';
import router from '@/router';

// State
const state = {
	status: {},
	user: null
}

// Getters
const getters = {}

// Actions
const actions = {
	async login({ commit }, { username, password }) {
		commit('loginRequest', { username });		

		await accountService.login(username, password)
            .then(
                user => {
                    return commit('loginSuccess', user);
                },
                error => {
                    return commit('loginFailure', error);
                }
            );
	},
	logout({ commit }) {
		accountService.logout().then(() => commit('logout'))

		router.push('/sign-in')
	},
	getCurrentUser({ commit }) {
		accountService.getCurrentUser().then(
			res => {
				if (!res.data.err && res.status) {
					commit('loginSuccess', res.data.res);
				}
			},
			error => {
				commit('loginFailure', error);
			}
		);
	}
}

// Mutations
const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = { 
			loggedIn: false,
			failedLogin: true,
		};
        state.user = null;
    },
	logout(state) {
        state.status = {};
        state.user = null;
    },
};

export default {
    namespaced: true,
    state,
	getters,
    actions,
    mutations,
};