<template>
	<Grid rowGap="medium">
		<GridColumn>
			<FieldSelect
				name="dataType"
				:options="dataTypesOptions"
				:value="formData.dataType"
				@input="handleDataTypeChange"
				placeholder="Select"
			>
				<Icon name="grid" />

				Code Type <a href="#" target="_blank">Type Definitions</a>
			</FieldSelect>
		</GridColumn>

		<GridColumn>
			<FieldSelect
				:options="subTypeOptions"
				name="subType"
				v-model.trim="formData.subType"
				placeholder="Select"
			>
				<Icon name="grid" />

				Code Subtype
			</FieldSelect>
		</GridColumn>

		<GridColumn>
			<Checkboxes>
				<FieldCheckbox
					name="reuse"
					v-model="formData.reuse"
					isDropdown
				>
					This dataset is re-used from another public or private source
				</FieldCheckbox>
			</Checkboxes>
		</GridColumn>


		<template v-if="formData.subType === 'custom scripts'">
			<GridColumn>
				<Field
					name="stable-url"
					type="text"
					v-model.trim="formData.DOI"
					placeholder="https://"
				>
					<Icon name="chain" color="currentColor" />

					Stable URL
				</Field>
			</GridColumn>

			<GridColumn>
				<Field
					name="stable-url"
					type="text"
					v-model.trim="formData.RRID"
					placeholder="Enter DOI or PID if available"
				>
					<Icon name="chain" color="currentColor" />

					Digital object identifier (DOI) or PID
				</Field>
			</GridColumn>
		</template>

		<template v-if="formData.subType !== 'custom scripts'">
			<GridColumn>
				<Field
					:error="$v.type.$error"
					v-model.trim="formData.version"
					name="version"
					placeholder="Version"
				>
					<Icon name="windows" color="currentColor" />
					
					Version
				</Field>
			</GridColumn>

			<GridColumn>
				<Field
					name="DOI"
					type="text"
					v-model.trim="formData.DOI"
					placeholder="https://"
				>
					<Icon name="chain" color="currentColor" />

					Stable URL, DOI, or other link to this object
				</Field>
			</GridColumn>

			<GridColumn>
				<Field
					name="DOI"
					type="text"
					v-model.trim="formData.RRID"
					placeholder="Enter RRID if available"
				>
					<Icon name="chain" color="currentColor" />

					Research Resource Identifier (RRID)
				</Field>
			</GridColumn>
		</template>

		<GridColumn>
			<Field name="instructions" type="textarea" v-model="formData.instructions">
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
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';
import FieldSelect from '@/components/field-select/field-select';

export default {
	/**
	 * Name
	 */
	name: 'formDatasetsDefault',

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
		FieldCheckbox
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
		suitableRepositoryText: {
			type: String,
			default: () => {}
		}
	},

	data() {
		return {
			showBestPractices: false,
			showSuitableRepository: false,
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
		textToggle(check) {
			return check ? 'Hide' : 'Show';
		},
		handleDataTypeChange(value) {
			this.formData.dataType = value;
			this.formData.subType = '';
		}
	}
}
</script>

