<template>
	<Main hasSubheader className="main--table">
		<Subheader>
			<SubheaderOrganizations title="Edit Organization" icon="organization" @filtersButtonClick="setFiltersVisibility(true)" />
		</Subheader>

		<TableFilters v-if="filtersVisibility" @closeButtonClick="setFiltersVisibility(false)">
			<FormOrganizationFilters @onApplyFilters="updateFilters" />
		</TableFilters>
				
		<Table v-if="!this.loading" modifier="organizations">
			<vue-good-table
				:columns="columns"
				:rows="organizations"
				:pagination-options="{ enabled: true }"
				styleClass="vgt-table"
				@on-sort-change="onSortChange">
			>
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
						<Icon name="organization" :color="props.row.visible ? 'currentColor' : '#8CABCD'" />

						{{ props.row.name }}
					</span>

					<span v-else-if="props.column.field === 'organization'">
						<ul class="table__organization">
							<li v-for="organization in props.row.organization" :key="organization">
								{{ organization }}
							</li>
						</ul>
					</span>

					<span v-else-if="props.column.field === 'visible'">
						<span style="color: #006AC9" v-if="props.row.visible">Active</span>

						<span style="color: #8CABCD" v-else>Inactive</span>
					</span>

					<div v-else-if="props.column.field === 'action'" class="table__actions">
						<Button size="small" className="tertiary" to="/edit-organization" highlighted block>Edit Organization</Button>
					</div>
				</template>

				<template slot="pagination-bottom" slot-scope="props">
					<Pagination :totalItems="props.total" :pageChanged="props.pageChanged" :perPageChanged="props.perPageChanged" />
				</template>
			</vue-good-table>
		</Table>
	</Main>
</template>

<script>
/**
 * External Dependencies
 */
import { format } from 'date-fns'

/**
 * Internal Dependencies
 */
import Subheader from '@/components/subheader/subheader';
import Icon from '@/components/icon/icon';
import Main from '@/components/main/main';
import Table from '@/components/table/table';
import TableFilters from '@/components/table/table-filters';
import Button from '@/components/button/button.vue';
import Pagination from '@/components/pagination/pagination.vue';
import organizationsService from '@/services/organizations/organizations';
import SubheaderOrganizations from '@/components/subheader/subheader-organizations';
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
		Subheader,
		Icon,
		Main,
		Button,
		Pagination,
		Table,
		TableFilters,
		SubheaderOrganizations,
		FormOrganizationFilters
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			columns: [
				{
					field: '_id',
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
					field: 'createdAt',
					label: 'Created',
					formatFn: this.formatDate,
					sortable: false
				},
				{
					field: 'visible',
					label: 'Status',
					sortable: false
				},
				{
					field: 'action',
					sortable: false
				}
			],
			organizations:[],
			loading: true,
			filters: null,
			filtersVisibility: false
		};
	},

	/**
	 * Computed
	 */
	computed: {
		filteredRows: function() {
			if (!this.filters) return this.rows;

			const { organization, createdFrom, createdTo } = this.filters;

			return this.rows
				.filter((row) => organization.some((el) => el.value === row.name) || !organization.length)
				.filter((row) => {
					if (!(createdFrom || createdTo)) return true;
					return row.created > createdFrom || row.created < createdTo;
				});
		},
	},

	/**
	 * Methods
	 */
	methods: {
		updateFilters(filters) {
			this.filters = { ...filters };
		},
		async getOrganizations() {
			this.loading = true;
			const organizations = await organizationsService.getOrganizations()
			
			
			this.loading = false;
			this.organizations = organizations;
		},
		formatDate(date) {
			return format(new Date(date), 'yyyy-MM-dd');
		},
		onSortChange() {
			console.log('test');
		},
		setFiltersVisibility(value) {
			this.filtersVisibility = value
		}
	},
	
	/**
	 * Mounted
	 */
	mounted () {
		this.getOrganizations();
	},
};
</script>
