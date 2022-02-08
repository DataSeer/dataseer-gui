<template>
	<Form className="form--filters">
		<div class="form__head">
			<h4>Advanced Filters</h4>
		</div> <!-- /.form__head -->

		<div class="form__body">
			<Grid columnGap="medium" rowGap="small" columnSize="quarter">
				<GridColumn>
					<FieldSelect
						v-model.trim="formData.owner"
						name="owner"
						placeholder="Document Owner"
						multiple
						:options="[
							{
								value: 'Laura Leadauthor'
							},
							{
								value: 'Short Name'
							},
							{
								value: 'A. Nothersuper Longnameperson'
							},
							{
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
								value: 'Journal of Medical Internet Research'
							},
							{
								value: 'Organization 2'
							},
							{
								value: 'Organization 3'
							},
							{
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
		</div>
		<!-- /.form__body -->

		<div class="form__actions">
			<ul>
				<li>
					<Button
						:className="applyButtonClass"
						:disabled="areFiltersApplied"
						@onClick="handleApplyFilters"
					>
						{{ applyButtonText }}
					</Button>
				</li>

				<li>
					<Button className="tertiary" @onClick="handleClearFilters">Clear Filters</Button>
				</li>
			</ul>
		</div>
		<!-- /.form__actions -->
	</Form>
</template>

<script>
/**
 * Internal Dependencies
 */
import Form from '@/components/form/form';
import Grid, { GridColumn } from '@/components/grid/grid';
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import FieldSelect from '@/components/field-select/field-select';
import FieldDatepicker from '@/components/field-datepicker/field-datepicker';

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
