<template>
	<div
		class="pdf-holder"
		:class="{
			'is-pdf': isPdfVisible,
			'is-xml': !isPdfVisible
		}"
	>
		<div id="documentView">
			<div id="documentView.screen">
				<div id="documentView.screen.container" class="documentView">
					<div v-show="isPdfVisible" id="pdf" />
					
					<div v-show="!isPdfVisible" id="xml" />
				</div>
			</div> <!-- /#documentView.screen -->
		</div> <!-- /#documentView -->

		<Button
			size="small"
			className="tertiary"
			modifier="pdf-holder__button"
			:active="isPdfVisible"
			v-tooltip.top="tooltipText"
			@onClick.prevent="toggleDocumentView"
		>
			<Icon name="document" :color="isPdfVisible ? 'currentColor' : '#9D9D9D'" />
			
			<Icon name="letter" :color="isPdfVisible ? '#9D9D9D' : 'currentColor'" />
		</Button>
	</div> <!-- /.pdf-holder -->
</template>

<script	>
	/**
	 * External Dependencies
	 */
	import { mapGetters } from 'vuex'
	/**
	 * Internal Dependencies
	 */
	import Icon from '@/components/icon/icon'
	import Button from '@/components/button/button'
	
	export default {
		/**
		 * Name
		 */
		name: 'PDF',

		/**
		 * Components
		 */
		components: {
			Icon,
			Button
		},

		/**
		 * Data
		 */
		data() {
			return {
				isPdfVisible: true
			}
		},

		computed: {
			...mapGetters('pdfViewer', ['documentHandler']) ,
			tooltipText() {
				return this.isPdfVisible ? 'View Document as Text' : 'View Document as PDF'
			}
		},

		/**
		 * Data
		 */
		methods: {
			toggleDocumentView() {
				this.isPdfVisible = !this.isPdfVisible;

				this.documentHandler.documentView.toggleDocumentView(this.isPdfVisible)
			}
		},
	};
</script>
