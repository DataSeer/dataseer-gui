<template>
	<Main hasSubheader>
		<Subheader>
			<SubheaderEdit title="Edit Role" icon="key">
				<Button to="/curator-roles" className="tertiary">Exit Role</Button>
			</SubheaderEdit>
		</Subheader>
				
		<FormEditRole />

		<template #right>
			<div class="widget-associations">
				<h6>
					<strong>{{associatedAccountsCount}}</strong>

					Associated {{pluralizeAccount}}
				</h6>

				<Button
					v-if="associatedAccountsCount > 0"
					:to="`/accounts?role=${roleID}`"
					className="secondary"
				>
					<Icon name="user" color="currentColor" />

					View {{pluralizeAccount}}
				</Button>
			</div><!-- /.widget-associations -->
		</template>
	</Main>
</template>

<script>

/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Main from '@/components/main/main';
import Button from '@/components/button/button';
import Subheader from '@/components/subheader/subheader';
import FormEditRole from '@/blocks/form-edit-role/form-edit-role';
import AccountsService from '@/services/account/accounts';
import SubheaderEdit from '@/components/subheader/subheader-edit';

export default {
	/**
	 * Name
	 */
	name: 'EditRole',

	/**
	 * Components
	 */
	components: {
		Subheader,
		SubheaderEdit,
		Main,
		Icon,
		Button,
		FormEditRole
	},

	/**
	 * Data
	 */
	data() {
		return {
			roleID: this.$route.params.id,
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
				roles: [this.roleID]
			}
			
			const AssociatedAccounts = await AccountsService.getAccounts(params)

			this.associatedAccountsCount = AssociatedAccounts.length;
		}
	},

	/**
	 * Created
	 */
	created () {
		this.getAssociatedAccountsCount();
	},
};
</script>
