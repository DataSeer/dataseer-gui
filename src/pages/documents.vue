<template>
	<Main
		hasSubheader
		className="main--table"
	>
		<Subheader>
			<SubheaderDocuments @filtersButtonClick="setFiltersVisibility(!filtersVisibility)" />
		</Subheader>

		<Loader :loading="loading" :error="error" :errorMessage="errorMessage">
			<TableFilters v-if="filtersVisibility" @closeButtonClick="setFiltersVisibility(false)" >
				<FormFilters :initialValues="filters" @onApplyFilters="applyFilters" />
			</TableFilters>
			
			<Table modifier="documents">
				<vue-good-table :columns="columns" :rows="filteredRows" :pagination-options="{ enabled: true }" styleClass="vgt-table">
					<template slot="table-column" slot-scope="props">
						<span v-if="props.column.label == 'Title'" v-tooltip.top-center="'Sort By Title'">
							{{ props.column.label }}
						</span>

						<span v-else-if="props.column.label == 'Author'" v-tooltip.top-center="'Sort By Author'">
							{{ props.column.label }}
						</span>

						<span v-else>
							{{ props.column.label }}
						</span>
					</template>

					<template slot="table-row" slot-scope="props">
						<span v-if="props.column.field == 'name'" class="table__title">
							<router-link to="/report">
								<Icon name="document" color="CurrentCOlor" />

								{{ props.row.name }}
							</router-link>
						</span>
						
						<span v-else-if="props.column.field === 'owner'" class="table__owner overflow-truncate">
							{{props.row.owner.fullname}}
						</span> <!-- /.table__name -->

						<span
							v-else-if="props.column.field == 'status'"
							class="table__status"
							:class="{
								'is-validating': props.row.status !== 'finish',
								'is-complete': props.row.status === 'finish'
							}"
						>
							<label class="text" v-if="props.row.status === 'finish'">Complete</label>
							
							<label class="text" v-else>Validating</label>
						</span>

						<span v-else-if="props.column.field === 'files'" class="table__files">
							<ul>
								<li
									v-for="file in props.row.files"
									:key="file._id"
									class="overflow-truncate"
								>
									{{ file.filename }}
								</li>
							</ul>
						</span> <!-- /.table__actions -->

						<div v-else-if="props.column.field === 'action'" class="table__actions">
							<ul>
								<li>
									<Button
										highlighted
										size="small"
										className="tertiary"
										:to="`/documents/${props.row._id}/datasets`"
									>
										View
									</Button>
								</li>

								<li>
									<Button
										highlighted
										size="small"
										className="tertiary"
										:to="`/documents/${props.row._id}/report`"
									>
										Report
									</Button>
								</li>

								<li>
									<Dropdown>
										<template #header>
											<Button size="small" className="tertiary" square highlighted>
												<Icon name="angle_down" color="currentColor" />
											</Button>
										</template>

										<div class="dropdown__nav">
											<ul>
												<li>
													<router-link :to="`/documents/${props.row._id}/datasets`">
														<Icon name="connect" color="currentColor" />

														View/Edit Datasets
													</router-link>
												</li>

												<li>
													<a href="#">
														<Icon name="share" color="currentColor" />

														Get Public Share Link
													</a>
												</li>

												<li>
													<router-link :to="`/documents/${props.row._id}/report`">
														<Icon name="document_view" color="currentColor" />

														View Data Report
													</router-link>
												</li>
											</ul>

											<ul>
												<li>
													<a href="#">
														<Icon name="document" color="currentColor" />

														Manage Document
													</a>
												</li>

												<li>
													<a :href="`mailto:${props.row.owner.username}`">
														<Icon name="invite" color="currentColor" />

														Contact Author
													</a>
												</li>
											</ul>

											<ul>
												<li class="is-highlighted">
													<button @click.prevent="deleteDocument(props.row.name, props.row._id)">
														<Icon name="trash" color="currentColor" />

														Delete Document
													</button>
												</li>
											</ul>
										</div> <!-- /.dropdown__nav -->
									</Dropdown>
								</li>
							</ul>
						</div>
					</template>

					<template slot="pagination-bottom" slot-scope="props">
						<Pagination :totalItems="props.total" :pageChanged="props.pageChanged" :perPageChanged="props.perPageChanged" />
					</template>
				</vue-good-table>
			</Table>
		</Loader>
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
import Loader from '@/blocks/loader/loader';
import Table from '@/components/table/table';
import Icon from '@/components/icon/icon';
import Main from '@/components/main/main';
import Button from '@/components/button/button';
import Dropdown from '@/components/dropdown/dropdown';
import Subheader from '@/components/subheader/subheader';
import TableFilters from '@/components/table/table-filters';
import Pagination from '@/components/pagination/pagination';
import FormFilters from '@/blocks/form-filters/form-filters';
import SubheaderDocuments from '@/components/subheader/subheader-documents';

