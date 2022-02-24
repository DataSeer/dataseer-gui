<template>
	<Main className="main--datasets" hasSubheader>
		<Subheader>
			<SubheaderDatasets :metadata="metadata" />
		</Subheader>

		<Loader
			:loading="loading"
			:error="error"
			:errorMessage="errorMessage"
		>
			<Intro v-if="!datasets.length" />

			<Tabs
				v-if="datasets.length"
				:tabs="datasets"
				:activeTabId="activeDatasetId"
				@tabsNavClick="handleTabsNavClick"
			>
				<Tab>
					<FormDataset v-if="activeDataset" :dataset="activeDataset" />

					<h1 v-else>
						The selected sentences are not linked to a dataset
						<br>
						If they are, click the button "Add new Dataset"
					</h1>
				</Tab>
			</Tabs>

			<DatasetUtils @addButtonClick="addDataset" />
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
import Tab from '@/components/tabs/tab';
import Tabs from '@/components/tabs/tabs';
import Main from '@/components/main/main';
import Intro from '@/components/intro/intro'
import Loader from '@/blocks/loader/loader';
import Subheader from '@/components/subheader/subheader';
import FormDataset from '@/blocks/form-dataset/form-dataset';
import DatasetUtils from '@/components/datasets-utils/datasets-utils';
import SubheaderDatasets from '@/components/subheader/subheader-datasets';

import { DocumentView } from '@/lib/datasets/documentView';
import { DatasetForm } from '@/lib/datasets/datasetForm';
import { DatasetsList } from '@/lib/datasets/datasetsList';
import { DocumentHandler } from '@/lib/datasets/documentHandler';
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
			metadata: {},
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
		...mapGetters('account', ['user']),
		...mapGetters('pdfViewer', ['documentHandler', 'activeDataset', 'activeDatasetId']),
		documentId() {
			return this.$route.params.id
		}
	},

	/**
	 * Methods
	 */
	methods: {
		...mapActions('pdfViewer', ['setDocumentHandler', 'setActiveDataset']),
		addDataset() {
			console.log('addDataset');
		},
		completeDataset() {
			console.log('completeDataset');
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
		deleteDataset() {
			console.log('deleteDataset');
		},
		async initializePdfViewer() {
			this.loading = true;
			
			const documentView = new DocumentView(`documentView`);
			const datasetsList = new DatasetsList(`datasetsList`);

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

				const currentDocument = new DocumentHandler(
				{
					ids: {
						document: doc._id,
						datasets: doc.datasets._id
					},
					user: this.user,
					datatypes: dataTypes,
					datasets: doc.datasets,
					metadata: doc.metadata,
					tei: { data: xml, metadata: tei.res.metadata },
					pdf: pdf && pdf.res ? { url: pdfURl, metadata: pdf.res.metadata } : undefined
				},
				{
					onReady: function() {
						console.log('onReady');
					},
					onDatasetClick() {
						console.log('onDatasetClick');
					},
					onSentenceClick: (dataset) => {
						this.setActiveDataset(dataset);
					},
					onFulltextView() {
						console.log('onFulltextView');
					},
					onSectionView() {
						console.log('onSectionView');
					},
					onParagraphView() {
						console.log('onParagraphView');
					},
					onPdfView() {
						console.log('onPdfView');
					}
				}
			);

			currentDocument.link({
				documentView: documentView,
				datasetsList: datasetsList,
				// datasetForm: datasetForm
			});
			
			this.setDocumentHandler(currentDocument)
			this.metadata = doc.metadata;
			this.datasets = doc.datasets.current;
				
			} catch (error) {
				this.error = true
				this.errorMessage = error.message
			}
			
			this.loading = false;
		}
	},

	mounted () {
		this.initializePdfViewer();
	},
};
</script>
