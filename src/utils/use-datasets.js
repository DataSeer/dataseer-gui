/* eslint-disable */
const DATATYPE_COLORS = {
	code: {
		background: {
			border: 'rgb(114, 93, 189)',
			rgb: 'rgb(232,215,255)'
		},
		foreground: 'black'
	},
	material: {
		background: {
			border: 'rgb(210, 112, 68)',
			rgb: 'rgb(244,219,208)'
		},
		foreground: 'black'
	},
	protocol: {
		background: {
			border: 'rgb(64, 164, 105)',
			rgb: 'rgb(206,244,222)'
		},
		foreground: 'black'
	},
	dataset: {
		background: {
			border: 'rgb(0, 106, 201)',
			rgb: 'rgb(243,252,255)'
		},
		foreground: 'black'
	}
};

const formatDataset = dataset => {
	const datasetType = getDatasetDataType(dataset);

	Object.assign(dataset, {
		datasetType: datasetType,
		color: DATATYPE_COLORS[datasetType]
	});

	return dataset;
};

const getDatasetDataType = dataset => {
	const isMaterial = () =>
		dataset.kind === 'reagent' ;

	const isCode = () =>
		dataset.kind === 'code' || dataset.kind === 'software' ;

	const isProtocol = () =>
		dataset.kind === 'protocol' ;

	const isDataset = () =>
		dataset.kind === 'dataset' ;

	if (isMaterial()) return 'material';
	if (isCode()) return 'code';
	if (isProtocol()) return 'protocol';
	if (isDataset()) return 'dataset';

	return dataset.kind;
};

const setDatasetDataType = (dataset, datasetType) => {
	switch (datasetType) {
		case 'code':
			return {
				...dataset,
				dataType: 'other',
				subType: 'code'
			};
		case 'material':
			return {
				...dataset,
				dataType: 'other',
				subType: 'reagent'
			};
		case 'protocol':
			return {
				...dataset,
				dataType: 'other',
				subType: 'protocol'
			};
		default:
			return dataset;
	}
};

export { DATATYPE_COLORS, formatDataset, setDatasetDataType, getDatasetDataType };
