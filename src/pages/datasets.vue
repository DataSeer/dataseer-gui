<template>
	<Main className="main--datasets" hasSubheader>
		<Subheader>
			<SubheaderDatasets />
		</Subheader>

		<Loader
			:loading="loading"
			:error="error"
			:errorMessage="errorMessage"
		>
			<Intro v-if="!datasets.length" />

			<Tabs
				:tabs="datasets"
				:activeTabId="activeDatasetId"
				@tabsNavClick="handleTabsNavClick"
			>
				<Tab v-if="activeDataset">
					<FormDataset :dataset="activeDataset" />
				</Tab>
			</Tabs>

			<DatasetUtils @addButtonClick="addDataset" />
		</Loader>
		
		<template #right>
			<PDF :documentId="documentID" />
		</template>
	</Main>
</template>

<script>
/* eslint-disable */
/**
 * External Dependencies
 */
import { mapGetters } from 'vuex'

/**
 * Internal Dependencies
 */
import PDF from '@/blocks/pdf/pdf';
import Tab from '@/components/tabs/tab';
import Tabs from '@/components/tabs/tabs';
import Main from '@/components/main/main';
import Intro from '@/components/intro/intro'
import Loader from '@/blocks/loader/loader';
import Subheader from '@/components/subheader/subheader';
import FormDataset from '@/blocks/form-dataset/form-dataset';
import DatasetUtils from '@/components/datasets-utils/datasets-utils';
import SubheaderDatasets from '@/components/subheader/subheader-datasets';

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
		...mapGetters('pdfViewer', ['documentHandler', 'activeDataset', 'activeDatasetId']),
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
		handleTabsNavClick(dataset) {
			let sentences = dataset.sentences;
			let currentSentenceId = dataset.sentences[0].id
		

			this.documentHandler.selectSentence({
				id: dataset.id,
				sentences: sentences,
				sentence: { id: currentSentenceId },
			})
		},
		addDataset() {
			console.log('addDataset');
		},
		completeDataset() {
			console.log('completeDataset');
		},
		deleteDataset() {
			console.log('deleteDataset');
		}
	},

	created () {
		this.getDocument();
	},
};
</script>
