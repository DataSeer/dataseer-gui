<template>
	<li>
		<div class="checkbox" :class="{ [className]: className, 'has-error': error, 'checkbox--select': isDropdown, 'checkbox--toggle': isToggle }">
			<input
				tabindex="0"
				type="checkbox"
				ref="checkbox"
				class="sr-only"
				:name="name"
				:id="toKebabCase(name)"
				:checked="value"
				:value="value"
				@change="handleChange"
			/>

			<label v-if="!isDropdown" :for="toKebabCase(name)">
				<slot />
			</label>

			<p v-if="isDropdown">
				<slot />
			</p>

			<div class="field" v-if="isDropdown">
				<vSelect
					placeholder="Select"
					:id="toKebabCase(name)"
					:clearable="false"
					:searchable="false"
					:options="selectOptions"
					label="label"
					:value="value"
					:reduce="option => option.value"
					@input="setSelected"
				>
					<template #option="{ label }">
						<span :data-title="label">
							{{ label }}
						</span>
					</template>

					<template #selected-option="{ label }">
						<span :data-title="label">
							{{ label }}
						</span>
					</template>
				</vSelect>
			</div>
			<!-- /.field -->
		</div>
		<!-- /.checkbox -->
	</li>
</template>

<script>
/**
 * External Dependencies
 */
import vSelect from 'vue-select';

/**
 * Internal Dependencies
 */
import toKebabCase from '@/utils/str-to-kebab-case';

export default {
	name: 'FieldCheckbox',

	components: {
		vSelect
	},

	props: {
		value: Boolean || null,
		name: String,
		className: String,
		error: {
			type: Boolean,
			default: false
		},
		isDropdown: {
			type: Boolean,
			default: false
		},
		isToggle: {
			type: Boolean,
			default: false
		}
	},

	data: function() {
		return {
			selectOptions: [
				{
					label: 'Select',
					value: null
				},
				{
					label: 'Yes',
					value: true
				},
				{
					label: 'No',
					value: false
				}
			]
		};
	},

	methods: {
		handleChange(event) {
			this.$emit('onChange', event);
			this.$emit('input', event.target.checked);
		},
		setSelected(value) {
			console.log(value);
			this.$emit('input', value);
		},
		toKebabCase
	},
};
</script>
