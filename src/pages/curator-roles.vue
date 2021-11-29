<template>
	<Main hasSubheader className="main--table">
		<div v-if="getFiltersVisibility" class="table-filters">
			<BtnClose alt label="Close Document Filters" @onClick="changeFiltersVisibility(false)" />

			<FormRolesFilters @onApplyFilters="updateFilters" />
		</div>
		<!-- /.table-filters -->

		<div class="table table--roles" tabindex="0" aria-label="roles">
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
						<span v-if="props.column.field == 'role'" class="table__title">
							<Icon name="key" :color="props.row.color"></Icon>

							{{ props.row.role }}
						</span>

						<span v-else-if="props.column.field === 'color'" class="table__color">
							<i :style="{ backgroundColor: props.row.color }" /> {{ props.row.color }}
						</span>

						<div v-else-if="props.column.field === 'action'" class="table__actions">
							<Button size="small" className="tertiary" to="/edit-role" highlighted block>Edit Role</Button>
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
import { mapGetters, mapActions } from 'vuex';

/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Main from '@/components/main/main';
import Button from '@/components/button/button.vue';
import BtnClose from '@/components/btn-close/btn-close';
import Pagination from '@/components/pagination/pagination.vue';
import FormRolesFilters from '@/blocks/form-roles-filters/form-roles-filters.vue';

export default {
	/**
	 * Name
	 */
	name: 'CuratorRoles',

	/**
	 * Components
	 */
	components: {
		Icon,
		Main,
		Button,
		BtnClose,
		Pagination,
		FormRolesFilters
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
					field: 'role',
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
			rows: [
				{
					id: 1,
					role: 'Curator',
					key: 'Administrator',
					weight: '1000',
					members: '4',
					color: '#00BDFF'
				},

				{
					id: 2,
					role: 'Annotator',
					key: 'Moderator',
					weight: '1000',
					members: '9',
					color: '#006AC9'
				},

				{
					id: 3,
					role: 'Standard User',
					key: 'StandardUser',
					weight: '10',
					members: '1,234',
					color: '#444444'
				},

				{
					id: 4,
					role: 'Visitor',
					key: 'Administrator',
					weight: '1',
					members: '343',
					color: '#BCD0E6'
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

			const { role } = this.availableFilters;

			return this.rows.filter((row) => role.value === row.role) || !role.length;
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
