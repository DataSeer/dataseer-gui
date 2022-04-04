/* eslint-disable */

/**
 * External Dependencies
 */
import $ from 'jquery';
import _ from 'lodash';
import async from 'async';

/**
 * Internal Dependencies
 */
import API from './api';

export const DocumentHandler = function(opts = {}, events) {
	let self = this;
	this.ids = opts.ids;
	// It will save a dataset (secure way to not DDOS mongoDB server)
	this.autoSave = _.debounce(this.saveDataset, 2000);
	// It will store change states for each dataset
	this.hasChanged = {};
	// Events
	this.events = events;
	// Events
	this.lastAction = {
		type: undefined, // What kind of action it was
		data: undefined // Data that were involved
	};
	// It will store ready states for each elements (datasetForm, datasetsList & documentView)
	this.ready = {
		datasetForm: false,
		datasetsList: false,
		documentView: false
	};
	//Here we store information about each colored sentence
	this.colors = {};
	this.dataTypeColors = {
		code: {
			background: {
				border: "rgb(114, 93, 189)",
				rgb: "rgb(232,215,255)"
			},
			foreground: "black"
		},
		material: {
			background: {
				border: "rgb(210, 112, 68)",
				rgb: "rgb(244,219,208)"
			},
			foreground: "black"
		},
		protocol: {
			background: {
				border: "rgb(64, 164, 105)",
				rgb: "rgb(206,244,222)"
			},
			foreground: "black"
		},
		dataset: {
			background: {
				border: "rgb(0, 106, 201)",
				rgb: "rgb(243,252,255)"
			},
			foreground: "black"
		},
	}
	this.sentencesMapping = undefined;
	this.user = opts.user;
	this.datatypes = opts.datatypes;
	this.datasets = opts.datasets;
	this.metadata = opts.metadata;
	this.tei = { data: opts.tei.data, metadata: { mapping: opts.tei.metadata.mapping } };
	
	//Here we store information active Dataset and Datatype
	this.activeDatasetType = opts.activeDatasetType;
	this.activeDatasetId = opts.activeDatasetId;
	
	if (opts.pdf) {
		this.pdf = {
			url: opts.pdf.url,
			metadata: {
				sentences: opts.pdf.metadata.sentences,
				pages: opts.pdf.metadata.pages,
				mapping: opts.pdf.metadata.mapping
			}
		};
	};
	
	//Here we update the information for each colored sentence, based on the current datasets
	for (let i = 0; i < opts.datasets.current.length; i++) {
		self.datasets.current.map((dataset) => {
			this.colors[dataset.id] = dataset.color;
		})
	}
// 
	return this;
};

// Attach event
DocumentHandler.prototype.attach = function(event, fn) {
	this.events[event] = fn;
};

// Check if document isReady
DocumentHandler.prototype.isReady = function(key, value) {
	if (typeof key === `string` && typeof value === `boolean`) {
		this.ready[key] = value;
		if (this.isReady()) return this.init();
	} else {
		let result = true;
		for (let key in this.ready) {
			result = result && this.ready[key];
			if (!result) return result;
		}
		return result;
	}
};

// Refresh the sentences mapping
DocumentHandler.prototype.refreshSentencesMapping = function() {
	if (this.sentencesMapping) {
		if (this.documentView.pdfVisible)
			this.datasetsList.setSentencesMapping(this.sentencesMapping.pdf);
		else this.datasetsList.setSentencesMapping(this.sentencesMapping.xml);
	}
};

