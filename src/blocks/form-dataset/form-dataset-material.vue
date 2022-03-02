<template>
	<Grid rowGap="medium">
		<GridColumn>
			<FieldSelect
				:error="$v.type.$error"
				:options="[
					{	
						value: 'material-1',
						title: 'Material 1'
					},
					{
						value: 'material-2',
						title: 'Material 2'
					},
					{
						value: 'material-3',
						title: 'Material 3'
					},
					{
						value: 'material-4',
						title: 'Material 4'
					}
				]"
				name="material"
				v-model.trim="formData.material"
				placeholder="Material Type"
			>
				<Icon name="flask" />

				Material Type <a href="#">Type Definitions</a>
			</FieldSelect>
		</GridColumn>

		<GridColumn>
			<Checkboxes>
				<FieldCheckbox name="reuse" v-model="formData.reuse" isDropdown>
					This material is re-used from another public or private source
				</FieldCheckbox>

				<FieldCheckbox
					name="practices"
					v-model="formData.practices"
					isDropdown
					v-if="formData.reuse !== null"
				>
					<a href="#">Best practices</a> for this material type have been followed

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
			</Checkboxes>
		</GridColumn>

		<GridColumn>
			<Field
				v-if="formData.reuse !== null"
				name="rrid"
				v-model.trim="formData.rrid"
				type="text"
				placeholder="https://"
			>
				<Icon name="chain" color="currentColor" />

				RRID
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

