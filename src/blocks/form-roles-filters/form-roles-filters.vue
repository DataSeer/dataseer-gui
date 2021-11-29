<template>
	<div class="form form--filters">
		<div class="form__head">
			<h4>Advanced Filters</h4>
		</div>
		<!-- /.form__head -->

		<div class="form__body">
			<Grid columnGap="medium" rowGap="small">
				<GridColumn size="quarter">
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
				</GridColumn>
				<!-- /.form__col -->
			</Grid>
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
import Grid, { GridColumn } from '@/components/grid/grid';
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
		Grid,
		Icon,
		Button,
		GridColumn,
		FieldSelect
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			formData: {
				role: []
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
				role: []
			};

			this.handleApplyFilters();
		}
	}
};
</script>
