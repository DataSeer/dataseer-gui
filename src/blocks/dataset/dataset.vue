<template>
	<div class="dataset">
		<div v-if="!(activeDataset && activeDataset.id)" class="dataset__form">
			<FormConnectText />
		</div><!-- /.dataset__form -->
		
		<div v-else class="dataset__form">
			<FormCuratorIssues
				v-if="formData.flagged === true && userRoleWeight >= 1000"
				:issues="formData.issues"
				:issuesList="issuesList"
				@change="handleCuratorFormChange"
				@cancel="setIssuesFormVisibility(false)"
			/>
			
			<FormDefaultIssues
				v-if="formData.flagged === true && formDataIssues && userRoleWeight < 1000"
				:issues="formData.issues"
				@submit="handleIssuesFormSubmit"
			/>

			<p v-if="textReferences.length > 1" class="dataset-references">
				<Icon name="references" />
				
				<em>{{ multipleReferencesText }}</em>

				<Dropdown ref="textReferencesDropdown" placement="bottom-end">
					<template #header>
						<span class="dropdown__arrow" />
					</template>

					<DropdownNavDatasets :datasets="textReferences" @dropdownButtonClick="handleDropdownButtonClick" />
				</Dropdown>
			</p><!-- /.datasets-references -->
			
			<Form className="form--dataset" :loading="isFormSubmitting">
				<FormHead>
					<input
						type="text"
						id="name"
						tabindex="0"
						:placeholder="NameInputPlaceholder"
						:value="formData.name"
						v-tooltip.top="formData.name"
						@input="handleNameInputChange"
					/>

					<p>{{ dataType }}</p>
				</FormHead>
				
				<FormBody>
					<component
						:is="FormFields"
						:formData="formData"
					/>
				</FormBody>

				<div class="form__cta">
					<div class="form__cta-row">
						<div class="form__cta-col">
							<Button
								@onClick.prevent="handleDatasetSave"
							>
								Complete This {{this.activeDatasetType ? this.activeDatasetType : 'dataset' }}
							</Button>
						</div><!-- /.form__cta-col -->

						<div v-if="userRoleWeight < 1000" class="form__cta-col">
							<Button
								className="tertiary"
								square
								v-tooltip.top="tooltips.passage"
								@onClick.prevent="$refs.textPassagePopup.showModal()"
							>
								<Icon name="documents" />
							</Button>

							<Button
								className="tertiary"
								v-tooltip.top="tooltips.unlink"
								@onClick.prevent="openUnlinkModal"
							>
								<Icon name="unlink" />

								Unlink
							</Button>
							
							<Button
								className="tertiary"
								v-tooltip.top="tooltips.deleteText"
								@onClick.prevent="openDeleteModal"
							>
								<Icon name="trash" />

								Delete
							</Button>
						</div><!-- /.form-__cta-col -->

						<div v-if="userRoleWeight >= 1000" class="form__cta-col">
							<Button
								className="tertiary"
								square
								v-tooltip.top="tooltips.sciscore"
								@onClick.prevent="$refs.SciscorePopup.showModal()"
							>
								<Icon name="sciscore" />
							</Button>

							<Button
								className="tertiary"
								square
								:active="this.formData.flagged"
								v-tooltip.top="tooltips.flag"
								@onClick.prevent="setIssuesFormVisibility(true)"
							>
								<Icon name="flag" />
							</Button>

							<Button
								className="tertiary"
								square
								v-tooltip.top="tooltips.passage"
								@onClick.prevent="$refs.textPassagePopup.showModal()"
							>
								<Icon name="documents" />
							</Button>

							<Button
								square
								className="tertiary"
								modifier="is-warning"
								v-tooltip.top-center="tooltips.unlink"
								@onClick.prevent="openUnlinkModal"
							>
								<Icon name="unlink" />
							</Button>

							<Button
								className="tertiary"
								square
								modifier="is-warning"
								v-tooltip.top-center="tooltips.deleteText"
								@onClick.prevent="openDeleteModal"
							>
								<Icon name="trash" />
							</Button>
						</div><!-- /.form-__cta-col -->
					</div> <!-- /.form__cta-row -->
				</div> <!-- /.form__cta -->
			</Form>

			<Popup ref="SciscorePopup" name="sciscore-popup" size="small">
				<Grid rowGap="medium">
					<GridColumn>
						<Field
							name="entity"
							v-model.trim="formData.entity"
						>
							<Icon name="windows" />

							Suggested Name of Entity
						</Field>
					</GridColumn>

					<GridColumn>
						<Field
							name="suggestedURL"
							v-model.trim="formData.DOI"
						>
							<Icon name="chain" />

							Suggested URL
						</Field>
					</GridColumn>

					<GridColumn>
						<Field
							name="suggestedURL"
							v-model.trim="formData.RRID"
						>
							<Icon name="key" />

							Suggested RRID
						</Field>
					</GridColumn>
				</Grid>
			</Popup>

			<Popup ref="textPassagePopup" name="text-passage-popup" size="small">
				<RichtextEntry label="Connected Text Passages" icon="documents">
					<p v-for="sentence in activeDataset.sentences" :key="sentence.id">
						{{sentence.text}}
					</p>
				</RichtextEntry>
			</Popup>
		</div><!-- /.dataset__form -->
	</div><!-- /.dataset -->
