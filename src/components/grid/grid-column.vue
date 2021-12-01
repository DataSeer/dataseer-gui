<template>
	<div class="grid__col" :class="{ fullwidth }">
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
		fullwidth: {
			type: Boolean,
			default: false
		}
	}
};
</script>
