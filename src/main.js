import Vue from 'vue';
import Vuelidate from 'vuelidate';
import vSelect from 'vue-select'
import VTooltip from 'v-tooltip';
import router from './router.js'
import App from './App.vue';
import store from './store'

import "@/assets/scss/style.scss";
import 'vue-select/dist/vue-select.css';

Vue.use(Vuelidate);
Vue.use(vSelect);
Vue.use(VTooltip);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
