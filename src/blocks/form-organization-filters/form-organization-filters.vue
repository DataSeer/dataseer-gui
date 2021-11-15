<template>
	<div class="form form--filters">
		<div class="form__head">
			<h4>Advanced Filters</h4>
		</div>
		<!-- /.form__head -->

		<div class="form__body">
			<div class="form__row">
				<div class="form__col form__col--1of2">
					<FieldSelect
						v-model.trim="formData.organization"
						name="organization"
						placeholder="Include All"
						multiple
						:options="[
							{
								value: 'American Chemistry Society'
							},
							{
								value: 'ASAP & MJFF'
							},
							{
								value: 'Another Organization'
							},
							{
								value: 'Alphabetical Org'
							},
							{
								value: 'DataSeer'
							},
							{
								value: 'University of Manchester'
							},
							{
								value: 'University of Ottowa'
							},
							{
								value: 'University of Washington'
							},
							{
								value: 'Washington State University'
							}
						]"
					>
						<Icon name="organization" color="currentColor" />

						Institution/Organization
					</FieldSelect>
				</div>
				<!-- /.form__col -->

				<div class="form__col form__col--1of2">
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
	name: 'FormOrganizationFilters',

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
				organization: [],
				createdFrom: null,
				createdTo: null
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
	}
};
</script>