import documentsService from '@/services/documents/documents';
import { filterByOrganization, filterByDate } from '@/utils/table-filters';

export default {
	/**
	 * Name
	 */
	name: 'Documents',

	/**	
	 * Components
	 */
	components: {
		Loader,
		Table,
		Icon,
		Main,
		Button,
		Dropdown,
		Subheader,
		TableFilters,
		Pagination,
		FormFilters,
		SubheaderDocuments
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
					hidden: true,
					sortable: false,
				},
				{
					field: 'name',
					label: 'Title',
				},
				{
					field: 'owner',
					label: 'Author',
				},
				{
					field: 'metadata',
					label: 'Journal',
					formatFn: this.formatMetadata,
				},
				{
					field: 'files',
					label: 'File',
				},
				{
					field: 'createdAt',
					label: 'createdAt',
					type: 'date',
					formatFn: this.formatDate,
					sortable: false,
				},
				{
					field: 'updatedAt',
					label: 'Modified',
					type: 'date',
					formatFn: this.formatDate,
					sortable: false,
				},
				{
					field: 'status',
					label: 'Status',
				},
				{
					field: 'action',
					label: 'Action',
					sortable: false,
					width: '220px',
				}
			],
			rows: [],
			filters: {},
			loading: true,
			error: false,
			errorMessage: '',
			filtersVisibility: false
		};
	},

	/**
	 * Computed
	 */
	computed: {
		routerQuery: function() {
			return this.$route.query
		},
		filteredRows: function() {
			if (Object.keys(this.filters).length === 0) return this.rows;
			
			const {
				organizations,
				uploadedFrom,
				uploadedTo,
				modifiedFrom,
				modifiedTo
			} = this.filters;

			return this.rows
				.filter((row) => filterByOrganization(row.organizations, organizations))
				.filter((row) => filterByDate(row.createdAt, uploadedFrom, uploadedTo))
				.filter((row) => filterByDate(row.updatedAt, modifiedFrom, modifiedTo))
		},
	},

	/**
	 * Methods
	 */
	methods: {
		applyFilters(filters) {
			this.filters = { ...filters };
		},
		formatMetadata(value) {
			return value.journal.length ? value.journal : ''
		},
		formatDate(value) {
			return format(new Date(value), 'yyyy-MM-dd');
		},
		setFiltersVisibility(value) {
			this.filtersVisibility = value
		},
		updateFilters(filters) {
			this.filters = { ...filters };
		},
		async getDocuments() {
			this.loading = true;
			
			const params = {
				skip: 0,
				limit: 10,
				files: true,
				metadata: true,		
			}

			try {
				const documents = await documentsService.getDocuments(params);
				this.rows = documents;
			} catch (e) {
				this.error = true
				this.errorMessage = e.message
			}

			this.loading = false;
		},
		async deleteDocument(name, id) {
			const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);

			if (confirmDelete) {
				this.loading = true;
				
				try {
					await documentsService.deleteDocument(id);
					await this.getDocuments();

					alert(`${name} has been successfully deleted.`)
				} catch (e) {
					alert(e.message)
				}

				this.loading = false;
			}
		}
	},

	/**
	 * Created
	 */
	created () {
		this.filters = { ...this.routerQuery }
		this.getDocuments();
	},
};
</script>