// Attach event
DocumentHandler.prototype.init = function() {
	// refresh mapping
	this.sentencesMapping = this.documentView.getSentencesMapping();
	this.refreshSentencesMapping();
	
	let self = this;
	//let firstId = this.datasetsList.getFirstDatasetId();
	let	firstId = this.activeDatasetId;
	let	dataset = firstId ? this.getDataset(firstId) : undefined;
	let	sentence = dataset ? dataset.sentences[0] : { id: `sentence-0` };

	if (typeof self.events.onInit === `function`) return self.events.onInit();
	console.log(`init`);
	
	// if (!dataset) this.datasetForm.hide();
	if (sentence) {
		// this.datasetsList.refreshMsg();
		this.selectSentence({ sentence: sentence, noAnim: true }, function() {
			if (typeof self.events.onReady === `function`) return self.events.onReady(dataset);
		});
	} else {
		// this.datasetForm.hide();
		// this.datasetForm.setEmptyMessage();
		// this.datasetsList.refreshMsg();
		if (typeof self.events.onReady === `function`) return self.events.onReady();
	}
};

// Check if document has change(s) not saved
DocumentHandler.prototype.hasChanges = function() {
	let result = false;
	for (let key in this.hasChanged) {
		result = result || this.hasChanged[key] === true;
	}
	return result;
};

// Change status of current dataset (or the one with the given id) to "modified"
DocumentHandler.prototype.modified = function(id) {
	let dataset = this.getDataset(id);
	if (dataset) {
		this.hasChanged[dataset.id] = true;
		dataset.status = `modified`;
		this.datasetsList.update(dataset.id, dataset);
		if (dataset.id === this.datasetForm.currentId()) this.datasetForm.modified();
	}
};

// Change status of current dataset (or the one with the given id) to "saved"
DocumentHandler.prototype.saved = function(id) {
	let dataset = this.getDataset(id);
	if (dataset) {
		dataset.status = `saved`;
		this.hasChanged[dataset.id] = false;
	}
};

// Change status of current dataset (or the one with the given id) to "valid"
DocumentHandler.prototype.valid = function(id) {
	let dataset = this.getDataset(id);
	if (dataset) {
		dataset.status = `valid`;
		this.hasChanged[dataset.id] = true;
	}
};

// Change status of the dataset (with the given id) to "loading"
DocumentHandler.prototype.loading = function(id) {
	if (id === this.datasetForm?.currentId()) this.datasetForm?.loading();
	this.datasetsList.loading(id);
};

// Set the active dataset Id
DocumentHandler.prototype.setActiveDatasetId = function(id) {
	const self = this;
	return self.activeDatasetId = id;
}

// Get datasets of a sentence
DocumentHandler.prototype.getDatasetsOfSentence = function(sentence) {
	return this.datasets.current.filter(function(dataset) {
		return dataset.sentences.reduce(function(acc, item) {
			return acc || item.id === sentence.id;
		}, false);
	});
};

// Select a sentence
DocumentHandler.prototype.selectSentence = function(opts, cb) {
	let self = this;
	let datasets = self.getDatasetsOfSentence(opts.sentence);
	
	let dataset =
			datasets.length > 0
				? opts.selectedDataset && opts.selectedDataset.id
					? this.getDataset(opts.selectedDataset.id)
					: datasets[0]
				: undefined
	let selectedSentences = this.documentView.getSelectedSentences();
	let sentence = this.documentView.getSentence(opts.sentence);
	
	return this.documentView.scrollToSentence({
		sentence: opts.sentence,
		noAnim: opts.noAnim
	},
		function(err) {
			if (!opts.disableSelection) {
				self.documentView.unselectSentences(selectedSentences);
				self.documentView.selectSentence(opts.sentence);
			}

			if (dataset && self.documentView.getSelectedSentences().length === 1) {
				self.events.onSentenceClick(dataset, sentence)
			} 
			
			return typeof cb === `function` ? cb(true) : undefined;
		}
	);
};

// Show error on finish
DocumentHandler.prototype.throwDatasetsNotValidError = function() {
	this.showModalError({
		title: `Error: Datasets validation`,
		body: `Please validate all datasets below before moving on the next step.`,
		data: this.getDatasetsNotValidList()
	});
};

