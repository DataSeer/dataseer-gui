<template>
	<Main className="main--datasets" hasSubheader>
		<Subheader>
			<SubheaderDatasets />
		</Subheader>

		<Loader :loading="loading" :error="error" :errorMessage="errorMessage">
			<Intro v-if="!datasets.length" />

			<Tabs>
				<Tab
					v-for="(dataset, index) in datasets"
					:completed="dataset.saved"
					:flagged="false"
					:tooltip="dataset.description" :key="dataset.id"
				>
					<FormDataset
						:dataset="dataset"
						@onDatasetDelete="deleteDataset(index)" 
						@onDatasetComplete="(value) => completeDataset(index, value)"
					/>
				</Tab>
			</Tabs>

			<DatasetUtils @addButtonClick="addDataset" />
		</Loader>
		
		<template #right>
			<!-- <PDF /> -->
		</template>
	</Main>
</template>

<script>
/* eslint-disable */
/**
 * Internal Dependencies
 */
import Loader from '@/blocks/loader/loader';
import Subheader from '@/components/subheader/subheader';
import SubheaderDatasets from '@/components/subheader/subheader-datasets';
import PDF from '@/blocks/pdf/pdf';
import Tab from '@/components/tabs/tab';
import Tabs from '@/components/tabs/tabs';
import Main from '@/components/main/main';
import Intro from '@/components/intro/intro'
import FormDataset from '@/blocks/form-dataset/form-dataset';
import DatasetUtils from '@/components/datasets-utils/datasets-utils';

import documentsService from '@/services/documents/documents';

export default {
	/**
	 * Name
	 */
	name: 'Datasets',

	/**
	 * Components
	 */
	components: {
		Loader,
		Subheader,
		SubheaderDatasets,
		PDF,
		Tab,
		Tabs,
		Main,
		Intro,
		FormDataset,
		DatasetUtils
	},
	
	/**
	 * Data
	 */
	data: function() {
		return {
			datasets: [],
			loading: true,
			error: false,
			errorMessage: "Something went wrong..."
		};
	},

	/**
	 * Computed
	 */
	computed: {
		documentID() {
			return this.$route.params.id
		}
	},

	/**
	 * Methods
	 */
	methods: {
		async getDocument() {
			const document = await documentsService.getDocument(this.documentID, {
				datasets: true,
				metadata: true
			});
			
			this.loading = false;
			this.datasets = document.datasets.current
		},
		addDataset() {
			this.tabs.push({
				tooltip: 'This Dataset Name Is Too Lon…',
				completed: false,
				flagged: false,
			})
		},
		completeDataset(index, value) {
			this.tabs[index].completed = value;
		},
		deleteDataset(index) {
			this.tabs.splice(index, 1);
		}
	},

	created () {
		this.getDocument();
	},
};
</script>
