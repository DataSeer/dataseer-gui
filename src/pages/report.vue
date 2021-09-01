<template>
	<div class="main main--report">
		<div class="shell">
			<div class="main__inner">
				<div class="main__left">
					<div class="report-group">
						<div class="report-head">
							<div class="report-head__inner larger-text">
								<h3>Data Availability Report</h3>
						
								<p>Well done, the datasets for this text have been successfully linked.</p>
							</div><!-- /.report-head__inner -->
						
							<div class="report-status is-completed">
								<p class="report-status-text">
									<strong>STATUS</strong> <span>Document Complete</span>
								</p><!-- /.report-status-text -->
								
								<div class="report-status__bar">
									<span></span>
								</div><!-- /.report-status__bar -->
								
								<div class="report-status__steps">
									<span><strong>7</strong></span> of <strong>7</strong> Completed
								</div><!-- /.report-status__steps -->
							</div><!-- /.report-status -->
						</div><!-- /.report-head -->
					</div><!-- /.report-group -->

					<div class="report-group">
						<div class="report-title">
							<h1>Implementation of the Operating Room Black Box Research Program at the Ottowa Hospital Through Patient, Clinic Organizational Engagement: Case Study</h1>

							<p>
								<Icon name="document" color="#8CABCD"/>
								Manuscript # 03
							</p>
						</div><!-- /.report-title -->
					</div><!-- /.report-group -->

					<div class="report-group">
						<h6 class="report-group__title">Authors (10)</h6>

						<div class="Author"></div><!-- /.Author -->
					
						<Author v-for="(author, index) in leadAuthors" :key="index" :author="author"></Author>

						<ContentToggle
							labelClosed="Show All Authors"
							labelOpened="Hide All Authors"
						>
							<Authors>
								<Author v-for="(author, index) in nonLeadAuthors" :key="index" :author="author"></Author>
							</Authors>
						</ContentToggle>
					</div><!-- /.report-group -->

					<div class="report-group">
						<h6 class="report-group__title">Datasets (7)</h6>

						<Datasets>
							<Dataset v-for="(dataset, index) in activeDatasets" :key="index" :dataset="dataset"></Dataset>
						</Datasets>

						<ContentToggle
							labelClosed="Show Deleted Datasets"
							labelOpened="Hide Deleted Datasets"
						>
							<Datasets>
								<Dataset v-for="(dataset, index) in deletedDatasets" :key="index" :dataset="dataset"></Dataset>
							</Datasets>
						</ContentToggle>
					</div><!-- /.report-group -->
				</div><!-- /.main__left -->

				<div class="main__right">
					<reportSuggestions
					title="Suggested Data Availability Statement"
					:suggestions="suggestions"
					/>

					<div class="report-cta larger-text">
						<figure>
							<img src="@/assets/images/cta-img-1@2x.png" alt="CTA image">
						</figure>
						
						<span>How Was Your DataSeer Experience?</span>
						
						<a href="#">Give Us Feedback</a>
					</div><!-- /.report-cta -->
				</div><!-- /.main__right -->
			</div><!-- /.main__inner -->
		</div><!-- /.shell -->
	</div><!-- /.main -->
</template>

<script>
import reportSuggestions from '@/blocks/report-suggestions/report-suggestions'
import ContentToggle from '@/components/contenttoggle/contenttoggle'
import Authors from '@/components/authors/authors'
import Author from '@/components/author/author'
import Datasets from '@/components/datasets/datasets'
import Dataset from '@/components/dataset/dataset'
import Icon from '@/components/icon/icon'

