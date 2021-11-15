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
						v-model.trim="formData.role"
						name="Role"
						placeholder="Include All"
						:options="[
							{
								value: 'Curator'
							},
							{
								value: 'Annotator'
							},
							{
								value: 'Standard User'
							},
							{
								value: 'Visitor'
							}
						]"
					>
						<Icon name="key" color="currentColor" />

						Role
					</FieldSelect>
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
import FieldSelect from '@/components/field-select/field-select';

export default {
	/**
	 * Name
	 */
	name: 'FormRolesFilters',

	/**
	 * Components
	 */
	components: {
		Icon,
		Button,
		FieldSelect
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			formData: {
				role: []
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
				organization: []
			};

			this.$emit('onApplyFilters', this.formData);
		}
	}
};
</script>
