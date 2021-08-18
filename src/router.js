import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import SignUp from '@/pages/sign-up';
import SignIn from '@/pages/sign-in';

const routes = [
	{
		path: '/sign-up',
		component: SignUp
	},
	{
		path: '/sign-in',
		component: SignIn
	}
]

const router = new VueRouter({
	routes
});

export default router;
