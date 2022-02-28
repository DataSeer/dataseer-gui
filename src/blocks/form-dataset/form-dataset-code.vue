<template>
	<Grid rowGap="medium">
		<GridColumn>
			<Field
				:error="$v.type.$error"
				v-model.trim="formData.version"
				name="version"
				:options="[
					{
						title: 'R 4.2.1',
						helptext: 'Suggested'
					},
					{
						title: 'Option 0'
					},
					{
						title: 'Option 1'
					},
					{
						title: 'Option 2'
					}
				]"
				placeholder="Software/Version"
			>
				<Icon name="windows" color="currentColor" />
				Software/Version
			</Field>
		</GridColumn>

		<GridColumn>
			<Field
				:error="$v.type.$error"
				v-model.trim="formData.package"
				name="package"
				placeholder="Enter if applicable"
			>
				<Icon name="cube" color="currentColor" />

				Software Package
			</Field>
		</GridColumn>

		<GridColumn>	
			<Field 
				v-model.trim="formData.script"
				name="script"
				type="text"
				placeholder="Script DOI /PID"
			>
				<Icon name="brackets" color="currentColor" />

				Script
			</Field>
		</GridColumn>

		<GridColumn>
			<Checkboxes>
				<FieldCheckbox name="reuse" v-model="formData.reuse" isDropdown>
					This code is re-used from another public or private source
				</FieldCheckbox>

				<FieldCheckbox
					name="practices"
					v-model="formData.practices"
					isDropdown
					v-if="formData.reuse !== null"
				>
					<a href="#">Best practices</a> for this code type have been followed

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

				<FieldCheckbox name="repo" v-model="formData.repo" isDropdown v-if="formData.reuse !== null">
					A <a href="#">suitable repository</a> has been used to host this code

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
				v-model.trim="formData.permalink"
				name="permalink"
				type="text"
				placeholder="https://"
			>
				<Icon name="chain" color="currentColor" />

				DOI or Permalink
			</Field>
		</GridColumn>

		<GridColumn v-if="formData.repo">
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
import HiddenText from '@/components/hidden-text/hidden-text';
import Checkboxes from '@/components/checkboxes/checkboxes';
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

