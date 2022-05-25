<template>
	<div class="accordion">
		<slot />
	</div><!-- /.accordion -->
</template>

<script>
/**
 * Internal Dependencies
 */
import AccordionItem from "@/components/accordion/accordion-item";

export {
	AccordionItem
}

export default {
	/**
	 * Name
	 */
	name: "Accordion",
	
	/**
	 * Data
	 */
	data() {
		return {
			activeItemIndex: 0,
			items: []
		}
	},

	/**
	 * Methods
	 */
	methods: {
		selectTab() {
			
		}
	},
	
	/**
	 * Created
	 */
	created () {
		this.tabs = this.$children
	},
}
</script>
