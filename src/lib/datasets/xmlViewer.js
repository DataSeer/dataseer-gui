/* eslint-disable */


/**
 * Internal Dependencies
 */
import { DATATYPE_COLORS } from '@/utils/use-datasets'
const XmlViewer = function(id, screenId, events = {}) {
	let self = this;
	this.containerId = id;
	this.screenId = screenId;
	// HTML elements
	this.screen = $(`#${this.screenId}`);
	this.screenElement = this.screen.get(0);
	this.viewerId = id + `Viewer`;
	this.container = $(`#${this.containerId}`);
	this.containerElement = this.container.get(0);
	this.viewer = $(`<div id="${this.viewerId}" class="xmlViewer"></div>`);
	this.viewerElement = this.viewer.get(0);
	this.dataInstancesList = null;
	this.dataInstancesListElement = null;
	this.datasetsList = null;
	this.datasetsListElement = null;
	this.activeDatasetType = null;
	
	this.container.append(this.viewer);
	// Events
	this.events = events;
	this.sentencesMapping = { object: undefined, array: undefined };
	// Data
	this.datasets = null
	return this;
};

// Attach event
XmlViewer.prototype.attach = function(event, fn) {
	this.events[event] = fn;
};

// Get order of appearance of sentences
XmlViewer.prototype.getSentences = function(selectedSentences, lastSentence) {
	let sentences = [lastSentence].concat(selectedSentences),
		min = Infinity,
		max = -Infinity;
	for (let i = 0; i < sentences.length; i++) {
		let index = this.sentencesMapping.array.indexOf(sentences[i].id);
		min = index > -1 && index < min ? index : min;
		max = index > -1 && index > max ? index : max;
	}
	if (min !== Infinity && max !== -Infinity)
		return this.sentencesMapping.array.slice(min, max + 1);
	else return [];
};

// Get order of appearance of sentences
XmlViewer.prototype.getSentencesMapping = function() {
	if (typeof this.sentencesMapping.object !== `undefined`) return this.sentencesMapping.object;
	let result = {};
	this.viewer.find(`s[xml\\:id]`).map(function(i, el) {
		result[$(el).attr(`xml:id`)] = i;
	});
	this.sentencesMapping.object = result;
	this.sentencesMapping.array = new Array(Object.keys(result).length);
	for (var key in result) {
		this.sentencesMapping.array[parseInt(result[key])] = key;
	}
	return result;
};

// hoverSentence
XmlViewer.prototype.hoverSentence = function(sentence) {
	return this.viewer.find(`s[xml\\:id="${sentence.id}"]`).addClass(`hover`);
};

// endHoverSentence
XmlViewer.prototype.endHoverSentence = function(sentence) {
	return this.viewer.find(`s[xml\\:id="${sentence.id}"]`).removeClass(`hover`);
};

// Scroll to a sentence
XmlViewer.prototype.scrollToSentence = function(sentence, cb) {
	if (sentence && sentence.id) {
		let el = this.viewer.find(`s[xml\\:id="${sentence.id}"]`).first(),
			position = el.position(),
			top = position ? position.top : 0;
		return cb(top);
	} else return cb(0);
};

// Select a sentence
XmlViewer.prototype.selectSentence = function(sentence) {
	let el = this.viewer
		.find(`s[xml\\:id="${sentence.id}"]`)
		.removeClass(`hover`)
		.addClass(`selected`);
};

// Unselect a sentence
XmlViewer.prototype.unselectSentence = function(sentence) {
	let el = this.viewer.find(`s[xml\\:id="${sentence.id}"]`).removeClass(`selected`);
};

// Select a sentence
XmlViewer.prototype.getInfosOfSentence = function(sentence) {
	let el = this.viewer.find(`s[xml\\:id="${sentence.id}"]`);
	if (el.get(0)) {
		let hasDatasets = typeof el.attr(`corresp`) !== `undefined`,
			dataInstanceIds = hasDatasets
				? el
						.attr(`corresp`)
						.replace(`#`, ``)
						.split(` `)
				: [];
		return {
			id: el.attr(`xml:id`),
			dataInstanceIds: dataInstanceIds,
			hasDatasets: hasDatasets,
			isSelected: el.hasClass(`selected`),
			text: el.text()
		};
	}
};