// Build error msg
DocumentHandler.prototype.getDatasetsNotValidList = function() {
	let datasets = this.datasets.current.filter(function(dataset) {
		return dataset.status !== `valid`;
	});
	return `<ul>${datasets
		.map(function(dataset) {
			return `<li>(${dataset.id}) ${dataset.name ? dataset.name : dataset.id}</li>`;
		})
		.join(``)}</ul>`;
};

// Show error modal
DocumentHandler.prototype.showModalError = function(opts = {}) {
	$(`#datasets-error-modal-label`).html(opts.title);
	$(`#datasets-error-modal-body`).html(opts.body);
	$(`#datasets-error-modal-data`).html(opts.data);
	if (opts.data) $(`#datasets-error-modal-data`).show();
	else $(`#datasets-error-modal-data`).hide();
	$(`#datasets-error-modal-btn`).click();
};

// Show confirm modal
DocumentHandler.prototype.showModalConfirm = function(opts = {}, confirm) {
	$(`#datasets-confirm-modal-label`).html(opts.title);
	$(`#datasets-confirm-modal-action`).attr(`value`, opts.action);
	$(`#datasets-confirm-modal-body`).html(opts.body);
	$(`#datasets-confirm-modal-data`).html(opts.data);
	if (opts.data) $(`#datasets-confirm-modal-data`).show();
	else $(`#datasets-confirm-modal-data`).hide();
	$(`#datasets-confirm-modal-btn`).click();
};

// onModalConfirmAccept
DocumentHandler.prototype.onModalConfirmAccept = function() {
	let action = $(`#datasets-confirm-modal-action`).attr(`value`);
	console.log(`onModalConfirmAccept`);
	if (typeof this.events.onModalConfirmAccept === `function`)
		return this.events.onModalConfirmAccept(action);
};

// Update a dataset
DocumentHandler.prototype.updateDataset = function(id, data = {}) {
	let dataset = this.getDataset(id);
	if (dataset)
		for (let key in data) {
			dataset[key] = data[key];
		}
	this.setActiveDatasetType(dataset.datasetType);
};

// Save a dataset
DocumentHandler.prototype.saveDataset = function(id, dataset, cb) {
	let self = this;
	
	return API.datasets.updateDataset(
		{
			datasetsId: this.ids.datasets,
			dataset: dataset
		},
		function(err, res) {
			// console.log(err, res);
			if (err) return typeof cb === `function` ? cb(err) : undefined;
			if (res.err) return typeof cb === `function` ? cb(true, res) : undefined;
			self.saved(id);
			self.hasChanged[id] = false;
			self.updateDataset(id, res.res);
			self.refreshDataset(id);
			return typeof cb === `function` ? cb(err, res) : undefined;
		}
	);
};

// Merge some datasets
DocumentHandler.prototype.mergeDatasets = function(datasets, cb) {
	if (datasets.length > 1) {
		let self = this,
			target = this.getDataset(datasets[0].id);
		return async.mapSeries(
			datasets.slice(1),
			function(item, callback) {
				let dataset = Object.assign({}, self.getDataset(item.id)),
					sentences = self.documentView.getLinks(dataset).map(function(link) {
						return link.sentence;
					});
				return self.deleteDataset(dataset.id, function(err, res) {
					if (err) return callback(err);
					return self.newLinks(
						{ dataset: { id: target.id }, sentences: sentences },
						function(err) {
							return callback(err);
						}
					);
				});
			},
			function(err) {
				return cb(err);
			}
		);
	} else return cb();
};

// Delete some datasets
DocumentHandler.prototype.deleteDatasets = function(datasets, cb) {
	let self = this;
	return async.mapSeries(
		datasets,
		function(dataset, callback) {
			return self.deleteDataset(dataset.id, function(err, res) {
				return callback(err);
			});
		},
		function(err) {
			return cb(err);
		}
	);
};

