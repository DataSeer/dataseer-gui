<template>
	<div class="subheader" :class="{ [`subheader--${additionalClass}`]: additionalClass }" v-if="isVisible">
		<div class="shell">
			<SubheaderAccounts v-if="isAccountsPage" />
			<SubheaderDocuments v-if="isDocumentsPage" />
			<SubheaderDatasets v-if="isDatasetsPage" />
			<SubheaderProfile v-if="isUserPage" />
			<SubheaderReport v-if="isReportPage" />
		</div>
		<!-- /.shell -->
	</div>
	<!-- /.subheader -->
</template>

<script>
import SubheaderDocuments from './subheader-documents';
import SubheaderAccounts from './subheader-accounts';
import SubheaderDatasets from './subheader-datasets';
import SubheaderProfile from './subheader-profile';
import SubheaderReport from './subheader-report';

export default {
	/**
	 * Name
	 */
	name: 'Subheader',

	/**
	 * components
	 */
	components: {
		SubheaderDocuments,
		SubheaderAccounts,
		SubheaderDatasets,
		SubheaderProfile,
		SubheaderReport
	},

	/**
	 * computed
	 */
	computed: {
		isDocumentsPage() {
			return this.$route.path === '/documents';
		},
		isAccountsPage() {
			return this.$route.path === '/accounts';
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
			return this.isAccountsPage || this.isDocumentsPage || this.isUserPage || this.isDatasetsPage || this.isReportPage;
		},
		additionalClass() {
			if (this.isDocumentsPage || this.isAccountsPage) {
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
