/**
 * External Dependencies
 */
import Vue from 'vue';
import VueGoodTablePlugin from 'vue-good-table';
import Vuelidate from 'vuelidate';
import vSelect from 'vue-select';
import VTooltip from 'v-tooltip';
import vModal from 'vue-js-modal';

import VueCookies from 'vue-cookies';
import PortalVue from 'portal-vue';
import VueClipboard from 'vue-clipboard2';

/**
 * Internal Dependencies
 */
import router from './router.js';
import App from './App.vue';
import store from './store';

/**
 * Styles
 */
import 'vue-select/dist/vue-select.css';
import 'vue2-datepicker/index.css';
import 'vue-good-table/dist/vue-good-table.css';
import 'vue-popperjs/dist/vue-popper.css';
import '@/assets/scss/style.scss';

import PopupConfirm from '@/components/popup/popup-confirm';

Vue.use(Vuelidate);
Vue.use(vSelect);
Vue.use(VTooltip, {
	defaultHtml: false
});
Vue.use(vModal, {
	dynamicDefaults: {
		height: 'auto'
	}
});
Vue.use(VueGoodTablePlugin);
Vue.use(VueCookies);
Vue.use(PortalVue);
Vue.use(VueClipboard);

Vue.config.productionTip = false;

Vue.mixin({
	methods: {
		openConfirmModal: function({ message, confirm, cancel, onConfirm, onCancel }) {
			this.$modal.show(
				PopupConfirm,
				{
					message: message,
					confirm: confirm,
					cancel: cancel,
					confirmFn: () => {
						if (typeof onConfirm === 'function') onConfirm();

						this.$modal.hide('popupConfirm');
					},
					cancelFn: () => {
						if (typeof onCancel === 'function') onCancel();
						this.$modal.hide('popupConfirm');
					}
				},
				{
					name: 'popupConfirm',
					width: 500
				}
			);
		}
	}
});

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