// Delete a dataset
DocumentHandler.prototype.deleteDataset = function(id, cb) {
	let self = this,
		dataset = this.getDataset(id);
	this.loading(id);
	this.datasetForm?.unlink(id);
	return API.datasets.deleteDataset(
		{
			datasetsId: this.ids.datasets,
			dataset: dataset
		},
		function(err, res) {
			console.log(err, res);
			if (err) return cb(err); // Need to define error behavior
			if (res.err) return cb(true, res); // Need to define error behavior
			let index = self.getDatasetIndex(dataset.id);
			if (index > -1) self.datasets.deleted.push(self.datasets.current.splice(index, 1)[0]); // delete current dataset
			self.datasetsList.delete(id);
			self.documentView.removeDataset(dataset);
			return cb(undefined, res);
		}
	);
};

// Delete a link
DocumentHandler.prototype.deleteLink = function(opts = {}, cb) {
	let self = this;
	return API.datasets.unlinkSentence(
		{
			datasetsId: self.datasets._id,
			link: { dataset: { id: opts.dataset.id }, sentence: { id: opts.sentence.id } }
		},
		function(err, res) {
			console.log(err, res);
			if (err) return cb(err); // Need to define error behavior
			if (res.err) return cb(true, res); // Need to define error behavior
			return self.removeLink(
				{
					dataset: self.getDataset(opts.dataset.id),
					sentence: { id: opts.sentence.id, text: opts.sentence.text }
				},
				function(err, dataset) {
					return cb(err, dataset);
				}
			);
		}
	);
};

// Create new DatasetId
DocumentHandler.prototype.newDatasetId = function() {
	let index = 1,
		newId = `dataset-` + index;
	while (this.datasetExist(newId)) {
		index += 1;
		newId = `dataset-` + index;
	}
	return newId;
};

// Create new DatasetId
DocumentHandler.prototype.newDataInstanceId = function() {
	let index = 1,
		newId = `dataInstance-` + index;
	while (this.dataInstanceExist(newId)) {
		index += 1;
		newId = `dataInstance-` + index;
	}
	return newId;
};

// Create new Dataset
DocumentHandler.prototype.newDataset = function(sentences = {}, cb) {
	let self = this,
		datasetSentence = sentences[0],
		linksSentences = sentences.slice(1);
	return API.dataseerML.getdataType({ text: datasetSentence.text }, function(err, res) {
		console.log(err, res);
		if (err) return cb(err, res);
		if (res.err) return cb(true, res);
		let dataType = res[`datatype`] ? res[`datatype`] : self.datasetForm?.defaultDataType,
			subType = res[`subtype`] ? res[`subtype`] : ``,
			cert = res[`cert`] ? res[`cert`] : 0;
		let sentence = { id: datasetSentence.id, text: datasetSentence.text },
			dataset = {
				dataType: dataType,
				subType: subType,
				cert: cert
			};
		return API.datasets.createDataset(
			{ datasetsId: self.datasets._id, dataset: dataset, sentence: sentence },
			function(err, res) {
				console.log(err, res);
				if (err) return cb(err, res);
				if (res.err) return cb(true, res);
				return self.addDataset(res.res, datasetSentence, function(err, dataset) {
					if (linksSentences.length === 0) return cb(err, dataset);
					else
						return self.newLinks(
							{ dataset: { id: dataset.id }, sentences: linksSentences },
							function(err, dataset) {
								return cb(err, dataset);
							}
						);
				});
			}
		);
	});
};

// Add new Dataset
DocumentHandler.prototype.addDataset = function(dataset, sentence, cb) {
	const datasetType = this.getDatasetDataType(dataset);
	
	dataset.color = this.dataTypeColors[datasetType];
	dataset.datasetType = datasetType;
	
	this.colors[dataset.id] = dataset.color;
	this.datasets.current.push(dataset);
	this.documentView.addDataset(dataset, sentence);
	// this.datasetsList.add(dataset);

	this.setActiveDatasetType(datasetType);
	
	return cb(null, this.getDataset(dataset.id));
};

