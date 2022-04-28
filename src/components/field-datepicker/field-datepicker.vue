<template>
	<div
		class="field field--datepicker"
		:class="{
			'is-readonly': readonly
		}"
	>
		<label v-if="this.$slots.default" :for="name" class="field__label">
			<slot />
		</label>

		<div class="field__controls">
			<date-picker
				input-class="field__input"
				valueType="format"
				:clearable="false"
				:value="value"
				:placeholder="placeholder"
				:disabled-date="disableFn"
				:disabled="readonly"
				@input="handleChange"
			>
				<template v-slot:icon-calendar>
					<Icon name="calendar" color="currentColor" />
				</template>
			</date-picker>
		</div> <!-- /.field__controls -->
	</div> <!-- /.field -->
</template>

<script>
/**
 * External Dependencies
 */
import DatePicker from 'vue2-datepicker';

/**
 * Internal Dependencies
 */

import Icon from '@/components/icon/icon';

export default {
	name: 'FormDatepicker',

	components: {
		Icon,
		DatePicker
	},

	props: {
		readonly: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		},
		value: {
			type: String,
			default: ''
		},
		name: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		tabindex: {
			type: Number,
			default: 0
		},
		disableFn: {
			type: Function
		}
	},

	data: function() {
		return {
			isOpened: false,
		};
	},

	methods: {
		handleChange(val) {
			this.$emit('input', val);
		}
	}
};
</script>
