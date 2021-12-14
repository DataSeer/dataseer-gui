<template>
	<div v-show="isActive" class="tab" :class="{ 'is-completed': completed }">
		<slot />
	</div>
</template>

<script>
export default {
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

		tooltip: {
			type: String,
			default: ''
		},
		index: {
			type: Number
		}
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			isActive: false
		};
	},

	/**
	 * Computed
	 */
	computed: {
		hasHeading() {
			return this.title || this.subtitle;
		}
	}
};
</script>