// Create new Links
DocumentHandler.prototype.newLinks = function(opts = {}, cb) {
	let self = this,
		dataset = self.getDataset(opts.dataset.id);
	return async.mapSeries(
		opts.sentences,
		function(sentence, next) {
			return API.datasets.linkSentence(
				{
					datasetsId: self.datasets._id,
					link: { dataset: { id: opts.dataset.id }, sentence: { id: sentence.id } }
				},
				function(err, res) {
					console.log(err, res);
					if (err) return cb(err, res);
					if (res.err) return cb(true, res);
					return self.addLink(
						{
							dataset: self.getDataset(opts.dataset.id),
							sentence: { id: sentence.id, text: sentence.text }
						},
						function(err, dataset) {
							return next(err);
						}
					);
				}
			);
		},
		function(err) {
			return cb(err, dataset);
		}
	);
};

// Add Link
DocumentHandler.prototype.addLink = function(opts = {}, cb) {
	this.documentView.addLink(opts.dataset, opts.sentence);
	let dataset = this.getDataset(opts.dataset.id);
	let sentenceAlreadyLinked = false;
	dataset.sentences.map(function(sentence) {
		if (sentence.id === opts.sentence.id) sentenceAlreadyLinked = true;
	});
	if (!sentenceAlreadyLinked) dataset.sentences.push(opts.sentence);
	this.datasetsList.update(opts.dataset.id, opts.dataset);
	return cb(null, this.getDataset(dataset.id));
};

// Remove Link
DocumentHandler.prototype.removeLink = function(opts = {}, cb) {
	this.documentView.removeLink(opts.dataset, opts.sentence);
	let dataset = this.getDataset(opts.dataset.id),
		index = dataset.sentences.reduce(function(acc, item, i) {
			if (item.id === opts.sentence.id) acc = i;
			return acc;
		}, -1);
	if (index > -1) dataset.sentences.splice(index, 1); // delete sentence
	this.datasetsList.update(opts.dataset.id, opts.dataset);
	return cb(null, this.getDataset(opts.dataset.id));
};

// Refresh a dataset
DocumentHandler.prototype.refreshDataset = function(id) {
	let self = this,
		dataset = this.getDataset(id);
	this.datasetsList.update(id, dataset);
	if (this.datasetForm.currentId() === id)
		this.datasetForm.updateDataset(
			dataset,
			{ isCurator: this.user.isCurator || this.user.isAnnotator },
			function(err, res) {
				if (err) console.log(`dataset not selected`);
				else console.log(`dataset refreshed`);
			}
		);
};

// return index of dataset
DocumentHandler.prototype.getDatasetIndex = function(id) {
	for (let i = 0; i < this.datasets.current.length; i++) {
		if (this.datasets.current[i].id === id) return i;
	}
	return -1;
};

// Get the next dataset (or undefined)
DocumentHandler.prototype.getNextDataset = function(id) {
	let dataset = this.getDataset(id),
		firstChoice = this.datasetsList.getFirstDatasetIdNotValid(dataset.id),
		secondChoice = this.datasetsList.getFirstDatasetId();
	if (firstChoice) return this.getDataset(firstChoice);
	else if (secondChoice) return this.getDataset(secondChoice);
	return dataset;
};

// Get the dataset with given id (or undefined)
DocumentHandler.prototype.getDataset = function(id) {
	for (let i = 0; i < this.datasets.current.length; i++) {
		if (this.datasets.current[i].id === id) return this.datasets.current[i];
	}
	return null;
};

// Get the dataset with given id (or undefined)
DocumentHandler.prototype.datasetExist = function(id) {
	for (let i = 0; i < this.datasets.current.length; i++) {
		if (this.datasets.current[i].id === id) return true;
	}
	return false;
};

// Get the dataset with given id (or undefined)
DocumentHandler.prototype.dataInstanceExist = function(id) {
	for (let i = 0; i < this.datasets.current.length; i++) {
		if (this.datasets.current[i].dataInstanceId === id) return true;
	}
	return false;
};

