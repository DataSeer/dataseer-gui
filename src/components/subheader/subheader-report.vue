<template>
	<div class="subheader__inner" tabindex="0" aria-labelledby="subheader-title">
		<div class="subheader__left">
			<h3 id="subheader-title">
				<Icon name="lock" />

				Open Science Report

				<Button
					v-if="userRoleWeight >= 1000"
					tabindex="0"
					to="/datasets"
					className="tertiary"
				>
					export curator report
				</Button>
			</h3>
		</div>
		<!-- /.subheader__left -->

		<div class="subheader__right">
			<Button tabindex="0" to="/documents" className="tertiary">
				<Icon name="back" color="currentColor"></Icon>

				Back to Document
			</Button>
		</div> <!-- /.subheader__right -->
	</div> <!-- /.subheader__inner -->
</template>

<script>
/**
 * External Dependencies
 */
import { mapGetters } from 'vuex';

/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';

export default {
	/**
	 * Name
	 */
	name: 'SubheaderReport',

	/**
	 * Components
	 */
	components: {
		Icon,
		Button
	},

	/**
	 * Computed
	 */
	computed: {
		...mapGetters('account', ['userRoleWeight']),
	}
};
</script>
