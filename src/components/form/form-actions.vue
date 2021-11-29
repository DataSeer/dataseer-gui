<template>
	<div class="form__actions" :class="{ 'form__actions--centered': centered }">
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
	name: 'FormActions',

	/**
	 * Props
	 */
	props: {
		centered: {
			type: Boolean,
			default: false
		}
	}
};
</script>
