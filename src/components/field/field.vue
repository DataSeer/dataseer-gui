<template>
	<div
		class="field"
		:class="{
			'has-error': error,
			'has-trailing-icon': trailingIcon,
			'field--textarea': this.type === 'textarea',
			'field--sm': this.size === 'small',
			'field--md': this.size === 'medium',
			'field--lg': this.size === 'large'
		}"
	>
		<label
			v-if="this.$slots.default"
			:for="toKebabCase(name)"
			class="field__label"
			:class="{ 'sr-only': hideLabel }"
		>
			<slot />
		</label>

		<div class="field__controls">
			<textarea
				v-if="this.type === 'textarea'"
				:type="type"
				:id="toKebabCase(name)"
				:name="name"
				:tabindex="tabindex"
				:readonly="readonly"
				:placeholder="placeholder"
				class="field__input"
				:value="value"
				@input="handleChange"
			/>

			<input
				v-else
				:type="type"
				:id="toKebabCase(name)"
				:name="name"
				:tabindex="tabindex"
				:readonly="readonly"
				:placeholder="placeholder"
				class="field__input"
				:value="value"
				@input="handleChange"
			/>

			<div v-if="trailingIcon" class="field__trailing-icon">
				<Icon :name="trailingIcon" />
			</div>
		</div>
		<!-- /.field__controls -->
	</div>
	<!-- /.field -->
</template>

<script>
/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import toKebabCase from '@/utils/str-to-kebab-case';

export default {
	/**
	 * Name
	 */
	name: 'Field',

	/**
	 * Components
	 */
	components: {
		Icon
	},

	/**
	 * Props
	 */
	props: {
		type: {
			type: String,
			default: 'text'
		},
		name: {
			type: String,
			default: ''
		},
		value: {
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		trailingIcon: {
			type: String,
			default: ''
		},
		size: {
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
		hideLabel: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
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
		handleChange(e) {
			this.$emit('input', e.target.value);
		},
		toKebabCase
	}
};
</script>
