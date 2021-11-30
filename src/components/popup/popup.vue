<template>
	<div class="popup">
		<modal :name="name" height="auto" :width="width[size]" adaptive scrollable>
			<BtnClose @onClick="hideModal" />

			<slot />
		</modal>
	</div>
	<!-- /.popup -->
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
			default: 'large'
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
