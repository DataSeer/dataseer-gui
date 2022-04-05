<template>
	<Form className="form--dataset form--connect-text">
		<FormHead>
			<h5 class="overflow-truncate">{{activeSentence.text}}</h5>
		</FormHead>

		<FormEntry>
			<p>The selected text does not currently have any associated Datasets. You can add a new Dataset or Connect this text to an existing Dataset.</p>
		</FormEntry>

		<FormBody>
			<Button @onClick.prevent="addSentenceToDataset">
				<Icon name="add" />
				
				Add New Dataset
			</Button>

			<FormDivider title="or" />
			
			<FieldSelect
				v-model.trim="selectedDataset"
				name="dataset"
				placeholder="Select an Existing Datase, 'activeda't…"
				:options="datasetsOptions"
			/>
		</FormBody>
		
		<FormActions>
			<li>
				<Button
					@onClick.prevent="() => linkSentenceToDataset(selectedDataset)"
					:disabled="!selectedDataset.length"
				>
					<Icon name="connect" />
					
					Connect to Dataset
				</Button>
			</li>
		</FormActions>
	</Form>
</template>

<script>
	/* eslint-disable */
	/**
	 * External Dependencies
	 */
	import { mapGetters, mapActions } from 'vuex'
	
	/**
	 * Internal Dependencies
	 */
	import Grid, { GridColumn } from '@/components/grid/grid';
	import Form, { FormHead, FormBody, FormGroup, FormDivider, FormEntry, FormActions } from '@/components/form/form';
	import Button from '@/components/button/button'
	import Icon from '@/components/icon/icon'
	import FieldSelect from '@/components/field-select/field-select';
	
	export default {
		/**
		 * Name
		 */
		name: 'FormConnectText',

		/**
		 * Components
		 */
		components: {
			Grid,
			GridColumn,
			Icon,
			Button,
			Form,
			FormBody,
			FormHead,
			FormGroup,
			FormEntry,
			FormActions,
			FormDivider,
			FieldSelect,
		},

		/**
		 * Data
		 */
		data() {
			return {
				selectedDataset: ''
			}
		},

		/**
		 * Computed
		 */
		computed: {
			...mapGetters('pdfViewer', ['datasets', 'activeSentence']),
			datasetsOptions() {
				return this.datasets.map(dataset => ({
					value: dataset.id,
					label: dataset.name ? dataset.name  : dataset.id
				}))
			},
		},

		/**
		 * Methods
		 */
		methods: {
		...mapActions('pdfViewer', ['addSentenceToDataset', 'linkSentenceToDataset']),
	},

	}
</script>
