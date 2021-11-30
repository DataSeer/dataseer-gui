<template>
	<div v-show="isActive" class="tab" :class="{ 'is-completed': completed }">
		<div v-if="hasHeading" class="tab__heading">
			<h5 v-if="title">{{ title }}</h5>

			<p v-if="subtitle">{{ subtitle }}</p>
		</div>

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
		title: {
			type: String,
			default: ''
		},
		subtitle: {
			type: String,
			default: ''
		},
		completed: {
			type: Boolean,
			default: false
		},
		flagged: {
			type: Boolean,
			default: false
		},
		selected: {
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
	},

	/**
	 * Mounted
	 */
	mounted() {
		this.isActive = this.selected;
	}
};
</script>
