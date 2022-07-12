<template>
	<div class="field field--select" :class="{ 'has-error': error }">
		<label v-if="this.$slots.default" :for="name" class="field__label">
			<slot />
		</label>
		
		<div class="field__controls">
			<div class="select" :class="{ 'is-opened': isOpened }">
				<vSelect
					:clearable="false"
					:searchable="false"
					:placeholder="placeholder"
					:options="options"
					:multiple="multiple"
					:value="value"
					label="label"
					:reduce="option => option.value"
					append-to-body
					:calculate-position="withPopper"
					@input="handleChange"
				>
					<template #option="{ label, helptext }">
						{{ label }} <i v-if="helptext">{{ helptext }}</i>
					</template>

					<template #selected-option="{ label, helptext }">						
						{{ label }} <i v-if="helptext">{{ helptext }}</i>
					</template>
				</vSelect>
			</div>
		</div> <!-- /.field__controls -->
	</div> <!-- /.field -->
</template>

<script>
/**
 * Internal Dependencies
 */
import { createPopper } from '@popperjs/core'

/**
 * External Dependencies
 */
import vSelect from 'vue-select';

export default {
	/**
	 * Name
	 */
	name: 'FieldSelect',

	/**
	 * Components
	 */
	components: {
		vSelect
	},

	/**
	 * Props
	 */
	props: {
		name: {
			type: String,
			default: ''
		},
		value: {
			type: [String, Array, Object]
		},
		placeholder: {
			type: String,
			default: ''
		},
		tabindex: {
			type: Number,
			default: 0
		},
		options: {
			type: Array,
			default: () => []
		},
		error: {
			type: Boolean,
			default: false
		},
		multiple: {
			type: Boolean,
			default: false
		}
	},

	data: function() {
		return {
			isOpened: false,
			placement: 'bottom'
		};
	},
	
	methods: {
		handleChange(selection) {
			this.$emit('input', selection);
		},
		withPopper(dropdownList, component, { width }) {
			/**
			 * We need to explicitly define the dropdown width since
			 * it is usually inherited from the parent with CSS.
			 */
			dropdownList.style.width = width;

			/**
			 * Here we position the dropdownList relative to the $refs.toggle Element.
			 *
			 * The 'offset' modifier aligns the dropdown so that the $refs.toggle and
			 * the dropdownList overlap by 1 pixel.
			 *
			 * The 'toggleClass' modifier adds a 'drop-up' class to the Vue Select
			 * wrapper so that we can set some styles for when the dropdown is placed
			 * above.
			 */
			const popper = createPopper(component.$refs.toggle, dropdownList, {
				placement: this.placement,
				modifiers: [
					{
						name: 'offset',
						options: {
							offset: [0, -1]
						}
					},
					{
						name: 'toggleClass',
						enabled: true,
						phase: 'write',
						fn({ state }) {
							component.$el.classList.toggle('drop-up', state.placement === 'top');
						}
					}
				]
			});

			/**
			 * To prevent memory leaks Popper needs to be destroyed.
			 * If you return function, it will be called just before dropdown is removed from DOM.
			 */
			return () => popper.destroy();
		}
	}
};
</script>
