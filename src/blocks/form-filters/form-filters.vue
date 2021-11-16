<template>
	<div class="form form--filters">
		<div class="form__head">
			<h4>Advanced Filters</h4>
		</div>
		<!-- /.form__head -->

		<div class="form__body">
			<div class="form__row">
				<div class="form__col form__col--1of4">
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
				</div>
				<!-- /.form__col -->

				<div class="form__col form__col--1of4">
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
				</div>
				<!-- /.form__col -->

				<div class="form__col form__col--1of4">
					<div class="form__range">
						<ul>
							<li>
								<FieldDatepicker v-model="formData.uploadedFrom" placeholder="From" :disableFn="disableUploadedFrom">
									<Icon name="document_upload" color="currentColor" />

									Uploaded
								</FieldDatepicker>
							</li>

							<li>
								<FieldDatepicker v-model="formData.uploadedTo" placeholder="To" :disableFn="disableUploadedTo" />
							</li>
						</ul>
					</div>
					<!-- /.form__range -->
				</div>
				<!-- /.form__col -->

				<div class="form__col form__col--1of4">
					<div class="form__range">
						<ul>
							<li>
								<FieldDatepicker v-model="formData.modifiedFrom" placeholder="From" :disableFn="disableModifiedFrom">
									<Icon name="document_modify" color="currentColor" />

									Modified
								</FieldDatepicker>
							</li>

							<li>
								<FieldDatepicker v-model="formData.modifiedTo" placeholder="To" :disableFn="disableModifiedTo" />
							</li>
						</ul>
					</div>
					<!-- /.form__range -->
				</div>
				<!-- /.form__col -->
			</div>
			<!-- /.form__row -->
		</div>
		<!-- /.form__body -->

		<div class="form__actions">
			<ul>
				<li>
					<Button :className="applyButtonClass" :disabled="areFilteresApplied" @onClick="handleApplyFilters">
						{{ applyButtonText }}
					</Button>
				</li>

				<li>
					<Button className="tertiary" @onClick="handleClearFilters">Clear Filters</Button>
				</li>
			</ul>
		</div>
		<!-- /.form__actions -->
	</div>
	<!-- /.form form--filters -->
</template>

<script>
/**
 * Internal Dependencies
 */
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
		Icon,
		Button,
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
			areFilteresApplied: true
		};
	},

	/**
	 * Computed
	 */
	computed: {
		applyButtonText() {
			return this.areFilteresApplied ? 'Filters Applied' : 'Apply Filters';
		},
		applyButtonClass() {
			return this.areFilteresApplied ? 'tertiary' : '';
		}
	},

	/**
	 * Watch
	 */
	watch: {
		formData: {
			handler() {
				this.areFilteresApplied = false;
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

			this.areFilteresApplied = true;
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
