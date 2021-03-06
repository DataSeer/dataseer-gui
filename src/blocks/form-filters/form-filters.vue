<template>
	<Form className="form--filters" @submit.prevent="handleApplyFilters">
		<FormHead>
			<h4>Advanced Filters</h4>
		</FormHead>

		<FormBody>
			<Grid columnGap="medium" rowGap="small" :columnSize="gridColumnSize">
				<template v-if="this.userRoleWeight > 10">
					<GridColumn>
						<FieldSelect
							v-model.trim="formData.owners"
							name="owners"
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
				</template>

				<GridColumn>
					<div class="form__range">
						<ul>
							<li>
								<FieldDatepicker
									v-model="formData.uploadedAfter"
									placeholder="From"
									:disableFn="disableUploadedAfter"
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
 * External Dependencies
 */
import { mapGetters } from 'vuex'

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
	 * Computed
	 */
	computed: {
		...mapGetters('account', ['userRoleWeight']),
		applyButtonText() {
			return this.areFiltersApplied ? 'Filters Applied' : 'Apply Filters';
		},
		applyButtonClass() {
			return this.areFiltersApplied ? 'tertiary' : 'primary';
		},
		gridColumnSize() {
			return this.userRoleWeight <= 10 ? 'half' : 'quarter';
		}
	},

	/**
	 * Methods
	 */
	methods: {
		handleClearFilters() {
			this.formData = {};
		},
		handleApplyFilters() {
			// Filter all falsy values ( "", 0, false, null, undefined )
			const query = Object.entries(this.formData).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {});
			
			this.$router.push({ query }).catch(() => {})
			this.$emit('applyFilters', query);
			this.areFiltersApplied = true;
		},
		disableUploadedAfter(date) {
			if (!this.formData.uploadedBefore) return false;
			const parseDate = new Date(this.formData.uploadedBefore);
			return date > parseDate;
		},
		disableUploadedBefore(date) {
			if (!this.formData.uploadedAfter) return false;
			const parseDate = new Date(this.formData.uploadedAfter);
			return date < parseDate;
		},
		disableUpdatedAfter(date) {
			if (!this.formData.updatedBefore) return false;
			const parseDate = new Date(this.formData.updatedBefore);
			return date > parseDate;
		},
		disableUpdatedBefore(date) {
			if (!this.formData.updatedAfter) return false;
			const parseDate = new Date(this.formData.updatedAfter);
			return date < parseDate;
		},
		async getAccountsList() {
			const accountsList = await accountsService.getAccountsList();
			this.accountsList = accountsList;
		},
		async getOrganizationsList() {
			const organizationsList = await organizationsService.getOrganizationsList();
			
			this.organizationsList = organizationsList;
		},
	},

	/**
	 * Created
	 */
	created () {
		this.formData = { ...this.initialValues };
	},

	/**
	 * mounted
	 */
	mounted () {
		this.getAccountsList();
		this.getOrganizationsList();
	},
};
</script>
