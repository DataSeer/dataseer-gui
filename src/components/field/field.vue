<template>
	<div class="field" :class="{ 'has-error': error }">
		<label v-if="this.$slots.default" :for="toKebabCase(name)" class="field__label" :class="{ 'sr-only': hideLabel }">
			<slot />
		</label>

		<div class="field__controls">
			<component
				:is="fieldType"
				:type="type"
				:id="toKebabCase(name)"
				:name="name"
				:tabindex="tabindex"
				:readonly="readonly"
				:placeholder="placeholder"
				class="field__input"
				:class="{ 'field--textarea': this.type === 'textarea' }"
				:value="value"
				@input="handleChange"
			/>
		</div>
		<!-- /.field__controls -->
	</div>
	<!-- /.field -->
</template>

<script>
import toKebabCase from '@/utils/str-to-kebab-case';

export default {
	name: 'Field',

	props: {
		type: {
			type: String,
			default: 'text'
		},
		readonly: {
			type: Boolean,
			default: false
		},
		hideLabel: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		},
		name: {
			type: String,
			default: ''
		},
		value: {
			type: [String],
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		tabindex: {
			type: Number,
			default: 0
		}
	},

	/**
	 * Computed
	 */
	computed: {
		fieldType() {
			if (this.type === 'textarea') {
				return 'textarea';
			} else {
				return 'input';
			}
		}
	},

	/**
	 * Methods
	 */
	methods: {
		handleChange(event) {
			this.$emit('input', event.target.value);
		},
		toKebabCase
	}
};
</script>
