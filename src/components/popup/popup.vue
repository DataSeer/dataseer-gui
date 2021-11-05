<template>
	<div class="popup">
		<slot name="header" :showModal="showModal" />

		<modal 
			:name="name"
			height="auto"
			width="1200px"
			adaptive
			scrollable
		>
			<BtnClose @onClick="hideModal" />
		
			<slot />
    </modal>
	</div><!-- /.popup -->
</template>

<script>
/**
 * Internal Dependencies
 */
import BtnClose from '@/components/btn-close/btn-close'

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
		name: String
	},
	
	/**
	 * Methods
	 */
	methods: {
		showModal () {
				this.$modal.show(this.name);
		},
		hideModal () {
				this.$modal.hide(this.name);
		}
	}
}
</script>