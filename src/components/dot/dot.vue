<template>
	<i class="dot" :style="{ width: `${size}px`, height: `${size}px` }" />
</template>

<script>
export default {
	/**
	 * Name
	 */
	name: 'Dot',

	/**
	 * Props
	 */
	props: {
		size: {
			type: Number,
			default: 12
		}
	}
};
</script>
