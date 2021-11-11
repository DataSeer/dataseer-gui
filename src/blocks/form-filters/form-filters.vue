<template>
	<div class="form form--filters">
		<div class="form__head">
			<h4>Advanced Filters</h4>
		</div>
		<!-- /.form__head -->

		<div class="form__body">
			<FormRow
				v-model.trim="owner"
				name="owner"
				placeholder="Document Owner"
				FormFilters
				multiple
				:options="[
					{
						title: 'Owner 1',
					},
					{
						title: 'Owner 2',
					},
					{
						title: 'Owner 3',
					},
					{
						title: 'Owner 4',
					},
				]"
			>
				<Icon name="user" color="currentColor" />

				Document Owner
			</FormRow>

			<FormRow
				v-model.trim="organization"
				name="organization"
				placeholder="Include All"
				multiple
				:options="[
					{
						title: 'Organization 1',
					},
					{
						title: 'Organization 2',
					},
					{
						title: 'Organization 3',
					},
					{
						title: 'Organization 4',
					},
				]"
			>
				<Icon name="organization" color="currentColor" />

				Institution/Organization
			</FormRow>

			<div class="form__row">
				<label class="form__label">
					<Icon name="organization" color="currentColor" />

					Uploaded
				</label>
				<!-- /.form__label -->

				<div class="form__range">
					<ul>
						<li>
							<FormDatepicker v-model="uploadedFrom" placeholder="From" :disableFn="disableUploadedFrom" />
						</li>

						<li>
							<FormDatepicker v-model="uploadedTo" placeholder="To" :disableFn="disableUploadedTo" />
						</li>
					</ul>
				</div>
				<!-- /.form__range -->
			</div>
			<!-- /.form__row -->

			<div class="form__row">
				<label class="form__label">
					<Icon name="organization" color="currentColor" />

					Modified</label
				><!-- /.form__label -->

				<div class="form__range">
					<ul>
						<li>
							<FormDatepicker v-model="modifiedFrom" placeholder="From" />
						</li>

						<li>
							<FormDatepicker v-model="modifiedTo" placeholder="To" />
						</li>
					</ul>
				</div>
				<!-- /.form__range -->
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
import FormRow from '@/components/form-row/form-row';
import FormDatepicker from '@/components/form-datepicker/form-datepicker';

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
		FormRow,
		FormDatepicker,
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			owner: [],
			organization: [],
			uploadedFrom: null,
			uploadedTo: null,
			modifiedFrom: null,
			modifiedTo: null,
		};
	},

	/**
	 * Methods
	 */
	methods: {
		handleApplyFilters() {
			console.log('Apply');
		},
		handleClearFilters() {
			this.owner = [];
			this.organization = [];
			this.uploadedFrom = null;
			this.uploadedTo = null;
			this.modifiedFrom = null;
			this.modifiedTo = null;
		},
		disableUploadedFrom(date) {
			if (!this.uploadedTo) return true;
			return date > this.uploadedTo;
		},
		disableUploadedTo(date) {
			if (!this.uploadedFrom) return true;
			return date < this.uploadedFrom;
		},
	},
};
</script>
