<template>
	<Grid rowGap="medium">
		<GridColumn>
			<Checkboxes>
				<FieldCheckbox name="reuse" v-model="formData.reuse" isDropdown>
					This dataset is re-used from another public or private source
				</FieldCheckbox>

				<FieldCheckbox
					name="practices"
					v-model="formData.practices"
					isDropdown
					v-if="formData.reuse !== null"
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

				<FieldCheckbox name="publicly" v-model="formData.publicly" isDropdown v-if="formData.reuse !== null">
					This dataset cannot be shared publicly
				</FieldCheckbox>

				<HiddenText v-if="showBestPractices" v-html="bestPracticesText" />

				<HiddenText v-if="showSuitableRepository" v-html="suitableRepositoryText" />
			</Checkboxes>
		</GridColumn>

		<GridColumn v-if="formData.reuse === false">
			<Field
				name="doi"
				type="text"
				placeholder="https://"
				v-model.trim="formData.doi"
			>
				<Icon name="chain" color="currentColor" />

				Protocols.io DOI
			</Field>
		</GridColumn>

		<GridColumn v-if="formData.reuse === true">
			<Field
				name="permalink"
				v-model.trim="formData.permalink"
				type="text"
				placeholder="https://"
			>
				<Icon name="chain" color="currentColor" />

				DOI or Permalink
			</Field>
		</GridColumn>

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
import HiddenText from '@/components/hidden-text/hidden-text';
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
		HiddenText,
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

	/**
	 * Data
	 */
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

