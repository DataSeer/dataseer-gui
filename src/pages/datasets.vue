<template>
	<Main
		:class="`main--datasets main--datasets-${activeDatasetType}`"
		hasSubheader
	>
		<Subheader>
			<SubheaderDatasets />
		</Subheader>

		<Resizer
			modifier="datasets"
			:initialW="634"
			:minW="500"
			:maxW="1000"
			@resize="() => documentHandler.refresh()"
		>
			<template #resizerContainer>
				<Tabs>
					<Dataset v-if="filteredDatasets.length" :dataset="activeDataset" />
					
					<Intro v-if="!filteredDatasets.length" />
					
					<DatasetUtils />	
				</Tabs>
			</template>

			<PDF />
		</Resizer>
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

import Resizer from '@/components/resizer/resizer';

import { DocumentView } from '@/lib/datasets/documentView';
import { DatasetForm } from '@/lib/datasets/datasetForm';
import { DatasetsList } from '@/lib/datasets/datasetsList';
import { DocumentHandler } from '@/lib/datasets/documentHandler';
import documentsService from '@/services/documents/documents';

import { formatDataset } from '@/utils/use-datasets'

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
		Resizer,
		DatasetUtils
	},
	
	/**
	 * Data
	 */
	data: function() {
		return {
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
			'activeDatasetType',
			'filteredDatasets'
		]),
		documentId() {
			return this.$route.params.id
		},
		documentToken() {
			return this.document?.token ?? '' 
		},
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
			'clearState',
		]),
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
				const activeDatasetType = datasets[0]?.datasetType || this.activeDatasetType;

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
						if (activeDatasetType ==! this.activeDatasetType) setActiveDatasetType(activeDatasetType);
					},
					onSentenceClick: (dataset, sentence) => {
						this.setActiveSentence(sentence)
						this.setActiveDataset({
							dataset: dataset,
							scrollToSentence: false
						});
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
