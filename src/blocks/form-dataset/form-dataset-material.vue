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
					This material is re-used from a public or private source
				</FieldCheckbox>
			</Checkboxes>
		</GridColumn>

		<GridColumn>
			<Field
				name="labSource"
				placeholder="Enter the name of the source of the material"
				v-model="formData.labSource"
			>
				<Icon name="flask" />

				Source (Name of Lab or Commercial Source)
			</Field>
		</GridColumn>

		<GridColumn>
			<Field
				name="catalog"
				placeholder="enter the catalog number if available"
				v-model="formData.catalog"
			>
				<Icon name="flask" />

				Catalog Number
			</Field>
		</GridColumn>

		<GridColumn>
			<Field
				name="rrid"
				placeholder="Enter RRID if available"
				v-model="formData.RRID"
			>
				<Icon name="key" />

				Research Resource Identifier (RRID)
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
import Grid, { GridColumn } from '@/components/grid/grid';
import Checkboxes from '@/components/checkboxes/checkboxes';
import FieldSelect from '@/components/field-select/field-select';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';

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
		Checkboxes,
		GridColumn,
		FieldSelect,
		FieldCheckbox,
	},

	/**
	 * Props
	 */
	props: {
		formData: {
			type: Object,
			default: () => {}
		},
		bestPracticesText: {
			type: String,
			default: () => {}
		},
	},

	/**
	 * Data
	 */
	data() {
		return {
			showBestPractices: false,
		}
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

