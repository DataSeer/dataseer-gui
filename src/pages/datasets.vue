<template>
	<Main
		:class="`main--datasets main--datasets-${activeDatasetType}`"
		hasSubheader
	>
		<Subheader>
			<SubheaderDatasets
				:datasetTypes="datasetTypes"
				:document="document"
			/>
		</Subheader>

		<Loader
			:loading="loading"
			:error="error"
			:errorMessage="errorMessage"
		>
			<Intro
				:type="activeDatasetType"
				v-if="!filteredDatasets.length"
			/>

			<Tabs
				v-if="filteredDatasets.length"
				:activeTabId="activeDatasetId"
				@tabsNavClick="handleTabsNavClick"
			>
				<Dataset
					:dataset="activeDataset"
					:activeDatasetType="activeDatasetType"
				/>
			</Tabs>

			<DatasetUtils />
		</Loader>
		
		<template #right>
			<PDF />
		</template>
	</Main>
</template>

<script>
/* eslint-disable */
/**
 * External Dependencies
 */
import { mapActions, mapGetters } from 'vuex'

/**
 * Internal Dependencies
 */
import PDF from '@/blocks/pdf/pdf';
import Tabs from '@/components/tabs/tabs';
import Main from '@/components/main/main';
import Intro from '@/components/intro/intro'
import Loader from '@/blocks/loader/loader';
import Dataset from '@/blocks/dataset/dataset'
import Subheader from '@/components/subheader/subheader';
import DatasetUtils from '@/components/datasets-utils/datasets-utils';
import SubheaderDatasets from '@/components/subheader/subheader-datasets';

import { DocumentView } from '@/lib/datasets/documentView';
import { DatasetForm } from '@/lib/datasets/datasetForm';
import { DatasetsList } from '@/lib/datasets/datasetsList';
import { DocumentHandler } from '@/lib/datasets/documentHandler';
import documentsService from '@/services/documents/documents';

import { formatDataset } from '@/utils/datasets'

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
		Tabs,
		Main,
		Intro,
		Dataset,
		DatasetUtils
	},
	
	/**
	 * Data
	 */
	data: function() {
		return {
			datasetTypes: [
				{
					label: 'Datasets',
					icon: 'datasets',
					id: 'dataset',
					flagged: false,
				},
				{
					label: 'Code',
					icon: 'brackets',
					id: 'code',
					flagged: false,
				},
				{
					label: 'Materials',
					icon: 'flask',
					id: 'material',
					flagged: false,
				},
				{
					label: 'Protocols',
					icon: 'protocols',
					id: 'protocol',
					flagged: false,
				},
			],
			key: 0,
			loading: true,
			error: false,
			errorMessage: "Something went wrong..."
		};
	},

	/**
	 * Computed
	 */
	computed: {
		...mapGetters('account', ['user']),
		...mapGetters('pdfViewer', [
			'datasets',
			'document',
			'documentHandler',
			'activeDataset',
			'activeDatasetId',
			'activeDatasetType'
		]),
		documentId() {
			return this.$route.params.id
		},
		documentToken() {
			return this.document?.token ?? '' 
		},
		filteredDatasets() {
			return this.datasets.filter((dataset) => dataset.datasetType === this.activeDatasetType)
		}
	},

	/**
	 * Methods
	 */
	methods: {
		...mapActions('pdfViewer', [
			'setDocument',
			'setDocumentHandler',
			'setActiveDataset',
			'setActiveDatasetType',
			'setDatasets',
			'setDataTypes',
			'setMergeState',
			'setActiveSentence',
			'saveDataset',
			'clearState',
		]),
		handleTabsNavClick(dataset) {
			this.setActiveDataset({
				dataset: dataset,
				scrollToSentence: true
			});
			this.documentHandler.setActiveDatasetId(dataset.id);
		},
		async initializePdfViewer() {
			const token = this.$route.query.token
			this.loading = true;

			try {
				const doc = await documentsService.getDocument(this.documentId, {
					datasets: true,
					metadata: true,
					token
				});
				const pdf = await documentsService.getDocumentPdf(this.documentId, { token });
				const pdfURl = await documentsService.getDocumentPdfUrl(this.documentId, token);
				const tei = await documentsService.getDocumentTei(this.documentId, { token });
				const xml = await documentsService.getDocumentTeiContent(this.documentId, { token });
				const dataTypes = await documentsService.getJsonDataTypes({ token });

				const documentView = new DocumentView(`documentView`);
				const datasetsList = new DatasetsList(`datasetsList`);
				const datasetForm = new DatasetForm(`DatasetForm`);

				const datasets = doc.datasets.current;
				
				// Add color and datatype definitions
				for (let i = 0; i < datasets.length; i++) {
					formatDataset(datasets[i]);
				}

				const activeDatasetId = datasets[0]?.id;
				const activeDatasetType = datasets[0]?.datasetType;

				const currentDocument = new DocumentHandler({
					ids: {
						document: doc._id,
						datasets: doc.datasets._id
					},
					user: this.user,
					datatypes: dataTypes,
					activeDatasetId: activeDatasetId,
					activeDatasetType: activeDatasetType,
					datasets: doc.datasets,
					metadata: doc.metadata,
					tei: { data: xml, metadata: tei.res.metadata },
					pdf: pdf && pdf.res ? { url: pdfURl, metadata: pdf.res.metadata } : undefined
				},
				{
					onDocumentViewReady: () => {
						this.loading = false;
						if (activeDatasetType) this.setActiveDatasetType(activeDatasetType);
					},
					onSentenceClick: (dataset, sentence) => {
						this.setActiveSentence(sentence)
						this.setActiveDataset({
							dataset: dataset,
							scrollToSentence: false
						});
						
						if (dataset) {
							this.setActiveDatasetType(dataset.datasetType);
						}
					},
				});

				currentDocument.link({
					documentView: documentView,
					datasetsList: datasetsList,
					datasetForm: datasetForm
				});

				this.setDocument(doc);
				this.setDocumentHandler(currentDocument);
				this.setDataTypes(dataTypes);
				this.setDatasets(datasets);
				
			} catch (error) {
				this.loading = false;
				this.error = true
				this.errorMessage = error.message
			}
		}
	},

	/**
	 * Created
	 */
	created () {
		this.clearState();
	},
	
	/**
	 * Mounted
	 */
	mounted () {
		this.initializePdfViewer();
	},

	/**
	 * Destroyed
	 */
	destroyed () {
		this.clearState();
	},
};
</script>
