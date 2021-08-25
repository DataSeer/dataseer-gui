<template>
  <div id="documentView.screen.container" class="documentView">
    <div id="pdf"></div><!-- /#pdf -->
    <div id="xml" style="display: none"></div><!-- /#xml -->
  </div>
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
  }
}
</script>

<style>

.documentView {
  height: 100vh;
  overflow: scroll;
  font-family: Times, "Times New Roman", serif;
  font-size: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

#process-buttons {
  margin-top: 10px;
  width: 100%;
}

#process-buttons #back_to_metadata {
  float: left;
  margin-left: 20px;
  width: calc(50% - 25px);
}

#process-buttons #datasets_validation {
  float: right;
  margin-right: 20px;
  width: calc(50% - 25px);
}

#loading-loop {
  z-index: 100000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.90;
  background-color: white;
}

#loading-loop .infos .top {
  font-size: 2em;
}

#loading-loop .infos .sub {
  font-size: 1em;
}

#loading-loop .infos {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  z-index: 100000;
  position: absolute;
  top: calc(50% - 100px);
  height: 200px;
  width: 100%;
  font-size: 3em;
  font-weight: bold;
  text-align: center;
}

#loading-loop .loader {
  position: absolute;
  top: calc(50% - 125px);
  left: calc(50% - 125px);
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 250px;
  height: 250px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.footer {
  flex-shrink: 0;
}

.foot-col {
  background-color: #FFFFFF;
  border-top: 1px solid #184D7E;
  border-bottom: 1px solid #184D7E;
  border-left: 1px solid #184D7E;
  border-right: 1px solid #184D7E;
}

/* ---------- DATASET FORM RULES ---------- */

.pdfViewer {
  overflow: hidden;
}

#documentView {
  height: calc(100% - 50px);
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #FFFFFF;
  border-top: 1px solid #184D7E;
  border-bottom: 1px solid #184D7E;
  border-left: 1px solid #184D7E;
  border-right: 1px solid #184D7E;
  overflow: hidden; 
}

#documentView\.viewSelection {
  cursor: pointer;
  display: table;
  width: 100%; /*Optional*/
  table-layout: fixed; /*Optional*/
  border-spacing: 0px; /*Optional*/
  height:20px;
  overflow: hidden;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

#documentView\.viewSelection > div {
  box-sizing: border-box;
  padding: 0;
  margin:0;
  position: relative;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
}

#documentView\.screen.no-scroll::-webkit-scrollbar {
  display: none;
}

#documentView\.screen.no-scroll {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

#documentView\.screen {
  height: 100%;
  overflow: scroll;
  font-family: Times, "Times New Roman", serif;
  font-size: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

#xml s {
  cursor: pointer;
  text-decoration: none;
  margin-right: 6px;
  line-height: 26px;
  padding: 3px;
  line-height: 30px;
  z-index: 10;
  color: black;
  background-color: white;
}

#xml * {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

#xml s.selected {
  cursor: pointer;
  border: 2px solid rgb(24, 77, 126);
  z-index: 100;
}

#xml s.hover {
  cursor: pointer;
  border: 2px dashed rgb(24, 77, 126);
  z-index: 110;
}

#documentView\.screen\.container {
  padding:0;
}

#documentView #pdfViewer {
  background: lightgray;
}

#documentView #pdfViewer .page {
  margin-bottom: 10px;
}

#documentView #pdfViewer .textLayer {
  z-index: 1000;
}

#documentView #pdfViewer .contoursLayer {
  background-color: transparent;
  z-index: 3000;
}

#documentView #pdfViewer .annotationsLayer {
  background-color: transparent;
  z-index: 2000;
}

#documentView #pdfViewer .contoursLayer .contour {
  background-color: transparent;
  z-index: 3100;
  cursor: pointer;
}

#documentView #pdfViewer .contoursLayer .contour div {
  background-color: transparent;
}

#documentView #pdfViewer .contoursLayer .contour canvas {
  z-index: 3110;
}

#documentView #pdfViewer .contoursLayer .contour[corresp] canvas,
#documentView #pdfViewer .contoursLayer .contour[datasets] canvas {
  z-index: 3115;
}

#documentView #pdfViewer .contoursLayer .contour.activeContourDataset,
#documentView #pdfViewer .contoursLayer .contour.activeContourSentence,
#documentView #pdfViewer .contoursLayer .contour.selected {
  z-index: 3200;
}

#documentView #pdfViewer .contoursLayer .contour.activeContourDataset canvas,
#documentView #pdfViewer .contoursLayer .contour.activeContourSentence canvas,
#documentView #pdfViewer .contoursLayer .contour.selected canvas {
  z-index: 3210;
}

#documentView #pdfViewer .contoursLayer .contour.hover canvas,
#documentView #pdfViewer .contoursLayer .contour.hover canvas {
  z-index: 3215;
}

