<template>
	<div class="dataset">
		<div v-if="!(activeDataset && activeDataset.id)" class="dataset__form">
			<FormConnectText />
		</div><!-- /.dataset__form -->
		
		<div v-else class="dataset__form">
			<template v-if="formData.flagged === 'true' || formData.flagged === true">
				<FormCuratorIssues
					v-if="userRoleWeight >= 1000"
					@submit="handleIssuesFormSubmit"
					@cancel="handleIssuesFormCancel"
				/>
				
				<FormDefaultIssues
					v-else
					@submit="handleIssuesFormSubmit"
					@messageCurator="handleMessageCurator"
				/>
			</template>

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
								S
							</Button>
							

							<Button
								className="tertiary"
								square
								v-tooltip.top="tooltips.flag"
								@onClick.prevent="toggleIssuesForm"
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
							name="suggestedEntity"
							v-model.trim="formData.suggestedEntity"
						>
							<Icon name="windows" />

							Suggested Name of Entity
						</Field>
					</GridColumn>

					<GridColumn>
						<Field
							name="suggestedURL"
							v-model.trim="formData.suggestedURL"
						>
							<Icon name="chain" />

							Suggested URL
						</Field>
					</GridColumn>

					<GridColumn>
						<Field
							name="suggestedURL"
							v-model.trim="formData.citation"
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

import Field from '@/components/field/field';

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
			multipleReferencesText: 'Multiple references share this text selection',
			formData: {},
			NameInputPlaceholder: 'Enter...',
			datasetConfirmDeleteMessage: 'Are you sure you want to delete this dataset?',
			tooltips: {
				sciscore: 'Suggest citation information for this object',
				flag: 'Flag Issues For Author',
				passage: 'Show Text Passage',
				unlink: 'Unlink selected sentence to this dataset',
				deleteText: 'Delete this Dataset'
			},
			isFormSubmitting: false,
		}
	},
	

	/**
	 * Watch
	 */
	watch: {
		activeDatasetId() {
			this.populateFormData()
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
		...mapGetters('account', ['userRoleWeight']),
		FormFields() {
			if (this.activeDatasetType === 'code') return FormDatasetCode;
			if (this.activeDatasetType === 'material') return FormDatasetMaterial;
			if (this.activeDatasetType === 'protocol') return FormDatasetProtocols;

			return FormDataset;
		},
		dataType() {
			return this.dataset?.dataType ? this.dataset.dataType : 'Undefined Type'
		},
		cssVariables() {
			return variables
		},
		textReferences() {
			return this.datasets.filter((dataset) =>
				dataset.sentences.some((sentence) => sentence.id === this.activeSentence.id)
			);
		}
	},

	/**
	 * Methods
	 */
	methods: {
		...mapActions('pdfViewer', [
			'updateDataset',
			'unlinkSentenceFromDataset',
			'setDatasets',
			'setActiveDataset',
			'setActiveDatasetType',
		]),
		populateFormData() {
			this.formData =  { ...this.formData, ...this.activeDataset }
		},
		handleNameInputChange(e) {
			this.formData = {...this.formData, name: e.target.value}
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
			
			documentHandler.saveDataset(this.activeDataset.id, this.formData, (_, res) => {
				const newDataset = res;
				this.updateDataset(newDataset);
				
				if (this.activeDatasetType !== newDataset.datasetType) {
					this.setActiveDatasetType(newDataset.datasetType);
				}
				
				this.isFormSubmitting = false;
			})
		},
		toggleIssuesForm() {
			this.formData.flagged = !this.formData?.flagged;
		},
		handleIssuesFormSubmit(formData) {
			// Clear button focus
			// Added as temporary solution until the form is properly integrated
			if (document.activeElement != document.body) document.activeElement.blur();

			console.log(formData);
		},
		handleIssuesFormCancel() {
			this.formData.flagged = false
		},
		handleMessageCurator() {
			console.log('handleIssuesFormCancel');
		},
		openDeleteModal() {
			this.openConfirmModal({
				message: "Do you wish to permanently delete this item?",
				confirm: "Yes, Delete",
				cancel: "No, Keep It",
				onConfirm: this.unlinkSentenceFromDataset,
			})
		},
		openUnlinkModal() {
			this.openConfirmModal({
				message: "Do you wish to unlink the selected text passage from this item?",
				confirm: "Yes, Unlink",
				cancel: "No, Keep It",
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
