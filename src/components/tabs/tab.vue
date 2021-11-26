<template>
	<div v-show="isActive" class="tab" :class="{ 'is-completed': completed }">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'Tab',

	data: function() {
		return {
			isActive: false
		};
	},

	props: {
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
			default: ''
		},
		index: {
			type: Number
		}
	},

	mounted() {
		this.isActive = this.selected;
	}
};
</script>
