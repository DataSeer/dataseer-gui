<template>
	<Main
		:loading="loading"
		:error="error"
		:errorMessage="errorMessage"
	>
		<template #subheader>	
			<Subheader>
				<SubheaderEdit title="Edit Role" icon="key">
					<Button to="/curator-roles" className="tertiary">Exit Role</Button>
				</SubheaderEdit>
			</Subheader>
		</template>
				
		<FormEditRole :formData="role" />

		<template #right>
			<div class="widget-associations">
				<h6>
					<strong>{{associatedAccountsCount}}</strong>

					Associated {{pluralizeAccount}}
				</h6>

				<Button
					v-if="associatedAccountsCount > 0"
					:to="`/accounts?role=${roleId}`"
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
import SubheaderEdit from '@/components/subheader/subheader-edit';

import AccountsService from '@/services/account/accounts';
import RoleService from '@/services/roles/roles';

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
			role: {},
			roleId: this.$route.params.id,
			associatedAccountsCount: null,
			loading: true,
			error: false,
			errorMessage: ''
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
		async getRoleData() {
			try {
				const AssociatedAccounts = await AccountsService.getAccounts({
					roles: this.roleId
				});
				const role = await RoleService.getRole(this.roleId);
				this.role = role;
				this.associatedAccountsCount = AssociatedAccounts.length;
			} catch (error) {
				this.errorMessage = error.message;
				this.error = true;
			}

			this.loading = false;
		}
	},

	/**
	 * Created
	 */
	created () {
		this.getRoleData();
	}
};
</script>
