<template>
	<Form className="form--filters" @submit.prevent="handleApplyFilters">
		<FormHead>
			<h4>Advanced Filters</h4>
		</FormHead>

		<FormBody>
			<Grid columnGap="medium" rowGap="small" columnSize="quarter">
				<GridColumn>
					<Field
						name="username"
						v-model.trim="formData.username"
						type="text"
						placeholder="Username"
					>
						<Icon name="email" color="currentColor" />

						Username
					</Field>
				</GridColumn>
				
				<GridColumn>
					<Field
						name="fullname"
						v-model.trim="formData.fullname"
						type="text"
						placeholder="Fullname"
					>
						<Icon name="user" color="currentColor" />

						Fullname
					</Field>
				</GridColumn>
				
				<GridColumn>
					<FieldSelect
						v-model.trim="formData.organization"
						name="organization"
						placeholder="Include All"
						:options="organizationsList"
					>
						<Icon name="organization" color="currentColor" />

						Institution/Organization
					</FieldSelect>
				</GridColumn>

				<GridColumn>
					<FieldSelect
						v-model.trim="formData.role"
						name="role"
						placeholder="Include All"
						:options="rolesList"
					>
						<Icon name="key" color="currentColor" />

						Role
					</FieldSelect>
				</GridColumn>

				<GridColumn>
					<FieldDatepicker
						v-model="formData.createdFrom"
						placeholder="From"
						:disableFn="disableCreatedFrom"
					>
						<Icon name="document_upload" color="currentColor" />

						Created
					</FieldDatepicker>
				</GridColumn>
				
				<GridColumn class="self-bottom">
					<FieldDatepicker
						v-model="formData.createdTo"
						placeholder="To"
						:disableFn="disableCreatedTo"
					/>
				</GridColumn>

				<GridColumn>
					<FieldDatepicker
						v-model="formData.lastUpdatedFrom"
						placeholder="From"
						:disableFn="disableLastUpdatedFrom"
					>
						<Icon name="document_upload" color="currentColor" />

						Last Updated
					</FieldDatepicker>
				</GridColumn>
				
				<GridColumn class="self-bottom">
					<FieldDatepicker
						v-model="formData.lastUpdatedTo"
						placeholder="To"
						:disableFn="disableLastUpdatedTo"
					/>
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
import Button from '@/components/button/button';
import Icon from '@/components/icon/icon';
import Form, { FormActions, FormHead, FormBody } from '@/components/form/form';
import Grid, { GridColumn } from '@/components/grid/grid';
import FieldSelect from '@/components/field-select/field-select';
import organizationsService from '@/services/organizations/organizations';
import rolesService from '@/services/roles/roles';
import Field from '@/components/field/field';
import FieldDatepicker from '@/components/field-datepicker/field-datepicker';

export default {
	/**
	 * Name
	 */
	name: 'FormAccountsFilters',

	/**
	 * Components
	 */
	components: {
		Button,
		Form,
		Icon,
		FormActions,
		FormHead,
		FormBody,
		Grid,
		FieldSelect,
		GridColumn,
		Field,
		FieldDatepicker
	},

	/**
	 * Props
	 */
	props: {
		initialFilters: {
			type: Object,
			default: () => {}
		},
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			formData: {},
			rolesList: [],
			organizationsList: [],
			areFiltersApplied: false
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
				this.areFiltersApplied = JSON.stringify(this.initialFilters) === JSON.stringify(this.formData) ;
			},
			deep: true
		}
	},

	/**
	 * Methods
	 */
	methods: {
		handleApplyFilters() {
			// Filter all falsy values ( "", 0, false, null, undefined )
			const query = Object.entries(this.formData).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {});
			
			this.$router.push({ query }).catch(() => {})
			this.$emit('applyFilters', query);
			this.areFiltersApplied = true;
		},
		handleClearFilters() {
			this.formData = {};
		},
		disableCreatedFrom(date) {
			if (!this.formData.createdTo) return false;
			const parseDate = new Date(this.formData.createdTo);
			return date > parseDate;
		},
		disableCreatedTo(date) {
			if (!this.formData.createdFrom) return false;
			const parseDate = new Date(this.formData.createdFrom);
			return date < parseDate;
		},
		disableLastUpdatedFrom(date) {
			if (!this.formData.lastUpdatedTo) return false;
			const parseDate = new Date(this.formData.lastUpdatedTo);
			return date < parseDate;
		},
		disableLastUpdatedTo(date) {
			if (!this.formData.lastUpdatedFrom) return false;
			const parseDate = new Date(this.formData.lastUpdatedFrom);
			return date > parseDate;
		},
		async getOrganizationsList() {
			const organizationsList = await organizationsService.getOrganizationsList();
			
			this.organizationsList = organizationsList;
		},
		async getRolesList() {
			const rolesList = await rolesService.getRolesList();
			
			this.rolesList = rolesList;
		},
	},

	/**
	 * Created
	 */
	created () {
		this.formData = { ...this.initialFilters };
		this.getRolesList();
		this.getOrganizationsList();
	},
};
</script>