</template>

<script>
/**
 * External Dependencies
 */
import { mapGetters, mapActions } from 'vuex'

/**
 * Internal Dependencies
 */
import variables from '@/assets/scss/generic/_variables.scss'

import Popup from '@/components/popup/popup';
import PopupConfirm from '@/components/popup/popup-confirm';
import RichtextEntry from '@/components/richtext-entry/richtext-entry';
import Icon from '@/components/icon/icon'
import Button from '@/components/button/button'
import Field from '@/components/field/field';
import Dropdown, { DropdownNavDatasets } from '@/components/dropdown/dropdown'
import Grid, { GridColumn } from '@/components/grid/grid';
import Form, { FormBody, FormHead } from '@/components/form/form';
import FormDefaultIssues from '@/blocks/form-issues/form-default-issues';
import FormCuratorIssues from '@/blocks/form-issues/form-curator-issues';
import FormConnectText from '@/blocks/form-connect-text/form-connect-text';
import FormDataset from '@/blocks/form-dataset/form-dataset-default';
import FormDatasetCode from '@/blocks/form-dataset/form-dataset-code';
import FormDatasetMaterial from '@/blocks/form-dataset/form-dataset-material';
import FormDatasetProtocols from '@/blocks/form-dataset/form-dataset-protocols';
import { clearDropdown } from '@/utils/use-dropdowns';

