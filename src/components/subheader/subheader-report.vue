<template>
	<div class="subheader__inner" tabindex="0" aria-labelledby="subheader-title">
		<div class="subheader__left">
			<h3 id="subheader-title">
        <Icon name="lock" />
        
				Open Science Report
      </h3>
		</div><!-- /.subheader__left -->

		<div class="subheader__right">
			<router-link tabindex="0" to="/datasets" class="subheader__btn btn btn--tertiary ">
				<Icon name="back" color="#006AC9"></Icon>

				Back to Document
			</router-link>
		</div><!-- /.subheader__right -->

		<transition name="summary">
			<div class="summary" v-if="showSummary">
				<div class="shell">
					<div class="summary__inner">
						<div class="summary__content">
							<div class="summary__head">
								<h3>Document Upload Summary</h3>

								<p>Please review the data shown below and confirm if it is correct</p>
							</div><!-- /.summary__head -->

							<div class="summary__body">
								<div class="summary__body-aside">
									<ul>
										<li>
											<h6>Journal</h6>

											Journal of Medical Internet Research
										</li>

										<li>
											<h6>Publisher</h6>

											JMIR Publications Inc.
										</li>

										<li>
											<h6>Publication Date</h6>

											2021-03-16
										</li>

										<li>
											<h6>DOI</h6>

											10.2196/15443
										</li>
									</ul>
								</div><!-- /.summary__body-aside -->

								<div class="summary__body-content">
									<div class="summary__authors">
										<h6>Authors (10)</h6>

										<ul>
											<li>
												<h6>Laura Leadauthor <span>(leadauthor@toh.ca)</span></h6>

												Department of Anesthesiology and Pain Medicine University of Ottawa, Ottawa, Canada
												Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa, Canada
												Department of Innovation in Medical Education University of Ottawa, Ottawa, Canada
												Faculty of Medicine Francophone Affairs University of Ottawa, Ottawa, Canada
											</li>

											<li>
												<h6>Nicole Etherington</h6>

												Department of Anesthesiology and Pain Medicine University of Ottawa, Ottawa, Canada
												Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa, Canada
											</li>

											<li>
												<h6>Sandy Lam</h6>

												Department of Anesthesiology and Pain Medicine University of Ottawa, Ottawa, Canada
												Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa, Canada
											</li>

											<li>
												<h6>Maxime Lê</h6>

												Patient and Family Advisory Council The Ottawa Hospital, Ottawa, Canada
											</li>

											<li>
												<h6>Laurie Proulx</h6>

												Patient and Family Advisory Council The Ottawa Hospital, Ottawa, Canada
											</li>

											<li>
												<h6>Meghan Britton</h6>

												Main Operating Room The Ottawa Hospital, Ottawa, Canada
											</li>

											<li>
												<h6>Julie Kenna</h6>

												Main Operating Room The Ottawa Hospital, Ottawa, Canada
											</li>

											<li>
												<h6>Antoine Przybylak-Brouillard</h6>

												Department of Anesthesiology and Pain Medicine University of Ottawa, Ottawa, Canada
												Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa, Canada
											</li>

											<li>
												<h6>Jeremy Grimshaw</h6>

												Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa, Canada
											</li>

											<li>
												<h6>Teodor Grantcharov</h6>

												Department of General Surgery University of Toronto, Toronto, Canada
												Li Ka Shing Knowledge Institute St. Michael's Hospital, Toronto, Canada
											</li>

											<li>
												<h6>Sukhbir Singh</h6>

												Department of Obstetrics, Gynecology, and Newborn Care University of Ottawa, Ottawa, Canada
											</li>

										</ul>
									</div><!-- /.summary__authors -->

									<div class="summary__actions">
										<ul>
											<li>
												<a href="#" class="btn btn--block" @click.prevent="toggleSummary">This Data Looks Good, Continue</a>
											</li>

											<li>
												<a href="#" class="btn btn--tertiary btn--block">Something is wrong with this data</a>
											</li>
										</ul>
									</div><!-- /.summary__actions -->
								</div><!-- /.summary__body-content -->
							</div><!-- /.summary__body -->
						</div><!-- /.summary__content -->

						<div class="summary__aside">
							<h4>Invite Collaborators</h4>

							<ul>
								<li>
									<a href="#">
										<span>
											<Icon name="invite" color="currentColor" />
										</span>

										Send Email
									</a>
								</li>

								<li>
									<a href="#">
										<span>
											<Icon name="share" color="currentColor" />
										</span>

										Get A Link
									</a>
								</li>

								<li>
									<a href="#">
										<span>
											<Icon name="document_view" color="currentColor" />
										</span>

										Open File
									</a>
								</li>
							</ul>
						</div><!-- /.summary__aside -->
					</div><!-- /.summary__inner -->
				</div><!-- /.shell -->
			</div><!-- /.summary -->
		</transition>
	</div><!-- /.subheader__inner -->
</template>

<script>
import Icon from '@/components/icon/icon';

export default {
	/**
	 * Name
	*/
	name: 'subheaderReport',

	/**
	 * Data
	*/
	data: function() {
		return {
			showSummary: false
		}
	},

	/**
	 * Components
	*/
	components: { 
		Icon
	},

	/**
	 * Methods
	*/
	methods: {
		toggleSummary() {
			this.showSummary = !this.showSummary;
		}
	}
}
</script>
