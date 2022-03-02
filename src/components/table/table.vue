<template>
	<div
		class="table"
		tabindex="0"
		:class="{
			[`table--${modifier}`]: modifier,
		}"
		:aria-label="modifier"
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

