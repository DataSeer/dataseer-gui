import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VTooltip from 'v-tooltip';
import VueSimpleMarkdown from 'vue-simple-markdown'

Vue.use(VTooltip);
Vue.use(VueSimpleMarkdown)
Vue.use(Vuelidate);

import router from './router.js'
import App from './App.vue';
import "@/assets/scss/style.scss";
import 'vue-simple-markdown/dist/vue-simple-markdown.css'
import store from './store'


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
