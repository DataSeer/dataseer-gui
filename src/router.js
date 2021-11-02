import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '@/pages/home';
import SignUp from '@/pages/sign-up';
import SignIn from '@/pages/sign-in';
import Datasets from '@/pages/datasets';
import DatasetsCode from '@/pages/datasets-code';
import DatasetsMaterials from '@/pages/datasets-materials';
import DatasetsProtocols from '@/pages/datasets-protocols';
import Documents from '@/pages/documents';
import Profile from '@/pages/profile';
import NewDocument from '@/pages/new-document';
import Report from '@/pages/report';

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
		name: "NewDocument",
		path: '/new-document',
		component: NewDocument
	},
	{
		name: "Datasets",
		path: '/datasets',
		component: Datasets
	},
	{
		name: "DatasetsCode",
		path: '/datasets-code',
		component: DatasetsCode
	},
	{
		name: "DatasetsMaterials",
		path: '/datasets-materials',
		component: DatasetsMaterials
	},
	{
		name: "DatasetsProtocols",
		path: '/datasets-protocols',
		component: DatasetsProtocols
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
	},
	{
		name: "Report",
		path: '/report',
		component: Report
	}
]

const router = new VueRouter({
	routes
});

export default router;
