import accountService from '@/services/account/auth-account';
import router from '@/router';

// State
const state = {
	status: {
		loggedIn: false
	},
	user: null
}

// Getters
const getters = {}

// Actions
const actions = {
	async login({ commit }, { username, password }) {
		await accountService.login(username, password)
            .then(
                () => {
					
					commit('loginSuccess')
				},
                error => {
					commit('loginFailure', error)
				}
            );
	},
	async logout({ commit }) {
		await accountService.logout().then(() => commit('logout'))

		router.push('/sign-in')
	},
	async getCurrentUser({ commit }) {
		await accountService.getCurrentUser().then(
			res => {
				commit('loginSuccess', res.data.res);
			},
			() => {
				commit('userSuccess', null);
			}
		);
	},
	authenticateUser({ commit }) {
		accountService.getCurrentUser().then(
			res => {
				commit('loginSuccess', res.data.res);
			},
			error => {
				commit('loginFailure', error);
			}
		);
	}
}

// Mutations
const mutations = {
    loginSuccess(state, user) {
        state.status = {
			loggedIn: true
		};
		state.user = user
    },
    loginFailure(state, error) {
        state.status = { 
			loggedIn: false,
			failedLogin: true,
			message: error.message,
		};
        state.user = null;
    },
	logout(state) {
        state.status = {
			loggedIn: false
		};
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