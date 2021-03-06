<template>
	<Grid rowGap="medium">
		<GridColumn>
			<FieldSelect
				name="dataType"
				:error="$v.type.$error"
				:options="dataTypesOptions"
				:value="formData.dataType"
				@input="handleDataTypeChange"
				placeholder="Tabular Data"
			>
				<Icon name="grid" />

				Data Type <a href="#" target="_blank">Type Definitions</a>
			</FieldSelect>
		</GridColumn>

		<GridColumn>
			<FieldSelect
				:error="$v.subtype.$error"
				:options="subTypeOptions"
				name="subType"
				v-model.trim="formData.subType"
				placeholder="Select"
			>
				<Icon name="grid" />

				Data Subtype
			</FieldSelect>
		</GridColumn>

		<GridColumn>
			<Checkboxes>
				<FieldCheckbox
					name="reuse"
					v-model="formData.reuse"
					isDropdown
				>
					This protocol is re-used from a public or private source
				</FieldCheckbox>
			</Checkboxes>
		</GridColumn>

		<GridColumn>
			<Field
				name="DOI"
				v-model.trim="formData.DOI"
				placeholder="https://"
			>
				<Icon name="chain" color="currentColor" />

				Stable URL, DOI, or other link to this object
			</Field>
		</GridColumn>
		
		<GridColumn>
			<Field
				name="comments"
				type="textarea"
				v-model="formData.comments"
			>
				<Icon name="comment" />

				Additional Comments or Instructions
			</Field>
		</GridColumn>
		
		<GridColumn v-if="formData.protocolSource === false">
			<Field
				name="reference"
				v-model="formData.reference"
			>
				<Icon name="comment" />

				Reference
			</Field>
		</GridColumn>
	</Grid>
</template>

<script>
/**
 * External Dependencies
 */
import { required } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex'

/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Field from '@/components/field/field';
import Checkboxes from '@/components/checkboxes/checkboxes';
import FieldSelect from '@/components/field-select/field-select';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';
import Grid, { GridColumn } from '@/components/grid/grid';

export default {
	/**
	 * Name
	 */
	name: 'formDatasetsMaterial',

	/**
	 * Components
	 */
	components: {
		Grid,
		Icon,
		Field,
		GridColumn,
		Checkboxes,
		FieldCheckbox,
		FieldSelect
	},

	/**
	 * Props
	 */
	props: {
		formData: {
			type: Object,
			default: () => {}
		},
	},

	/**
	 * Computed
	 */
	computed: {
		...mapGetters('pdfViewer', ['dataTypes']),
		dataTypesOptions() {
			if (!this.dataTypes.dataTypes) {
				return [{
					value: '',
					label: 'None',
				}]
			}
			
			return Object.keys(this.dataTypes.dataTypes).map(key => ({
				value: key,
				label: key,
			}))
		},
		subTypeOptions() {
			const subTypes = this.dataTypes.dataTypes[this.formData.dataType];
			
			if (!subTypes || !subTypes.length) {
				return [{
					value: '',
					label: 'None',	
				}]	
			}

			return subTypes.map(type => ({
				value: type,
				label: type,
			}))
		}
	},

	/**
	 * Validations
	 */
	validations: {
		type: {
			required
		},
		subtype: {
			required
		},
		permalink: {
			required
		}
	},

	/**
	 * Methods
	 */
	methods: {
		// Reset the sub type value when the main datatype changes
		handleDataTypeChange(value) {
			this.formData.dataType = value;
			this.formData.subType = '';
		}
	}
}
</script>

