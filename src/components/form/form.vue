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
import FormGroup from './form-group';
import FormStatus from './form-status';
import FormActions from './form-actions';
import FormMessage from './form-message';
import FormHead from './form-head';
import FormBody from './form-body';
import FormDivider from './form-divider';
import FormEntry from './form-entry';
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

export {
	FormActions,
	FormMessage,
	FormHead,
	FormBody,
	FormStatus,
	FormGroup,
	FormDivider,
	FormEntry
};
</script>
