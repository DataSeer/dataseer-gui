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
		type="button"
		class="btn"
		:class="{[`btn--${className}`]: className, 'is-disabled': disabled}"
		@click="handleClick"
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
	},

	methods: {
		handleClick(event){
			this.$emit('onClick', event);
		}
	}
}
</script>
