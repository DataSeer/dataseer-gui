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
					<strong>5</strong>

					Associated Accounts
				</h6>

				<Button to="/accounts" className="secondary">
					<Icon name="user" color="currentColor" />

					View Accounts
				</Button>
			</div><!-- /.widget-associations -->
		</template>
	</Main>
</template>

<script>
/**
 * Internal Dependencies
 */
import Subheader from '@/components/subheader/subheader';
import SubheaderEdit from '@/components/subheader/subheader-edit';
import Main from '@/components/main/main';
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import FormEditRole from '@/blocks/form-edit-role/form-edit-role';

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
	}
};
</script>
