<template>
	<li>
		<div class="checkbox" :class="{ 'has-error': error, 'checkbox--select': isDropdown, 'checkbox--toggle': isToggle }">
			<input
				tabindex="0"
				type="checkbox"
				ref="checkbox"
				class="sr-only"
				:name="name"
				:id="toKebabCase(name)"
				@change="handleChange"
				:value="value"
				:checked="value"
			/>

			<label v-if="!isDropdown" :for="toKebabCase(name)">
				<slot />
			</label>

			<p v-if="isDropdown">
				<slot />
			</p>

			<div class="field" v-if="isDropdown">
				<vSelect
					:id="toKebabCase(name)"
					placeholder="Select"
					:clearable="false"
					:searchable="false"
					:options="selectOptions"
					label="title"
					@input="handleSelectChange"
				>
					<template #option="{ title }">
						<span :data-title="title">
							{{ title }}
						</span>
					</template>

					<template #selected-option="{ title }">
						<span :data-title="title">
							{{ title }}
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
					title: 'Select',
					value: null
				},
				{
					title: 'Yes',
					value: true
				},
				{
					title: 'No',
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

		handleSelectChange(el) {
			this.$emit('input', el.value);
		},
		toKebabCase
	}
};
</script>
