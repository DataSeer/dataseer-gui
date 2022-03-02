<template>
	<div
		class="form__status"
		:class="{
			'form__status--error': isError,
			'form__status--success': !isError
		}"
	>
		<div class="form__status-inner">
			<p>{{ text }}</p>
		</div> <!-- /.form__status__inner -->
	</div> <!-- /.form__status -->
</template>

<script>
export default {
	/**
	 * Name
	 */
	name: 'FormStatus',

	/**
	 * Props
	 */

	props: {
		text: {
			type: String,
			default: ''
		},
		isError: {
			type: Boolean,
			default: false
		}
	}
};
</script>
