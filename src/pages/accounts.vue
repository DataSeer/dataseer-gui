<template>
	<Main class="main--table" hasSubheader>
		<Subheader>
			<SubheaderAccounts @filtersButtonClick="setFiltersVisibility(!filtersVisibility)" />
		</Subheader>
		
		<TableFilters v-if="filtersVisibility" @closeButtonClick="setFiltersVisibility(false)" >
			<FormAccountsFilters @onApplyFilters="applyFilters" />
		</TableFilters>
		
		<Table v-if="!this.loading" modifier="accounts">
			<vue-good-table
				:columns="columns"
				:rows="filteredRows"
				:pagination-options="{ enabled: true }"
				styleClass="vgt-table"
			>
				<template slot="table-column" slot-scope="props">
					<span v-if="props.column.label === 'Username'" v-tooltip.top-center="'Sort By Username'">
						{{ props.column.label }}
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
						{{ props.row.role.label }}
					</span>

					<span v-else-if="props.column.field === 'organizations'">
						<ul class="table__organization">
							<li v-for="organization in props.row.organizations" :key="organization._id">
								{{ organization.name }}
							</li>
						</ul>
					</span>

					<span v-else-if="props.column.field === 'disabled'">
						<span style="color: #006AC9" v-if="props.row.disabled">Active</span>

						<span style="color: #8CABCD" v-else>Inactive</span>
					</span>

					<div v-else-if="props.column.field === 'action'" class="table__actions">
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
/* eslint-disable */
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
import Button from '@/components/button/button';
import Subheader from '@/components/subheader/subheader';
import AccountsService from '@/services/account/accounts';
import Pagination from '@/components/pagination/pagination';
import TableFilters from '@/components/table/table-filters';
import SubheaderAccounts from '@/components/subheader/subheader-accounts';
import FormAccountsFilters from '@/blocks/form-accounts-filters/form-accounts-filters';

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
		SubheaderAccounts,
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
					sortable: false
				},
				{
					field: 'organizations',
					label: 'Organization',
					sortable: false
				},
				{
					field: 'updatedAt',
					label: 'Last Updated',
					type: 'date',
					formatFn: this.formatDate,
					sortable: false,
				},
				{
					field: 'disabled',
					label: 'Status',
					sortable: false
				},
				{
					field: 'action',
					label: 'Action',
					sortable: false
				}
			],
			rows: [],
			filters: {},
			loading: true,
			filtersVisibility: false
		};
	},

	/**
	 * Computed
	 */
	computed: {
		filteredRows: function() {
			if (Object.keys(this.filters).length === 0) return this.rows;
			
			const {
				username,
				fullname,
				organizations,
				role,
				createdFrom,
				createdTo,
				lastUpdatedFrom,
				lastUpdatedTo,
			} = this.filters;
			
			return this.rows
				.filter(row => username.length ? row.username.indexOf(username) !== -1 : true )
				.filter(row => fullname.length ? row.fullname.indexOf(fullname) !== -1 : true )
				/*.filter(row => {
					if (!organizations) return true;
					let keepRow = false;
					
					row.organizations.map(organization => {
						const ID = organization._id;
						if (organizations.some(entry => entry.value === ID )) {
							keepRow = true;
						}
					})

					return keepRow;
				})
				.filter(row => role.value ? row.role._id === role.value : true )
				.filter(row => {
					const rowUpdatedAt = parseISO(row.createdAt);

					if (createdFrom && !createdTo) {
						return isAfter(rowUpdatedAt, createdFrom);
					}

					if (!createdFrom && createdTo) {
						return isBefore(rowUpdatedAt, createdTo);
					}

					if (createdFrom && createdTo) {
						return isBefore(rowUpdatedAt, createdTo) && isAfter(rowUpdatedAt, createdFrom);
					}

					return true;
				})
				.filter(row => {
					const rowUpdatedAt = parseISO(row.updatedAt);

					if (lastUpdatedFrom && !lastUpdatedTo) {
						return isAfter(rowUpdatedAt, lastUpdatedFrom);
					}

					if (!lastUpdatedFrom && lastUpdatedTo) {
						return isBefore(rowUpdatedAt, lastUpdatedTo);
					}

					if (lastUpdatedFrom && lastUpdatedTo) {
						return isBefore(rowUpdatedAt, lastUpdatedTo) && isAfter(rowUpdatedAt, lastUpdatedFrom);
					}

					return true;
				}) */
		},
		routerQuery: function() {
			return this.$route.query
		}
	},

	/**
	 * Methods
	 */
	methods: {
		applyFilters(filters) {
			this.filters = { ...filters };
		},
		setFiltersVisibility(value) {
			this.filtersVisibility = value
		},
		formatDate(value) {
			return format(new Date(value), 'yyyy-MM-dd');
		},
		formatRole(value) {
			return value.label
		},
		async getAccounts() {
			this.loading = true;
			const accounts = await AccountsService.getAccounts();

			this.loading = false;
			this.rows = accounts;
		}
	},

	/**
	 * Created
	 */
	created () {
		this.filters = { ...this.routerQuery }
		this.getAccounts();	
	},
};
</script>