<template>
	<a
		v-if="href" 
		class="btn"
		:href="href" 
		:class="{[`btn--${className}`]: className}"
		@click="$emit('onClick')"
	>
		<slot />
	</a>
	
	<button 
		v-else
		type="button"
		class="btn"
		:class="{[`btn--${className}`]: className, 'is-disabled': disabled}"
		@click="$emit('onClick')"
	>
		<slot />
	</button>
</template>

<script>
export default {
	name: 'Button',

	props: {
		href: {
			type: String,
			default: ''
		},
		className: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		},
	}
}
</script>
