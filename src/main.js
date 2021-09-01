import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VTooltip from 'v-tooltip';
import router from './router.js'
import App from './App.vue';
import store from './store'

import "@/assets/scss/style.scss";

Vue.use(VTooltip);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
