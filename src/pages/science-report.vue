<template>
	<div class="main main--report">
		<div class="shell">
			<div class="main__inner">
				<div class="main__left">
					<div class="report-group">
						<div class="report-title">
							<h1>Implementation of the Operating Room Black Box Research Program at the Ottowa Hospital Through Patient, Clinic Organizational Engagement: Case Study</h1>

							<p>
								<Icon name="share" color="#006AC9"/>
								
								<strong>DOI</strong> <a href="#">https://doi.org/10.1101/2021.07.30.454065</a>
							</p>
						</div><!-- /.report-title -->
					</div><!-- /.report-group -->

					<div class="report-group report-group--actions">
						<ul>
							<li>
								<div class="report-action">
									<h6>Datasets</h6>
									
									<ul>
										<li>
											New  <strong>12</strong>
										</li>

										<li>
											Re-Use <strong>2</strong>
										</li>
									</ul>

									<p>No Action Required</p>
								</div><!-- /.report-action -->
							</li>

							<li>
								<div class="report-action report-action--error">
									<h6>Code</h6>
									
									<ul>
										<li>
											New  <strong>12</strong>
										</li>

										<li>
											Re-Use <strong>3</strong>
										</li>
									</ul>

									<p>Action Required</p>
								</div><!-- /.report-action -->
							</li>

							<li>
								<div class="report-action report-action--warning">
									<h6>Materials</h6>
									
									<ul>
										<li>
											New  <strong>12</strong>
										</li>

										<li>
											Re-Use <strong>2</strong>
										</li>
									</ul>

									<p>Action May Be Required</p>
								</div><!-- /.report-action -->
							</li>
							
							<li>
								<div class="report-action">
									<h6>Protocols</h6>
									
									<ul>
										<li>
											New  <strong>12</strong>
										</li>

										<li>
											Re-Use <strong>2</strong>
										</li>
									</ul>

									<p>No Action Required</p>
								</div><!-- /.report-action -->
							</li>
						</ul>
					</div><!-- /.report-group -->

					<div class="report-group">
						<ReportSuggestions
							title="Data Availability Statement"
							:suggestions="suggestions"
						/>
					</div><!-- /.report-group -->
				</div><!-- /.main__left -->

				<div class="main__right">
					<div class="report-about">
						<ul>
							<li>
								<h6>Preprint link</h6>

								<a href="https://www.biorxiv.org/content/10.1101/2021.07.30.454065v1.full">https://www.biorxiv.org/content/10.1101/2021.07.30.454065v1.full</a>
							</li>
							
							<li>
								<h6>DataSeer Link</h6>

								<a href="#">Sulzer Hobson et al Preprint Aug 2021.pdf</a>
							</li>

							<li>
								<h6>Authors ({{authors.length}})</h6>

								<Author v-for="(author, index) in leadAuthors" :key="index" :author="author"></Author>

								<ContentToggle
									labelClosed="Show All Authors"
									labelOpened="Hide All Authors"
								>
									<Authors>
										<Author v-for="(author, index) in nonLeadAuthors" :key="index" :author="author"></Author>
									</Authors>
								</ContentToggle>
							</li>
						</ul>
					</div><!-- /.report-about -->
					
					<div class="report-chart">
						<div class="report__graph">
							<img src="@/assets/images/images/chart.png" alt="Chart">
							</div><!-- /.report__graph -->

						<div class="report__content">
							<h4>This Chart Needs A Title or Short Description</h4>

							<ul>
								<li>
									<a href="" class="btn btn--block btn--tertiary">View Larger</a>
								</li>

								<li>
									<a href="" class="btn btn--block btn--tertiary">Copy Share Link</a>
								</li>
							</ul>
						</div><!-- /.report__content -->
					</div><!-- /.report-chart -->
				</div><!-- /.main__right -->
			</div><!-- /.main__inner -->
		</div><!-- /.shell -->
	</div><!-- /.main -->
</template>

<script>
import Icon from '@/components/icon/icon'
import Author from '@/components/author/author'
import Authors from '@/components/authors/authors'
import ContentToggle from '@/components/contenttoggle/contenttoggle'
import ReportSuggestions from '@/blocks/report-suggestions/report-suggestions'

export default {	
	/**
	 * Name
	 */
	name: 'ScienceReport',
	
	/**
	 * Components
	 */
	components: {
		Icon,
		Author,
		Authors,
		ContentToggle,
		ReportSuggestions
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
		}
	}
}
</script>
