import Vue from 'vue';
import Vuelidate from 'vuelidate';

import router from './router.js'
import App from './App.vue';
import "@/assets/scss/style.scss";

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
