/**
 * External Dependencies
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

/**
 * Internal Dependencies
 */
import accountService from '@/services/account/auth-account';
import Home from '@/pages/home';
import SignUp from '@/pages/sign-up';
import SignIn from '@/pages/sign-in';
import ForgotPassword from '@/pages/forgot-password';
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
import AddRole from '@/pages/add-role';
import EditAccount from '@/pages/edit-account';
import AddAccount from '@/pages/add-account';
import AddOrganization from '@/pages/add-organization';
import ManageDocument from '@/pages/manage-document';

Vue.use(VueRouter);

const routes = [
	{
		name: 'Home',
		path: '/',
		component: Home,
		meta: {
			requiresAuth: false,
			requiredWeight: 0
		}
	},
	{
		name: 'Profile',
		path: '/profile',
		component: Profile,
		meta: {
			requiresAuth: true,
			requiredWeight: 0
		}
	},
	{
		name: 'NewDocument',
		path: '/new-document',
		component: NewDocument,
		meta: {
			requiresAuth: true,
			requiredWeight: 0
		}
	},
	{
		name: 'Datasets',
		path: '/datasets',
		component: Datasets,
		meta: {
			requiresAuth: true,
			requiredWeight: 0
		}
	},
	{
		name: 'DatasetsCode',
		path: '/datasets-code',
		component: DatasetsCode,
		meta: {
			requiresAuth: true,
			requiredWeight: 0
		}
	},
	{
		name: 'DatasetsMaterials',
		path: '/datasets-materials',
		component: DatasetsMaterials,
		meta: {
			requiresAuth: true,
			requiredWeight: 0
		}
	},
	{
		name: 'DatasetsProtocols',
		path: '/datasets-protocols',
		component: DatasetsProtocols,
		meta: {
			requiresAuth: true,
			requiredWeight: 0
		}
	},
	{
		name: 'Documents',
		path: '/documents',
		component: Documents,
		meta: {
			requiresAuth: true,
			requiredWeight: 0
		}
	},
	{
		name: 'Organizations',
		path: '/organizations',
		component: Organizations,
		meta: {
			requiresAuth: true,
			requiredWeight: 0
		}
	},
	{
		name: 'Accounts',
		path: '/accounts',
		component: Accounts,
		meta: {
			requiresAuth: true,
			requiredWeight: 0
		}
	},
	{
		name: 'Curator Roles',
		path: '/curator-roles',
		component: CuratorRoles,
		meta: {
			requiresAuth: true,
			requiredWeight: 0
		}
	},
	{
		name: 'SignUp',
		path: '/sign-up',
		component: SignUp,
	},
	{
		name: 'SignIn',
		path: '/sign-in',
		component: SignIn,
	},
	{
		name: 'Forgot Password',
		path: '/forgot-password',
		component: ForgotPassword,
		meta: {
			requiresAuth: true,
			requiredWeight: 0
		}
	},
	{
		name: 'Report',
		path: '/report',
		component: Report,
		meta: {
			requiresAuth: true,
			requiredWeight: 0
		}
	},
	{
		name: 'Edit Organization',
		path: '/edit-organization/:id',
		component: EditOrganization,
		meta: {
			requiresAuth: true,
			requiredWeight: 0
		}
	},
	{
		name: 'Add Organization',
		path: '/add-organization',
		component: AddOrganization,
		meta: {
			requiresAuth: true,
			requiredWeight: 1000
		}
	},
	{
		name: 'Edit Role',
		path: '/edit-role/:id',
		component: EditRole,
		meta: {
			requiresAuth: true,
			requiredWeight: 0
		}
	},
	{
		name: 'Add Role',
		path: '/add-role',
		component: AddRole,
		meta: {
			requiresAuth: true,
			requiredWeight: 1000
		}
	},
	{
		name: 'Edit Account',
		path: '/edit-account/:id',
		component: EditAccount,
		meta: {
			requiresAuth: true,
			requiredWeight: 0
		}
	},
	{
		name: 'Add Account',
		path: '/add-account',
		component: AddAccount,
		meta: {
			requiresAuth: true,
			requiredWeight: 1000
		}
	},
	{
		name: 'Manage Document',
		path: '/manage-document',
		component: ManageDocument,
		meta: {
			requiresAuth: true,
			requiredWeight: 0
		}
	},

	// Otherwise redirect to home
	{ path: '*', redirect: '/' }
];

const router = new VueRouter({
	routes
});

router.beforeEach((to, from, next) => {
	const requiresAuth = to.meta.requiresAuth;
	const requiredWeight = to.meta.requiredWeight;
	
	accountService.getUserData().then(res => {
		if (res.status === 200 ) {
			const userRoleWeight = res.data.res.role.weight;
			if (userRoleWeight >= requiredWeight ) {
				next();
			} else {
				next('/');
			}
		} else {
			throw new Error('Failed to authenticate user...')
		}
	}).catch((e) => {
		console.log(e.message);
		
		if (requiresAuth) {
			next('/sign-in');
		} else {
			next()
		}
	})
});

export default router;
