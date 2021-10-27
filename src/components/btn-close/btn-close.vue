<template>
	<button class="btn-close" @click="$emit('onClick')" :aria-label="label"/>
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
		label: String
	}
}
</script>

