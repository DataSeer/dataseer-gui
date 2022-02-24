<template>
	<div
		class="tab"
		:class="{
			'is-active': isActive,
		}"
	>
		<slot />
	</div>
</template>

<script>
export default {
	/**
	 * Name
	 */
	name: 'Tab',

	/**
	 * Props
	 */
	props: {
		flagged: {
			type: Boolean,
			default: false
		},
		isActive: {
			type: Boolean,
			default: false
		},
		tooltip: {
			type: String,
			default: ''
		},
	},
};
</script>
