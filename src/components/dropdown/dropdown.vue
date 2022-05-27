<template>
	<div
		ref="dropdownHolder"
		class="dropdown-holder js-dropdown-holder"
	>
		<button
			ref="trigger"
			tabindex="0"
			class="dropdown__header"
			@click="handleClick"
			aria-label="dropdown"
		>
			<slot name="header" />
		</button>

		<div ref="tooltip" class="dropdown__body">
			<slot />
		</div>
	</div>
</template>

<script>
import { createPopper } from '@popperjs/core';
import DropdownNavDatasets from './dropdown-nav-datasets';

export default {
	/**
	 * Name
	 */
	name: 'Dropdown',

	/**
	 * Props
	 */
	props: {
		placement: {
			default: 'bottom-start',
			type: String,
			// Value must match one of these strings
			validator: function(value) {
				return ['bottom-start', 'bottom-end'].indexOf(value) !== -1;
			}
		}
	},

	data() {
		return {
			popperInstance: undefined
		};
	},

	computed: {
		popperOptions() {
			return {
				placement: this.placement,
				modifiers: [
					{
						name: 'flip',
						options: {
							enabled: false,
						}
					},
					{
						name: 'offset',
						options: {
							offset: [0, 8]
						}
					}
				]
			}
		}
	},

	/**
	 * Methods
	 */
	methods: {
		handleClick(e) {
			const self = this;
			e.preventDefault();

			this.popperInstance.update().then(() => {
				self.$refs.dropdownHolder.classList.toggle('is-active');
			});
		}
	},

	watch: {
		placement(newValue, oldValue) {
			console.log('placement changed', newValue, oldValue);
		}
	},

	/**
	 * Mounted
	 */
	mounted() {
		const self = this;
		const trigger = self.$refs.trigger;
		const tooltip = self.$refs.tooltip;

		this.popperInstance = createPopper(trigger, tooltip, self.popperOptions);
	},
	
	/**
	 * Before destroy
	 */
	beforeDestroy() {
		if (this.popperInstance) this.popperInstance.destroy();
	}
};

export { DropdownNavDatasets };
</script>
