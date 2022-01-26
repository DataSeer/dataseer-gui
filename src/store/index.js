/**
 * External Dependencies
 */
import Vue from 'vue'
import Vuex from 'vuex'

/**
 * Internal Dependencies
 */
import account from '@/store/modules/account';

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		account
	}
});
