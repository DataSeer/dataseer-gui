<template>
	<div class="form form--filters">
		<form action="?" method="post"></form>
	</div>
	<!-- /.form -->
</template>

<script>
import { required } from 'vuelidate/lib/validators';

import FormRow from '@/components/form-row/form-row.vue';
import Icon from '@/components/icon/icon.vue';
import Button from '@/components/button/button.vue';
import FormCheckbox from '@/components/form-checkbox/form-checkbox.vue';
import HiddenText from '@/components/hidden-text/hidden-text.vue';

export default {
	/**
	 * Name
	 */
	name: 'formDocumentFilters',

	/**
	 * Components
	 */
	components: {
		FormRow,
		Icon,
		Button,
		FormCheckbox,
		HiddenText,
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			reuse: null,
			publicly: null,
			practices: null,
			repo: null,
			practices_text: false,
			repo_text: false,
			permalink: '',
			instructions: '',
			tooltips: {
				connectText: 'Select additional sentences from the document to connect to this dataset',
				deleteText: 'Delete this Dataset',
			},
		};
	},

	/**
	 * Validations
	 */
	validations: {
		type: {
			required,
		},
		subtype: {
			required,
		},
		permalink: {
			required,
		},
	},

	/**
	 * Methods
	 */
	methods: {},
};
</script>
