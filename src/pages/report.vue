<template>
	<Main className="main--report" hasSubheader>
		<Subheader>
			<SubheaderReport />
		</Subheader>

		<Loader
			:loading="loading"
			:error="error"
			:errorMessage="message"
		>
			<div class="report-group">
				<div class="report-title">
					<h1>{{report.originalDocument.name}}</h1>
					
					<template v-if="report.originalDocument.identifiers.doi" >
						<p>
							<Icon name="chain" :color="cssVariables.primary" />

							<strong>DOI</strong> <a href="#">https://doi.org/10.1101/2021.07.30.454065</a>
						</p>
					</template>
				</div> <!-- /.report-title -->
			</div> <!-- /.report-group -->

			<div class="report-group report-group--actions">
				<ul>
					<li>
						<ReportDataset 
							icon="datasets"
							title="Datasets"
							:data="report.sortedDatasetsInfos.datasets"
						/>
					</li>

					<li>
						<ReportDataset 
							icon="brackets"
							title="code"
							:data="report.sortedDatasetsInfos.codes"
						/>
					</li>

					<li>
						<ReportDataset 
							icon="flask"
							title="materials"
							:data="report.sortedDatasetsInfos.reagents"
						/>
					</li>

					<li>
						<ReportDataset 
							icon="protocols"
							title="protocols"
							:data="report.sortedDatasetsInfos.protocols"
						/>
					</li>
				</ul>
			</div> <!-- /.report-group -->

			<div class="report-group">
				<ReportSuggestions title="Data Availability Statement" :suggestions="suggestions" />
			</div> <!-- /.report-group -->
		</Loader>

		<template #right>
			<div class="report-about">
				<ul>
					<li>
						<h6>Preprint link</h6>

						<a href="https://www.biorxiv.org/content/10.1101/2021.07.30.454065v1.full">
							https://www.biorxiv.org/content/10.1101/2021.07.30.454065v1.full
						</a >
					</li>

					<li>
						<h6>DataSeer Link</h6>

						<a href="#">Sulzer Hobson et al Preprint Aug 2021.pdf</a>
					</li>

					<li>
						<h6>Authors ({{ authors.length }})</h6>

						<Author v-for="(author, index) in leadAuthors" :key="index" :author="author"></Author>

						<ContentToggle labelClosed="Show All Authors" labelOpened="Hide All Authors">
							<Authors>
								<Author
									v-for="(author, index) in nonLeadAuthors"
									:key="index"
									:author="author"
								></Author>
							</Authors>
						</ContentToggle>
					</li>
				</ul>
			</div> <!-- /.report-about -->

			<ReportChart shareLink="https://example.com/" />
		</template>
	</Main>
</template>

<script>
/* eslint-disable */
/**
 * Internal Dependencies
 */
import Loader from '@/blocks/loader/loader';
import Subheader from '@/components/subheader/subheader';
import SubheaderReport from '@/components/subheader/subheader-report';
import Icon from '@/components/icon/icon';
import Main from '@/components/main/main';
import Author from '@/components/author/author';
import Authors from '@/components/authors/authors';
import ReportChart from '@/components/report-chart/report-chart';
import ContentToggle from '@/components/contenttoggle/contenttoggle';
import ReportSuggestions from '@/blocks/report-suggestions/report-suggestions';
import ReportDataset from '@/components/report-dataset/report-dataset'

import documentsService from '@/services/documents/documents';

import variables from '@/assets/scss/generic/_variables.scss'

