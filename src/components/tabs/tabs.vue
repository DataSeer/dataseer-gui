<template>
	<div class="tabs">
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
					<div v-if="mergeState" class="checkbox">
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
						@click.prevent="handleLinkButtonClick(dataset)"
					>
						<Dot v-if="dataset.issue === 'true'" class="dot" />
						<span v-tooltip.right="dataset.description" />
					</button>
				</li>
			</ul>
		</div> <!-- /.tabs__links -->

		<div class="tabs__contents">
			<slot />
		</div> <!-- /.tabs__content -->
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
			if (this.activeDataset &&  this.activeDataset.id === dataset.id) return

			this.setActiveDataset({
				dataset: dataset,
				scrollToSentence: true
			});
		}
	}
};
</script>
