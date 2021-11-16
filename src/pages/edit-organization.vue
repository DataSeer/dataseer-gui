<template>
	<div class="main main--edit">
		<div class="shell">
			<div class="main__inner">
				<div class="main__left">
					<FormEditOrganization />
				</div>

				<!-- /.main__left -->
				<div class="main__right">
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
import FormEditOrganization from '@/blocks/form-edit-organization/form-edit-organization';
import Button from '@/components/button/button';
import Icon from '@/components/icon/icon';

export default {
	/**
	 * Name
	 */
	name: 'EditOrganization',

	/**
	 * Components
	 */
	components: {
		Icon,
		Button,
		FormEditOrganization
	}
};
</script>
