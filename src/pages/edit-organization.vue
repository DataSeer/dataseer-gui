<template>
	<Main hasSubheader>
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
			</div>
			<!-- /.widget-associations -->
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
		FormEditOrganization
	}
};
</script>