// Link some elements to the documentHandler
DocumentHandler.prototype.link = function(opts = {}) {
	let self = this;
	if (opts.documentView) {
		this.documentView = opts.documentView;
		
		this.documentView.init({
			pdf: this.pdf,
			xml: this.tei,
			colors: this.colors,
		}, function() {
			console.log(`documentView ready !`);
			if (typeof self.events.onDocumentViewReady === `function`) self.events.onDocumentViewReady();
			
			return self.isReady(`documentView`, true);
		});
	}
	// Init datasetForm First
	if (opts.datasetForm) {
		this.datasetForm = opts.datasetForm;
		this.isReady(`datasetForm`, true);
		this.datasetForm.loadResources(this.datatypes);
		console.log(`datasetForm ready !`);
	}
	// the datasetsList
	if (opts.datasetsList) {
		this.datasetsList = opts.datasetsList;
		// Load data in datasetsList
		this.datasetsList.load(this.datasets.current, function() {
			console.log(`datasetsList ready !`);
		});
		this.isReady(`datasetsList`, true);
	}
	this.synchronize();
};

DocumentHandler.prototype.filterDatasetsByDataType = function () {
	return this.datasets.current.filter((dataset) => dataset.datasetType === this.activeDatasetType)
}

// Get the dataset DataType 
DocumentHandler.prototype.getDatasetDataType = function (dataset) {
	const isMaterial = () => dataset.dataType === 'lab materials' ||
		(dataset.dataType === 'other' && dataset.subType === 'reagent');

	const isCode = () => dataset.dataType === 'code software' ||
		(dataset.dataType === 'other' && dataset.subType === 'code');

	const isProtocol = () => dataset.dataType === 'other' && dataset.subType === 'protocol';

	if (isMaterial()) return 'material';
	if (isCode()) return 'code';
	if (isProtocol()) return 'protocol';

	return 'dataset';
};

// Set active dataset type
DocumentHandler.prototype.setActiveDatasetType = function (id) {
	const self = this;
	const currentDatasets = self.datasets.current;

	// Update Active Dataset Type
	self.activeDatasetType = id;
	for (let i = 0; i < currentDatasets.length; i++) {
		if (currentDatasets[i].datasetType === self.activeDatasetType) {
			self.documentView.colorizeLink(currentDatasets[i]);
		} else {
			self.documentView.decolorizeLink(currentDatasets[i]);
		}
	}
};

// Resync Json DataTypes
DocumentHandler.prototype.resyncJsonDataTypes = function(callback) {
	return API.dataseerML.resyncJsonDataTypes(function(err, res) {
		return callback(err, res);
	});
}

