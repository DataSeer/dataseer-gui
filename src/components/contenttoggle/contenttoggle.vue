<template>
	<div class="content-toggle" :class="{'is-active': isOpened}" ref="content">
		<Button
			class="content__btn"
			className="tertiary"
			@onClick="handleClick"
		>
			{{getActiveLabel}}
		</Button>

		<div class="content__body">
			<slot />
		</div><!-- /.content__body -->
	</div><!-- /.content-toggle -->
</template>

<script>
import Button from '@/components/button/button'

export default {
	/**
	 * Name
	 */
	name: 'ContentToggle',

	/**
	 * Components
	 */
	components: {
		Button
	},

	/**
	 * Props
	 */
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

	/**
	 * Data
	 */
	data: function(){
		return {
			isOpened: false
		}
	},

	/**
	 * Computed
	 */
	computed: {
		getActiveLabel() {
			return this.isOpened ? this.labelOpened : this.labelClosed;
		}
	},

	/**
	 * Methods
	 */
	methods: {
		handleClick() {
			this.isOpened = !this.isOpened
		}
	}
}
</script>
