<template>
	<Main
		className="main--table"
		:loading="loading"
		:error="error"
		:errorMessage="errorMessage"
	>
		<template #subheader>	
			<Subheader>
				<SubheaderOrganizations
					title="Edit Organization"
					icon="organization"
					@searchInput="handleSearchInput"
					@filtersButtonClick="setFiltersVisibility(!filtersVisibility)"
				/>
			</Subheader>
		</template>

		<TableFilters
			v-if="filtersVisibility"
			@closeButtonClick="setFiltersVisibility(false)"
		>
			<FormOrganizationFilters @onApplyFilters="applyFilters" />
		</TableFilters>
				
		<Table modifier="organizations">
			<vue-good-table
				styleClass="vgt-table"
				:columns="columns"
				:rows="filteredRows"
				:totalRows="filteredRows.length"
				:pagination-options="{
					enabled: true,
					perPage: itemsPerPage
				}"
				:sort-options="{
					enabled: true,
					initialSortBy: { 
						field: 'name',
						type: 'asc'
					}
				}"
				:search-options="{
					enabled: true,
					externalQuery: searchTerm
				}"
				@on-per-page-change="onPerPageChange"
			>
				<template slot="table-column" slot-scope="props">
					<span v-if="props.column.label === 'Name'" v-tooltip.top-center="'Sort By Name'">
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
						<Button
							size="small"
							className="tertiary"
							:to="`/edit-organization/${props.row._id}`"
							highlighted block
						>
							Edit Organization
						</Button>
					</div>
				</template>

				<template slot="pagination-bottom" slot-scope="props">
					<Pagination
						:itemsPerPage="itemsPerPage"
						:perPageOptions="perPageOptions"
						:totalItems="props.total"
						:pageChanged="props.pageChanged"
						:perPageChanged="props.perPageChanged"
					/>
				</template>
			</vue-good-table>
		</Table>
	</Main>
</template>

<script>
/**
 * External Dependencies
 */
import { parseISO, format, isBefore, isAfter } from 'date-fns'

/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Main from '@/components/main/main';
import Table from '@/components/table/table';
import Button from '@/components/button/button.vue';
import Subheader from '@/components/subheader/subheader';
import AccountsService from '@/services/account/accounts';
import TableFilters from '@/components/table/table-filters';
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
					label: 'Name',
					sortable: true,
					firstSortType: 'asc',
				},
				{
					field: 'accounts',
					label: 'Accounts',
					sortable: false,
					globalSearchDisabled: true
				},
				{
					field: 'createdAt',
					label: 'Created',
					formatFn: this.formatDate,
					sortable: false,
					globalSearchDisabled: true
				},
				{
					field: 'visible',
					label: 'Status',
					sortable: false,
					globalSearchDisabled: true
				},
				{
					field: 'action',
					sortable: false,
					globalSearchDisabled: true
				}
			],
			rows: [],
			filters: {},
			itemsPerPage: 50,
			searchTerm: '',
			perPageOptions: [5, 10, 20, 50],
			filtersVisibility: false,
			loading: true,
			error: false,
			errorMessage: ''
		};
	},

	/**
	 * Computed
	 */
	computed: {
		filteredRows: function() {
			if (!this.filters) return this.rows;

			const {
				organization,
				createdFrom,
				createdTo
			} = this.filters;

			return this.rows
				.filter(row => organization?.length ? row.name.indexOf(organization) !== -1 : true )
				.filter(row => {
					const rowDate = parseISO(row.createdAt);

					if (createdFrom && !createdTo) {
						return isAfter(rowDate, +createdFrom);
					}

					if (!createdFrom && createdTo) {
						return isBefore(rowDate, +createdTo);
					}

					if (createdFrom && createdTo) {
						return isBefore(rowDate, +createdTo) && isAfter(rowDate, +createdFrom);
					}

					return true;
				});
		},
		routerQuery: function() {
			return this.$route.query
		}
	},

	/**
	 * Methods
	 */
	methods: {
		handleSearchInput(value) {
			this.searchTerm = value
		},
		formatDate(date) {
			return format(new Date(date), 'yyyy-MM-dd');
		},
		applyFilters(filters) {
			this.filters = { ...filters };
		},
		setFiltersVisibility(value) {
			this.filtersVisibility = value
		},
		onPerPageChange(params) {
			this.itemsPerPage = params.currentPerPage
		},
		async getOrganizations() {
			try {
				const organizations = await organizationsService.getOrganizations();
				const accounts = await AccountsService.getAccounts();
				
				organizations.forEach(organization => {
					let count = 0;
					const getAccountsOrganizations = () => accounts.map(account => account.organizations.map(organization => organization._id))
					
					getAccountsOrganizations().forEach(entry => {
						if (entry.some((id) => id === organization._id)) {
							count++	
						}
					})
					
					organization.accounts = count;
				});
				
				this.rows = organizations;
			} catch (error) {
				this.errorMessage = error.message;	
				this.error = true;	
			}
			
			this.loading = false;
		}
	},

	/**
	 * Created
	 */
	created () {
		this.filters = { ...this.routerQuery }
	},
	
	/**
	 * Mounted
	 */
	mounted () {
		this.getOrganizations();
	},
};
</script>
