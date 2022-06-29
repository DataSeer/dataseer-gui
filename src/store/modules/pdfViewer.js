// State
const state = {
	document: undefined,
	documentHandler: {},
	
	datasets: [],
	dataTypes: {},
	
	activeDataset: undefined,
	activeDatasetType: 'dataset',
	activeSentence: undefined,
	
	datasetsForMerge: [],
	isMerging: false,
	
	datasetTypes: [
		{
			label: 'Datasets',
			icon: 'datasets',
			id: 'dataset',
		},
		{
			label: 'Code',
			icon: 'brackets',
			id: 'code',
		},
		{
			label: 'Materials',
			icon: 'flask',
			id: 'material',
		},
		{
			label: 'Protocols',
			icon: 'protocols',
			id: 'protocol',
		},
	],
}

// Getters
const getters = {
	document: state => state.document,
	documentUsername: state => state.document.owner.username,
	documentHandler: state => state.documentHandler,
	activeDatasetType: state => state.activeDatasetType,
	activeDataset: state => state.activeDataset,
	activeDatasetId: state => state.activeDataset?.id || undefined,
	activeSentence: state => state.activeSentence,
	dataTypes: state => state.dataTypes,
	datasetTypes: state => state.datasetTypes,
	mergeState: state => state.isMerging,
	datasetsForMerge: state => state.datasetsForMerge,
	datasets: state => state.datasets,
	filteredDatasets: state => state.datasets.filter( dataset => !state.activeDatasetType || dataset.datasetType === state.activeDatasetType ),
	publicURL: state => `${window.location.origin}/#/documents/${state.document._id}/datasets?token=${state.document.token}`,
	uploadedFileURl: state => `${process.env.VUE_APP_BASE_API_URL}/documents/${state.document._id}/pdf/content?token=${state.document.token}`, 
}

