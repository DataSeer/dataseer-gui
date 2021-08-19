<template>
	<a
		v-if="href" 
		:href="href" 
		class="btn"
		:class="{'btn--tertiary': alt}"
	>
		<slot />
	</a>
	<button 
		v-else
		:type="type"
		class="btn"
		:class="{'btn--tertiary': alt}"
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
		alt: {
			type: Boolean,
			default: false
		}
	}
}
</script>

