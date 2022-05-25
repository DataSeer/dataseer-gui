<template>
	<Main
		:loading="loading"
		:error="error"
		:errorMessage="errorMessage"
		className="main--report"
	>
		<template #subheader>
			<Subheader>
				<SubheaderReport />
			</Subheader>
		</template>

		<div class="report">
			<div class="report-group">
				<div class="report-title">
					<h1>{{report.originalDocument.name}}</h1>
					
					<p v-if="report.originalDocument.metadata.doi">
						<Icon name="chain" :color="cssVariables.primary" />

						<strong>DOI</strong> <a href="#">{{report.originalDocument.metadata.doi}}</a>
					</p>
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
				<ReportSuggestions title="Research Output Availability Statement" :datasetsInfos="report.sortedDatasetsInfos" />
			</div> <!-- /.report-group -->
		</div><!-- /.report -->

		<template #right>
			<div class="report-about">
				<ul>
					<li v-if="report.originalDocument.metadata.doi">
						<h6>Preprint link</h6>

						<a :href="report.originalDocument.metadata.doi" target="_blank">
							{{report.originalDocument.metadata.doi}}
						</a >
					</li>

					<li v-if="dataseerLink">
						<h6>DataSeer Link</h6>

						<a :href="dataseerLink" target="_blank">{{report.originalDocument.name}}</a>
					</li>

					<li v-if="authors">
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

			<ReportChart :src="graphImg" :url="graphURL" />
		</template>
	</Main>
</template>

<script>
/* eslint-disable */
/**
 * Internal Dependencies
 */
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

// import filesService from '@/services/files/files';
import chartsService from '@/services/charts/charts';
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
			loading: true,
			error: false,
			errorMessage: '',
			report: {
				sortedDatasetsInfos: {
					all: [],
					protocols: [],
					codes: [],
					softwares: [],
					reagents: [],
					datasets: []
				},
				originalDocument: {
					name: '',
					status: '',
					softcite: '',
					pdf: '',
					tei: '',
					metadata: {
						doi: '',
					},
				},
			},
			graphImg: '',
			graphURL: '',
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
		authors() {
			// Get report authors and filter cases where author got no name or email
			const authors = this.report?.originalDocument.metadata.authors?.filter(author => author.name || author.email );
			return authors || []
		},
		leadAuthors() {
			// Get lead authors only
			return this.authors.filter(author => author.isLeadSubmitting);
		},
		nonLeadAuthors() {
			// Get non lead authors only
			return this.authors.filter(author => !author.isLeadSubmitting);
		},
		documentID() {
			return this.$route.params.id
		},
		cssVariables() {
			return variables
		},
		dataseerLink() {
			const id = this.report?.originalDocument._id || '';
			const token = this.report?.originalDocument.token || '';

			if (!id && !token) return undefined
			
			return `${window.location.origin}/#/documents/${id}/datasets?token=${token}`
		}
	},

	/**
	 * Methods
	 */
	methods: {
		async getDocumentReport() {
			try {
				const report = await documentsService.getDocumentReport(this.documentID);
				const { sortedDatasetsInfos } = report;
				const graphParams = {
					reUseDatasetsName: 'Data re-use correctly cited',
					reUseDatasetsDone: sortedDatasetsInfos.datasets.filter(entry => entry.status === 'saved' && entry.reuse === true).length || 0,
					reUseDatasetsTotal: sortedDatasetsInfos.datasets.filter(entry => entry.reuse === true).length || 0,
					
					newDatasetsName: 'New Datasets publicly shared',
					newDatasetsDone: sortedDatasetsInfos.datasets.filter(entry => entry.status === 'saved' && entry.reuse === false).length || 0,
					newDatasetsTotal: sortedDatasetsInfos.datasets.filter(entry => entry.reuse === false).length || 0,
					
					newCodesName: 'Original Code publicly shared',
					newCodesDone: sortedDatasetsInfos.codes.filter(entry => entry.status === 'saved' && !entry.reuse).length || 0,
					newCodesTotal: sortedDatasetsInfos.codes.filter(entry => entry.reuse === false).length || 0,
					reUseCodesName: 'Code re-use correctly cited',
					reUseCodesDone: sortedDatasetsInfos.codes.filter(entry => entry.status === 'saved' && entry.reuse).length || 0,
					reUseCodesTotal: sortedDatasetsInfos.codes.filter(entry => entry.reuse === true).length || 0,
					
					reUseMaterialsName: 'Existing Materials identified',
					reUseMaterialsDone: sortedDatasetsInfos.reagents.filter(entry => entry.status === 'saved' && entry.
					reuse === true).length || 0,
					reUseMaterialsTotal: sortedDatasetsInfos.reagents.filter(entry => entry.reuse === true).length || 0,
					newMaterialsName: 'New Materials Available',
					newMaterialsDone: sortedDatasetsInfos.reagents.filter(entry => entry.status === 'saved' && entry.reuse === false).length || 0,
					newMaterialsTotal: sortedDatasetsInfos.reagents.filter(entry => entry.reuse === false).length || 0,
					
					reUseProtocolsName: 'Existing Protocol re-use correctly cited',
					reUseProtocolsDone: sortedDatasetsInfos.softwares.filter(entry => entry.status === 'saved' && entry.reuse).length || 0,
					reUseProtocolsTotal: sortedDatasetsInfos.softwares.filter(entry => entry.reuse === true).length || 0,
					newProtocolsName: 'Protocols publicly shared',
					newProtocolsDone: sortedDatasetsInfos.softwares.filter(entry => entry.status === 'saved' && !entry.reuse).length || 0,
					newProtocolsTotal: sortedDatasetsInfos.softwares.filter(entry => entry.reuse === false).length || 0,
				}
				
				const graphImg = await chartsService.getChartImg(graphParams);
				const graphURL = chartsService.getChartUrl(graphParams);
				
				this.report = report;
				this.graphImg = graphImg;
				this.graphURL = graphURL;
			} catch (error) {
				this.error = true;
				this.message = error.message;
			}

			this.loading = false;
		},
	},

	/**
	 * Created
	 */
	created () {
		this.getDocumentReport();
	},
};
</script>