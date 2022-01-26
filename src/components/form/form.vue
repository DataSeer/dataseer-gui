<template>
	<div
		class="form"
		:class="{
			[className]: className,
			'is-loading': loading
		}"
	>
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
import FormActions from './form-actions.vue';
import FormMessage from './form-message.vue';
import FormHead from './form-head.vue';
import FormBody from './form-body.vue';

export default {
	/**
	 * Form
	 */
	name: 'Form',

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

export { FormActions, FormMessage, FormHead, FormBody };
</script>