// DocumentHandler synchronization
DocumentHandler.prototype.synchronize = function() {
	let self = this;
	
	if (this.documentView) {
		// Attach documentView events
		this.documentView.attach(`onDatasetClick`, function(sentence) {
			self.events.onDatasetClick(sentence)
		});
		this.documentView.attach(`onSentenceClick`, function(sentence) {
			return self.selectSentence({ sentence: sentence, disableSelection: true });
		});
		this.documentView.attach(`onFulltextView`, function() {
			return self.refreshSentencesMapping();
		});
		this.documentView.attach(`onSectionView`, function() {
			return self.refreshSentencesMapping();
		});
		this.documentView.attach(`onParagraphView`, function() {
			return self.refreshSentencesMapping();
		});
		this.documentView.attach(`onPdfView`, function() {
			return self.refreshSentencesMapping();
		});
	}
		
	// Attach datasetsList events
	if (this.datasetsList) {
		this.datasetsList.attach(`onDatasetLoaded`, function(dataset) {
			console.log('onDatasetLoaded');
		});
		this.datasetsList.attach(`onImportDatasetsClick`, function() {
			let source = prompt(
				`Enter the ID of the document containing the datasets you want to import (it will take a few seconds)`
			);
			if (source === null) return;
			let match = source.match(/[a-f0-9]{24}/gm);
			console.log(source, !Array.isArray(match), match);
			if (source === `` || !Array.isArray(match) || match.length !== 1)
				return alert(`Bad document ID`);
			$(`body`).css(`cursor`, `progress`);
			return API.documents.importDatasets(
				{ source: source, target: self.ids.document },
				function(err, query) {
					console.log(err, query);
					$(`body`).css(`cursor`, `default`);
					if (err || query.err) return alert(`An error has occured`);
					let infos = `${query.res.existing.length} already existing dataset(s)\n${query.res.merged.length} dataset(s) merged\n${query.res.rejected.length} dataset(s) rejected`;
					alert(infos);
					if (query.res.rejected.length) {
						alert(`More infos about rejected dataset(s)`);
						for (var i = 0; i < query.res.rejected.length; i++) {
							let dataset = query.res.rejected[i];
							let lines = [
								`${i + 1}/${query.res.rejected.length}`,
								`(${dataset.id}) ${dataset.name} : ${dataset.dataType} ${dataset.subType}`,
								`${dataset.sentences
									.map(function(s) {
										return s.text;
									})
									.join(`\n`)}`
							];
							alert(lines.join(`\n`));
						}
					}
					window.location.reload();
				}
			);
		});
		this.datasetsList.attach(`onDetectNewSentencesClick`, function() {
			let pages = prompt(
				`Enter the range of page numbers you wish to process (e.g. : 1-5, 8, 11-13)\nIt will take 20-30 seconds per page`
			);
			if (pages === null) return;
			$(`body`).css(`cursor`, `progress`);
			return API.documents.detectNewSentences(
				{ id: self.ids.document, params: { pages: pages } },
				function(err, query) {
					console.log(err, query);
					$(`body`).css(`cursor`, `default`);
					if (err || query.err) return alert(`An error has occured`);
					alert(`Process done. It will automatically refresh this page`);
					window.location.reload();
				}
			);
		});
		this.datasetsList.attach(`onDatasetClick`, function(dataset) {
				self.selectSentence({
					sentence: dataset.sentence, // this data contain the current selected sentence
					selectedDataset: dataset
				});
		});
		this.datasetsList.attach(`onDatasetCheck`, function(dataset) {
			// console.log(dataset);
		});
		this.datasetsList.attach(`onDatasetDelete`, function(dataset) {
			let sentence = dataset.sentences[0];
			return self.deleteDataset(dataset.id, function() {
				return self.selectSentence({ sentence: sentence });
			});
		});
		this.datasetsList.attach(`onDatasetLink`, function(dataset) {
			console.log(dataset);
			let selectedSentences = self.documentView.getSelectedSentences();
			if (selectedSentences.length === 0)
				return self.showModalError({
					title: `Error: Link sentence to dataset`,
					body: `You must select a sentence before linking it to the dataset`
				});
			else
				return self.newLinks(
					{ dataset: { id: dataset.id }, sentences: selectedSentences },
					function(err, dataset) {
						if (err) return console.log(err);
						return self.selectSentence({
							sentence: selectedSentences[selectedSentences.length - 1]
						});
					}
				);
		});
		this.datasetsList.attach(`onNewDatasetClick`, function() {
			let selectedSentences = self.documentView.getSelectedSentences();
			if (selectedSentences.length === 0)
				return self.showModalError({
					title: `Error: New dataset`,
					body: `You must select a sentence to create a new dataset`
				});
			else
				return self.newDataset(selectedSentences, function(err, dataset) {
					if (err) return console.log(err);
					return self.selectSentence({
						sentence: dataset.sentences[0],
						selectedDataset: dataset
					});
				});
		});
		this.datasetsList.attach(`onMergeSelectionClick`, function(ids) {
			// console.log(ids);
			if (ids.length <= 1)
				return self.showModalError({
					title: `Error: Merge selection`,
					body: `You must select at least two datasets`
				});
			else {
				let id = ids[0].id,
					dataset = self.getDataset(id);
				return self.mergeDatasets(ids, function() {
					return self.selectSentence({
						sentence: dataset.sentences[0],
						selectedDataset: dataset
					});
				});
			}
		});
		this.datasetsList.attach(`onDeleteSelectionClick`, function(ids) {
			// console.log(ids);
			if (ids.length <= 0)
				return self.showModalError({
					title: `Error: Delete selection`,
					body: `You must select at least one dataset`
				});
			else {
				let dataset = self.getNextDataset(ids[ids.length - 1].id),
					nextId = dataset.id;
				return self.deleteDatasets(ids, function() {
					return self.selectSentence({
						sentence: dataset.sentences[0],
						selectedDataset: dataset
					});
				});
			}
		});
	}
	
	/* 	
		if (this.datasetForm) {
			// Attach datasetsList events
			this.datasetForm.attach(`onPropertyChange`, function(property, value) {
				// console.log(property, value);
				let dataset = self.datasetForm.getDataset();
				self.modified(dataset.id);
				self.updateDataset(dataset.id, dataset);
				self.autoSave(dataset.id);
				if (property === `highlight`)
					if (value) self.datasetsList.highlight(dataset.id);
					else self.datasetsList.unhighlight(dataset.id);
			});
			this.datasetForm.attach(`onLeave`, function() {
				let dataset = self.datasetForm.getDataset();
				self.saveDataset(dataset.id);
			});
			this.datasetForm.attach(`onDatasetIdClick`, function(dataset) {
				let sentence = self.datasetForm.currentSentence();
				if (dataset.id)
					return self.selectSentence({ sentence: sentence, selectedDataset: dataset });
			});
			this.datasetForm.attach(`onDatasetDoneClick`, function(dataset) {
				// console.log(dataset);
				if (!self.user.isCurator) {
					if (!dataset.dataType) {
						return self.showModalError({
							title: `Missing data`,
							body: `To validate, please provide a datatype (predefined or custom)`
						});
					}
					if (!dataset.name)
						return self.showModalError({
							title: `Missing data`,
							body: `To validate, please provide a name for this dataset`
						});
					if (!dataset.DOI && !dataset.comments) {
						return self.showModalError({
							title: `Missing data`,
							body: `To validate, please provide either a DOI for the dataset or a comment in the comment box`
						});
					}
				}
				if (self.hasChanged[dataset.id]) self.autoSave(dataset.id);
				let nextDataset = self.getNextDataset(dataset.id);
				return self.selectSentence({
					sentence: nextDataset.sentences[0],
					selectedDataset: nextDataset
				});
			});
			this.datasetForm.attach(`onDatasetUnlinkClick`, function(dataset) {
				let sentence = self.datasetForm.currentSentence(),
					modifiedDataset = self.getDataset(dataset.id);
				if (!modifiedDataset) return console.log(`bad dataset id`);
				if (!modifiedDataset.sentences) return console.log(`empty sentences`);
				if (modifiedDataset.sentences.length === 1) {
					let sentence = modifiedDataset.sentences[0];
					return self.deleteDataset(dataset.id, function() {
						return self.selectSentence({ sentence: sentence });
					});
				} else
					return self.deleteLink({ dataset: dataset, sentence: sentence }, function(err) {
						if (err) return console.log(err);
						return self.selectSentence({ sentence: sentence });
					});
			});
			
			// No corresponding element at the moment
			this.datasetForm.attach(`onTabClick`, function(data) {
				console.log(`onTabClick`);
				return self.selectSentence({ sentence: data.sentence, selectedDataset: data.dataset });
			});
			
			// No corresponding element at the moment
			this.datasetForm.attach(`onRefreshDatatypesClick`, function(done) {
				return API.dataseerML.resyncJsonDataTypes(function(err, res) {
					console.log(err, res);
					return done();
				});
			});
			
			// No corresponding element at the moment
			this.datasetForm.attach(`onDisplayLeftClick`, function() {
				self.documentView.displayRight();
			});
			
			// No corresponding element at the moment
			this.datasetForm.attach(`onDisplayRightClick`, function() {
				self.documentView.displayLeft();
			});
		}
	*/
};
