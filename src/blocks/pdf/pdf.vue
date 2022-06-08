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

		<div class="pdf-holder__buttons">
			<button
				type="button"
				v-tooltip.top="tooltips.pdf"
				@click.prevent="() => setPdfView(true)"
			>
				<Icon
					v-tooltip.top="tooltips.pdf"
					name="document"
					:color="isPdfVisible ? 'currentColor' : '#9D9D9D'"
				/>
			</button>

			<button
				type="button"
				v-tooltip.top="tooltips.text"
				@click.prevent="() => setPdfView(false)"
			>
				<Icon
					name="letter"
					:color="isPdfVisible ? '#9D9D9D' : 'currentColor'"
				/>
			</button>
		</div><!-- /.pdf-holder__buttons -->
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
		},

		/**
		 * Data
		 */
		data() {
			return {
				isPdfVisible: true,
				tooltips: {
					pdf: 'View Document as PDF',
					text: 'View Document as Text'
				}
			}
		},

		/**
		 * Computed
		 */
		computed: {
			...mapGetters('pdfViewer', ['documentHandler']),
		},

		/**
		 * Methods
		 */
		methods: {
			setPdfView(val) {
				if (this.isPdfVisible === val) return
				
				this.isPdfVisible = val;
				this.documentHandler.documentView.toggleDocumentView(this.isPdfVisible)
			}
		},
	};
</script>
