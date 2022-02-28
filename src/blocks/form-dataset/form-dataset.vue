<template>
	<div class="dataset">
		<FormIssues v-if="flagged && userRoleWeight < 1000" />
		<FormCuratorIssues v-if="(flagged || isIssuesFormVisible) && userRoleWeight >= 1000" @cancelClick="handleIssuesCancel" />

		<div class="form form--dataset">
			<form action="?" method="post">
				<div class="form__head">
					<div class="form__head-inner">
						<h5>{{ dataset.id || "Unnamed" }}</h5>

						<p>{{ dataset.dataType || 'Undefined Type'}}</p>
					</div><!-- /.form__head-inner -->
				</div>

				<div class="form__body">
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
							<div class="checkboxes">
								<ul>
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

									<HiddenText v-if="showBestPractices" v-html="bestPractices" />

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

									<HiddenText v-if="showSuitableRepository" v-html="suitableRepository" />
								</ul>
							</div>
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
				</div> <!-- /.form__body -->

				<div class="form__cta">
					<div class="form__cta-row">
						<div class="form__cta-col">
							<Button @onClick="handleComplete">Complete This Dataset</Button>
						</div><!-- /.form__cta-col -->

						<div v-if="userRoleWeight < 1000" class="form__cta-col">
							<Button className="tertiary" v-tooltip.top-center="tooltips.connectText">
								<Icon name="connect" />

								Connect Text
							</Button>

							<Button
								className="tertiary"
								v-tooltip.top-center="tooltips.deleteText"
								@onClick="handleDelete"
							>
								<Icon name="trash" />

								Delete
							</Button>
						</div><!-- /.form-__cta-col -->

						<div v-if="userRoleWeight >= 1000" class="form__cta-col">
							<Button
								className="tertiary"
								square
								v-tooltip.top-center="tooltips.flagText"
								@onClick="toggleIssuesForm"
							>
								<Icon name="flag" />
							</Button>

							<Button
								className="tertiary"
								square
								v-tooltip.top-center="tooltips.show"
								@onClick="openPopup"
							>
								<Icon name="documents" />
							</Button>

							<Button 
								className="tertiary"
								square
								v-tooltip.top-center="tooltips.connectText"
								@onClick="handleSelectAdditionalText"
							>
								<Icon name="connect" />
							</Button>

							<Button
								className="tertiary"
								square
								v-tooltip.top-center="tooltips.deleteText"
								@onClick="handleDelete"
							>
								<Icon name="trash" />
							</Button>
						</div><!-- /.form-__cta-col -->
					</div>
					<!-- /.form__cta-row -->
				</div> <!-- /.form__cta -->
			</form>
		</div> <!-- /.form -->

		<Popup ref="textPassagePopup" name="text-passage-popup" size="small">
			<RichtextEntry label="Connected Text Passages" icon="documents">
				<p>
					Methods: Our implementation approach included seeking support from hospital leadership;
					building frontline support and a team of champions among patients, nurses,
					anesthesiologists, and surgeons; accounting for stakeholder perceptions using
					theory-informed qualitative interviews; engaging patients; and documenting the
					implementation process, including barriers and facilitators, using the consolidated
					framework for implementation research.
				</p>

				<p>
					Results: During the 12-month implementation period, we conducted 23 stakeholder engagement
					activities with over 200 participants.
				</p>
			</RichtextEntry>
		</Popup>
	</div>
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
import Popup from '@/components/popup/popup';
import Button from '@/components/button/button';
import FormIssues from '@/blocks/form-issues/form-issues';
import Grid, { GridColumn } from '@/components/grid/grid';
import HiddenText from '@/components/hidden-text/hidden-text';
import FieldSelect from '@/components/field-select/field-select';
import RichtextEntry from '@/components/richtext-entry/richtext-entry';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';
import FormCuratorIssues from '@/blocks/form-issues/form-curator-issues';

import dataseermlService from '@/services/dataseerml/dataseerml';

export default {
	/**
	 * Name
	 */
	name: 'FormDataset',

	/**
	 * Components
	 */
	components: {
		Grid,
		Icon,
		Popup,
		Field,
		Button,
		FormIssues,
		GridColumn,
		HiddenText,
		FieldSelect,
		RichtextEntry,
		FieldCheckbox,
		FormCuratorIssues
	},

	/**
	 * Props
	 */
	props: {
		dataset: {
			type: Object,
			default:  () => {}
		},
		flagged: {
			type: Boolean,
			default: false
		}
	},
	
	/**
	 * Data
	 */
	data: function() {
		return {
			formData: {
				type: '',
				subtype: '',
				permalink: '',
				comments: '',
				reuse: null,
				publicly: null,
				practices: null,
				repo: null,
			},
			bestPractices: '',
			showBestPractices: false,
			suitableRepository: '',
			showSuitableRepository: false,
			tooltips: {
				connectText: 'Select additional sentences from the document to connect to this dataset',
				deleteText: 'Delete this Dataset'
			},
			isIssuesFormVisible: false,
			
		};
	},
	
	/**
	 * Computed
	 */
	computed: {
		...mapGetters('pdfViewer', ['dataTypes']),
		...mapGetters('account', ['userRoleWeight']),
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

	watch: {
		dataset: {
			handler() {
				this.populateFormData();
			},
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
		populateFormData() {
			this.formData =  {
				...this.formData,
				comments: this.dataset.comments,
				type: this.dataset.dataType,
				subtype: this.dataset.subType,
				permalink: this.dataset.DOI,
				instructions: this.dataset.comments,
				reuse: this.dataset.reuse,
			}

			this.bestPractices = this.dataTypes.metadata[this.formData.type].bestDataFormatForSharing
			this.suitableRepository = this.dataTypes.metadata[this.formData.type].mostSuitableRepositories.default
		},
		textToggle(check) {
			return check ? 'Hide' : 'Show';
		},
		toggleIssuesForm(e) {
			e.preventDefault();
			this.isIssuesFormVisible = !this.isIssuesFormVisible;
		},
		handleDelete(e) {
			e.preventDefault();
			e.stopPropagation();
			const confirmDelete = window.confirm('Are you sure you want to delete this dataset?');

			if (confirmDelete) {
				this.$emit('onDatasetDelete')
			}
		},
		handleSelectAdditionalText(e) {
			e.preventDefault();
		},
		openPopup(e) {
			e.preventDefault();
			this.$refs.textPassagePopup.showModal();
		},
		handleComplete(e) {
			e.preventDefault();
			this.$emit('onDatasetComplete', true)
		},
		handleIssuesCancel() {
			this.isIssuesFormVisible = false;
		},
		async getJsonDataTypes() {
			const jsonDataTypes = await dataseermlService.getJsonDataTypes();
			this.jsonDataTypes = jsonDataTypes;
		}
	},

	mounted () {
		this.populateFormData();
	},
};
</script>
