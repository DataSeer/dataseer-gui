<template>
	<div class="form__head" :class="{ 'form__head--centered': centered }" tabindex="0">
		<slot />
	</div>
</template>

<script>
export default {
	/**
	 * Name
	 */
	name: 'FormHead',

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
