<template>
	<Grid rowGap="medium">
		<GridColumn>
			<FieldSelect
				name="dataType"
				:options="dataTypesOptions"
				v-model.trim="formData.dataType"
				placeholder="Select"
			>
				<Icon name="grid" />

				Protocol Type
			</FieldSelect>
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
import FieldSelect from '@/components/field-select/field-select';
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
}
</script>

