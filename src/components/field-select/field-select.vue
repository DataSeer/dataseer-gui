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
 * External Dependencies
 */
import vSelect from 'vue-select';

export default {
	name: 'FieldSelect',

	components: {
		vSelect
	},

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
			isOpened: false
		};
	},

	methods: {
		handleChange(selection) {
			this.$emit('input', selection);
		}
	}
};
</script>