export default {
	/**
	 * Name
	*/
	name: "Report",

	/**
	 * Components
	*/
	components: {
		reportSuggestions,
		ContentToggle,
		Datasets,
		Dataset,
		Authors,
		Author,
		Icon
	},

	/**
	 * Data
	*/
	data: function(){
		return {
			suggestions: [
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
					url: 'www.another-repo.com/HEied382-CA293/IDHEied382-CA293/xsdwdwwddwdw/445-2344-245.html#442r23'
				},

				{
					title: 'My Private Dataset',
					isPrivate: true,
					url: ''
				},
			],
			authors: [
				{
					name: 'Laura Leadauthor',
					email: 'leadauthor@toh.ca',
					description: `Department of Anesthesiology and Pain Medicine University of Ottawa, Ottawa, Canada
						Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa, Canada
						Department of Innovation in Medical Education University of Ottawa, Ottawa, Canada
						Faculty of Medicine Francophone Affairs University of Ottawa, Ottawa, Canada`,
					isLeadAuthor: true,
					isSubmittingAuthor: true
				},
				{
					name: 'Nicole Etherington',
					email: '',
					description: `Department of Anesthesiology and Pain Medicine University of Ottawa, Ottawa, Canada Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa, Canada`,
					isLeadAuthor: false,
					isSubmittingAuthor: false
				},
				{
					name: 'Nicole Etherington',
					email: '',
					description: `Department of Anesthesiology and Pain Medicine University of Ottawa, Ottawa, Canada Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa, Canada`,
					isLeadAuthor: false,
					isSubmittingAuthor: false
				},
				{
					name: 'Maxime Lê',
					email: '',
					description: `Patient and Family Advisory Council The Ottawa Hospital, Ottawa, Canada`,
					isLeadAuthor: false,
					isSubmittingAuthor: false
				},
				{
					name: 'Laurie Proulx',
					email: '',
					description: `Patient and Family Advisory Council The Ottawa Hospital, Ottawa, Canada`,
					isLeadAuthor: false,
					isSubmittingAuthor: false
				},
				{
					name: 'Meghan Britton',
					email: '',
					description: `Main Operating Room The Ottawa Hospital, Ottawa, Canada`,
					isLeadAuthor: false,
					isSubmittingAuthor: false
				},
				{
					name: 'Julie Kenna',
					email: '',
					description: `Main Operating Room The Ottawa Hospital, Ottawa, Canada`,
					isLeadAuthor: false,
					isSubmittingAuthor: false
				},
				{
					name: 'Antoine Przybylak-Brouillard',
					email: '',
					description: `Department of Anesthesiology and Pain Medicine University of Ottawa, Ottawa, Canada Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa, Canada`,
					isLeadAuthor: false,
					isSubmittingAuthor: false
				},
				{
					name: 'Jeremy Grimshaw',
					email: '',
					description: `Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa, Canada`,
					isLeadAuthor: false,
					isSubmittingAuthor: false
				},
				{
					name: 'Teodor Grantcharov',
					email: '',
					description: `Department of General Surgery University of Toronto, Toronto, Canada Li Ka Shing Knowledge Institute St. Michael's Hospital, Toronto, Canada`,
					isLeadAuthor: false,
					isSubmittingAuthor: false
				},
				{
					name: 'Sukhbir Singh',
					email: '',
					description: `Department of Obstetrics, Gynecology, and Newborn Care University of Ottawa, Ottawa, Canada`,
					isLeadAuthor: false,
					isSubmittingAuthor: false
				},
			],
			datasets: [
				{
					title: 'First Named Tabular Data',
					tag: 'Dataset-1',
					categories: [' Tabular Data', 'Fluorometry'],
					descreiption: 'Briefly, participants were recruited across each of the 3 campuses of our center, either in-person (patients) or via email (clinicians and administrators).',
					url: 'www.somerepo.com/#d/HEied382-CA293?ID=234',
					comment: 'A few additional comments here to further describe this dataset',
					status: 'ACTIVE'
				},
				{
					title: 'Another Dataset',
					tag: 'Dataset-2',
					categories: ['Tabular Data'],
					descreiption: 'Briefly, participants were recruited across each of the 3 campuses of our center, either in-person (patients) or via email (clinicians and administrators). Briefly, participants were recruited across each of the 3 campuses of our center, either in-person (patients) or via email (clinicians and administrators). Briefly, participants were recruited across each of the 3 campuses of our center, either in-person (patients) or via email (clinicians and administrators). Briefly, participants were recruited across each of the 3 campuses of our center, either in-person (patients) or via email (clinicians and administrators).',
					url: 'www.somerepo.com/#d/HEiedfefefefefef/efr3rf/382-CA293?ID=234',
					comment: 'A few additional comments here to further describe this dataset',
					status: 'ACTIVE'
				},
				{
					title: 'Some Named Tabular Data',
					tag: 'Dataset-3',
					categories: [' Tabular Data'],
					descreiption: 'The patient advisors collaborated in pairing patient messages with relatable graphic images and wording.',
					url: 'www.somerepo.com/#d/HEied382-CA293?ID=234',
					comment: 'none',
					status: 'ACTIVE'
				},
				{
					title: 'Dataset-4',
					tag: 'Dataset-4',
					categories: ['Tabular Dat', 'Sample Table'],
					descreiption: 'Briefly, participants were recruited across each of the 3 campuses of our center, either in-person (patients) or via email (clinicians and administrators).',
					url: 'www.somerepo.com/#d/HEied382-CA293?ID=234',
					comment: 'none',
					status: 'ACTIVE'
				},
				{
					title: 'Some Named Tabular Data',
					tag: 'Dataset-5',
					categories: ['Coulometry Data'],
					descreiption: 'Briefly, participants were recruited across each of the 3 campuses of our center, either in-person (patients) or via email (clinicians and administrators).',
					url: 'www.somerepo.com/#d/HEied382-CA293?ID=234',
					comment: 'A few additional comments here to further describe this dataset',
					status: 'ACTIVE'
				},
				{
					title: 'Named Data',
					tag: 'Dataset-6',
					categories: ['Tabular Data', 'Fluorometry'],
					descreiption: 'Briefly, participants were recruited across each of the 3 campuses of our center, either in-person (patients) or via email (clinicians and administrators).',
					url: '',
					comment: 'The data are not publicly available due to their containing information that could compromise the privacy of research participants.',
					status: 'ACTIVE'
				},
				{
					title: 'First Named Tabular Data',
					tag: 'Dataset-7',
					categories: [' Tabular Data', 'Fluorometry'],
					descreiption: 'Briefly, participants were recruited across each of the 3 campuses of our center, either in-person (patients) or via email (clinicians and administrators).',
					url: 'www.somerepo.com/#d/HEied382-CA293?ID=234',
					comment: 'A few additional comments here to further describe this dataset',
					status: 'ACTIVE'
				},
				{
					title: 'Named Data',
					tag: 'Dataset-6',
					categories: ['Tabular Data', 'Fluorometry'],
					descreiption: 'Briefly, participants were recruited across each of the 3 campuses of our center, either in-person (patients) or via email (clinicians and administrators).',
					url: '',
					comment: 'The data are not publicly available due to their containing information that could compromise the privacy of research participants.',
					status: 'DELETED'
				},
				{
					title: 'First Named Tabular Data',
					tag: 'Dataset-7',
					categories: [' Tabular Data', 'Fluorometry'],
					descreiption: 'Briefly, participants were recruited across each of the 3 campuses of our center, either in-person (patients) or via email (clinicians and administrators).',
					url: 'www.somerepo.com/#d/HEied382-CA293?ID=234',
					comment: 'A few additional comments here to further describe this dataset',
					status: 'DELETED'
				},
			]
		}
	},

	/**
	 * Computed
	*/
	computed: {
		leadAuthors() {
			return this.authors.filter(author => author.isLeadAuthor);
		},
		nonLeadAuthors() {
			return this.authors.filter(author => !author.isLeadAuthor);
		},
		activeDatasets() {
			return this.datasets.filter(dataset => dataset.status !== 'DELETED');
		},
		deletedDatasets() {
			return this.datasets.filter(dataset => dataset.status === 'DELETED');
		}
	}
}
</script>