export default {
	/**
	 * Name
	 */
	name: 'Report',

	/**
	 * Components
	 */
	components: {
		Loader,
		Subheader,
		SubheaderReport,
		Icon,
		Main,
		Author,
		Authors,
		ReportChart,
		ReportDataset,
		ContentToggle,
		ReportSuggestions
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			error: false,
			loading: true,
			message: '',
			report: undefined,
			
			suggestions: [
				[
					{
						title: 'First Named Tabular Data',
						isPrivate: false,
						url: 'www.somerepo.com/#d/HEied382-CA293?ID=234'
					},
					{
						title: 'Another Dataset',
						isPrivate: false,
						url: 'www.someotherrepo.com/#d33/CA29333443ddvs3aa3.html'
					},
					{
						title: 'Some Named Tabular Data',
						isPrivate: false,
						url: 'www.repo.com/#d/HEied382-CA293?ID=234'
					},
					{
						title: 'Another Dataset',
						isPrivate: false,
						url: 'www.someotherrepo.com/#d33/CA29333443ddvs3aa3.html'
					},
					{
						title: 'Some Named Tabular Data',
						isPrivate: false,
						url: 'www.repo.com/#d/HEied382-CA293?ID=234'
					},
					{
						title: 'Named Data',
						isPrivate: false,
						url:
							'www.another-repo.com/HEied382-CA293/IDHEied382-CA293/xsdwdw wddwdw/445-2344-245.html#442r23'
					},
					{
						title: 'My Private Dataset',
						isPrivate: true,
						url: ''
					},
					{
						title: 'Some Named Tabular Data',
						isPrivate: false,
						url: 'www.repo.com/#d/HEied382-CA293?ID=234'
					},
					{
						title: 'Another Dataset',
						isPrivate: false,
						url: 'www.someotherrepo.com/#d33/CA29333443ddvs3aa3.html'
					},
					{
						title: 'Some Named Tabular Data',
						isPrivate: false,
						url: 'www.repo.com/#d/HEied382-CA293?ID=234'
					},
					{
						title: 'Named Data',
						isPrivate: false,
						url:
							'www.another-repo.com/HEied382-CA293/IDHEied382-CA293/xsdwdw wddwdw/445-2344-245.html#442r23'
					},
					{
						title: 'My Private Dataset',
						isPrivate: true,
						url: ''
					}
				],
				[
					{
						title: 'First Named Tabular Data',
						isPrivate: false,
						url: 'www.somerepo.com/#d/HEied382-CA293?ID=234'
					},
					{
						title: 'Another Dataset',
						isPrivate: false,
						url: 'www.someotherrepo.com/#d33/CA29333443ddvs3aa3.html'
					},
					{
						title: 'Some Named Tabular Data',
						isPrivate: false,
						url: 'www.repo.com/#d/HEied382-CA293?ID=234'
					},
					{
						title: 'Another Dataset',
						isPrivate: false,
						url: 'www.someotherrepo.com/#d33/CA29333443ddvs3aa3.html'
					},
					{
						title: 'Some Named Tabular Data',
						isPrivate: false,
						url: 'www.repo.com/#d/HEied382-CA293?ID=234'
					},
					{
						title: 'Named Data',
						isPrivate: false,
						url:
							'www.another-repo.com/HEied382-CA293/IDHEied382-CA293/xsdwdw wddwdw/445-2344-245.html#442r23'
					},
					{
						title: 'My Private Dataset',
						isPrivate: true,
						url: ''
					},
					{
						title: 'Some Named Tabular Data',
						isPrivate: false,
						url: 'www.repo.com/#d/HEied382-CA293?ID=234'
					},
					{
						title: 'Another Dataset',
						isPrivate: false,
						url: 'www.someotherrepo.com/#d33/CA29333443ddvs3aa3.html'
					},
					{
						title: 'Some Named Tabular Data',
						isPrivate: false,
						url: 'www.repo.com/#d/HEied382-CA293?ID=234'
					},
					{
						title: 'Named Data',
						isPrivate: false,
						url:
							'www.another-repo.com/HEied382-CA293/IDHEied382-CA293/xsdwdw wddwdw/445-2344-245.html#442r23'
					},
					{
						title: 'My Private Dataset',
						isPrivate: true,
						url: ''
					}
				]
			],
		};
	},
	

	/**
	 * Computed
	 */
	computed: {
		leadAuthors() {
			return this.authors.filter((author) => author.isLeadAuthor);
		},
		nonLeadAuthors() {
			return this.authors.filter((author) => !author.isLeadAuthor);
		},
		documentID() {
			return this.$route.params.id
		},
		cssVariables() {
			return variables
		},
		authors() {
			return this.report.originalDocument.metadata.authors
		}
	},

	/**
	 * Methods
	 */
	methods: {
		async getDocumentReport() {
			try {
				const report = await documentsService.getDocumentReport(this.documentID);
				this.report = report;
			} catch (error) {
				this.error = error.message
			}
			
			this.loading = false
		}
	},

	/**
	 * Created
	 */
	created () {
		this.getDocumentReport();
	},
};
</script>