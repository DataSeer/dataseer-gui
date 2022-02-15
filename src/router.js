/**
 * External Dependencies
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

/**
 * Internal Dependencies
 */
import accountService from '@/services/account/auth-account';
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
import NotFound from '@/pages/404';

Vue.use(VueRouter);

const routes = [
	{
		name: 'Home',
		path: '/',
		redirect: '/sign-in',
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
		name: 'Documents',
		path: '/documents',
		component: Documents,
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
		path: '/documents/:id/datasets',
		component: Datasets,
		meta: {
			requiresAuth: true,
			requiredWeight: 0
		}
	},
	{
		name: 'Report',
		path: '/documents/:id/report',
		component: Report,
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
			requiredWeight: 1000
		}
	},
	{
		name: 'SignUp',
		path: '/sign-up',
		component: SignUp,
		meta: {
			requiresAuth: false,
			requiredWeight: 0
		}
	},
	{
		name: 'SignIn',
		path: '/sign-in',
		component: SignIn,
		meta: {
			requiresAuth: false,
			requiredWeight: 0
		}
	},
	{
		name: 'Forgot Password',
		path: '/forgot-password',
		component: ForgotPassword,
		meta: {
			requiresAuth: false,
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
	
	{
		name: 'Not Found',
		path: '/404',
		component: NotFound,
	},
	
	// Otherwise redirect to 404
	{
		path: '*',
		redirect: '404',
	}
];

const router = new VueRouter({
	routes
});

router.beforeEach((to, from, next) => {
	const requiresAuth = to.meta.requiresAuth;
	const requiredWeight = to.meta.requiredWeight || 0;
	let userRoleWeight = 0
	
	accountService.getUserData().then(res => {
		if (res.status === 200 ) {
			userRoleWeight = res.data.res.role.weight;
			
			if (requiresAuth === false) {
				return next('/profile');
			}
			
			if (userRoleWeight < requiredWeight) {
				return next('/404');
			}

			return next();
		} else {
			throw new Error('Failed to authenticate user...')
		}
	}).catch(() => {
		if (requiresAuth) return next('/sign-in');
		
		next()
	})
});

export default router;
