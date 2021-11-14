<template>
	<div class="form form--filters">
		<div class="form__head">
			<h4>Advanced Filters</h4>
		</div>
		<!-- /.form__head -->

		<div class="form__body">
			<div class="form__row">
				<div class="form__col">
					<Field
						v-model.trim="formData.owner"
						name="owner"
						placeholder="Document Owner"
						FormFilters
						multiple
						:options="[
							{
								title: 'Laura Leadauthor'
							},
							{
								title: 'Short Name'
							},
							{
								title: 'A. Nothersuper Longnameperson'
							},
							{
								title: 'Lorem ipsum dolor sit amet, consectetur'
							}
						]"
					>
						<Icon name="user" color="currentColor" />

						Document Owner
					</Field>
				</div>
				<!-- /.form__col -->

				<div class="form__col">
					<Field
						v-model.trim="formData.organization"
						name="organization"
						placeholder="Include All"
						multiple
						:options="[
							{
								title: 'Journal of Medical Internet Research'
							},
							{
								title: 'Organization 2'
							},
							{
								title: 'Organization 3'
							},
							{
								title: 'Organization 4'
							}
						]"
					>
						<Icon name="organization" color="currentColor" />

						Institution/Organization
					</Field>
				</div>
				<!-- /.form__col -->

				<div class="form__col">
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

				<div class="form__col">
					<div class="form__range">
						<ul>
							<li>
								<FieldDatepicker v-model="formData.modifiedFrom" placeholder="From">
									<Icon name="document_modify" color="currentColor" />

									Modified
								</FieldDatepicker>
							</li>

							<li>
								<FieldDatepicker v-model="formData.modifiedTo" placeholder="To" />
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
					<Button @onClick="handleApplyFilters">Apply Filters</Button>
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
import Field from '@/components/field/field';
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
		Field,
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
			}
		};
	},

	/**
	 * Methods
	 */
	methods: {
		handleApplyFilters() {
			this.$emit('onApplyFilters', this.formData);
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
		}
	}
};
</script>
