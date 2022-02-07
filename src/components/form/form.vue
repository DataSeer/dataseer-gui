<template>
	<div
		class="form"
		:class="{
			[className]: className,
			'is-loading': loading
		}"
	>
		<Spinner />
		
		<form action="?" method="post" @submit="$emit('submit', $event)">
			<slot />
		</form>
	</div>
	<!-- /.form -->
</template>

<script>
/**
 * Internal Dependencies
 */
import FormGroup from './form-group.vue';
import FormStatus from './form-status.vue';
import FormActions from './form-actions.vue';
import FormMessage from './form-message.vue';
import FormHead from './form-head.vue';
import FormBody from './form-body.vue';
import Spinner from '@/components/spinner/spinner';

export default {
	/**
	 * Form
	 */
	name: 'Form',

	/**
	 * Components
	 */
	components: {
		Spinner,
	},

	/**
	 * Props
	 */
	props: {
		className: {
			type: String,
			default: ''
		},
		loading: {
			type: Boolean,
			default: false
		}
	}
};

export { FormActions, FormMessage, FormHead, FormBody, FormStatus, FormGroup };
</script>
