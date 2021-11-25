<template>
	<div
		class="grid__col"
		:class="{
			'grid__col--half': size === 'half',
			'grid__col--third': size === 'third',
			'grid__col--quarter': size === 'quarter'
		}"
	>
		<slot />
	</div>
	<!-- /.grid -->
</template>

<script>
export default {
	/**
	 * Name
	 */
	name: 'GridColumn',

	/**
	 * Props
	 */
	props: {
		size: {
			type: String,
			default: 'grid__col--full'
		}
	}
};
</script>
