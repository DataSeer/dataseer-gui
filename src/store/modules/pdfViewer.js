// State
const state = {
	documentHandler: {},
	activeDataset: undefined
}

// Getters
const getters = {
	documentHandler: state => state.documentHandler,
	activeDataset: state => state.activeDataset,
	activeDatasetId: state => state.activeDataset?.id,
}

// Actions
const actions = {
	setActiveDataset({commit}, dataset ) {
		commit('SET_ACTIVE_DATASET', dataset)
	},
	setDocumentHandler({commit}, documentHandler ) {
		commit('SET_DOCUMENT_HANDLER', documentHandler)
	}
}

// Mutations
const mutations = {
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