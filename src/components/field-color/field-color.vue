<template>
	<div
		class="field field--color"
		:class="{
			'has-error': error,
		}"
	>
		<label v-if="this.$slots.default" :for="name" class="field__label">
			<slot />
		</label>

		<div class="field__controls">
			<input :value="value" type="text" class="field__input" :placeholder="placeholder" :readonly="readonly">
			
			<input
				type="color"
				:id="toKebabCase(name)"
				:name="name"
				:tabindex="tabindex"
				:readonly="readonly"
				:value="value"
				@input="handleChange"
			/>

			<span v-if="value" :style="{'background-color': value}" />
		</div> <!-- /.field__controls -->
	</div> <!-- /.field -->
</template>

<script>
/**
 * Internal Dependencies
 */
import toKebabCase from '@/utils/str-to-kebab-case';

export default {
	/**
	 * Name
	 */
	name: 'FieldColor',

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
		readonly: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		},
	},

	/**
	 * Methods
	 */
	methods: {
		handleChange(e) {
			this.$emit('input', e.target.value);
		},
		toKebabCase
	}
}
</script>

