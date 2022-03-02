// State
const state = {
	dataTypes: {},
	documentHandler: {},
	activeDataset: undefined,
}

// Getters
const getters = {
	documentHandler: state => state.documentHandler,
	activeDataset: state => state.activeDataset,
	activeDatasetId: state => state.activeDataset?.id,
	dataTypes: state => state.dataTypes,
}

// Actions
const actions = {
	setDataTypes({commit}, dataTypes ) {
		commit('SET_DATA_TYPES', dataTypes)
	},
	setActiveDataset({commit}, dataset ) {
		commit('SET_ACTIVE_DATASET', dataset)
	},
	setDocumentHandler({commit}, documentHandler ) {
		commit('SET_DOCUMENT_HANDLER', documentHandler)
	}
}

// Mutations
const mutations = {
	SET_DATA_TYPES(state, payload) {
        state.dataTypes = payload;
    },
	SET_ACTIVE_DATASET(state, payload) {
        state.activeDataset = payload;
    },
	SET_DOCUMENT_HANDLER(state, payload) {
        state.documentHandler = payload;
    },
}

export default {
    namespaced: true,
    state,
	getters,
    actions,
    mutations,
};