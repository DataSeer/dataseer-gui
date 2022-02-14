<template>
	<Form className="form--filters" @submit.prevent="handleApplyFilters">
		<FormHead>
			<h4>Advanced Filters</h4>
		</FormHead>

		<FormBody>
			<Grid columnGap="medium" rowGap="small" columnSize="quarter">
				<GridColumn>
					<FieldSelect
						v-model.trim="formData.owner"
						name="owner"
						placeholder="Document Owner"
						multiple
						:options="[
							{
								label: 'Laura Leadauthor',
								value: 'Laura Leadauthor'
							},
							{
								label: 'Short Name',
								value: 'Short Name'
							},
							{
								label: 'A. Nothersuper Longnameperson',
								value: 'A. Nothersuper Longnameperson'
							},
							{
								label: 'Lorem ipsum dolor sit amet, consectetur',
								value: 'Lorem ipsum dolor sit amet, consectetur'
							}
						]"
					>
						<Icon name="user" color="currentColor" />

						Document Owner
					</FieldSelect>
				</GridColumn>

				<GridColumn>
					<FieldSelect
						v-model.trim="formData.organization"
						name="organization"
						placeholder="Include All"
						multiple
						:options="[
							{
								label: 'Journal of Medical Internet Research',
								value: 'Journal of Medical Internet Research'
							},
							{
								label: 'Organization 2',
								value: 'Organization 2'
							},
							{
								label: 'Organization 3',
								value: 'Organization 3'
							},
							{
								label: 'Organization 4',
								value: 'Organization 4'
							}
						]"
					>
						<Icon name="organization" color="currentColor" />

						Institution/Organization
					</FieldSelect>
				</GridColumn>

				<GridColumn>
					<div class="form__range">
						<ul>
							<li>
								<FieldDatepicker
									v-model="formData.uploadedFrom"
									placeholder="From"
									:disableFn="disableUploadedFrom"
								>
									<Icon name="document_upload" color="currentColor" />

									Uploaded
								</FieldDatepicker>
							</li>

							<li>
								<FieldDatepicker
									v-model="formData.uploadedTo"
									placeholder="To"
									:disableFn="disableUploadedTo"
								/>
							</li>
						</ul>
					</div>
					<!-- /.form__range -->
				</GridColumn>

				<GridColumn>
					<div class="form__range">
						<ul>
							<li>
								<FieldDatepicker
									v-model="formData.modifiedFrom"
									placeholder="From"
									:disableFn="disableModifiedFrom"
								>
									<Icon name="document_modify" color="currentColor" />

									Modified
								</FieldDatepicker>
							</li>

							<li>
								<FieldDatepicker
									v-model="formData.modifiedTo"
									placeholder="To"
									:disableFn="disableModifiedTo"
								/>
							</li>
						</ul>
					</div>
					<!-- /.form__range -->
				</GridColumn>
			</Grid>
		</FormBody>
		

		<FormActions>
			<li>
				<Button
					type="submit"
					:className="applyButtonClass"
					:disabled="areFiltersApplied"
				>
					{{ applyButtonText }}
				</Button>
			</li>

			<li>
				<Button className="tertiary" @onClick="handleClearFilters">Clear Filters</Button>
			</li>
		</FormActions>
	</Form>
</template>

<script>
/**
 * Internal Dependencies
 */
import Grid, { GridColumn } from '@/components/grid/grid';
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import FieldSelect from '@/components/field-select/field-select';
import FieldDatepicker from '@/components/field-datepicker/field-datepicker';
import Form, { FormActions, FormHead, FormBody } from '@/components/form/form';

export default {
	/**
	 * Name
	 */
	name: 'FormFilters',

	/**
	 * Components
	 */
	components: {
		Form,
		FormActions,
		FormHead,
		FormBody,
		Grid,
		Icon,
		Button,
		GridColumn,
		FieldSelect,
		FieldDatepicker
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			formData: {
				owner: [],
				organization: [],
				uploadedFrom: null,
				uploadedTo: null,
				modifiedFrom: null,
				modifiedTo: null
			},
			areFiltersApplied: true
		};
	},

	/**
	 * Computed
	 */
	computed: {
		applyButtonText() {
			return this.areFiltersApplied ? 'Filters Applied' : 'Apply Filters';
		},
		applyButtonClass() {
			return this.areFiltersApplied ? 'tertiary' : '';
		}
	},

	/**
	 * Watch
	 */
	watch: {
		formData: {
			handler() {
				this.areFiltersApplied = false;
			},
			deep: true
		}
	},

	/**
	 * Methods
	 */
	methods: {
		handleApplyFilters() {
			this.$emit('onApplyFilters', this.formData);

			this.areFiltersApplied = true;
		},
		handleClearFilters() {
			this.formData = {
				owner: [],
				organization: [],
				uploadedFrom: null,
				uploadedTo: null,
				modifiedFrom: null,
				modifiedTo: null
			};

			this.handleApplyFilters();
		},
		disableUploadedFrom(date) {
			if (!this.formData.uploadedTo) return false;
			return date > this.formData.uploadedTo;
		},
		disableUploadedTo(date) {
			if (!this.formData.uploadedFrom) return false;
			return date < this.formData.uploadedFrom;
		},
		disableModifiedFrom(date) {
			if (!this.formData.modifiedTo) return false;
			return date > this.formData.modifiedTo;
		},
		disableModifiedTo(date) {
			if (!this.formData.modifiedFrom) return false;
			return date < this.formData.modifiedFrom;
		}
	}
};
</script>
