<template>
	<component
		:is="type"
		:to="to"
		:href="href"
		class="btn-link"
		:class="{
			[`btn-link--${className}`]: className,
			'is-disabled': disabled
		}"
		@click="$emit('onClick', $event)"
	>
		<slot />
	</component>
</template>

<script>
export default {
	/**
	 * Name
	 */
	name: 'ButtonLink',

	/**
	 * Props
	 */
	props: {
		to: {
			type: String,
			default: null
		},
		href: {
			type: String,
			default: null
		},
		className: {
			type: String,
			default: '',
			validator: function(value) {
				// Value must match one of these strings
				return ['', 'secondary', 'tertiary'].indexOf(value) !== -1;
			}
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},

	/**
	 * Computed
	 */
	computed: {
		type() {
			if (this.to) {
				return 'router-link';
			} else if (this.href) {
				return 'a';
			} else {
				return 'button';
			}
		}
	}
};
</script>
