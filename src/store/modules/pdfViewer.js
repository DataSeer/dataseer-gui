/* eslint-disable */
// State
const state = {
	isMerging: false,
	dataTypes: {},
	documentHandler: {},
	datasets: [],
	datasetsForMerge: [],
	activeDataset: undefined,
}

// Getters
const getters = {
	documentHandler: state => state.documentHandler,
	activeDataset: state => state.activeDataset,
	activeDatasetId: state => state.activeDataset?.id,
	dataTypes: state => state.dataTypes,
	mergeState: state => state.isMerging,
	datasetsForMerge: state => state.datasetsForMerge,
	datasets: state => state.datasets,
}

// Actions
const actions = {
	mergeDatasets({state, commit}) {
		const datasetsToMerge = state.datasets.filter(dataset => state.datasetsForMerge.some((id) => id === dataset.id ));
		const documentHandler = state.documentHandler;

		documentHandler.mergeDatasets(datasetsToMerge, () => {
			commit('SET_MERGE_DATASETS', [])
		});
	},
	addDatasetForMerge({ commit, state }, datasetId){
		const datasets  = state.datasetsForMerge
		datasets.push(datasetId)
		commit('SET_MERGE_DATASETS', datasets)
	},
	removeDatasetForMerge({ commit }, datasetId){
		const datasets  = state.datasetsForMerge
		datasets.splice(datasets.findIndex((el) => el === datasetId), 1)
		
		commit('SET_MERGE_DATASETS', datasets)
	},
	setMergeState({ commit }, value) {
		commit('SET_MERGE_STATE', value)
	},
	setDataTypes({commit}, dataTypes ) {
		commit('SET_DATA_TYPES', dataTypes)
	},
	setActiveDataset({commit}, dataset ) {
		commit('SET_ACTIVE_DATASET', dataset)
	},
	setDocumentHandler({commit}, documentHandler ) {
		commit('SET_DOCUMENT_HANDLER', documentHandler)
	},
	setDatasets({commit}, datasets ) {
		commit('SET_DATASETS', datasets)
	},
	clearState({commit} ) {
		commit('CLEAR_STATE')
	}
}

// Mutations
const mutations = {
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
	SET_DOCUMENT_HANDLER(state, payload) {
        state.documentHandler = payload;
    },
	CLEAR_STATE(state ) {
        state.dataTypes = {};
		state.documentHandler = {};
		state.datasets = [];
		state.datasetsForMerge = [];
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
