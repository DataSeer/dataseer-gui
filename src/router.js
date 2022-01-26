/**
 * External Dependencies
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

/**
 * Internal Dependencies
 */
import Home from '@/pages/home';
import SignUp from '@/pages/sign-up';
import SignIn from '@/pages/sign-in';
import Datasets from '@/pages/datasets';
import DatasetsCode from '@/pages/datasets-code';
import DatasetsMaterials from '@/pages/datasets-materials';
import DatasetsProtocols from '@/pages/datasets-protocols';
import Organizations from '@/pages/organizations';
import Documents from '@/pages/documents';
import Accounts from '@/pages/accounts';
import CuratorRoles from '@/pages/curator-roles';
import Profile from '@/pages/profile';
import NewDocument from '@/pages/new-document';
import Report from '@/pages/report';
import EditOrganization from '@/pages/edit-organization';
import EditRole from '@/pages/edit-role';
import EditAccount from '@/pages/edit-account';
import ManageDocument from '@/pages/manage-document';

import accountService from '@/services/account/auth-account';

const routes = [
	{
		name: 'Home',
		path: '/',
		component: Home
	},
	{
		name: 'Profile',
		path: '/profile',
		component: Profile
	},
	{
		name: 'NewDocument',
		path: '/new-document',
		component: NewDocument
	},
	{
		name: 'Datasets',
		path: '/datasets',
		component: Datasets
	},
	{
		name: 'DatasetsCode',
		path: '/datasets-code',
		component: DatasetsCode
	},
	{
		name: 'DatasetsMaterials',
		path: '/datasets-materials',
		component: DatasetsMaterials
	},
	{
		name: 'DatasetsProtocols',
		path: '/datasets-protocols',
		component: DatasetsProtocols
	},
	{
		name: 'Documents',
		path: '/documents',
		component: Documents
	},
	{
		name: 'Organizations',
		path: '/organizations',
		component: Organizations
	},
	{
		name: 'Accounts',
		path: '/accounts',
		component: Accounts
	},
	{
		name: 'Curator Roles',
		path: '/curator-roles',
		component: CuratorRoles
	},
	{
		name: 'SignUp',
		path: '/sign-up',
		component: SignUp
	},
	{
		name: 'SignIn',
		path: '/sign-in',
		component: SignIn
	},
	{
		name: 'Report',
		path: '/report',
		component: Report
	},
	{
		name: 'Edit Organization',
		path: '/edit-organization',
		component: EditOrganization
	},
	{
		name: 'Edit Role',
		path: '/edit-role',
		component: EditRole
	},
	{
		name: 'Edit Account',
		path: '/edit-account',
		component: EditAccount
	},
	{
		name: 'Manage Document',
		path: '/manage-document',
		component: ManageDocument
	},

	// otherwise redirect to home
	{ path: '*', redirect: '/' }
];

const router = new VueRouter({
	routes
});

router.beforeEach((to, from, next) => {
	// redirect to login page if not logged in and trying to access a restricted page
	const path = to.path;
	const publicPages = ['/sign-in', '/sign-up'];
	const authRequired = !publicPages.includes(path);

	accountService.getCurrentUser().then(data => {
		const isLoggedIn = data.status === 200 && !data.data.err;
		
		if (path !== '/sign-in') {
			if (authRequired && !isLoggedIn) {
				next('/sign-in');
			} else {
				next();
			}
		} else {
			next();
		}
	}).catch(err => {
		console.log(err);
		if (path !== '/sign-in' && authRequired) {
			next('/sign-in');
		} else {
			next();
		}
	})
});

export default router;