// Add a dataset
XmlViewer.prototype.addDataset = function(dataset, sentence) {
	let $dataset = $(`<dataset id="${dataset.id}">`),
		$dataInstance = $(`<dataInstance id="${dataset.dataInstanceId}">`);
	if (this.datasetsList.find(`dataset[xml\\:id="${dataset.id}"]`).length === 0)
		this.datasetsList.append($dataset);
	if ( this.dataInstancesList.find(`dataInstance[xml\\:id="${dataset.dataInstanceId}"]`).length === 0 )
		this.dataInstancesList.append($dataInstance);
	if ( this.datasets[dataset.dataInstanceId] === undefined ) {
		this.datasets[dataset.dataInstanceId] = dataset;
	}
	
	this.addLink(dataset, sentence);
};

// Remove a dataset
XmlViewer.prototype.removeDataset = function(dataset) {
	let $dataset = this.datasetsList.find(`dataset[xml\\:id="${dataset.id}"]`),
		$dataInstance = this.dataInstancesList.find(
			`dataInstance[xml\\:id="${dataset.dataInstanceId}"]`
		);
	if ($dataset.length === 1) $dataset.remove();
	if ($dataInstance.length === 1) $dataInstance.remove();
	if ( this.datasets[dataset.dataInstanceId] !== undefined ) delete this.datasets[dataset.dataInstanceId]
	
	this.removeLinks(dataset);
};

