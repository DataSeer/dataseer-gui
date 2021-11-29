<template>
	<Main hasSubheader>
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
		Main,
		Icon,
		Button,
		FormEditRole
	}
};
</script>