export default {
	/**
	 * Name
	 */
	name: "Dataset",

	/**
	 * Components
	 */
	components: {
		Grid,
		GridColumn,
		Field,
		variables,
		Icon,
		Form,
		Popup,
		PopupConfirm,
		Button,
		Dropdown,
		DropdownNavDatasets,
		FormHead,
		FormBody,
		RichtextEntry,
		FormConnectText,
		FormDefaultIssues,
		FormCuratorIssues
	},

	/**
	 * Props
	 */
	props: {
		dataset: {
			type: Object,
			default: () => {}
		}
	},

	/**
	 * Data
	 */
	data() {
		return {
			formData: {},
			formDataIssues: {
				active: [''],
				author: '',
				createdAt: '',
				comment: '',
			},
			isFormSubmitting: false,
			multipleReferencesText: 'Multiple references share this text selection',
			NameInputPlaceholder: 'Enter...',
			tooltips: {
				sciscore: 'Suggest citation information for this object',
				flag: 'Flag Issues For Author',
				passage: 'Show Text Passage',
				unlink: 'Unlink selected sentence to this dataset',
				deleteText: 'Delete this Dataset'
			},
			modals: {
				confirmDelete: {
					message: "Do you wish to permanently delete this item?",
					confirm: "Yes, Delete",
					cancel: "No, Keep It",
				},
				confirmUnlink: {
					message: "Do you wish to unlink the selected text passage from this item?",
					confirm: "Yes, Unlink",
					cancel: "No, Keep It",
				}
			},
			issuesList: [
				'URL broken',
				'Input incorrect (wrong cat#/RRID/PID/DOI/other)',
				'Item not yet publicly accessible',
				'Not an appropriate reference',
				'Dataset not provided',
				'Other'
			]
		}
	},

	/**
	 * Watch
	 */
	watch: {
		activeDatasetId: {
			handler() {
				this.populateFormData()
			},
			deep: true
		}
	},

	/**
	 * Computed
	 */
	computed: {
		...mapGetters('pdfViewer', [
			'documentHandler',
			'dataTypes',
			'activeDataset',
			'activeDatasetId',
			'activeDatasetType',
			'activeSentence',
			'datasets'
		]),
		...mapGetters('account', ['userRoleWeight', 'user']),
		FormFields() {
			if (this.activeDatasetType === 'code') return FormDatasetCode;
			if (this.activeDatasetType === 'material') return FormDatasetMaterial;
			if (this.activeDatasetType === 'protocol') return FormDatasetProtocols;

			return FormDataset;
		},
		dataType() {
			return this.dataset?.dataType ? this.dataset.dataType : 'Undefined Type'
		},
		textReferences() {
			return this.datasets.filter((dataset) => dataset.sentences.some((sentence) => sentence.id === this.activeSentence.id));
		},
		cssVariables() {
			return variables
		},
	},

	/**
	 * Methods
	 */
	methods: {
		...mapActions('pdfViewer', [
			'updateDataset',
			'deleteDataset',
			'unlinkSentenceFromDataset',
			'setActiveDataset',
			'setActiveDatasetType',
		]),
		populateFormData() {
			this.formData = { ...this.formData, ...this.activeDataset }
		},
		handleNameInputChange(e) {
			this.formData = { ...this.formData, name: e.target.value }
		},
		handleDropdownButtonClick(dataset) {
			if (dataset.id === this.activeDatasetId) return

			// Close text references dropdown when the active dataset changes
			clearDropdown(this.$refs.textReferencesDropdown.$el);
			
			this.setActiveDataset({
				dataset,
				scrollToSentence: true
			});
		},
		handleDatasetSave() {
			const documentHandler = this.documentHandler;
			this.isFormSubmitting = true;
			let formData = { ...this.formData };
			
			// Set issues property when user is curator
			if (this.userRoleWeight >= 1000) {
				if (formData.flagged) {
					formData.issues.author = this.user.username
					formData.issues.createdAt = new Date()
				} else {
					formData.issues = { ...this.formDataIssues }
				}
			}

			documentHandler.saveDataset(this.activeDataset.id, formData, (_, res) => {
				const newDataset = res;
				this.updateDataset(newDataset);
				this.formData = { ...this.formData, ...this.res }
				
				if (this.activeDatasetType !== newDataset.datasetType) {
					this.setActiveDatasetType(newDataset.datasetType);
				}
				this.isFormSubmitting = false;
			})
		},
		handleCuratorFormChange(formData) {
			this.formData.issues = {...this.formData.issues, ...formData}
		},
		handleIssuesFormSubmit(issues) {
			const remainingIssues = issues.filter(issue => !issue.completed).map(issue => issue.label)
			
			this.formData.issues.active = {...remainingIssues}
			
			if (!remainingIssues.length) this.formData.flagged = false
			
			this.handleDatasetSave();
		},
		setIssuesFormVisibility(value) {
			this.formData.flagged = value;
		},
		openDeleteModal() {
			this.openConfirmModal({
				...this.modals.confirmDelete,
				onConfirm: this.deleteDataset,
			})
		},
		openUnlinkModal() {
			this.openConfirmModal({
				...this.modals.confirmUnLink,
				onConfirm: this.unlinkSentenceFromDataset,
			})
		}
	},

	/**
	 * Created
	 */
	created () {
		this.populateFormData();
	},
}
</script>
