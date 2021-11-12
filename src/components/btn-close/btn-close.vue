<template>
	<button class="btn-close" :class="{ 'btn-close--alt': alt }" @click="$emit('onClick')" :aria-label="label" />
</template>

<script>
export default {
	/**
	 * Name
	 */
	name: 'BtnClose',

	/**
	 * Props
	 */
	props: {
		label: String,
		alt: Boolean,
	},
};
</script>
