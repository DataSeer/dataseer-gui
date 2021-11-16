<template>
	<div class="main main--edit">
		<div class="shell">
			<div class="main__inner">
				<div class="main__left">
					<FormEditRole />
				</div>

				<!-- /.main__left -->
				<div class="main__right">
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
				</div>
				<!-- /.main__right -->
			</div>
			<!-- /.main__inner -->
		</div>
		<!-- /.shell -->
	</div>
	<!-- /.main -->
</template>

<script>
/**
 * Internal Dependencies
 */
import FormEditRole from '@/blocks/form-edit-role/form-edit-role';
import Button from '@/components/button/button';
import Icon from '@/components/icon/icon';

export default {
	/**
	 * Name
	 */
	name: 'EditRole',

	/**
	 * Components
	 */
	components: {
		Icon,
		Button,
		FormEditRole
	}
};
</script>
