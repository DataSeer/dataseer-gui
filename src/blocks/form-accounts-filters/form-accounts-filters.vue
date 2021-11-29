<template>
	<div class="form form--filters">
		<div class="form__head">
			<h4>Advanced Filters</h4>
		</div>
		<!-- /.form__head -->

		<div class="form__body"></div>
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
import Button from '@/components/button/button';

export default {
	/**
	 * Name
	 */
	name: 'FormAccountsFilters',

	/**
	 * Components
	 */
	components: {
		Button
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			formData: {
				organization: []
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
				organization: []
			};

			this.handleApplyFilters();
		}
	}
};
</script>