#documentView #pdfViewer .annotationsLayer s {
  z-index: 2100;
  cursor: pointer;
}

#documentView #pdfViewer .contoursLayer {
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    line-height: 1;
    overflow: hidden;
}

#documentView #pdfViewer .annotationsLayer {
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  line-height: 1;
  overflow: hidden;
}

#documentView #pdfViewer .annotationsLayer .hover {
  cursor: pointer;
}

#documentView #pdfViewer .annotationsLayer .selected {
  cursor: pointer;
}

#documentView #pdfViewer .annotationsLayer s[corresp],
#documentView #pdfViewer .annotationsLayer s[id] {
  cursor: pointer;
  background-color: lightyellow;
}

#documentView #pdfViewer #sentencesLayer {
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  line-height: 1;
  overflow: hidden;
}

#pdfViewerScrollMarkers {
  z-index: 4000;
  position: absolute;
  height: calc(100% - 78px);
  width: 30px;
  max-height: calc(100% - 28px);
  overflow: hidden;
  background-color: gainsboro;
}

#pdfViewerScrollMarkers.display-left {
  top: 25px;
  left: 30px;
}

#pdfViewerScrollMarkers.display-right {
  top: 25px;
  right: 30px;
}

#pdfViewerScrollMarkers span {
  -webkit-transition: all .8s ease;
  -moz-transition: all .8s ease;
  -ms-transition: all .8s ease;
  -o-transition: all .8s ease;
  transition: all .8s ease;
}

#pdfViewerScrollMarkers span.marker {
  /* markers */
  z-index: 4100;
  cursor: pointer;
  position: absolute;
  width: 12px;
}

#pdfViewerScrollMarkers span.cursor {
  /* markers */
  z-index: 4200;
  position: absolute;
  width: 100%;
  height: 6px;
  border: solid 1px #184D7E;
  border-radius: 0px;
}

#documentView #pdf #pdfViewerInfos {
  position: absolute;
  background-color: white;
  border: 1px solid black;
  border-radius: 2px;
  padding: 5px;
  z-index: 10000;
}

#documentView #pdf #pdfViewerInfos.display-left {
  top: 30px;
  left: 40px;
}

#documentView #pdf #pdfViewerInfos.display-right {
  top: 30px;
  right: 40px;
}

#documentView #pdf #pdfViewerMessage {
  position: absolute;
  text-align: center;
  font-style: italic;
  background-color: white;
  border: 1px solid black;
  border-radius: 2px;
  padding: 5px;
  min-width: 120px;
  z-index: 10000;
}

#documentView #pdf #pdfViewerMessage.display-left {
  top: 60px;
  left: 40px;
}

#documentView #pdf #pdfViewerMessage.display-right {
  top: 60px;
  right: 40px;
}

/* -------------------------------------------------- */

#user-navbar {
  display: none;
}

#user-lg {
  font-size: 1.5em;
}

#user-lg label {
  display: block;
  height: 100%;
  margin: 0px;
}

#navbar-lg ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
  margin-left: 25px;
}

#navbar-lg li {
  vertical-align: middle;
  display: inline-block;
  font-size: 1.25em;
  margin-right: 15px;
  margin-bottom: 5px;
}

.row-margin {
  margin-top: 20px !important;
  margin-bottom: 20px !important;
}

i {
  margin-left: 4px;
  margin-right: 4px;
}

.btn-lite {
  border: none;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
}

.row > *,
.form-row > *,
.custom-row > * {
  vertical-align: middle;
}

.bordered {
  border: 3px solid lightgray;
  border-radius: 5px;
}

.warning-color-dark {
  color: #FF8800;
}

.success-color-dark {
  color: #007E33;
}

.fa-save {
  font-size: 22px;
  padding-top: 1px;
  margin-left: 0px;
}

.fa-pen {
  font-size: 16px;
}

.fa-check {
  font-size: 16px;
}

#fixedMsgBottomRight {
  display: none;
  z-index: 100000;
  font-size: 1.25em;
  font-style: oblique;
  margin: 5px;
  padding: 5px;
  position: fixed;
  bottom: 0px;
  right: 0px;
}

.saving {
  display: auto;
  border: solid gray 2px;
  background-color: lightgray;
  color: black;
}

.saved {
  display: auto;
  border: solid green 2px;
  background-color: lightgreen;
  color: green;
}

.modal-backdrop {
  background-color: gray;
  opacity: 0.90;
  z-index: 10000;
}

#datasets-error-modal {
  z-index: 11000;
}

#datasets-error-modal > * {
  opacity: 1;
}

#datasets-error-modal .modal-header {
  color: white;
  background-color: #184D7E;
}

#datasets-error-modal .modal-header > #datasets-error-modal-label {
  font-size: 1.5rem;
}

#datasets-error-modal .modal-data {
  display: none;
}

#datasets-error-modal .modal-data > ul {

}

