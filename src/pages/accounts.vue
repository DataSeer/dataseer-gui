<template>
	<Main
		class="main--table"
		:loading="loading"
		:error="error"
		:errorMessage="errorMessage"
	>
		<template #subheader>	
			<Subheader>
				<SubheaderTable
					title="Accounts"
					icon="user"
					buttonLabel="Add New Account"
					buttonUrl="/add-account"
					showFiltersButton
					:searchInputValue="globalSearchValue"
					@searchInput="handleSearchInput"
					@filtersButtonClick="setFiltersVisibility(!filtersVisibility)"
				/>
			</Subheader>
		</template>
		
		<TableFilters v-if="filtersVisibility" @closeButtonClick="setFiltersVisibility(false)" >
			<FormAccountsFilters
				:initialFilters="filters"
				@applyFilters="setFilters"
			/>
		</TableFilters>
		
		<Table modifier="accounts">
			<vue-good-table
				styleClass="vgt-table"
				:columns="columns"
				:rows="filteredRows"
				:totalRows="filteredRows.length"
				:pagination-options="{
					enabled: true,
					perPage: itemsPerPage
				}"
				:search-options="{
					enabled: true,
					externalQuery: globalSearchValue
				}"
				@on-per-page-change="onPerPageChange"
			>
				<template slot="table-column" slot-scope="props">
					<span v-if="props.column.label === 'Username'" v-tooltip.top-center="'Sort By Username'">
						{{ props.column.label }}
					</span>

					<span v-else-if="props.column.label === 'Action'">
						{{userRoleWeight >= 1000 ? props.column.label : ''}}
					</span>

					<span v-else>
						{{ props.column.label }}
					</span>
				</template>

				<template slot="table-row" slot-scope="props">
					<span v-if="props.column.field == 'username'" class="table__title">
						<a :href="`mailto:${props.row.username}`" target="_blank">
							<Icon name="user" :color="props.row.role.color"></Icon>

							{{ props.row.username }}
						</a>
					</span>

					<span v-else-if="props.column.field === 'role'">
						<label :style="{color: props.row.role.color}">{{ props.row.role.label }}</label>
					</span>

					<span v-else-if="props.column.field === 'organizations'">
						<ul class="table__organization">
							<li v-for="organization in props.row.organizations" :key="organization._id">
								{{ organization.name }}
							</li>
						</ul>
					</span>

					<span v-else-if="props.column.field === 'visible'">
						<span :style="{color: props.row.visible ? '#006AC9' : '#8CABCD'}">
							{{props.row.visible ? 'Active' : 'Inactive'}}
						</span>
					</span>

					<div v-else-if="props.column.field === 'action' && userRoleWeight >= 1000" class="table__actions">
						<Button
							size="small"
							className="tertiary"
							:to="`/edit-account/${props.row._id}`"
							highlighted
							block
						>
							Edit User
						</Button >
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
import { mapGetters } from 'vuex'
import { parseISO, format, isBefore, isAfter } from 'date-fns' 

/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Main from '@/components/main/main';
import Table from '@/components/table/table';
import Button from '@/components/button/button';
import Subheader from '@/components/subheader/subheader';
import SubheaderTable from '@/components/subheader/subheader-table';
import Pagination from '@/components/pagination/pagination';
import TableFilters from '@/components/table/table-filters';
import FormAccountsFilters from '@/blocks/form-accounts-filters/form-accounts-filters';
import AccountsService from '@/services/account/accounts';

export default {
	/**
	 * Name
	 */
	name: 'Accounts',

	/**
	 * Components
	 */
	components: {
		Icon,
		Main,
		Table,
		Button,
		Subheader,
		Pagination,
		TableFilters,
		SubheaderTable,
		FormAccountsFilters
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			columns: [
				{
					field: '_id',
					label: 'id',
					hidden: true
				},
				{
					field: 'username',
					label: 'Username'
				},
				{
					field: 'fullname',
					label: 'Full Name',
					sortable: false
				},
				{
					field: 'role',
					label: 'Role',
					formatFn: this.formatRole,
					sortable: false,
				},
				{
					field: 'organizations',
					label: 'Organization',
					sortable: false,
				},
				{
					field: 'updatedAt',
					label: 'Last Updated',
					type: 'date',
					formatFn: this.formatDate,
					sortable: false,
				},
				{
					field: 'visible',
					label: 'Status',
					sortable: false,
					globalSearchDisabled: true
				},
				{
					field: 'action',
					label: 'Action',
					sortable: false,
					hidden: false,
					globalSearchDisabled: true
				}
			],
			rows: [],
			filters: {},
			globalSearchValue: '',
			itemsPerPage: 50,
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
		...mapGetters('account', ['userRoleWeight']),
		filteredRows: function() {
			if (Object.keys(this.filters).length === 0) return this.rows;
			
			const { username, fullname, organization, role, createdFrom, createdTo, lastUpdatedFrom, lastUpdatedTo } = this.filters;

			return this.rows
				.filter(row => username?.length ? row.username.indexOf(username) !== -1 : true )
				.filter(row => fullname?.length ? row.fullname.indexOf(fullname) !== -1 : true )
				.filter(row => {
					if (!organization) return true;
					let keepRow = false;
					
					row.organizations.map(entry => {
						if (organization === entry._id) {
							keepRow = true;
						}
					})

					return keepRow;
				})
				.filter(row => role ? row.role._id === role : true )
				.filter(row => {
					const rowUpdatedAt = parseISO(row.createdAt);

					if (createdFrom && !createdTo) {
						return isAfter(rowUpdatedAt, +createdFrom);
					}

					if (!createdFrom && createdTo) {
						return isBefore(rowUpdatedAt, +createdTo);
					}

					if (createdFrom && createdTo) {
						return isBefore(rowUpdatedAt, +createdTo) && isAfter(rowUpdatedAt, +createdFrom);
					}

					return true;
				})
				.filter(row => {
					const rowUpdatedAt = parseISO(row.updatedAt);

					if (lastUpdatedFrom && !lastUpdatedTo) {
						return isAfter(rowUpdatedAt, +lastUpdatedFrom);
					}

					if (!lastUpdatedFrom && lastUpdatedTo) {
						return isBefore(rowUpdatedAt, +lastUpdatedTo);
					}

					if (lastUpdatedFrom && lastUpdatedTo) {
						return isBefore(rowUpdatedAt, +lastUpdatedTo) && isAfter(rowUpdatedAt, +lastUpdatedFrom);
					}

					return true;
				})
		}
	},

	/**
	 * Methods
	 */
	methods: {
		formatDate(value) {
			return format(new Date(value), 'yyyy-MM-dd');
		},
		formatRole(value) {
			return value.label
		},
		setFilters(newFilters) {
			this.filters = { ...newFilters };
		},
		setFiltersVisibility(value) {
			this.filtersVisibility = value
		},
		handleSearchInput(value) {
			this.globalSearchValue = value
		},
		onPerPageChange(params) {
			this.itemsPerPage = params.currentPerPage
		},
		async getAccounts() {
			try {
				const accounts = await AccountsService.getAccounts();
				this.rows = accounts;
			} catch (error) {
				this.error = true;
				this.errorMessage = error.message;
			}
			
			this.loading = false;
		}
	},

	/**
	 * Created
	 */
	created () {
		this.filters = this.$route.query
	},

	/**
	 * Mounted
	 */
	mounted () {
		this.getAccounts();	
	},
};
</script>