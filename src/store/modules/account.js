import accountService from '@/services/account/auth-account';

// State
const state = {
	status: {
		loading: true,
		error: false,
		failedLogin: false,
		loggedIn: false
	},
	user: null
}

// Getters
const getters = {
	loggedIn: state => state.status.loggedIn,
	userRole: state => state.user.role.key,
	username: state => state.user.fullname.split('@')[0],
}

// Actions
const actions = {
	async signin({ dispatch }, { username, password }) {		
		const res = await accountService.signin(username, password)
		
		if (res.status !== 200)  {
			throw new Error(res.statusText)
		}
		
		if (res.data.err) {
			throw new Error(res.data.res)
		}
					
		await dispatch('getUserData')
	},
	async getUserData({commit}) {
		try {
			const result = await accountService.getUserData()
			if (result.err) throw new Error(result.ree)
			
			commit('loginSuccess')
			commit('AuthenticateUser', result.data.res)
		} catch (e) {
			return e
		}
	},
	async logout({commit}) {
		try {
			await accountService.logout();
			commit('logout');
		} catch (e) {
			console.log(e);
		}
	}
}

// Mutations
const mutations = {
    loginSuccess(state) {
        state.status = {
			loggedIn: true
		};
    },
    loginFailure(state, message) {
        state.status = { 
			loggedIn: false,
			failedLogin: true,
			message: message,
		};
        state.user = null;
    },
	AuthenticateUser(state, user) {
        state.user = user;
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