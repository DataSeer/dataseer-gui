import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '@/pages/home';
import SignUp from '@/pages/sign-up';
import SignIn from '@/pages/sign-in';
import Datasets from '@/pages/datasets';
import Documents from '@/pages/documents';
import Profile from '@/pages/profile';

const routes = [
	{
		name: "Home",
		path: '/',
		component: Home
	},
	{
		name: "Profile",
		path: '/profile',
		component: Profile
	},
	{
		name: "Datasets",
		path: '/datasets',
		component: Datasets
	},
	{
		name: "Documents",
		path: '/documents',
		component: Documents
	},
	{
		name: "SignUp",
		path: '/sign-up',
		component: SignUp
	},
	{
		name: "SignIn",
		path: '/sign-in',
		component: SignIn,
		props: { success: false }
	}
]

const router = new VueRouter({
	routes
});

export default router;
