<template>
	<div class="main main--documents">
		<div class="shell">
			<div v-if="getFiltersVisibility" class="table-filters">
				<BtnClose alt label="Close Document Filters" @onClick="changeFiltersVisibility(false)" />

				<FormFilters />
			</div>
			<!-- /.table-filters -->

			<div class="table table--documents" tabindex="0" aria-label="documents">
				<div class="table__inner" v-if="getDocumentView === 'list'">
						<vue-good-table :columns="fields" :rows="docs" :pagination-options="{ enabled: true }" styleClass="vgt-table">
							>
							<template slot="table-row" slot-scope="props">
								<span v-if="props.column.field == 'title'" class="table__title">
									<router-link to="/report">
										<Icon name="document" color="CurrentCOlor"></Icon>

										{{ props.row.title }}
									</router-link>
								</span>

								<div v-else-if="props.column.field === 'action'" class="table__actions">
									<ul>
										<li>
											<Button size="small" className="tertiary" to="/new-document">View</Button>
										</li>

										<li>
											<Button size="small" className="tertiary" to="/new-document">Report</Button>
										</li>

										<li>
											<Dropdown>
												<template #header>
													<Button size="small" className="tertiary" square>
														<Icon name="angle_down" color="currentColor" />
													</Button>
												</template>

												<div class="dropdown__nav">
													<ul>
														<li>
															<a href="#" @click.prevent="toggleSummary">
																<Icon name="connect" color="currentColor" />

																View/Edit Datasets
															</a>
														</li>

														<li>
															<a href="#">
																<Icon name="share" color="currentColor" />

																Get Public Share Link
															</a>
														</li>

														<li>
															<a href="#">
																<Icon name="document_view" color="currentColor" />

																View Data Report
															</a>
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
															<a href="#">
																<Icon name="invite" color="currentColor" />

																Contact Author
															</a>
														</li>
													</ul>

													<ul>
														<li class="is-highlighted">
															<a href="#">
																<Icon name="trash" color="currentColor" />

																Delete Document
															</a>
														</li>
													</ul>
												</div>
												<!-- /.dropdown__nav -->
											</Dropdown>
										</li>
									</ul>
								</div>
								<!-- /.table__actions -->

								<span
									v-else-if="props.column.field == 'status'"
									class="table__status"
									:class="{
										'is-validating': props.row.status.toLowerCase() === 'validating',
										'is-complete': props.row.status.toLowerCase() === 'complete',
									}"
								>
									{{ props.row.status }}
									<!-- /.table__status -->
								</span>
							</template>

							<template slot="pagination-bottom" slot-scope="props">
								<Pagination :totalItems="props.total" :pageChanged="props.pageChanged" :perPageChanged="props.perPageChanged" />
							</template>
						</vue-good-table>
					<!-- /.table__table -->
				</div>
				<!-- /.table__inner -->

				<Boxes v-if="getDocumentView === 'grid'">
					<Box v-for="doc in docs" :key="doc.id" :doc="doc"></Box>
				</Boxes>
			</div>
			<!-- /.table -->
		</div>
		<!-- /.shell -->
	</div>
	<!-- /.main -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Box from '@/components/box/box';
import Boxes from '@/components/boxes/boxes';
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button.vue';
import Dropdown from '@/components/dropdown/dropdown.vue';
import BtnClose from '@/components/btn-close/btn-close';
import Pagination from '@/components/pagination/pagination.vue';
import FormFilters from '@/blocks/form-filters/form-filters.vue';