// Actions
const actions = {
	setDocument({commit}, document ) {
		commit('SET_DOCUMENT', document)
	},
	setDocumentHandler({commit}, documentHandler ) {
		commit('SET_DOCUMENT_HANDLER', documentHandler)
	},
	setDataTypes({commit}, dataTypes ) {
		commit('SET_DATA_TYPES', dataTypes)
	},
	setDatasets({commit}, datasets ) {
		commit('SET_DATASETS', datasets)
	},
	updateDataset({commit}, newDataset ) {
		commit('UPDATE_DATASET', newDataset )
	},
	setActiveDataset({state, commit, getters, dispatch }, { dataset, scrollToSentence }) {
		const documentHandler = state.documentHandler;
		if (!dataset) {
			commit('SET_ACTIVE_DATASET', undefined);
			documentHandler.setActiveDatasetId(undefined);
			
			return
		}
		
		if (dataset && dataset.id === getters.activeDatasetId) return
		
		documentHandler.setActiveDatasetId(dataset.id);
		
		if (scrollToSentence) {
			documentHandler.selectSentence({
				id: dataset.id,
				sentences: dataset.sentences,
				sentence: {
					id: dataset.sentences[0].id
				}
			})
		}

		if ( dataset.datasetType !== state.activeDatasetType) {
			dispatch('setActiveDatasetType', dataset.datasetType )
		}
		
		commit('SET_ACTIVE_DATASET', dataset);
	},
	setActiveDatasetType({ state, commit }, datasetType) {
		// Do nothing if the datasetType is already active
		if (datasetType && datasetType === state.activeDatasetType) return;
		const documentHandler = state.documentHandler;

		documentHandler.setActiveDatasetType(datasetType, () => {
			commit('SET_ACTIVE_DATASET_TYPE', datasetType);
		});
	},
	setActiveSentence({ commit }, sentence) {
		commit('SET_ACTIVE_SENTENCE', sentence)
	},
	addSentenceToDataset({state}) {
		const documentHandler = state.documentHandler;
		documentHandler.datasetsList.events.onNewDatasetClick();
	},
	unlinkSentenceFromDataset() {
		const { documentHandler, activeDataset, activeSentence }  = state
		
		if (!activeDataset) return console.log(`bad dataset id`);
		if (!activeDataset.sentences) return console.log(`empty sentences`);
		
		if (activeDataset.sentences.length === 1) {
			let sentence = activeDataset.sentences[0];
			return documentHandler.deleteDataset(activeDataset.id, function() {
				return documentHandler.selectSentence({ sentence: sentence });
			});
		} else
			return documentHandler.deleteLink({ dataset: activeDataset, sentence: activeSentence }, function(err) {
				if (err) return console.log(err);
				return documentHandler.selectSentence({ sentence: activeSentence });
			});
	},
	linkSentenceToDataset({state}, datasetId) {
		const documentHandler = state.documentHandler;
		const selectedDataset = state.datasets.filter(dataset => dataset.id === datasetId)[0];
		
		documentHandler.datasetsList.events.onDatasetLink(selectedDataset);
	},
	mergeDatasets({state, commit, dispatch}) {
		const datasetsToMerge = state.datasets.filter(dataset => state.datasetsForMerge.some((id) => id === dataset.id ));
		const documentHandler = state.documentHandler;

		const newDataset = documentHandler.getDataset(datasetsToMerge[0].id);

		documentHandler.mergeDatasets(datasetsToMerge, () => {
			commit('SET_MERGE_DATASETS', [])
			commit('SET_MERGE_STATE', false)

			dispatch('setActiveDataset', {
				dataset: newDataset,
				scrollToSentence: false
			})
		});
	},
	addDatasetForMerge({ commit, state }, datasetId){
		const datasets  = state.datasetsForMerge
		datasets.push(datasetId)
		commit('SET_MERGE_DATASETS', datasets)
	},
	setMergeState({ commit }, value) {
		commit('SET_MERGE_STATE', value)
	},
	removeDatasetForMerge({ commit }, datasetId){
		const datasets  = state.datasetsForMerge
		datasets.splice(datasets.findIndex((el) => el === datasetId), 1)
		
		commit('SET_MERGE_DATASETS', datasets)
	},
	resyncJsonDataTypes({ commit }){
		const documentHandler = state.documentHandler;

		documentHandler.resyncJsonDataTypes((err, res) => {
			if (err) return
			
			commit('SET_DATA_TYPES', res);
		})
	},
	detectSentences() {
		state.documentHandler.datasetsList.events.onDetectNewSentencesClick();
	},
	importDatasets() {
		state.documentHandler.datasetsList.events.onImportDatasetsClick();
	},
	clearState({commit} ) {
		commit('CLEAR_STATE')
	}
}

// Mutations
const mutations = {
	SET_DOCUMENT(state, payload) {
		state.document = payload
	},
	SET_DATASETS(state, payload) {
		state.datasets = payload
	},
	SET_MERGE_DATASETS(state, payload) {
        state.datasetsForMerge = payload;
    },
	SET_MERGE_STATE(state, payload) {
        state.isMerging = payload;
    },
	SET_DATA_TYPES(state, payload) {
        state.dataTypes = payload;
    },
	SET_ACTIVE_DATASET(state, payload) {
        state.activeDataset = payload;
    },
	SET_ACTIVE_DATASET_TYPE(state, payload) {
		state.activeDatasetType = payload;
	},
	SET_DOCUMENT_HANDLER(state, payload) {
        state.documentHandler = payload;
    },
	SET_ACTIVE_SENTENCE(state, payload) {
		state.activeSentence = payload;
	},
	UPDATE_DATASET(state, payload) {
		state.datasets = [...state.datasets.map(item => item.id === payload.id ? payload : item)];
	},
	CLEAR_STATE(state ) {
        state.dataTypes = {};
		state.documentHandler = {};
		state.datasets = [];
		state.datasetsForMerge = [];
		state.document = undefined;
		state.activeDataset = undefined;
    },
}

export default {
    namespaced: true,
    state,
	getters,
    actions,
    mutations,
};
