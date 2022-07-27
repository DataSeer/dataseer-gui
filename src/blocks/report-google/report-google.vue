<template>
	<div class="report-google">
		<div class="report__head">
			<h4 v-if="title" class="report__title">{{ title }}</h4>
		</div> <!-- /.report__head -->

		<div v-if="documentID" class="report__form" ref="formReport">

			<div class="selects">
				<FieldSelect
					placeholder="Action"
					v-model.trim="formData.currentAction"
					:options="availableActions"
				>
				</FieldSelect>
				<FieldSelect
					placeholder="Template"
					v-model.trim="formData.currentTemplate"
					:options="availableTemplates[formData.currentAction]"
				>
				</FieldSelect>
			</div>

			<div class="submit" v-if="!loading">
				<Button
					tabindex="0"
					@onClick.prevent="submit"
					className="tertiary"
				>
					Submit
				</Button>
			</div>
			<Spinner v-if="loading" size="large" />
		</div> <!-- /.report__form -->
	</div> <!-- /.report-google -->
</template>

<script>

/**
 * Internal Dependencies
 */
import API from '@/lib/datasets/api';
import URLMANAGER from '@/lib/datasets/url';
import Button from '@/components/button/button';
import Spinner from '@/components/spinner/spinner';
import FieldSelect from '@/components/field-select/field-select';

export default {
	/**
	 * Name
	 */
	name: 'ReportGoogle',

	/**
	 * Props
	 */
	props: {
		title: String,
		documentID: String,
		documentToken: String
	},

	/**
	 * Components
	 */
	components: {
		Button,
		Spinner,
		FieldSelect
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			loading: false,
			availableTemplates: {
				open:	[
					{ value:'AmNat', label:'AmNat Report' },
					{ value:'ASAP',label:'ASAP Report' },
					{ value:'DataSeer Generic',label:'DataSeer Generic Report' },
					{ value:'bioRxiv',label:'BioRxiv Report' }
				],
				generate: [
					{ value:'AmNat', label:'AmNat Report' },
					{ value:'ASAP',label:'ASAP Report' },
					{ value:'DataSeer Generic',label:'DataSeer Generic Report' }
				]
			},
			availableActions: [
				{ value:'open', label:'Open' },
				{ value:'generate', label:'Generate' },
			],
			formData: {
				currentTemplate: 'AmNat',
				currentAction: 'open'
			}
		};
	},

	/**
	 * Computed
	 */
	computed: {},

	/**
	 * Methods
	 */
	methods: {
		getOpenReportLink() {
			let kind = this.formData.currentTemplate === 'bioRxiv' ? 'html' : 'gSpreadsheets';
			return URLMANAGER.buildURL(
				`documents/${this.documentID}/reports/${kind}/${this.formData.currentTemplate}`,
				{
					token: this.documentToken
				},
				{ origin: true }
			);
		},
		submit() {
			this.$emit('submit', {action: this.formData.currentAction, template: this.formData.currentTemplate});
			this.loading = true;
			if (this.formData.currentAction === 'open') {
				this.loading = false;
				let reportURL = this.getOpenReportLink();
				this.$emit('response', {err: false, res: {action: this.formData.currentAction, res: reportURL}});
				return window.open(reportURL, '_blank')?.focus();
			}
			let opts = {
					kind: this.formData.currentTemplate,
					id: this.documentID
				};
			return API.documents.buildGSpreadSheetReport(opts, (err, query) => {
				this.loading = false;
				this.$emit('response', {err: err, res: {action: this.formData.currentAction, template: this.formData.currentTemplate, res: query}});
				if (!query || query.err) return alert('An error has occured. Please contact an administrator.');
				return window.open(this.getOpenReportLink(), '_blank')?.focus();
			});
		}
	}
};
</script>
