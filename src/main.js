import Vue from 'vue';
import VueGoodTablePlugin from 'vue-good-table';
import Vuelidate from 'vuelidate';
import vSelect from 'vue-select';
import VTooltip from 'v-tooltip';
import VModal from 'vue-js-modal';
import router from './router.js';
import App from './App.vue';
import store from './store';
import VueCookies from 'vue-cookies';
import PortalVue from 'portal-vue';
import VueClipboard from 'vue-clipboard2'

import 'vue-select/dist/vue-select.css';
import 'vue2-datepicker/index.css';
import 'vue-good-table/dist/vue-good-table.css';
import '@/assets/scss/style.scss';

Vue.use(Vuelidate);
Vue.use(vSelect);
Vue.use(VTooltip, {
	defaultHtml: false,
});
Vue.use(VModal);
Vue.use(VueGoodTablePlugin);
Vue.use(VueCookies);
Vue.use(PortalVue);
Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
