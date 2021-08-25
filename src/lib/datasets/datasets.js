/*
 * @prettier
 */


'use strict';
(() => {

  const user = {
    id: $(`#user_id`).attr(`value`),
    username: $(`#user_username`).attr(`value`),
    isCurator: $(`#user_role`).attr(`value`) === `administrator`,
    isAnnotator: $(`#user_role`).attr(`value`) === `moderator`,
    role: $(`#user_role`).attr(`value`)
  }
  
  
  const documentView = new DocumentView(`documentView`),
    datasetsList = new DatasetsList(`datasetsList`),
    datasetForm = new DatasetForm(`datasetForm`);
  let doc, pdf, tei, xml, datatypes;
  
  // Get data of current document with datasets informations
  (async () => {
    try {
      doc = await fetch('http://localhost:3000/datasets').then(res => res.json()).then(res => res.res);
      pdf = await fetch('/pdf').then(res => res.json()).then(res => res);
      tei = await fetch('http://localhost:3000/tei').then(res => res.json()).then(res => res);
      xml = await fetch('http://127.0.0.1:8080/xml.xml').then(res => res.text()).then(res => res);
      datatypes = await fetch('http://localhost:3000/json').then(res => res.json()).then(res => res);
    } catch (error) {
      alert('error')
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
              url: 'http://127.0.0.1:8080/pdf.pdf',
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
})();
