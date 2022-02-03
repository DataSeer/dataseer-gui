<template>
	<Main hasSubheader className="main--table">
		<div v-if="false" class="table-filters">
			<BtnClose alt label="Close Document Filters" @onClick="changeFiltersVisibility(false)" />

			<FormOrganizationFilters @onApplyFilters="updateFilters" />
		</div> <!-- /.table-filters -->

		<div class="table table--organizations" tabindex="0" aria-label="organizations">
			<div class="table__inner">
				<vue-good-table :columns="columns" :rows="organizations" :pagination-options="{ enabled: true }" styleClass="vgt-table">
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
				<!-- /.table__table -->
			</div>
			<!-- /.table__inner -->
		</div>
		<!-- /.table -->
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
import Button from '@/components/button/button.vue';
import BtnClose from '@/components/btn-close/btn-close';
import Pagination from '@/components/pagination/pagination.vue';
import FormOrganizationFilters from '@/blocks/form-organization-filters/form-organization-filters';
import organizationsService from '@/services/organizations/organizations';

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
		Main,
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
	},

	/**
	 * Methods
	 */
	methods: {
		updateFilters(filters) {
			this.availableFilters = { ...filters };
		},
		async getOrganizations() {
			const organizations = await organizationsService.getOrganizations()
			
			this.loading = false;
			this.organizations = organizations;
		},
		formatDate: function(date) {
			return format(new Date(date), 'yyyy-MM-dd');
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
