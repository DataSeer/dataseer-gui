<template>
	<Main hasSubheader className="main--table">
		<div v-if="getFiltersVisibility" class="table-filters">
			<BtnClose alt label="Close Document Filters" @onClick="changeFiltersVisibility(false)" />

			<FormFilters @onApplyFilters="updateFilters" />
		</div><!-- /.table-filters -->

		<div class="table table--documents" tabindex="0" aria-label="documents">
			<div class="table__inner">
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
						<span v-if="props.column.field == 'title'" class="table__title">
							<router-link to="/report">
								<Icon name="document" color="CurrentCOlor"></Icon>

								{{ props.row.title }}
							</router-link>
						</span>

						<div v-else-if="props.column.field === 'action'" class="table__actions">
							<ul>
								<li>
									<Button size="small" className="tertiary" to="/datasets" highlighted>View</Button>
								</li>

								<li>
									<Button size="small" className="tertiary" to="/report" highlighted>Report</Button>
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
													<a href="#">
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

						<span v-else-if="props.column.field === 'file'" class="table__file overflow-truncate">
							<a :href="props.row.file.url" target="_blank">{{ props.row.file.title }}</a>
						</span>
						<!-- /.table__actions -->

						<span
							v-else-if="props.column.field == 'status'"
							class="table__status"
							:class="{
								'is-validating': props.row.status.toLowerCase() === 'validating',
								'is-complete': props.row.status.toLowerCase() === 'complete'
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
import Main from '@/components/main/main.vue';
import Button from '@/components/button/button.vue';
import Dropdown from '@/components/dropdown/dropdown.vue';
import BtnClose from '@/components/btn-close/btn-close';
import Pagination from '@/components/pagination/pagination.vue';
import FormFilters from '@/blocks/form-filters/form-filters.vue';

export default {
	/**
	 * Name
	 */
	name: 'Documents',

	/**
	 * Components
	 */
	components: {
		Icon,
		Main,
		Button,
		BtnClose,
		Dropdown,
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
					hidden: true,
					sortable: false,
				},
				{
					field: 'title',
					label: 'Title'
					
				},
				{
					field: 'author',
					label: 'Author'
				},
				{
					field: 'journal',
					label: 'Journal',
				},
				{
					field: 'file',
					label: 'File',
					sortFn: this.soryByFIleName,
				},
				{
					field: 'uploaded',
					label: 'Uploaded',
					type: 'date',
					dateInputFormat: 'T',
					dateOutputFormat: 'yyyy-MM-dd',
					sortFn: this.soryByUploadedDate,
				},
				{
					field: 'modified',
					label: 'Modified',
					type: 'date',
					dateInputFormat: 'T',
					dateOutputFormat: 'yyyy-MM-dd', // outputs Mar 16th 2018
					sortFn: this.soryByModifiedDate,
				},
				{
					field: 'status',
					label: 'Status',
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
					title:
						'Implementation of the Operating Room Black Box Research Program at the Ottowa Hospital Through Patient, Clinic Organizational Engagement: Case Study',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: {
						title: 'my_uploaded-filename.pdf',
						url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
					},
					uploaded: 1623445200000,
					modified: 1624395600000,
					status: 'Validating'
				},
				{
					id: 2,
					title:
						'Some Other Research Program at the Ottowa Hospital Through Patient, Clinic Organizational With A really Long title That Goes  150 Characters So It Gets Cut O…',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: {
						title: 'my_uploaded-filename.pdf',
						url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
					},
					uploaded: 1623445200000,
					modified: 1624395600000,
					status: 'Complete'
				},
				{
					id: 3,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: {
						title: 'a-longer-filename-would-be-cut-lorem-ipsum',
						url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
					},
					uploaded: 1623445200000,
					modified: 1624395600000,
					status: 'Complete'
				},
				{
					id: 4,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: {
						title: 'a-longer-filename-would-be-cut-lorem-ipsum',
						url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
					},
					uploaded: 1623445200000,
					modified: 1624395600000,
					status: 'Complete'
				},
				{
					id: 5,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Organization 2',
					file: {
						title: 'a-longer-filename-would-be-cut-lorem-ipsum',
						url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
					},
					uploaded: 1623445200000,
					modified: 1624395600000,
					status: 'Complete'
				},
				{
					id: 6,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Organization 3',
					file: {
						title: 'a-longer-filename-would-be-cut-lorem-ipsum',
						url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
					},
					uploaded: 1623445200000,
					modified: 1624395600000,
					status: 'Complete'
				},
				{
					id: 7,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Organization 2',
					file: {
						title: 'a-longer-filename-would-be-cut-lorem-ipsum',
						url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
					},
					uploaded: 1623445200000,
					modified: 1624395600000,
					status: 'Complete'
				},
				{
					id: 8,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: {
						title: 'my_uploaded-filename.pdf',
						url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
					},
					uploaded: 1623445200000,
					modified: 1624395600000,
					status: 'Complete'
				},
				{
					id: 9,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: {
						title: 'my_uploaded-filename.pdf',
						url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
					},
					uploaded: 1623445200000,
					modified: 1624395600000,
					status: 'Complete'
				},
				{
					id: 10,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: {
						title: 'my_uploaded-filename.pdf',
						url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
					},
					uploaded: 1623445200000,
					modified: 1624395600000,
					status: 'Complete'
				},
				{
					id: 11,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: {
						title: 'my_uploaded-filename.pdf',
						url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
					},
					uploaded: 1623445200000,
					modified: 1624395600000,
					status: 'Complete'
				},
				{
					id: 12,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: {
						title: 'my_uploaded-filename.pdf',
						url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
					},
					uploaded: 1623445200000,
					modified: 1624395600000,
					status: 'Complete'
				},
				{
					id: 13,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: {
						title: 'my_uploaded-filename.pdf',
						url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
					},
					uploaded: 1623445200000,
					modified: 1624395600000,
					status: 'Complete'
				},
				{
					id: 14,
					title: 'This Document Has  A Very Short Title',
					author: 'Laura Leadauthor',
					journal: 'Journal of Medical Internet Research',
					file: {
						title: 'my_uploaded-filename.pdf',
						url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
					},
					uploaded: 1623445200000,
					modified: 1624395600000,
					status: 'Complete'
				},
				{
					id: 15,
					title: 'This Document Has  A Very Short Title',
					author: 'Short Name',
					journal: 'Journal of Medical Internet Research',
					file: {
						title: 'my_uploaded-filename.pdf',
						url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
					},
					uploaded: 1623445200000,
					modified: 1624395600000,
					status: 'Complete'
				},
				{
					id: 16,
					title: 'This Document Has  A Very Short Title',
					author: 'Short Name',
					journal: 'Journal of Medical Internet Research',
					file: {
						title: 'my_uploaded-filename.pdf',
						url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
					},
					uploaded: 1623445200000,
					modified: 1624395600000,
					status: 'Complete'
				},
				{
					id: 17,
					title: 'This Document Has  A Very Short Title',
					author: 'Short Name',
					journal: 'Journal of Medical Internet Research',
					file: {
						title: 'my_uploaded-filename.pdf',
						url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
					},
					uploaded: 1623445200000,
					modified: 1624395600000,
					status: 'Complete'
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
				.filter((row) => (owner.length ? owner.some((el) => el.value === row.author) : true))
				.filter((row) => organization.some((el) => el.value === row.journal) || !organization.length)
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
			this.availableFilters = { ...filters };
		},
		soryByFIleName(x, y) {
			return (x.title < y.title ? -1 : (x.title > y.title ? 1 : 0));
		},
		...mapActions(['changeFiltersVisibility'])
	}
};
</script>