export default {
	name: 'Documents',

	components: {
		Box,
		Icon,
		Boxes,
		Button,
		BtnClose,
		Dropdown,
		Pagination,
		FormFilters,
	},

	data: function() {
		return {
			fields: [
				{
					field: 'id',
					label: 'id',
					hidden: true,
				},
				{
					field: 'title',
					label: 'Title',
				},
				{
					field: 'author',
					label: 'Author',
					sortable: false,
				},
				{
					field: 'journal',
					label: 'Journal',
					sortable: false,
				},
				{
					field: 'file',
					label: 'File',
					sortable: false,
				},
				{
					field: 'uploaded',
					label: 'Uploaded',
					sortable: false,
				},
				{
					field: 'modified',
					label: 'Modified',
					sortable: false,
				},
				{
					field: 'status',
					label: 'Status',
					sortable: false,
				},
				{
					field: 'action',
					label: 'Action',
					sortable: false,
				},
			],
			docs: [
				{
					id: 1,
					title:
						'Implementation of the Operating Room Black Box Research Program at the Ottowa Hospital Through Patient, Clinic Organizational Engagement: Case Study',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: 'my_uploaded-filename.pdf',
					uploaded: '2021-06-12',
					modified: '2021-06-12',
					status: 'Validating',
				},
				{
					id: 2,
					title:
						'Some Other Research Program at the Ottowa Hospital Through Patient, Clinic Organizational With A really Long title That Goes  150 Characters So It Gets Cut O…',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: 'my_uploaded-filename.pdf',
					uploaded: '2021-06-12',
					modified: '2021-06-12',
					status: 'Complete',
				},
				{
					id: 3,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: 'my_uploaded-filename.pdf',
					uploaded: '2021-06-12',
					modified: '2021-06-12',
					status: 'Complete',
				},
				{
					id: 4,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: 'my_uploaded-filename.pdf',
					uploaded: '2021-06-12',
					modified: '2021-06-12',
					status: 'Complete',
				},
				{
					id: 5,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: 'my_uploaded-filename.pdf',
					uploaded: '2021-06-12',
					modified: '2021-06-12',
					status: 'Complete',
				},
				{
					id: 6,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: 'my_uploaded-filename.pdf',
					uploaded: '2021-06-12',
					modified: '2021-06-12',
					status: 'Complete',
				},
				{
					id: 7,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: 'my_uploaded-filename.pdf',
					uploaded: '2021-06-12',
					modified: '2021-06-12',
					status: 'Complete',
				},
				{
					id: 8,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: 'my_uploaded-filename.pdf',
					uploaded: '2021-06-12',
					modified: '2021-06-12',
					status: 'Complete',
				},
				{
					id: 9,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: 'my_uploaded-filename.pdf',
					uploaded: '2021-06-12',
					modified: '2021-06-12',
					status: 'Complete',
				},
				{
					id: 10,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: 'my_uploaded-filename.pdf',
					uploaded: '2021-06-12',
					modified: '2021-06-12',
					status: 'Complete',
				},
				{
					id: 11,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: 'my_uploaded-filename.pdf',
					uploaded: '2021-06-12',
					modified: '2021-06-12',
					status: 'Complete',
				},
				{
					id: 12,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: 'my_uploaded-filename.pdf',
					uploaded: '2021-06-12',
					modified: '2021-06-12',
					status: 'Complete',
				},
				{
					id: 13,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: 'my_uploaded-filename.pdf',
					uploaded: '2021-06-12',
					modified: '2021-06-12',
					status: 'Complete',
				},
				{
					id: 14,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: 'my_uploaded-filename.pdf',
					uploaded: '2021-06-12',
					modified: '2021-06-12',
					status: 'Complete',
				},
				{
					id: 15,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: 'my_uploaded-filename.pdf',
					uploaded: '2021-06-12',
					modified: '2021-06-12',
					status: 'Complete',
				},
				{
					id: 16,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: 'my_uploaded-filename.pdf',
					uploaded: '2021-06-12',
					modified: '2021-06-12',
					status: 'Complete',
				},
				{
					id: 17,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: 'my_uploaded-filename.pdf',
					uploaded: '2021-06-12',
					modified: '2021-06-12',
					status: 'Complete',
				},
			],
		};
	},

	methods: {
		changePerPage(val) {
			this.itemsPerPage = parseInt(val);
		},
		...mapActions(['changeFiltersVisibility']),
	},

	computed: {
		...mapGetters(['getDocumentView', 'getFiltersVisibility']),
	},
};
</script>
