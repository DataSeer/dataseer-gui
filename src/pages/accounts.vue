<template>
	<Main class="main--table" hasSubheader>
		<Subheader>
			<SubheaderAccounts @filtersButtonClick="setFiltersVisibility(true)" />
		</Subheader>
		
		<TableFilters
			v-if="filtersVisibility"
			@closeButtonClick="setFiltersVisibility(false)"
		>
			<FormAccountsFilters :filters="filters" @onApplyFilters="applyFilters" />
		</TableFilters>
		
		<Table v-if="!this.loading" modifier="accounts">
			<vue-good-table
				:columns="columns"
				:rows="rows"
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
/**
 * External Dependencies
 */
import { format } from 'date-fns'

/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Main from '@/components/main/main';
import Table from '@/components/table/table';
import Button from '@/components/button/button';
import Subheader from '@/components/subheader/subheader';
import Pagination from '@/components/pagination/pagination';
import TableFilters from '@/components/table/table-filters';
import AccountsService from '@/services/account/accounts';
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
					label: 'Last Signed In',
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
			rows: [
				{
					id: 1,
					username: 'johnsmith@xzynetworks.com',
					fullName: 'John Smith',
					role: {
						title: 'standart',
						color: '#444'
					},
					organization: ['University of Ottowa'],
					lastSignedIn: 1623456000000,
					isActive: true
				},
				{
					id: 2,
					username: 'y.pappas@xzynetworks.com',
					fullName: 'Yannis Pappas',
					role: {
						title: 'Standard User',
						color: '#444'
					},
					organization: ['American Journalist'],
					lastSignedIn: 1623456000000,
					isActive: true
				},
				{
					id: 3,
					username: 'carli@dataseer.ai',
					fullName: 'Carli Curator',
					role: {
						title: 'Curator',
						color: '#00BDFF'
					},
					organization: ['DataSeer'],
					lastSignedIn: 1623456000000,
					isActive: true
				},
				{
					id: 4,
					username: 'al.hernandez@somelongemailaddress.com',
					fullName: 'Alejandro Hernandez',
					role: {
						title: 'Standard User',
						color: '#444'
					},
					organization: ['ASAP & MJFF'],
					lastSignedIn: 1623456000000,
					isActive: false
				},
				{
					id: 5,
					username: 'Ali@ASAP.com',
					fullName: 'Ali Annotator',
					role: {
						title: 'Annotator',
						color: '#006AC9'
					},
					organization: ['ASAP & MJFF'],
					lastSignedIn: 1623456000000,
					isActive: false
				},
				{
					id: 6,
					username: 'email@xzynetworks.com',
					fullName: 'Ali Annotator',
					role: {
						title: 'Visitor',
						color: '#8CABCD'
					},
					organization: ['ASAP & MJFF'],
					lastSignedIn: 1623456000000,
					isActive: true
				},
				{
					id: 7,
					username: 'johnsmith@xzynetworks.com',
					fullName: 'John Smith',
					role: {
						title: 'standart',
						color: '#444'
					},
					organization: ['American Chemistry Society', 'University of Manchester'],
					lastSignedIn: 1623456000000,
					isActive: true
				},
				{
					id: 8,
					username: 'al.hernandez@somelongemailaddress.com',
					fullName: 'Alejandro Hernandez',
					role: {
						title: 'curatstandartor',
						color: '#444'
					},
					organization: ['ASAP & MJFF'],
					lastSignedIn: 1623456000000,
					isActive: false
				},
				{
					id: 9,
					username: 'y.pappas@xzynetworks.com',
					fullName: 'Yannis Pappas',
					role: {
						title: 'standart',
						color: '#444'
					},
					organization: ['American Journalist'],
					lastSignedIn: 1623456000000,
					isActive: true
				},
				{
					id: 10,
					username: 'johnsmith@xzynetworks.com',
					fullName: 'John Smith',
					role: {
						title: 'standart',
						color: '#444'
					},
					organization: ['University of Ottowa'],
					lastSignedIn: 1623456000000,
					isActive: true
				}
			],
			filters: {
				username: '',
				fullname: '',
				organization: [],
				role: '',
				createdFrom: null,
				createdTo: null,
				lastUpdatedFrom: null,
				lastUpdatedTo: null
			},
			loading: true,
			filtersVisibility: false
		};
	},

	/**
	 * Computed
	 */
	computed: {
		filteredRows: function() {
			return this.rows;
		},
	},

	/**
	 * Methods
	 */
	methods: {
		async applyFilters() {
			console.log(this.filters);
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
		this.getAccounts();	
	},
};
</script>
