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
						:options="accountsList"
					>
						<Icon name="user" color="currentColor" />

						Document Owner
					</FieldSelect>
				</GridColumn>

				<GridColumn>
					<FieldSelect
						v-model.trim="formData.organizations"
						name="organizations"
						placeholder="Include All"
						multiple
						:options="organizationsList"
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
									v-model="formData.uploadedAfter"
									placeholder="From"
									:disableFn="disablepploadedAfter"
								>
									<Icon name="document_upload" color="currentColor" />

									Uploaded
								</FieldDatepicker>
							</li>

							<li>
								<FieldDatepicker
									v-model="formData.uploadedBefore"
									placeholder="To"
									:disableFn="disableUploadedBefore"
								/>
							</li>
						</ul>
					</div> <!-- /.form__range -->
				</GridColumn>

				<GridColumn>
					<div class="form__range">
						<ul>
							<li>
								<FieldDatepicker
									v-model="formData.updatedAfter"
									placeholder="From"
									:disableFn="disableUpdatedAfter"
								>
									<Icon name="document_modify" color="currentColor" />

									Modified
								</FieldDatepicker>
							</li>

							<li>
								<FieldDatepicker
									v-model="formData.updatedBefore"
									placeholder="To"
									:disableFn="disableUpdatedBefore"
								/>
							</li>
						</ul>
					</div> <!-- /.form__range -->
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
				<Button className="tertiary" type="button" @onClick="handleClearFilters">Clear Filters</Button>
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

import accountsService from '@/services/account/accounts';
import organizationsService from '@/services/organizations/organizations';

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
	 * Props
	 */
	props: {
		initialValues: {
			type: Object,
			default:  () => {}
		},
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			formData: {},
			accountsList: [],
			organizationsList: [],
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
			const query = { ...this.formData };
			this.$router.replace({ query });
			this.$emit('onApplyFilters', this.formData);
			this.areFiltersApplied = true;
		},
		handleClearFilters() {
			this.formData = {};
		},
		async getOwnersList() {
			const organizationsList = await organizationsService.getOrganizationsList();
			
			this.organizationsList = organizationsList;
		},
		async getAccountsList() {
			const accountsList = await accountsService.getAccountsList();
			console.log(accountsList);
			this.accountsList = accountsList;
		},
		async getOrganizationsList() {
			const organizationsList = await organizationsService.getOrganizationsList();
			
			this.organizationsList = organizationsList;
		},
		disablepploadedAfter(date) {
			if (!this.formData.uploadedBefore) return false;
			return date > this.formData.uploadedBefore;
		},
		disableUploadedBefore(date) {
			if (!this.formData.uploadedAfter) return false;
			return date < this.formData.uploadedAfter;
		},
		disableUpdatedAfter(date) {
			if (!this.formData.updatedBefore) return false;
			return date > this.formData.updatedBefore;
		},
		disableUpdatedBefore(date) {
			if (!this.formData.updatedAfter) return false;
			return date < this.formData.updatedAfter;
		}
	},

	/**
	 * mounted
	 */
	mounted () {
		this.formData = { ...this.initialValues }
		this.getAccountsList();
		this.getOrganizationsList();
	},
};
</script>
