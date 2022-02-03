<template>
	<div
		class="table"
		tabindex="0"
		:class="{
			[`btn--${modifier}`]: modifier,
		}"
		:aria-label="organizations"
	>
		<div class="table__inner">
			<slot />
		</div><!-- /.table__inner -->
	</div>
</template>

<script>
	export default {
		/**
		 * Name
		 */
		name: 'Table',
		
		/**
		 * Props
		 */
		props: {
			modifier: {
				type: String,
				default: ''
			},
		},
	}
</script>

