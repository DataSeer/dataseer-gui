<template>
	<div class="form__head" :class="{ 'form__head--centered': centered }" tabindex="0">
		<div class="form__head-inner">
			<slot />
		</div><!-- /.form__head-inner -->
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
