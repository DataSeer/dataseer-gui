<template>
	<div
		v-show="isActive"
		class="tab"
		:class="{
			'is-completed': completed,
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
		completed: {
			type: Boolean,
			default: false
		},
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
