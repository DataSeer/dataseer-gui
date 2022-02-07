<template>
	<Main hasSubheader className="main--table">
		<Subheader>
			<SubheaderRoles />
		</Subheader>

		<Table v-if="!this.loading" modifier="roles">
			<vue-good-table :columns="columns" :rows="filteredRows" :pagination-options="{ enabled: true }" styleClass="vgt-table">
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
						<Icon name="key" :color="props.row.color"></Icon>

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
import SubheaderRoles from '@/components/subheader/subheader-roles';
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
		SubheaderRoles,
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
					sortable: false
				}
			],
			rows: [],
			loading: true,
			filters: null,
		};
	},

	/**
	 * Computed
	 */
	computed: {
		filteredRows: function() {
			if (!this.availableFilters) return this.rows;

			const { role } = this.availableFilters;

			return this.rows.filter((row) => role.value === row.role) || !role.length;
		},
	},

	/**
	 * Methods
	 */
	methods: {
		updateFilters(filters) {
			this.availableFilters = { ...filters };
		},
		async getRoles() {
			this.loading = true;
			const roles = await RoleService.getRoles();
			const accountsRoles = await AccountsService.getAccounts();

			roles.forEach(role => {
				const accountsCount = accountsRoles.map(account => account.role.key).filter(key => role.key === key )
				role.members = accountsCount.length;
				role.color = '#006AC9';
			});

			this.loading = false;
			this.rows = roles;
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