<template>
	<Main
		className="main--table"
		:loading="loading"
		:error="error"
		:errorMessage="errorMessage"
	>
		<template #subheader>	
			<Subheader>
				<SubheaderTable
					title="Roles"
					icon="key"
					buttonLabel="Add New Role"
					buttonUrl="/add-role"
					:searchInputValue="globalSearchValue"
					@searchInput="handleSearchInput"
				/>
			</Subheader>
		</template>

		<Table modifier="roles">
			<vue-good-table
				styleClass="vgt-table"
				:columns="columns"
				:rows="rows"
				:totalRows="rows.length"
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
					<span v-if="props.column.label === 'Role'" v-tooltip.top-center="'Sort By Role'">
						{{ props.column.label }}
					</span>

					<span v-else>
						{{ props.column.label }}
					</span>
				</template>

				<template slot="table-row" slot-scope="props">
					<span v-if="props.column.field == 'label'" class="table__title">
						<Icon name="key" :color="props.row.color ? props.row.color : 'currentColor'"></Icon>

						{{ props.row.label }}
					</span>

					<span v-else-if="props.column.field === 'color'" class="table__color">
						<i :style="{ backgroundColor: props.row.color }" /> {{ props.row.color }}
					</span>

					<div v-else-if="props.column.field === 'action'" class="table__actions">
						<Button
							size="small"
							className="tertiary"
							:to="`/edit-role/${props.row._id}`"
							highlighted block
						>
							Edit Role
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
			</vue-good-table> <!-- /.table__table -->
		</Table>
	</Main>
</template>

<script>

/**
 * Internal Dependencies
 */
import Subheader from '@/components/subheader/subheader';
import SubheaderTable from '@/components/subheader/subheader-table';
import Table from '@/components/table/table';
import Icon from '@/components/icon/icon';
import Main from '@/components/main/main';
import Button from '@/components/button/button.vue';
import Pagination from '@/components/pagination/pagination.vue';
import RoleService from '@/services/roles/roles';
import AccountsService from '@/services/account/accounts';

export default {
	/**
	 * Name
	 */
	name: 'CuratorRoles',

	/**
	 * Components
	 */
	components: {
		Subheader,
		SubheaderTable,
		Table,
		Icon,
		Main,
		Button,
		Pagination
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
					field: 'label',
					label: 'Role'
				},
				{
					field: 'key',
					label: 'Key',
					sortable: false
				},
				{
					field: 'weight',
					label: 'Weight',
					sortable: false
				},
				{
					field: 'members',
					label: 'Members',
					sortable: false
				},
				{
					field: 'color',
					label: 'Color',
					sortable: false
				},
				{
					field: 'action',
					label: 'Action',
					sortable: false,
					globalSearchDisabled: true
				}
			],
			rows: [],
			filters: {},
			itemsPerPage: 10,
			globalSearchValue: '',
			perPageOptions: [2, 5, 10, 20, 50],
			filtersVisibility: false,
			loading: true,
			error: false,
			errorMessage: ''
		};
	},

	/**
	 * Methods
	 */
	methods: {
		handleSearchInput(value) {
			this.globalSearchValue = value
		},
		updateFilters(filters) {
			this.availableFilters = { ...filters };
		},
		onPerPageChange(params) {
			this.itemsPerPage = params.currentPerPage
		},
		async getRoles() {
			try {
				const roles = await RoleService.getRoles();
				const accounts = await AccountsService.getAccounts();
				
				roles.forEach(role => {
					role.members = accounts.map(account => account.role.key).filter(key => role.key === key ).length;
				});
				
				this.rows = roles;
			} catch (error) {
				this.errorMessage = error.message;
				this.error = true;	
			}

			this.loading = false;
		},
	},

	/**
	 * Mounted
	 */
	mounted () {
		this.getRoles();
	},
};
</script>