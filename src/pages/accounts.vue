<template>
	<div class="main main--tables">
		<div class="shell">
			<div v-if="getFiltersVisibility" class="table-filters">
				<BtnClose alt label="Close Document Filters" @onClick="changeFiltersVisibility(false)" />

				<FormFilters @onApplyFilters="updateFilters" />
			</div>
			<!-- /.table-filters -->

			<div class="table table--accounts" tabindex="0" aria-label="accounts">
				<div class="table__inner">
					<vue-good-table :columns="columns" :rows="filteredRows" :pagination-options="{ enabled: true }" styleClass="vgt-table">
						<template slot="table-column" slot-scope="props">
							<span v-if="props.column.label == 'Author'" v-tooltip.top-center="'Sort By Username'">
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
								<span
									:style="{
										color: props.row.role.color
									}"
									>{{ props.row.role.title }}</span
								>
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
								<Button size="small" className="tertiary" to="/edit-user" highlighted block>Edit User</Button>
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
import FormFilters from '@/blocks/form-filters/form-filters.vue';

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
		Button,
		BtnClose,
		Pagination,
		FormFilters
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
					field: 'username',
					label: 'Username'
				},
				{
					field: 'fullName',
					label: 'Full Name',
					sortable: false
				},
				{
					field: 'role',
					label: 'Role',
					sortable: false
				},
				{
					field: 'organization',
					label: 'Organization',
					sortable: false
				},
				{
					field: 'lastSignedIn',
					label: 'Last Signed In',
					sortable: false,
					type: 'date',
					dateInputFormat: 'T',
					dateOutputFormat: 'yyyy-MM-dd'
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
			availableFilters: null
		};
	},

	/**
	 * Computed
	 */
	computed: {
		filteredRows: function() {
			if (!this.availableFilters) return this.rows;

			const { owner, organization, uploadedFrom, uploadedTo, modifiedFrom, modifiedTo } = this.availableFilters;

			return this.rows
				.filter((row) => owner.some((el) => el.title === row.author) || !owner.length)
				.filter((row) => organization.some((el) => el.title === row.journal) || !organization.length)
				.filter((row) => {
					if (!(uploadedFrom || uploadedTo)) return true;
					return row.uploaded > uploadedFrom || row.uploaded < uploadedTo;
				})
				.filter((row) => {
					if (!(modifiedFrom || modifiedTo)) return true;
					return row.modified > modifiedFrom || row.modified <= modifiedTo;
				});
		},
		...mapGetters(['getDocumentView', 'getFiltersVisibility'])
	},

	/**
	 * Methods
	 */
	methods: {
		updateFilters(filters) {
			this.availableFilters = filters;
		},
		...mapActions(['changeFiltersVisibility'])
	}
};
</script>
