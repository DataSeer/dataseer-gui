import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VTooltip from 'v-tooltip';

Vue.use(VTooltip);

import router from './router.js'
import App from './App.vue';
import "@/assets/scss/style.scss";
import store from './store'

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
