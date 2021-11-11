<template>
	<div class="form__controls">
		<date-picker
			input-class="field field--datepicker"
			valueType="timestamp"
			:clearable="false"
			:value="value"
			:placeholder="placeholder"
			:disabled-date="disableFn"
			@input="handleChange"
		>
			<template v-slot:icon-calendar>
				<Icon name="calendar" color="currentColor" />
			</template>
		</date-picker>
	</div>
	<!-- /.form__controls -->
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
		DatePicker,
	},

	props: {
		error: {
			type: Boolean,
			default: false,
		},
		value: {
			type: Number,
			default: null,
		},
		placeholder: {
			type: String,
			default: '',
		},
		tabindex: {
			type: Number,
			default: 0,
		},
		disableFn: {
			type: Function,
		},
	},

	data: function() {
		return {
			isOpened: false,
		};
	},

	methods: {
		handleChange(val) {
			this.$emit('input', val);
		},
	},
};
</script>
