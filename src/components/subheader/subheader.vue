<template>
	<div class="subheader" :class="{ [`subheader--${additionalClass}`]: additionalClass }" v-if="isVisible">
		<div class="shell">
			<SubheaderOrganizations v-if="isOrganizationsPage" />
			<SubheaderAccounts v-if="isAccountsPage" />
			<SubheaderDocuments v-if="isDocumentsPage" />
			<SubheaderDatasets v-if="isDatasetsPage" />
			<SubheaderProfile v-if="isUserPage" />
			<SubheaderReport v-if="isReportPage" />
			<SubheaderRoles v-if="isRolesPage" />

			<SubheaderEdit title="Manage Document" icon="organization" v-if="isEditOrganizationsPage">
				<Button to="/documents" className="tertiary">Exit Document</Button>
			</SubheaderEdit>

			<SubheaderEdit title="Edit Role" icon="key" v-if="isEditRolePage">
				<Button to="/curator-roles" className="tertiary">Exit Role</Button>
			</SubheaderEdit>

			<SubheaderEdit title="Edit Account" icon="user" v-if="isEditAccountPage">
				<Button to="/accounts" className="tertiary">Exit Account</Button>
			</SubheaderEdit>
		</div>
		<!-- /.shell -->
	</div>
	<!-- /.subheader -->
</template>

<script>
import SubheaderOrganizations from './subheader-organizations';
import SubheaderDocuments from './subheader-documents';
import SubheaderAccounts from './subheader-accounts';
import SubheaderDatasets from './subheader-datasets';
import SubheaderProfile from './subheader-profile';
import SubheaderReport from './subheader-report';
import SubheaderRoles from './subheader-roles';
import SubheaderEdit from './subheader-edit';
import Button from '@/components/button/button.vue';

export default {
	/**
	 * Name
	 */
	name: 'Subheader',

	/**
	 * components
	 */
	components: {
		SubheaderOrganizations,
		SubheaderDocuments,
		SubheaderAccounts,
		SubheaderDatasets,
		SubheaderProfile,
		SubheaderReport,
		SubheaderRoles,
		SubheaderEdit,
		Button
	},

	/**
	 * computed
	 */
	computed: {
		isEditAccountPage() {
			return this.$route.path === '/edit-account';
		},
		isEditRolePage() {
			return this.$route.path === '/edit-role';
		},
		isEditOrganizationsPage() {
			return this.$route.path === '/edit-organization';
		},
		isOrganizationsPage() {
			return this.$route.path === '/organizations';
		},
		isDocumentsPage() {
			return this.$route.path === '/documents';
		},
		isAccountsPage() {
			return this.$route.path === '/accounts';
		},
		isRolesPage() {
			return this.$route.path === '/curator-roles';
		},
		isDatasetsPage() {
			return (
				this.$route.path === '/datasets' ||
				this.$route.path === '/datasets-code' ||
				this.$route.path === '/datasets-materials' ||
				this.$route.path === '/datasets-protocols'
			);
		},
		isUserPage() {
			return this.$route.path === '/profile';
		},
		isReportPage() {
			return this.$route.path === '/report';
		},
		isVisible() {
			return (
				this.isEditAccountPage ||
				this.isEditRolePage ||
				this.isEditOrganizationsPage ||
				this.isOrganizationsPage ||
				this.isRolesPage ||
				this.isAccountsPage ||
				this.isDocumentsPage ||
				this.isUserPage ||
				this.isDatasetsPage ||
				this.isReportPage
			);
		},
		additionalClass() {
			if (
				this.isEditAccountPage ||
				this.isEditRolePage ||
				this.isEditOrganizationsPage ||
				this.isDocumentsPage ||
				this.isAccountsPage ||
				this.isRolesPage ||
				this.isOrganizationsPage
			) {
				return 'documents';
			} else if (this.isDatasetsPage) {
				return 'datasets';
			} else if (this.isUserPage) {
				return 'profile';
			} else if (this.isReportPage) {
				return 'report';
			} else {
				return '';
			}
		}
	}
};
</script>
