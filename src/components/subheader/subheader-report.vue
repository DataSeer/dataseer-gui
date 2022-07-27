<template>
	<div class="subheader__inner" tabindex="0" aria-labelledby="subheader-title">
		<div class="subheader__left">
			<h3 id="subheader-title">
				<Icon name="lock" />

				Open Science Report

			</h3>
		</div>
		<!-- /.subheader__left -->

		<div class="subheader__right">
			<Button tabindex="0" :to="documentPageURl" className="tertiary">
				<Icon name="back" color="currentColor"></Icon>

				Back to Document
			</Button>
		</div> <!-- /.subheader__right -->
	</div> <!-- /.subheader__inner -->
</template>

<script>

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
	 * Props
	*/
	props: ['documentID'],

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
		documentPageURl() {
			return this.documentID ? `/documents/${this.documentID}/datasets` : `/documents`;
		}
	}
};
</script>
