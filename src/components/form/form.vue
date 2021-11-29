<template>
	<div class="form" :class="className">
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
		}
	}
};

export { FormActions, FormMessage, FormHead, FormBody };
</script>
