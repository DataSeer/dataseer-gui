<template>
	<div
		ref="tabs"
		class="tabs"
		:class="[[areTabsExpanded ? 'are-expanded' : 'are-collapsed']]"
		:style="{
			width: `${tabWidth}px`
		}"
	>
		<div class="tabs__contents">
			<div ref="contentHandle" class="tabs__content-bar" />
			<slot />
		</div> <!-- /.tabs__content -->
		
		<div class="tabs__links">
			<ul>
				<li
					v-for="dataset in filteredDatasets"
					:key="dataset.id"
					class="tabs__link"
					:class="{
						'is-active': dataset.id === activeDatasetId,
						'is-completed': dataset.status === 'saved',
						'has-issue': ( dataset.flagged === true || dataset.flagged === 'true')
					}"
				>
					<div v-if="mergeState" class="checkbox checkbox--default">
						<input
							tabindex="0"
							type="checkbox"
							ref="checkbox"
							class="sr-only"
							:name="`merge-${dataset.id}`"
							:id="`merge-${dataset.id}`"
							:checked="datasetsForMerge.some((entry) => entry === dataset.id)"
							@change="(e) => handleCheckboxChange(e, dataset.id)"
						/>

						<label :for="`merge-${dataset.id}`" />
					</div><!-- /.checkbox -->

					<button
						type="button"
						v-tooltip.right="dataset.description"
						@click.prevent="handleLinkButtonClick(dataset)"
					>
						<Dot v-if="( dataset.flagged === true || dataset.flagged === 'true')" />

						<span>
							<Icon v-if="dataset.status === 'saved'" name="check" color="currentColor" />
						</span>
						
						<p class="overflow-truncate">{{dataset.name ? dataset.name : dataset.id }}</p>
					</button>
				</li>
			</ul>
		</div> <!-- /.tabs__links -->
	</div> <!-- /.tabs -->
</template>

<script>
/**
 * External Dependencies
 */
import { mapGetters, mapActions } from 'vuex';

/**
 * Internal Dependencies
 */
import Dot from '@/components/dot/dot';
import Icon from '@/components/icon/icon';
import { clearDropdowns } from '@/utils/use-dropdowns';

export default {
	/**
	 * Name
	 */
	name: 'Tabs',

	/**
	 * Components
	 */
	components: {
		Dot,
		Icon
	},

	/**
	 * Data
	 */
	data() {
		return {
			initialTabMargin: 72,
			minMargin: 72,
			maxMargin: 300,
			minTabWith: 400,
			expandedTriggerPoint: 222,
			// Parent Data
			parentWidth: 0,
			parentObserver: null
		}
	},

	/**
	 * Computed
	 */
	computed: {
		...mapGetters('pdfViewer', [
			'datasets',
			'activeDataset',
			'activeDatasetType',
			'mergeState',
			'datasets',
			'datasetsForMerge',
			'filteredDatasets',
			'activeDatasetId'
		]),
		calculatedWidth(){
			if (this.initialTabMargin > this.maxMargin) {
				return this.maxMargin;
			} else if (this.initialTabMargin <= this.minMargin) {
				return this.minMargin;
			}

			return this.initialTabMargin;
		},
		areTabsExpanded() {
			return this.parentWidth >= this.tabWidth + this.expandedTriggerPoint
		},
		tabWidth() {
			return this.parentWidth - this.calculatedWidth <= this.minTabWith ? this.minTabWith : this.parentWidth - this.calculatedWidth
		}
	},
	
	/**
	 * Methods
	 */
	methods: {
		...mapActions('pdfViewer', [
			'addDatasetForMerge',
			'removeDatasetForMerge',
			'setActiveDataset'
		]),
		handleCheckboxChange(e, datasetId) {
			if (e.target.checked) {
				this.addDatasetForMerge(datasetId);
			} else {
				this.removeDatasetForMerge(datasetId);
			}
		},
		handleLinkButtonClick(dataset) {
			if (this.activeDataset && this.activeDataset.id === dataset.id) return
			
			this.setActiveDataset({
				dataset: dataset,
				scrollToSentence: true
			});
		},
		initializeDrawer() {
			const tabs = this.$refs.tabs;
			const contentHandle = this.$refs.contentHandle;
			
			let x = 0;
			let margin = 0;

			const mouseDownHandler = (e) => {
				// Get the current mouse position
				x = e.clientX;
				margin = this.parentWidth - tabs.getBoundingClientRect().width;

				// Attach the listeners to `document`
				document.addEventListener('mousemove', mouseMoveHandler);
				document.addEventListener('mouseup', mouseUpHandler);

				// Clear any dropdowns that might be open
				clearDropdowns();
			};
			
			contentHandle.addEventListener('mousedown', mouseDownHandler);
			
			const mouseMoveHandler = (e) => {
				// How far the mouse has been moved
				document.body.style.cursor = 'col-resize';
				const dx = e.clientX - x;
				const newContentMargin = parseInt(margin) + dx;
				
				this.initialTabMargin = newContentMargin;
			};

			const mouseUpHandler = () => {
				contentHandle.style.removeProperty('cursor');
				document.body.style.removeProperty('cursor');

				tabs.style.removeProperty('user-select');
				tabs.style.removeProperty('pointer-events');

				// Remove the handlers of `mousemove` and `mouseup`
				document.removeEventListener('mousemove', mouseMoveHandler);
				document.removeEventListener('mouseup', mouseUpHandler);
			};
		},
		initParentObserver() {
			const vm = this;
			const parent = this.$refs.tabs.parentNode;

			vm.parentObserver = new ResizeObserver(() => {
				vm.parentWidth = parent.getBoundingClientRect().width
			}).observe(parent);
		}
	},
	
	/**
	 * Mounted
	 */
	mounted () {
		this.initializeDrawer();
		this.initParentObserver();
	},

	/**
	 * Before Destroy
	 */
	beforeDestroy () {
		if (this.parentObserver) this.parentObserver.disconnect();
	},
};
</script>
