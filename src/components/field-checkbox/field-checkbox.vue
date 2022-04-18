<template>
	<li>
		<div
			class="checkbox"
			:class="{
				[className]: className,
				'has-error': error,
				'checkbox--select': isDropdown,
				'checkbox--toggle': isToggle,
				'checkbox--default': !isToggle && !isDropdown
			}"
		>
			<input
				tabindex="0"
				type="checkbox"
				ref="checkbox"
				class="sr-only"
				:name="name"
				:id="toKebabCase(name)"
				:checked="sanitizedValue"
				:value="sanitizedValue"
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
					:value="sanitizedValue"
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
	/**
	 * Name
	 */
	name: 'FieldCheckbox',

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
		value: {
			default: undefined,
		},
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
		},
		trueLabel: {
			type: String,
			default: 'Yes'
		},
		falseLabel: {
			type: String,
			default: 'No'
		}
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			selectOptions: [
				{
					label: 'Select',
					value: ""
				},
				{
					label: this.trueLabel,
					value: true
				},
				{
					label: this.falseLabel,
					value: false
				}
			]
		};
	},

	computed: {
		sanitizedValue() {
			// In some cases the API return the value as string
			if(typeof this.value === 'boolean' || this.value === undefined ) return this.value
			
			switch(this.value.toLowerCase().trim()){
				case 'true':
					return true;
				case '':
				case 'false':
					return false;
				default: return this.value;
			}
		}
	},

	/**
	 * Methods
	 */
	methods: {
		handleChange(event) {
			this.$emit('onChange', event);
			this.$emit('input', event.target.checked);
		},
		setSelected(value) {
			this.$emit('input', value);
		},
		toKebabCase
	},
};
</script>
