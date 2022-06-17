<template>
	<component
		:is="component"
		:to="to"
		:href="href"
		class="btn"
		tabindex="0"
		:class="{
			[`btn--${className}`]: className,
			'btn--small': size === 'small',
			'btn--block': block,
			'btn--square': square,
			'is-disabled': disabled,
			'is-highlighted': highlighted,
			'is-active': active,
			[modifier]: modifier
		}"
		v-bind="$attrs"
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
	name: 'Button',

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
		modifier: {
			type: String,
			default: ''
		},
		className: {
			type: String,
			default: 'primary',
			validator: function(value) {
				// The value must match one of these strings
				return ['primary', 'secondary', 'tertiary'].indexOf(value) !== -1;
			}
		},
		block: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: '',
			validator: function(value) {
				// The value must match one of these strings
				return ['', 'small'].indexOf(value) !== -1;
			}
		},
		disabled: {
			type: Boolean,
			default: false
		},
		highlighted: {
			type: Boolean,
			default: false
		},
		active: {
			type: Boolean,
			default: false
		},
		square: {
			type: Boolean,
			default: false
		}
	},

	/**
	 * Computed
	 */
	computed: {
		component() {
			if (this.to) return 'router-link';
			if (this.href) return 'a';

			return 'button';
		}
	}
};
</script>
