<template>
	<ul
		class="datasets-utils"
		:class="{
			'is-merging': mergeState
		}"
	>
		<li>
			<div
				class="datasets__button datasets__button--merge"
				tabindex="0"
			>
				<button
					v-tooltip.right="mergeState ? '' : tooltips.mergeText"
					:aria-label="tooltips.mergeText"
					@click.prevent="() => setMergeState(true)"
				>
					<Icon name="merge" />
				</button>

				<div class="datasets__button-inner">
					<div class="datasets__button-wrapper">
						<p v-if="datasetsLength < 2">Select Items to Merge</p>

						<Button
							v-if="datasetsLength >= 2"
							@onClick="() => mergeDatasets()"
						>
							{{ mergeButtonText }}
						</Button>
						
						<Button
							className="tertiary"
							size="small"
							@onClick="() => setMergeState(false)"
						>
							Cancel
						</Button>
					</div><!-- /.datasets__button-wrapper -->
				</div><!-- /.datasets__button-inner -->

				<p class="datasets__button-extended">Merge</p>
			</div>
		</li>

		<li>
			<div
				class="datasets__button datasets__button--add"
				tabindex="0"
				v-tooltip.right="tooltips.addText"
				:aria-label="tooltips.addText"
				@click.prevent="addSentenceToDataset"
			>
				<button>
					<Icon name="add" />
				</button>

				<p class="datasets__button-extended">Add</p>
			</div>
		</li>
	</ul> <!-- /.datasets-utils -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

/**
 * Internal Dependencies
 */
import Button from '@/components/button/button';
import Icon from '@/components/icon/icon';

export default {
	/**
	 * Name
	 */
	name: 'DatasetsUtils',

	/**
	 * components
	 */
	components: {
		Icon,
		Button
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			tooltips: {
				mergeText: 'Merge two or more list items into a single item',
				addText: 'Add New Dataset'
			}
		};
	},
	
	/**
	 * Computed
	 */
	computed: {
		...mapGetters('pdfViewer', ['mergeState', 'datasetsForMerge']),
		datasetsLength(){
			return this.datasetsForMerge.length
		},
		mergeButtonText() {
			return `Merge ${this.datasetsLength} Items`
		}
	},

	/**
	 * Methods
	 */
	methods: {
		...mapActions('pdfViewer', [
			'setMergeState',
			'mergeDatasets',
			'addSentenceToDataset'
		]),
	},
};
</script>
