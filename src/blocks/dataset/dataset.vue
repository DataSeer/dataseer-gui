<template>
	<div class="dataset">
		<div v-if="!dataset" class="dataset__form">
			<FormConnectText />
		</div><!-- /.dataset__title -->
		
		<div v-else class="dataset__form">
			<FormIssues
				v-if="flagged && userRoleWeight < 1000"
			/>

			<FormCuratorIssues
				v-if="(flagged || isIssuesFormVisible) && userRoleWeight >= 1000"
				@cancelClick="handleIssuesCancel"
			/>

			<Form className="form--dataset" :loading="isFormSubmitting">
				<FormHead>
					<input
						type="text"
						id="name"
						tabindex="0"
						placeholder="Enter Name Here"
						:value="formData.name"
						@input="onNameInput"
					/>

					<p>{{ dataset.dataType || 'Undefined Type'}}</p>
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
								@onClick="handleComplete"
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
								v-tooltip.top-center="tooltips.flag"
								@onClick="toggleIssuesForm"
							>
								<Icon name="flag" />
							</Button>

							<Button
								className="tertiary"
								square
								v-tooltip.top-center="tooltips.passage"
								@onClick="openPopup"
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
								@onClick="handleDelete"
							>
								<Icon name="trash" />
							</Button>
						</div><!-- /.form-__cta-col -->
					</div> <!-- /.form__cta-row -->
				</div> <!-- /.form__cta -->
			</Form>

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
import Popup from '@/components/popup/popup';
import RichtextEntry from '@/components/richtext-entry/richtext-entry';

import Icon from '@/components/icon/icon'
import Button from '@/components/button/button'

import Form, { FormBody, FormHead } from '@/components/form/form';
import FormIssues from '@/blocks/form-issues/form-issues';
import FormCuratorIssues from '@/blocks/form-issues/form-curator-issues';

import FormConnectText from '@/blocks/form-connect-text/form-connect-text';
import FormDataset from '@/blocks/form-dataset/form-dataset-default';
import FormDatasetCode from '@/blocks/form-dataset/form-dataset-code';
import FormDatasetMaterial from '@/blocks/form-dataset/form-dataset-material';
import FormDatasetProtocols from '@/blocks/form-dataset/form-dataset-protocols';

export default {
	/**
	 * Name
	 */
	name: "Dataset",

	/**
	 * Components
	 */
	components: {
		Icon,
		Form,
		Popup,
		Button,
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
		},
		flagged: {
			type: Boolean,
			default: false,
		},
	},

	/**
	 * Data
	 */
	data() {
		return {
			formData: {},
			tooltips: {
				flag: 'Flag Issues For Author',
				passage: 'Show Text Passage',
				unlink: 'Unlink selected sentence to this dataset',
				deleteText: 'Delete this Dataset'
			},
			isFormSubmitting: false,
			isIssuesFormVisible: false,
		}
	},

	watch: {
		activeDatasetId() {
			this.populateFormData()
		}
	},

	/**
	 * Computed
	 */
	computed: {
		...mapGetters('pdfViewer', ['documentHandler', 'dataTypes', 'activeDataset', 'activeDatasetId', 'activeDatasetType']),
		...mapGetters('account', ['userRoleWeight']),
		FormFields() {
			if (this.activeDatasetType === 'code') return FormDatasetCode;
			if (this.activeDatasetType === 'material') return FormDatasetMaterial;
			if (this.activeDatasetType === 'protocol') return FormDatasetProtocols;

			return FormDataset;
		},
	},

	/**
	 * Methods
	 */
	methods: {
		...mapActions('pdfViewer', ['unlinkSentenceFromDataset']),
		onNameInput(e) {
			this.formData = {...this.formData, name: e.target.value}
		},
		populateFormData() {
			this.formData =  {
				...this.formData,
				...this.activeDataset
			}
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
				this.documentHandler.datasetsList.events.onDatasetDelete(this.activeDataset);
			}
		},
		handleComplete(e) {
			e.preventDefault();
			this.isFormSubmitting = true;
			
			this.documentHandler.saveDataset(this.activeDataset.id, this.formData, () => {
				this.isFormSubmitting = false;
			})
		},
		handleIssuesCancel() {
			this.isIssuesFormVisible = false;
		},
		openPopup(e) {
			e.preventDefault();
			this.$refs.textPassagePopup.showModal();
		},
	},

	/**
	 * Mounted
	 */
	mounted () {
		this.populateFormData();
	},
}
</script>
