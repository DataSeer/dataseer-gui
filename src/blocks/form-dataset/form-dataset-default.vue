<template>
	<Grid rowGap="medium">
		<GridColumn>
			<FieldSelect
				:error="$v.type.$error"
				:options="dataTypesOptions"
				name="type"
				v-model.trim="formData.type"
				placeholder="Tabular Data"
			>
				<Icon name="grid" />

				Data Type <a href="#">Type Definitions</a>
			</FieldSelect>
		</GridColumn>

		<GridColumn>
			<FieldSelect
				:error="$v.subtype.$error"
				:options="subTypeOptions"
				name="organization"
				v-model.trim="formData.subtype"
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
					This dataset is re-used from another public or private source
				</FieldCheckbox>

				<FieldCheckbox
					v-if="formData.reuse === false"
					name="publicly"
					v-model="formData.publicly"
					isDropdown
				>
					This dataset cannot be shared publicly
				</FieldCheckbox>

				<FieldCheckbox
					v-if="formData.publicly === true"
					name="practices"
					v-model="formData.practices"
					isDropdown
				>
					<a href="#">Best practices</a> for this data type have been followed
					
					<button
						tabindex="0"
						type="button"
						class="text-toggle"
						@click="showBestPractices = !showBestPractices"
					>
						{{ textToggle(showBestPractices) }}
					</button>
				</FieldCheckbox>

				<HiddenText v-if="showBestPractices" v-html="bestPracticesText" />

				<FieldCheckbox
					v-if="formData.publicly === true"
					name="repo"
					v-model="formData.repo"
					isDropdown
				>
					A <a href="#">suitable repository</a> has been used to host this data

					<button
						tabindex="0"
						type="button"
						class="text-toggle"
						@click="showSuitableRepository = !showSuitableRepository"
					>
						{{ textToggle(showSuitableRepository) }}
					</button>
				</FieldCheckbox>

				<HiddenText v-if="showSuitableRepository" v-html="suitableRepositoryText" />
			</Checkboxes>
		</GridColumn>

		<GridColumn v-if="formData.repo">
			<Field
				name="permalink"
				type="text"
				v-model.trim="formData.permalink"
				placeholder="https://"
			>
				<Icon name="chain" color="currentColor" />

				DOI or Permalink
			</Field>
		</GridColumn>

		<GridColumn>
			<Field name="comments" type="textarea" v-model="formData.comments">
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
import HiddenText from '@/components/hidden-text/hidden-text';
import FieldSelect from '@/components/field-select/field-select';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';

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
		HiddenText,
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

	/**
	 * Methods
	 */
	methods: {
		textToggle(check) {
			return check ? 'Hide' : 'Show';
		},
	},
}
</script>

