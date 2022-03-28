const DATATYPE_COLORS = {
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

const formatDatasets = (datasets) => {
	for (let i = 0; i < datasets.length; i++) {
		const datasetType = getDatasetDataType(datasets[i]);
		
		datasets[i].color = DATATYPE_COLORS[datasetType];
		datasets[i].datasetType = datasetType;
	}
};

const getDatasetDataType = (dataset) => {
	const isMaterial = () =>
		dataset.dataType === 'lab materials' ||
		(dataset.dataType === 'other' && dataset.subType === 'reagent');

	const isCode = () =>
		dataset.dataType === 'code software' ||
		(dataset.dataType === 'other' && dataset.subType === 'code');

	const isProtocol = () => dataset.dataType === 'other' && dataset.subType === 'protocol';

	if (isMaterial()) return 'material';
	if (isCode()) return 'code';
	if (isProtocol()) return 'protocol';

	return 'dataset';
};

const filterDatasetsByDataType = (dataset) => {
	const isMaterial = () =>
		dataset.dataType === 'lab materials' ||
		(dataset.dataType === 'other' && dataset.subType === 'reagent');

	const isCode = () =>
		dataset.dataType === 'code software' ||
		(dataset.dataType === 'other' && dataset.subType === 'code');

	const isProtocol = () => dataset.dataType === 'other' && dataset.subType === 'protocol';

	if (isMaterial()) return 'material';
	if (isCode()) return 'code';
	if (isProtocol()) return 'protocol';

	return 'dataset';
};

export {
	formatDatasets,
	getDatasetDataType,
	filterDatasetsByDataType
};
