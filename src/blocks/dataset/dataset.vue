<template>
	<div class="dataset">
		<div v-if="!activeSentence.hasDatasets" class="dataset__form">
			<FormConnectText />
		</div><!-- /.dataset__form -->
		
		<div v-else class="dataset__form">
			<FormIssues v-if="formData.flagged && userRoleWeight < 1000" />

			<p v-if="textReferences.length > 1" class="dataset-references">
				<Icon name="references" />
				
				<em>Multiple references share this text selection</em>

				<Dropdown ref="textReferencesDropdown" placement="right">
					<template #header>
						<span class="dropdown__arrow" />
					</template>

					<DropdownNavDatasets :datasets="textReferences" @dropdownButtonClick="handleDropdownButtonClick" />
				</Dropdown>
			</p><!-- /.datasets-references -->

			<FormCuratorIssues
				v-if="formData.flagged && userRoleWeight >= 1000"
				@cancelClick="toggleIssuesForm"
			/>

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
								v-tooltip.top-center="tooltips.unlink"
								@onClick.prevent="unlinkSentenceFromDataset"
							>
								<Icon name="icon_disconnect" />

								Unlink
							</Button>
							
							<Button
								className="tertiary"
								v-tooltip.top-center="tooltips.deleteText"
								@onClick.prevent="handleDatasetDelete"
							>
								<Icon name="trash" />

								Delete
							</Button>
						</div><!-- /.form-__cta-col -->

						<div v-if="userRoleWeight >= 1000" class="form__cta-col">
							<Button
								className="tertiary"
								square
								v-tooltip.top-center="tooltips.flag"
								@onClick.prevent="toggleIssuesForm"
							>
								<Icon name="flag" />
							</Button>

							<Button
								className="tertiary"
								square
								v-tooltip.top-center="tooltips.passage"
								@onClick.prevent="openPopup"
							>
								<Icon name="documents" />
							</Button>

							<Button
								className="tertiary"
								square
								v-tooltip.top-center="tooltips.unlink"
								@onClick.prevent="unlinkSentenceFromDataset"
							>
								<Icon name="icon_disconnect" />
							</Button>

							<Button
								className="tertiary"
								square
								v-tooltip.top-center="tooltips.deleteText"
								@onClick.prevent="handleDatasetDelete"
							>
								<Icon name="trash" />
							</Button>
						</div><!-- /.form-__cta-col -->
					</div> <!-- /.form__cta-row -->
				</div> <!-- /.form__cta -->
			</Form>

			<Popup ref="textPassagePopup" name="text-passage-popup" size="small">
				<RichtextEntry label="Connected Text Passages" icon="documents">
					<p> Methods: Our implementation approach included seeking support from hospital leadership; building frontline support and a team of champions among patients, nurses, anesthesiologists, and surgeons; accounting for stakeholder perceptions using theory-informed qualitative interviews; engaging patients; and documenting the implementation process, including barriers and facilitators, using the consolidated framework for implementation research. </p>

					<p> Results: During the 12-month implementation period, we conducted 23 stakeholder engagement activities with over 200 participants. </p>
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
import RichtextEntry from '@/components/richtext-entry/richtext-entry';

import Icon from '@/components/icon/icon'
import Button from '@/components/button/button'
import Dropdown, { DropdownNavDatasets } from '@/components/dropdown/dropdown'

import Form, { FormBody, FormHead } from '@/components/form/form';
import FormIssues from '@/blocks/form-issues/form-issues';
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
		variables,
		Icon,
		Form,
		Popup,
		Button,
		Dropdown,
		DropdownNavDatasets,
		FormHead,
		FormBody,
		FormIssues,
		RichtextEntry,
		FormConnectText,
		FormCuratorIssues,
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
			NameInputPlaceholder: 'Enter...',
			datasetConfirmDeleteMessage: 'Are you sure you want to delete this dataset?',
			tooltips: {
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
		handleDatasetDelete() {
			const confirm = window.confirm(this.datasetConfirmDeleteMessage);

			if (!confirm) return
			this.documentHandler.datasetsList.events.onDatasetDelete(this.activeDataset);
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
				const newDataset = res
				this.updateDataset(newDataset);
				
				if (this.activeDatasetType !== newDataset.datasetType) {
					this.setActiveDatasetType(newDataset.datasetType);
				}
				
				this.isFormSubmitting = false;
			})
		},
		toggleIssuesForm() {
			this.formData.flagged = this.formData?.flagged ? false : true;
		},
		openPopup() {
			this.$refs.textPassagePopup.showModal();
		},
	},

	/**
	 * Created
	 */
	created () {
		this.populateFormData();
	},
}
</script>
