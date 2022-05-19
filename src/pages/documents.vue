<template>
	<Main className="main--table" >
		<template #subheader>	
			<Subheader>
				<SubheaderDocuments
					:searchInputValue="globalSearchValue"
					@searchInput="handleSearchInput"
					@filtersButtonClick="setFiltersVisibility(!filtersVisibility)"
				/>
			</Subheader>
		</template>

		<TableFilters
			v-if="filtersVisibility"
			@closeButtonClick="setFiltersVisibility(false)"
		>
			<FormFilters
				:initialValues="serverParams.filters"
				@applyFilters="onApplyFilters"
			/>
		</TableFilters>
		
		<Table modifier="documents">
			<vue-good-table
				:columns="columns"
				:rows="rows"
				:totalRows="totalRows"
				:pagination-options="{
					enabled: true,
					perPage: serverParams.perPage
				}"
				:sort-options="{
					enabled: true,
					initialSortBy: {
						field: 'name',
						type: 'desc'
					}
				}"
				mode="remote"
				styleClass="vgt-table"
				:isLoading.sync="loading"
				:row-style-class="rowStyleClassFn"
				@on-sort-change="onSortChange"
				@on-page-change="onPageChange"
				@on-per-page-change="onPerPageChange"
			>
				<template slot="table-column" slot-scope="props">
					<span v-if="props.column.label == 'Title'" v-tooltip.top-center="'Sort By Title'">
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
												<button
													type="button"
													@click.prevent="copyText(
													`${windowOrigin}/#/documents/${props.row._id}/datasets?token=${props.row.token}`,
													'Public URL copied !')"
												>
													<Icon name="share" color="currentColor" />

													Get Public Share Link
												</button>
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
												<router-link :to="`/documents/${props.row._id}/manage`">
													<Icon name="document" color="currentColor" />

													Manage Document
												</router-link>
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

				<template slot="loadingContent">
					<Spinner />
				</template>

				<template slot="pagination-bottom" slot-scope="props">
					<Pagination
						:itemsPerPage="serverParams.perPage"
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
import { format } from 'date-fns' 

/**
 * Internal Dependencies
 */				
import Spinner from '@/components/spinner/spinner';
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

export default {
	/**
	 * Name
	 */
	name: 'Documents',

	/**	
	 * Components
	 */
	components: {
		Spinner,
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
					label: 'Upload Name',
				},
				{
					field: 'createdAt',
					label: 'Date Uploaded',
					type: 'date',
					formatFn: this.formatDate,
					sortable: false,
				},
				{
					field: 'status',
					label: 'Status',
					sortable: false,
				},
				{
					field: 'metadata',
					label: 'Article Title',
					formatFn: this.formatArticleTitle,
					sortable: false,
				},
				{
					field: 'metadata',
					label: 'Journal',
					formatFn: this.formatMetadata,
					sortable: false,
				},
				{
					field: 'owner',
					label: 'Owner',
					sortable: false,
				},
				{
					field: 'organizations',
					label: 'Organization',
					formatFn: this.formatOrganization,
					sortable: false,
				},
				{
					field: 'action',
					label: 'Action',
					sortable: false,
					width: '220px',
				}
			],
			rows: [],
			totalRows: 0,
			serverParams: {
				filters: {},
				sort: 'desc',
				page: 1, 
				perPage: 10,
			},
			globalSearchValue: '',
			perPageOptions: [2, 5, 10, 20],
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
		...mapGetters('account', ['userOrganizationsIds', 'userRoleWeight']), 
		routerQuery: function() {
			return this.$route.query
		},
		windowOrigin: function() {
			return window.location.origin
		}
	},

	/**
	 * Methods
	 */
	methods: {
		handleSearchInput(value) {
			this.globalSearchValue = value;
		},
		formatOrganization(value) {
			return value.map(entry => entry.name).join(', ').trim()
		},
		formatMetadata(value) {
			return value.journal.length ? value.journal : ''
		},
		formatDate(value) {
			return format(new Date(value), 'yyyy-MM-dd');
		},
		formatArticleTitle(value) {
			return value.article_title.length ? value.article_title : ''
		},
		onPageChange(params) {
			this.globalSearchValue = '';
			this.setServerParams({
				page: params.currentPage
			});
			this.getDocuments();
		},
		onPerPageChange(params) {
			this.globalSearchValue = '';
			this.setServerParams({
				perPage: params.currentPerPage
			});
			this.getDocuments();
		},
		onSortChange(params) {
			this.globalSearchValue = '';
			this.setServerParams({
				sort: params[0].type
			});
			this.getDocuments();
		},
		onApplyFilters(filters) {
			this.globalSearchValue = '';
			this.serverParams.filters = {
				...filters,
				owners: filters.owners?.join(',') || undefined,
				organizations: filters.organizations?.join(',') || undefined
			};
			this.getDocuments();
		},
		copyText(text, message) {
			this.$copyText(text).then(() => {
				alert(message.length ? message : 'Copied !')
			}, () => {
				alert('Can not copy')
			})
		},
		setFiltersVisibility(value) {
			this.filtersVisibility = value;
		},
		setServerParams(newProps) {
			this.serverParams = {
				...this.serverParams,
				...newProps
			};
		},	
		rowStyleClassFn(row) {
			if (!this.globalSearchValue) return '';
			const name = row.name|| '';
			const organizations = row.organizations?.map(entry => entry.name).join('') || '';
			const ownerName = row.owner?.fullname || '';
			const ownerUsername = row.owner?.username || '';
			const articleTitle = row.metadata?.article_title || '';
			const journal = row.metadata?.journal || '';
			
			const rowData = (`${name} ${organizations} ${ownerName} ${ownerUsername} ${articleTitle} ${journal}`).toLowerCase().trim();
					
			return rowData.indexOf(this.globalSearchValue) > -1 ? '' : 'hidden';
		},
		async getDocuments() {
			this.loading = true;
			
			const queryParams = {
				...this.serverParams.filters,
				skip: this.serverParams.page === 1 ? 0 : (this.serverParams.page - 1) * this.serverParams.perPage,
				limit: this.serverParams.perPage,
				sort: this.serverParams.sort,
				files: true,
				metadata: true,		
				count: true,
			}
			
			if (this.userOrganizationsIds && this.userRoleWeight < 1000) {
				queryParams.organizations = this.userOrganizationsIds.join(', ');
			}

			try {
				const documents = await documentsService.getDocuments(queryParams);
				
				this.totalRows = documents.count;
				this.rows = documents.data;
			} catch (e) {
				this.error = true;
				this.errorMessage = e.message;
			}
			
			this.loading = false;
		},
		async deleteDocument(name, id) {
			const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);

			if (!confirmDelete) return
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
	},

	/**
	 * Created
	 */
	created () {
		this.serverParams.filters = { ...this.routerQuery }
	},

	/**
	 * Mounted
	 */
	mounted () {
		this.getDocuments();
	},
};
</script>
