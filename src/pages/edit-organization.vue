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
					<strong>12</strong>

					Associated Accounts
				</h6>

				<Button to="/accounts" className="secondary">
					<Icon name="user" color="currentColor" />

					View Accounts
				</Button>
			</div> <!-- /.widget-associations -->
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
		Subheader,
		SubheaderEdit,
		Main,
		Icon,
		Button,
		FormEditOrganization
	}
};
</script>
