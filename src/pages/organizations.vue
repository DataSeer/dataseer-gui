<template>
	<div class="main main--tables">
		<div class="shell">
			<div v-if="getFiltersVisibility" class="table-filters">
				<BtnClose alt label="Close Document Filters" @onClick="changeFiltersVisibility(false)" />

				<FormOrganizationFilters @onApplyFilters="updateFilters" />
			</div>
			<!-- /.table-filters -->

			<div class="table table--organizations" tabindex="0" aria-label="organizations">
				<div class="table__inner">
					<vue-good-table :columns="columns" :rows="filteredRows" :pagination-options="{ enabled: true }" styleClass="vgt-table">
						<template slot="table-column" slot-scope="props">
							<span v-if="props.column.label == 'Name'" v-tooltip.top-center="'Sort By Name'">
								{{ props.column.label }}
							</span>

							<span v-else>
								{{ props.column.label }}
							</span>
						</template>

						<template slot="table-row" slot-scope="props">
							<span v-if="props.column.field == 'name'" class="table__title">
								<Icon name="organization" :color="props.row.isActive ? 'currentColor' : '#8CABCD'" />

								{{ props.row.name }}
							</span>

							<span v-else-if="props.column.field === 'organization'">
								<ul class="table__organization">
									<li v-for="organization in props.row.organization" :key="organization">
										{{ organization }}
									</li>
								</ul>
							</span>

							<span v-else-if="props.column.field === 'isActive'">
								<span style="color: #006AC9" v-if="props.row.isActive">Active</span>

								<span style="color: #8CABCD" v-else>Inactive</span>
							</span>

							<div v-else-if="props.column.field === 'action'" class="table__actions">
								<Button size="small" className="tertiary" to="/edit-user" highlighted block>Edit Organization</Button>
							</div>
						</template>

						<template slot="pagination-bottom" slot-scope="props">
							<Pagination :totalItems="props.total" :pageChanged="props.pageChanged" :perPageChanged="props.perPageChanged" />
						</template>
					</vue-good-table>
					<!-- /.table__table -->
				</div>
				<!-- /.table__inner -->
			</div>
			<!-- /.table -->
		</div>
		<!-- /.shell -->
	</div>
	<!-- /.main -->
</template>

<script>
/**
 * External Dependencies
 */
import { mapGetters, mapActions } from 'vuex';

/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button.vue';
import BtnClose from '@/components/btn-close/btn-close';
import Pagination from '@/components/pagination/pagination.vue';
import FormOrganizationFilters from '@/blocks/form-organization-filters/form-organization-filters';

export default {
	/**
	 * Name
	 */
	name: 'Organizations',

	/**
	 * Components
	 */
	components: {
		Icon,
		Button,
		BtnClose,
		Pagination,
		FormOrganizationFilters
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			columns: [
				{
					field: 'id',
					label: 'id',
					hidden: true
				},
				{
					field: 'name',
					label: 'Name'
				},
				{
					field: 'accounts',
					label: 'Accounts',
					sortable: false
				},
				{
					field: 'created',
					label: 'Created',
					type: 'date',
					dateInputFormat: 'T',
					dateOutputFormat: 'yyyy-MM-dd',
					sortable: false
				},
				{
					field: 'isActive',
					label: 'Status',
					sortable: false
				},
				{
					field: 'action',
					label: 'Action',
					sortable: false
				}
			],
			rows: [
				{
					id: 0,
					name: 'American Chemistry Society',
					accounts: 12,
					created: 1623456000000,
					isActive: true
				},
				{
					id: 1,
					name: 'ASAP & MJFF',
					accounts: 3,
					created: 1623456000000,
					isActive: true
				},
				{
					id: 2,
					name: 'Another Organization',
					accounts: 11,
					created: 1623456000000,
					isActive: true
				},

				{
					id: 3,
					name: 'Alphabetical Org',
					accounts: 3,
					created: 1623456000000,
					isActive: false
				},

				{
					id: 4,
					name: 'DataSeer',
					accounts: 2,
					created: 1623456000000,
					isActive: true
				},

				{
					id: 5,
					name: 'University of Manchester',
					accounts: 5,
					created: 1623456000000,
					isActive: true
				},

				{
					id: 6,
					name: 'University of Ottowa',
					accounts: 4,
					created: 1623456000000,
					isActive: true
				},

				{
					id: 7,
					name: 'University of Washington',
					accounts: 2,
					created: 1623456000000,
					isActive: true
				},

				{
					id: 8,
					name: 'Washington State University',
					accounts: 22,
					created: 1623456000000,
					isActive: true
				},

				{
					id: 9,
					name: 'Yale University',
					accounts: 3,
					created: 1623456000000,
					isActive: true
				}
			],
			availableFilters: null
		};
	},

	/**
	 * Computed
	 */
	computed: {
		filteredRows: function() {
			if (!this.availableFilters) return this.rows;

			const { organization, createdFrom, createdTo } = this.availableFilters;

			return this.rows
				.filter((row) => organization.some((el) => el.value === row.name) || !organization.length)
				.filter((row) => {
					if (!(createdFrom || createdTo)) return true;
					return row.created > createdFrom || row.created < createdTo;
				});
		},
		...mapGetters(['getDocumentView', 'getFiltersVisibility'])
	},

	/**
	 * Methods
	 */
	methods: {
		updateFilters(filters) {
			this.availableFilters = { ...filters };
		},
		...mapActions(['changeFiltersVisibility'])
	}
};
</script>
