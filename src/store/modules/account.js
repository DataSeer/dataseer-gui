import accountService from '@/services/account/auth-account';
import router from '@/router';

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
	userId: state => state.user._id,
	userRole: state => state.user.role.key,
	userRoleWeight: state => state.user.role.weight,
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
			
			this._vm.$cookies.set('logged-in','yes', 0)
			commit('loginSuccess')
			commit('AuthenticateUser', result.data.res)
		} catch (e) {
			return e
		}
	},
	async logout({commit}) {
		try {
			await accountService.logout();
			this._vm.$cookies.set('logged-in','no')
			commit('logout');

			setTimeout(() => {
				router.push('/');
			}, 100);
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