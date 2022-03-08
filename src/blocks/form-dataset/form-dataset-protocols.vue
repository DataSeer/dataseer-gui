<template>
	<Grid rowGap="medium">
		<GridColumn>
			<Checkboxes>
				<FieldCheckbox
					name="reuse"
					v-model="formData.reuse"
					isDropdown
				>
					This protocol is re-used from another public or private source
				</FieldCheckbox>
			
				<FieldCheckbox
					v-if="formData.reuse === true"
					v-model.trim="formData.protocolSource"
					trueLabel="Manufacturer's Instructions"
					falseLabel="Another Protocol"
					name="protocolSource"
					isDropdown
				>
					Source
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

		<GridColumn>
			<Checkboxes>
				<FieldCheckbox
					name="issue"
					v-model="formData.issue"
					isDropdown
				>
					There is an issue with the information provided in the manuscript text
				</FieldCheckbox>
			</Checkboxes>
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
					label: 'none',
				}]
			}
			const keys = Object.keys(this.dataTypes.dataTypes)
			
			return keys.map(key => ({
				value: key,
				label: key,
			}))
		},
		subTypeOptions() {
			const subTypes = this.dataTypes.dataTypes[this.formData.type];
			
			if (!subTypes || !subTypes.length) {
				return [{
					value: '',
					label: 'none',	
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

