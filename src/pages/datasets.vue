<template>
	<Main
		:class="`main--datasets main--datasets-${activeDatasetType}`"
		hasSubheader
	>
		<Subheader>
			<SubheaderDatasets
				:datasetTypes="datasetTypes"
				:metadata="metadata"
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

import { formatDatasets, filterDatasetsByDataType } from '@/utils/datasets'

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
					flagged: true,
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
			metadata: {},
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
		...mapGetters('pdfViewer', ['documentHandler', 'activeDataset', 'activeDatasetId', 'filteredDatasets', 'activeDatasetType']),
		documentId() {
			return this.$route.params.id
		},
	},

	/**
	 * Methods
	 */
	methods: {
		...mapActions('pdfViewer', [
			'setDocumentHandler',
			'setActiveDataset',
			'setDataTypes',
			'clearState',
			'setMergeState',
			'setDatasets',
			'setActiveSentence',
			'setActiveDatasetType',
			'saveDataset',
		]),
		handleTabsNavClick(dataset) {
			this.documentHandler.selectSentence({
				id: dataset.id,
				sentences: dataset.sentences,
				sentence: {
					id: dataset.sentences[0].id
				}
			})
			
			this.setActiveSentence(dataset.sentences[0]);
			this.documentHandler.setActiveDatasetId(dataset.id);
		},
		async initializePdfViewer() {
			this.loading = true;

			try {
				const doc = await documentsService.getDocument(this.documentId, {
					datasets: true,
					metadata: true
				});
				const pdf = await documentsService.getDocumentPdf(this.documentId);
				const pdfURl = await documentsService.getDocumentPdfUrl(this.documentId, doc.id);
				const tei = await documentsService.getDocumentTei(this.documentId);
				const xml = await documentsService.getDocumentTeiContent(this.documentId);
				const dataTypes = await documentsService.getJsonDataTypes();

				const documentView = new DocumentView(`documentView`);
				const datasetsList = new DatasetsList(`datasetsList`);
				const datasetForm = new DatasetForm(`DatasetForm`);

				formatDatasets(doc.datasets.current)

				const currentDocument = new DocumentHandler({
					ids: {
						document: doc._id,
						datasets: doc.datasets._id
					},
					user: this.user,
					datatypes: dataTypes,
					activeDatasetId: doc.datasets.current[0]?.id,
					activeDatasetType: doc.datasets.current[0]?.datasetType,
					datasets: doc.datasets,
					metadata: doc.metadata,
					tei: { data: xml, metadata: tei.res.metadata },
					pdf: pdf && pdf.res ? { url: pdfURl, metadata: pdf.res.metadata } : undefined
				},
				{
					onDocumentViewReady: () => {
						this.loading = false;
					},
					onSentenceClick: (dataset, sentence) => {
						this.setActiveSentence(sentence);
						this.setActiveDataset(dataset);
					},
				});

				currentDocument.link({
					documentView: documentView,
					datasetsList: datasetsList,
					datasetForm: datasetForm
				});
				
				this.setDocumentHandler(currentDocument);
				this.setDataTypes(dataTypes);
				this.metadata = doc.metadata;
				this.setDatasets(doc.datasets.current);
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
