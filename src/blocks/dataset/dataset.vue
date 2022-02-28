<template>
	<div class="dataset">
		<h1 v-if="!dataset" class="dataset__title">
			The selected sentences are not linked to a dataset
			<br>
			If they are, click the button "Add new Dataset"
		</h1><!-- /.dataset__title -->
		
		<div v-else class="dataset__form">
			<FormIssues
				v-if="flagged && userRoleWeight < 1000"
			/>
			<FormCuratorIssues
				v-if="(flagged || isIssuesFormVisible) && userRoleWeight >= 1000"
				@cancelClick="handleIssuesCancel"
			/>

			<Form className="form--dataset" >
				<div class="form__head">
					<div class="form__head-inner">
						<h5>{{ dataset.id || "Unnamed" }}</h5>

						<p>{{ dataset.dataType || 'Undefined Type'}}</p>
					</div><!-- /.form__head-inner -->
				</div>
				
				<FormBody>
					<component
						:is="FormComponent"
						:formData="formData"
						:bestPracticesText="bestPracticesText"
						:suitableRepositoryText="suitableRepositoryText"
					/>
				</FormBody>

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
								@onClick="handleDatasetLink"
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
import { mapGetters } from 'vuex'

/**
 * Internal Dependencies
 */
import Popup from '@/components/popup/popup';
import RichtextEntry from '@/components/richtext-entry/richtext-entry';

import Icon from '@/components/icon/icon'
import Button from '@/components/button/button'

import Form, { FormBody } from '@/components/form/form';
import FormIssues from '@/blocks/form-issues/form-issues';
import FormCuratorIssues from '@/blocks/form-issues/form-curator-issues';

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
		FormBody,
		FormIssues,
		RichtextEntry,
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
		activeDatasetType: {
			type: String,
			default: ''
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
			tooltips: {
				connectText: 'Select additional sentences from the document to connect to this dataset',
				deleteText: 'Delete this Dataset'
			},
			bestPracticesText: '',
			suitableRepositoryText: '',
			isIssuesFormVisible: false,
		}
	},

	/**
	 * Computed
	 */
	computed: {
		...mapGetters('pdfViewer', ['dataTypes']),
		...mapGetters('account', ['userRoleWeight']),
		FormComponent() {
			if (this.activeDatasetType === 'code') return FormDatasetCode;
			if (this.activeDatasetType === 'materials') return FormDatasetMaterial;
			if (this.activeDatasetType === 'protocols') return FormDatasetProtocols;

			return FormDataset;
		},
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

			this.bestPracticesText = this.dataTypes.metadata[this.formData.type]?.bestDataFormatForSharing
			this.suitableRepositoryText = this.dataTypes.metadata[this.formData.type]?.mostSuitableRepositories.default
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
				this.$emit('datasetDelete')
			}
		},
		handleDatasetLink(e) {
			e.preventDefault();
			e.stopPropagation();
			
			this.$emit('datasetLink')
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
	},

	/**
	 * Mounted
	 */
	mounted () {
		this.populateFormData();
	},
}
</script>
