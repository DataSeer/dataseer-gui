<template>
	<div class="content-toggle" ref="content">
		<div tabindex="0" class="content__header" @click="handleClick">
			<button class="content__btn btn btn--tertiary">{{label}}</button>
		</div><!-- /.content__header -->

		<div class="content__body">
			<slot />
		</div><!-- /.content__body -->
	</div><!-- /.content-toggle -->
</template>

<script>
export default {
	name: 'ContentToggle',

	props: {
		label: {
			type: String,
			default: ''
		},
	},

	methods: {
		handleClick() {
			this.$refs.content.classList.toggle('is-active')
		}
	}
}
</script>
