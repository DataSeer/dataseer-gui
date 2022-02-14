<template>
	<span
		class="spinner"
		:class="{
			[`spinner--${size}`]: size,
		}"
	/>
</template>

<script>
	export default {
		/**
		 * Name
		 */
		name: 'Spinner',

		/**
		 * Props
		 */

		props: {
			size: {
				type: String,
				default: '',
				validator: function(value) {
					// The value must match one of these strings
					return ['', 'large'].indexOf(value) !== -1;
				}
			},
		},
	}
</script>
