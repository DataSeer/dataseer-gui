<template>
	<div
		class="checkboxes"
		:class="{
			'checkboxes--vertical': vertical,
		}"
	>
		<ul>
			<slot />
		</ul>
	</div>
</template>

<script>
export default {
	/**
	 * Name
	 */
	name: 'Checkboxes',
	
	/**
	 * Props
	 */
	props: {
		vertical: {
			type: Boolean,
			default: false
		},
	},
};
</script>
