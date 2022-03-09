<template>
	<div class="form__divider">
		<span>{{title}}</span>
	</div><!-- /.form__divider -->
</template>

<script>
	export default {
		/**
		 * Name
		 */
		name: 'FormDivider',

		/**
		 * Props
		 */
		props: {
			title: {	
				type: String,
				default: ''
			},
		},
	}
</script>
