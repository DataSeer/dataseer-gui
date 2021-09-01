<template>
	<div class="content-toggle" :class="{'is-active': isOpened}" ref="content">
		<button tabindex="0" class="content__btn btn btn--tertiary" @click="handleClick">{{getActiveLabel}}</button>

		<div class="content__body">
			<slot />
		</div><!-- /.content__body -->
	</div><!-- /.content-toggle -->
</template>

<script>
export default {
	name: 'ContentToggle',

	props: {
		labelOpened: {
			type: String,
			default: 'Hide'
		},
		labelClosed: {
			type: String,
			default: 'Show'
		},
	},

	data: function(){
		return {
			isOpened: false
		}
	},

	computed: {
		getActiveLabel() {
			return this.isOpened ? this.labelOpened : this.labelClosed;
		}
	},

	methods: {
		handleClick() {
			this.isOpened = !this.isOpened
		}
	}
}
</script>
