<template>
	<div class="form__group">
		<h4 v-if="title">{{title}}</h4>

		<slot />
	</div><!-- /.form__group -->
</template>

<script>
export default {
	/**
	 * Name
	 */
	name: 'FormGroup',

	/**
	 * Props
	 */
	props: {
		title: {
			type: String,
			default: ''
		}
	}
};
</script>
