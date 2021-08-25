<template>
	<a
		v-if="href" 
		:href="href" 
		class="btn"
		:class="{[`btn--${className}`]: className}"
		@click="$emit('click')"
	>
		<slot />
	</a>
	<button 
		v-else
		:type="type"
		class="btn"
		:class="{[`btn--${className}`]: className, 'is-disabled': disabled}"
		@click="$emit('click')"
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
		type: {
			type: String,
			default: "button"
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
