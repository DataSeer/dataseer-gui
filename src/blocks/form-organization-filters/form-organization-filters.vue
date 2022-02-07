<template>
	<div class="form form--filters">
		<div class="form__head">
			<h4>Advanced Filters</h4>
		</div><!-- /.form__head -->

		<div class="form__body">
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
		</div> <!-- /.form__body -->

		<div class="form__actions">
			<ul>
				<li>
					<Button :className="applyButtonClass" :disabled="areFiltersApplied" @onClick="handleApplyFilters">
						{{ applyButtonText }}
					</Button>
				</li>

				<li>
					<Button className="tertiary" @onClick="handleClearFilters">Clear Filters</Button>
				</li>
			</ul>
		</div> <!-- /.form__actions -->
	</div> <!-- /.form form--filters -->
</template>

<script>
/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import Grid, { GridColumn } from '@/components/grid/grid';
import FieldSelect from '@/components/field-select/field-select';
import FieldDatepicker from '@/components/field-datepicker/field-datepicker';

export default {
	/**
	 * Name
	 */
	name: 'FormOrganizationFilters',

	/**
	 * Components
	 */
	components: {
		Icon,
		Grid,
		GridColumn,
		Button,
		FieldSelect,
		FieldDatepicker
	},

	/**
	 * Props
	 */
	props: {
		organizationsList: {
			type: Array,
			default: () => []
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
				organization: [],
				createdFrom: null,
				createdTo: null
			};

			this.handleApplyFilters();
		},
		disableCreatedFrom(date) {
			if (!this.formData.createdTo) return false;
			return date > this.formData.createdTo;
		},
		disableCreatedTo(date) {
			if (!this.formData.createdFrom) return false;
			return date < this.formData.createdFrom;
		}
	},
};
</script>
