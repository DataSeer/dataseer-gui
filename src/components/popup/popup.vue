<template>
	<modal
		:name="name"
		height="auto"
		:width="width[size]"
		scrollable
		reset
	>
		<div class="popup">
			<BtnClose @onClick="hideModal" />

			<slot />
		</div> <!-- /.popup -->
	</modal>
</template>

<script>
/**
 * Internal Dependencies
 */
import BtnClose from '@/components/btn-close/btn-close';

export default {
	/**
	 * Name
	 */
	name: 'Popup',

	/**
	 * Components
	 */
	components: {
		BtnClose
	},

	/**
	 * Props
	 */
	props: {
		name: String,
		size: {
			type: String,
			default: 'large',
			validator: function(value) {
				// The value must match one of these strings
				return ['small', 'large'].indexOf(value) !== -1;
			}
		}
	},

	/**
	 * Data
	 */
	data() {
		return {
			width: {
				large: '1200px',
				small: '650px'
			}
		};
	},

	/**
	 * Methods
	 */
	methods: {
		showModal() {
			this.$modal.show(this.name);
		},
		hideModal() {
			this.$modal.hide(this.name);
		}
	}
};
</script>
