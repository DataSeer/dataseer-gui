<template>
	<Main hasSubheader>
		<Subheader>
			<SubheaderEdit title="Edit Organization" icon="organization">
				<Button to="/organizations" className="tertiary">Exit Organization</Button>
			</SubheaderEdit>
		</Subheader>
		
		<FormEditOrganization />

		<template #right>
			<div class="widget-associations">
				<h6>
					<strong>{{associatedAccountsCount}}</strong>

					Associated {{pluralizeAccount}}
				</h6>

				<Button
					v-if="associatedAccountsCount > 0"
					@onClick="handleViewButtonClick" className="secondary"
				>
					<Icon name="user" color="currentColor" />

					View {{pluralizeAccount}}
				</Button>
			</div> <!-- /.widget-associations -->
		</template>
	</Main>
</template>

<script>
/**
 * Internal Dependencies
 */
import Main from '@/components/main/main';
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import Subheader from '@/components/subheader/subheader';
import SubheaderEdit from '@/components/subheader/subheader-edit';
import AccountsService from '@/services/account/accounts';
import FormEditOrganization from '@/blocks/form-edit-organization/form-edit-organization';

export default {
	/**
	 * Name
	 */
	name: 'EditOrganization',

	/**
	 * Components
	 */
	components: {
		Main,
		Icon,
		Button,
		Subheader,
		SubheaderEdit,
		FormEditOrganization
	},

	/**
	 * Data
	 */
	data() {
		return {
			organizationID: this.$route.params.id,
			associatedAccountsCount: null,
		}
	},
	
	/**
	 * Computed
	 */
	computed: {
		pluralizeAccount() {
			return (this.associatedAccountsCount === 1) ? "Account" : "Accounts"
		}
	},
	
	/**
	 * Methods
	 */
	methods: {
		async getAssociatedAccountsCount() {
			const params = {
				organizations: [this.organizationID]
			}
			
			const AssociatedAccounts = await AccountsService.getAccounts(params)

			this.associatedAccountsCount = AssociatedAccounts.length;
		},
		handleViewButtonClick(e) {
			e.preventDefault();
			this.$router.push({
				path: '/accounts',
			});
		}
	},

	/**
	 * Created
	 */
	created () {
		this.getAssociatedAccountsCount();
	}
};
</script>
