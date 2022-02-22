<template>
	<div class="pdf-holder">
		<div id="documentView">
			<div id="documentView.screen">
				<div id="documentView.screen.container" class="documentView">
					<div id="pdf"></div>
					<div id="xml" style="display: none"></div>
				</div>
			</div> <!-- /#documentView.screen -->
		</div> <!-- /#documentView -->
	</div> <!-- /.pdf-holder -->
</template>

<script>
/* eslint-disable */

/**
 * External Dependencies
 */

import { mapGetters } from 'vuex';
import { DocumentView } from '@/lib/datasets/documentView.js';
import { DatasetForm } from '@/lib/datasets/datasetForm.js';
import { DatasetsList } from '@/lib/datasets/datasetsList.js';
import { DocumentHandler } from '@/lib/datasets/documentHandler.js';

import documentsService from '@/services/documents/documents';

export default {
	/**
	 * Name
	 */
	name: 'PDF',

	/**
	 * Props
	 */
	props: {
		documentId: {
			type: String,
			default: ''
		},
	},

	/**
	 * Computed
	 */
	computed: {
		...mapGetters('account', ['userRole', 'userId'])
	},

	/**
	 * mounted
	 */
	mounted() {
		const user = {};

		const documentView = new DocumentView(`documentView`);
		const datasetsList = new DatasetsList(`datasetsList`);
		const datasetForm = new DatasetForm(`datasetForm`);
		
		let doc;
		let pdf;
		let pdfURl;
		let tei;
		let xml;
		let datatypes;

		// Get data of current document with datasets informations
		(async () => {
			try {
				doc = await documentsService.getDocument(this.documentId, {
					datasets: true,
					metadata: true
				});
				pdf = await documentsService.getDocumentPdf(this.documentId);
				pdfURl = await documentsService.getDocumentPdfUrl(this.documentId, doc.id);
				tei = await documentsService.getDocumentTei(this.documentId);
				xml = await documentsService.getDocumentTeiContent(this.documentId);
				datatypes = await documentsService.getJsonDataTypes();
			} catch (error) {
				alert(error);
			}

			if (doc.locked) alert(`This document is locked, You can't modify it`);
			
			const currentDocument = new DocumentHandler(
				{
					ids: { document: doc._id, datasets: doc.datasets._id },
					user: user,
					datatypes: datatypes,
					datasets: doc.datasets,
					metadata: doc.metadata,
					tei: { data: xml, metadata: tei.res.metadata },
					pdf:
						pdf && pdf.res
							? {
									url: pdfURl,
									metadata: pdf.res.metadata
							  }
							: undefined
				},
				{
					onReady: function() {
						console.log(`ready`);
					}
				}
			);

			currentDocument.link({
				documentView: documentView,
				datasetsList: datasetsList,
				// datasetForm: datasetForm
			});
		})();
	}
};
</script>