#datasets-error-modal .modal-data > ul > li {
  margin-bottom: 5px;
  font-size: 1rem;
}

#datasets-error-modal .modal-body {
  font-size: 1.25rem;
  color: #CC0000;
}

#datasets-confirm-modal {
  z-index: 11000;
}

#datasets-confirm-modal > * {
  opacity: 1;
}

#datasets-confirm-modal .modal-header {
  color: white;
  background-color: #184D7E;
}

#datasets-confirm-modal .modal-header > #datasets-confirm-modal-label {
  font-size: 1.5rem;
}

#datasets-confirm-modal .modal-data {
  display: none;
}

#datasets-confirm-modal .modal-body {
  color: #CC0000;
  font-size: 1.25rem;
}

.right{
  /*float:right;*/
  width: 150px;
  padding-left: 0px;
  padding-right: 0px;
  margin: 0px;
  position:absolute;
  top: 0px;
  right: 0px;
}

.modal {
  z-index: 10000;
}

#app .contour {
  border: none;
  border-radius: 0;
  padding: 0;
  background-color: transparent;
}

#publicUrl {
  position: absolute;
  left: 230px;
  top: 12px;
}

#pdfUrl {
  position: absolute;
  left: 350px;
  top: 12px;
}

.pdfViewer .canvasWrapper {
  overflow: hidden;
}

.pdfViewer .page {
  direction: ltr;
  width: 816px;
  height: 1056px;
  margin: 1px auto -8px auto;
  position: relative;
  overflow: visible;
  border: 9px solid transparent;
  background-clip: content-box;
  -webkit-border-image: url(chrome-extension://oagiliojipalkkpmpllioebdpgekhmlj/vendors/pdf.js/build/components/images/shadow.png) 9 9 repeat;
      -o-border-image: url(chrome-extension://oagiliojipalkkpmpllioebdpgekhmlj/vendors/pdf.js/build/components/images/shadow.png) 9 9 repeat;
          border-image: url(chrome-extension://oagiliojipalkkpmpllioebdpgekhmlj/vendors/pdf.js/build/components/images/shadow.png) 9 9 repeat;
  background-color: white;
}

.pdfViewer.removePageBorders .page {
  margin: 0px auto 10px auto;
  border: none;
}

.pdfViewer.singlePageView {
  display: inline-block;
}

.pdfViewer.singlePageView .page {
  margin: 0;
  border: none;
}

.pdfViewer.scrollHorizontal, .pdfViewer.scrollWrapped, .spread {
  margin-left: 3.5px;
  margin-right: 3.5px;
  text-align: center;
}

.pdfViewer.scrollHorizontal, .spread {
  white-space: nowrap;
}

.pdfViewer.removePageBorders,
.pdfViewer.scrollHorizontal .spread,
.pdfViewer.scrollWrapped .spread {
  margin-left: 0;
  margin-right: 0;
}

.spread .page,
.pdfViewer.scrollHorizontal .page,
.pdfViewer.scrollWrapped .page,
.pdfViewer.scrollHorizontal .spread,
.pdfViewer.scrollWrapped .spread {
  display: inline-block;
  vertical-align: middle;
}

.spread .page,
.pdfViewer.scrollHorizontal .page,
.pdfViewer.scrollWrapped .page {
  margin-left: -3.5px;
  margin-right: -3.5px;
}

.pdfViewer.removePageBorders .spread .page,
.pdfViewer.removePageBorders.scrollHorizontal .page,
.pdfViewer.removePageBorders.scrollWrapped .page {
  margin-left: 5px;
  margin-right: 5px;
}

.pdfViewer .page canvas {
  margin: 0;
  display: block;
}

.pdfViewer .page canvas[hidden] {
  display: none;
}

.pdfViewer .page .loadingIcon {
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: url('chrome-extension://oagiliojipalkkpmpllioebdpgekhmlj/vendors/pdf.js/build/components/images/loading-icon.gif') center no-repeat;
}

.pdfPresentationMode .pdfViewer {
  margin-left: 0;
  margin-right: 0;
}

.pdfPresentationMode .pdfViewer .page,
.pdfPresentationMode .pdfViewer .spread {
  display: block;
}

.pdfPresentationMode .pdfViewer .page,
.pdfPresentationMode .pdfViewer.removePageBorders .page {
  margin-left: auto;
  margin-right: auto;
}

.pdfPresentationMode:-ms-fullscreen .pdfViewer .page {
  margin-bottom: 100% !important;
}

.pdfPresentationMode:-webkit-full-screen .pdfViewer .page {
  margin-bottom: 100%;
  border: 0;
}

.pdfPresentationMode:-moz-full-screen .pdfViewer .page {
  margin-bottom: 100%;
  border: 0;
}

.pdfPresentationMode:fullscreen .pdfViewer .page {
  margin-bottom: 100%;
  border: 0;
}
</style>
