/**
 * External Dependencies
 */
import Vue from 'vue'
import Vuex from 'vuex'

/**
 * Internal Dependencies
 */
import account from '@/store/modules/account';
import pdfViewer from '@/store/modules/pdfViewer';

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		account,
		pdfViewer
	}
});
