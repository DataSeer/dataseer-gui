<template>
	<Form className="form--filters">
		<FormHead>
			<h4>Advanced Filters</h4>
		</FormHead>
		
		<FormBody>
			<Grid columnGap="medium" rowGap="small" columnSize="half">
				<GridColumn>
					<FieldSelect
						v-model.trim="formData.organization"
						name="organization"
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
								<FieldDatepicker v-model="formData.createdFrom" placeholder="From" :disableFn="disableCreatedFrom">
									<Icon name="document_upload" color="currentColor" />

									Created
								</FieldDatepicker>
							</li>

							<li>
								<FieldDatepicker v-model="formData.createdTo" placeholder="To" :disableFn="disableCreatedTo" />
							</li>
						</ul>
					</div> <!-- /.form__range -->
				</GridColumn>
			</Grid>
		</FormBody>
		
		<FormActions>
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
		</FormActions>
	</Form>
</template>

<script>
/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import Grid, { GridColumn } from '@/components/grid/grid';
import FieldSelect from '@/components/field-select/field-select';
import organizationsService from '@/services/organizations/organizations';
import FieldDatepicker from '@/components/field-datepicker/field-datepicker';
import Form, { FormActions, FormHead, FormBody } from '@/components/form/form';

export default {
	/**
	 * Name
	 */
	name: 'FormOrganizationFilters',

	/**
	 * Components
	 */
	components: {
		Form,
		FormActions,
		FormHead,
		FormBody,
		Icon,
		Grid,
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
				organization: [],
				createdFrom: null,
				createdTo: null
			},
			areFiltersApplied: true,
			organizationsList: []
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
				organization: [],
				createdFrom: null,
				createdTo: null
			};
		},
		disableCreatedFrom(date) {
			if (!this.formData.createdTo) return false;
			return date > this.formData.createdTo;
		},
		disableCreatedTo(date) {
			if (!this.formData.createdFrom) return false;
			return date < this.formData.createdFrom;
		},
		async getOrganizationsList() {
			this.organizationsList = await organizationsService.getOrganizationsList();
		},
	},

	/**
	 * Created
	 */
	created () {
		this.getOrganizationsList();
	},
};
</script>
