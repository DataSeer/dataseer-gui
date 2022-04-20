<template>
	<div
		ref="tabs"
		class="tabs"
		:class="{
			'are-expanded': leftSideMargin >= 222,
			'are-collapsed': leftSideMargin < 222,
		}"
		:style="{
			marginLeft: `${leftSideMargin}px`
		}"
	>
		<div class="tabs__links">
			<ul>
				<li
					v-for="dataset in filteredDatasets"
					:key="dataset.id"
					class="tabs__link"
					:class="{
						'is-active': dataset.id === activeDatasetId,
						'is-completed': dataset.status === 'saved'
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
						<Dot v-if="dataset.issue === 'true'" class="dot" />

						<span>
							<Icon v-if="dataset.status === 'saved'" name="check" color="currentColor" />
						</span>
						
						<p class="overflow-truncate">{{dataset.name ? dataset.name : dataset.id }}</p>
					</button>
				</li>
			</ul>
		</div> <!-- /.tabs__links -->

		<div  class="tabs__contents">
			<div ref="contentHandle" class="tabs__content-bar" />
			
			<slot />
		</div> <!-- /.tabs__content -->
	</div> <!-- /.tabs -->
</template>

<script>
/* eslint-disable */
/**
 * External Dependencies
 */
import { mapGetters, mapActions } from 'vuex';

/**
 * Internal Dependencies
 */
import Dot from '@/components/dot/dot';
import Icon from '@/components/icon/icon';

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
			currTabWidth: 0,
			currTabMargin: 100,
			minMargin: 100,
			maxMargin: 300,
			minTabWith: 400
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
		leftSideMargin(){
			if (this.currTabMargin > this.maxMargin) {
				return this.maxMargin;
			} else if (this.currTabMargin <= this.minMargin) {
				return this.minMargin;
			}
			
			return this.currTabMargin;
		}
	},
	
	/**
	 * Methods
	 */
	methods: {
		...mapActions('pdfViewer', ['addDatasetForMerge', 'removeDatasetForMerge', 'setActiveDataset']),
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
			const content = this.$refs.tabs;
			const contentHandle = this.$refs.contentHandle;
			
			let x = 0;
			let margin = this.currTabMargin;

			const mouseDownHandler = (e) => {
				// Get the current mouse position
				x = e.clientX;
				margin = getComputedStyle(content).marginLeft;


				// Attach the listeners to `document`
				document.addEventListener('mousemove', mouseMoveHandler);
				document.addEventListener('mouseup', mouseUpHandler);
			};
			
			contentHandle.addEventListener('mousedown', mouseDownHandler);
			
			const mouseMoveHandler = (e) => {
				// How far the mouse has been moved
				document.body.style.cursor = 'col-resize';
				const dx = e.clientX - x;
				const newContentMargin = parseInt(margin) + dx;
				
				this.currTabMargin = newContentMargin;
			};

			const mouseUpHandler = () => {
				contentHandle.style.removeProperty('cursor');
				document.body.style.removeProperty('cursor');

				content.style.removeProperty('user-select');
				content.style.removeProperty('pointer-events');

				// Remove the handlers of `mousemove` and `mouseup`
				document.removeEventListener('mousemove', mouseMoveHandler);
				document.removeEventListener('mouseup', mouseUpHandler);
			};
		}
	},
	
	/**
	 * Mounted
	 */
	mounted () {
		this.currTabWidth = this.$refs.tabs.getBoundingClientRect().width;
		this.initializeDrawer();
	},
};
</script>
