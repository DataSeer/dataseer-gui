<template>
	<div class="pdf-holder">
		<div id="documentView">
			<div id="documentView.screen">
				<div id="documentView.screen.container" class="documentView">
					<div id="pdf"></div><!-- /#pdf -->
					<div id="xml" style="display: none"></div><!-- /#xml -->
				</div>
			</div><!-- /#documentView.screen -->
		</div><!-- /#documentView -->
	</div><!-- /.pdf-holder -->
</template>

<script>
import { DocumentView } from  "../../lib/datasets/documentView.js";
import { DatasetForm } from "../../lib/datasets/datasetForm.js";
import { DatasetsList } from "../../lib/datasets/datasetsList.js";
import { DocumentHandler } from "../../lib/datasets/documentHandler.js";
export default {
  name: "PDF",

  mounted() {
    const user = {}

    const documentView = new DocumentView(`documentView`),
      datasetsList = new DatasetsList(`datasetsList`),
      datasetForm = new DatasetForm(`datasetForm`);
    let doc, pdf, tei, xml, datatypes;
    
    // Get data of current document with datasets informations
    (async () => {
      try {
        doc = await fetch('/datasets.json').then(res => res.json()).then(res => res.res);
        pdf = await fetch('/pdf.json').then(res => res.json()).then(res => res);
        tei = await fetch('/tei.json').then(res => res.json()).then(res => res);
        xml = await fetch('/xml.xml').then(res => res.text()).then(res => res);
        datatypes = await fetch('/json.json').then(res => res.json()).then(res => res);
      } catch (error) {
        alert(error)
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
                url: '/pdf.pdf',
                metadata: pdf.res.metadata
              }
              : undefined
        },
        {
          onReady: function () {
            console.log(`ready`);
          }
        }
      );
    
      currentDocument.link({
        documentView: documentView,
        datasetsList: datasetsList,
        datasetForm: datasetForm
      });
    })();
  }
}
</script>