// Set active dataset type
XmlViewer.prototype.setActiveDatasetType = function (datasetType) {
	const self = this;
	if (!datasetType) return;
	self.activeDatasetType = datasetType;
	const datasets = self.datasets;

	// Color corresps
	this.viewer.find(`s[corresp]`).map(function() {
		const el = $(this);
		const dataInstanceIds = el
			.attr(`corresp`)
			.replace(/#/gm, ``)
			.split(` `);
		
		dataInstanceIds.map(function(dataInstanceId) {
			if (datasets[dataInstanceId]?.datasetType && dataInstanceIds.some((dataInstanceId) => datasets[dataInstanceId]?.datasetType === datasetType)) {
				self.colorize(datasets[dataInstanceId], { id: el.attr(`xml:id`) });
			} else {
				self.uncolorize(dataInstanceId, { id: el.attr(`xml:id`) });
			}
		});
	});
};

// colorize a sentence
XmlViewer.prototype.colorize = function(dataset, sentence) {
	const self = this;
	const el = this.viewer.find(`s[xml\\:id="${sentence.id}"]`);
	const colors = DATATYPE_COLORS[self.activeDatasetType];
	
	if (
		el.get(0) &&
		dataset &&
		colors &&
		colors.foreground &&
		colors.background &&
		colors.background.rgb &&
		colors.background.border
	) {
		el.css(`color`, colors.foreground)
			.css(`background-color`, colors.background.rgb)
			.css(`border-color`, colors.background.border);
	}
};

// uncolorize a sentence
XmlViewer.prototype.uncolorize = function (dataInstanceId, sentence) {
	let el = this.viewer.find(`s[xml\\:id="${sentence.id}"]`);
	if (el.get(0)) {
		el.removeAttr(`colors`)
			.css(`color`, ``)
			.css(`background-color`, ``)
			.css(`border-color`, ``);
	}
};

// Add a Link
XmlViewer.prototype.addLink = function(dataset, sentence) {
	let el = this.viewer.find(`s[xml\\:id="${sentence.id}"]`);
	if (el.get(0)) {
		if (!el.attr(`corresp`)) el.attr(`corresp`, `#${dataset.dataInstanceId}`);
		else
			el.attr(
				`corresp`,
				(
					el.attr(`corresp`).replace(`#${dataset.dataInstanceId}`, ``) +
					` #${dataset.dataInstanceId}`
				).trim()
			);
		return this.colorize(dataset, sentence);
	}
};

// Get all links
XmlViewer.prototype.getLinks = function(dataset) {
	return this.viewer
		.find(`s[corresp]`)
		.get()
		.reduce(function(acc, item) {
			let el = $(item);
			if (el.attr(`corresp`).indexOf(`#${dataset.dataInstanceId}`) > -1)
				acc.push({
					sentence: { id: el.attr(`xml:id`), text: el.text() },
					dataset: { id: dataset.id, dataInstanceId: dataset.dataInstanceId }
				});
			return acc;
		}, []);
};

// Remove links
XmlViewer.prototype.removeLinks = function(dataset) {
	let self = this;
	dataset.sentences.map(function(sentence) {
		self.removeLink(dataset, sentence);
	});
};

// Remove a link
XmlViewer.prototype.removeLink = function(dataset, sentence) {
	let el = this.viewer.find(`s[xml\\:id="${sentence.id}"]`);
	if (el.get(0)) {
		let nbCorresps = el.attr(`corresp`).split(` `).length;
		if (nbCorresps === 1) {
			el.removeAttr(`corresp`)
				.removeAttr(`colors`, ``)
				.css(`color`, ``)
				.css(`background-color`, ``)
				.css(`border-color`, ``);
		} else {
			el.attr(
				`corresp`,
				el
					.attr(`corresp`)
					.replace(`#${dataset.dataInstanceId}`, ``)
					.trim()
			);
			this.uncolorize(dataset.dataInstanceId, sentence);
		}
	}
};

// Render the XML
XmlViewer.prototype.load = function(opts = {}, cb) {
	let self = this;
	this.activeDatasetType = opts.activeDatasetType ? opts.activeDatasetType : undefined;
	this.sentencesMapping = opts.mapping ? opts.mapping : {};
	this.viewer.html(opts.xmlString);
	// Init events
	this.viewer
		.find(`s`)
		.click(function() {
			let el = $(this);
			if (typeof self.events.onClick === `function`)
				return self.events.onClick({ id: el.attr(`xml:id`) });
		})
		.hover(
			// in
			function() {
				let el = $(this);
				if (typeof self.events.onHover === `function`)
					return self.events.onHover({ id: el.attr(`xml:id`) });
			},
			// out
			function() {
				let el = $(this);
				if (typeof self.events.onEndHover === `function`)
					return self.events.onEndHover({ id: el.attr(`xml:id`) });
			}
		);

	this.dataInstancesList = this.viewer.find(`list[type="dataInstance"]`);
	if (this.dataInstancesList.length === 0) {
		this.dataInstancesList = $(`<list type="dataInstance">`);
	}
	this.dataInstancesListElement = this.dataInstancesList.get(0);
	this.datasetsList = this.viewer.find(`list[type="dataset"]`);
	if (this.datasetsList.length === 0) {
		this.datasetsList = $(`<list type="dataset">`);
	}
	this.datasetsListElement = this.dataInstancesList.get(0);
	
	let datasets = {};
	let links = [];
	let dataInstances = {};
	
	this.dataInstancesList.find(`dataInstance`).map(function() {
		let el = $(this),
			datasetId = el.attr(`corresp`).replace(`#`, ``),
			dataInstanceId = el.attr(`xml:id`),
			cert = el.attr(`cert`),
			reuse = el.attr(`reuse`);
		dataInstances[datasetId] = dataInstanceId;
		datasets[dataInstanceId] = {
			dataInstanceId: dataInstanceId,
			id: datasetId,
			cert: cert,
			reuse: reuse
		};
	});
	
	this.datasetsList.find(`dataset`).map(function() {
		let el = $(this),
			datasetId = el.attr(`xml:id`),
			type = el.attr(`type`),
			subtype = el.attr(`subtype`);
		datasets[dataInstances[datasetId]].color = opts.colors[datasetId];
		datasets[dataInstances[datasetId]].type = type;
		datasets[dataInstances[datasetId]].subtype = subtype;
		datasets[dataInstances[datasetId]].datasetType = opts.colors[datasetId]?.datasetType ? opts.colors[datasetId].datasetType : undefined;
	});

	this.datasets = datasets;
	
	// Color active sentences
	this.viewer.find(`s[corresp]`).map(function() {
		const el = $(this);
		const dataInstanceIds = el.attr(`corresp`).replace(/#/gm, ``) .split(` `);
		
		dataInstanceIds.map(function(dataInstanceId) {
			links.push({
				sentence: { id: el.attr(`xml:id`) },
				dataset: datasets[dataInstanceId],
				datasetType: datasets[dataInstanceId].datasetType
			});

			if ( datasets[dataInstanceId]?.datasetType === self.activeDatasetType) {
				self.colorize(datasets[dataInstanceId], { id: el.attr(`xml:id`) });
			}
		});
	});

	return cb({
		colors: opts.colors,
		links: links,
		activeDatasetType: opts.activeDatasetType
	});
};

export default XmlViewer;
