<template>
	<Form className="form--filters" @submit.prevent="handleApplyFilters">
		<FormHead>
			<h4>Advanced Filters</h4>
		</FormHead>
		
		<FormBody>
			<Grid columnGap="medium" rowGap="small" columnSize="half">
				<GridColumn>
					<Field
						name="organization"
						v-model.trim="formData.organization"
						type="text"
						placeholder="Include All"
					>
						<Icon name="organization" color="currentColor" />

						Institution/Organization
					</Field>
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
					type="submit"
					:className="applyButtonClass"
					:disabled="areFiltersApplied"
				>
					{{ applyButtonText }}
				</Button>
			</li>

			<li>
				<Button
					type="button"
					className="tertiary"
					@onClick="handleClearFilters"
				>
					Clear Filters
				</Button>
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
import organizationsService from '@/services/organizations/organizations';
import FieldDatepicker from '@/components/field-datepicker/field-datepicker';
import Field from '@/components/field/field';
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
		Field,
		Button,
		GridColumn,
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
		},
		routerQuery: function() {
			return this.$route.query
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
		async getOrganizationsList() {
			this.organizationsList = await organizationsService.getOrganizationsList();
		},
	},

	/**
	 * Created
	 */
	created () {
		this.formData = { ...this.initialValues }
		this.getOrganizationsList();
	},
};
</script>
