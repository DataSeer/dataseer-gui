<template>
	<transition name="summary">
		<div class="summary" v-if="isVisible">
			<div class="shell">
				<div class="summary__inner">
					<div class="summary__content">
						<div class="summary__head">
							<h3 class="summary__title">Document Summary</h3>
						</div>
						<!-- /.summary__head -->

						<div class="summary__body">
							<div class="summary__body-aside">
								<ul>
									<li>
										<h6>Title</h6>

										<p>
											Implementation of the Operating Room Black Box Research Program at the Ottowa
											Hospital Through Patient, Clinic Organizational Engagement: Case Study
										</p>
									</li>

									<li>
										<h6>Journal</h6>

										<p>Journal of Medical Internet Research</p>

										<h6>Publisher</h6>

										<p>JMIR Publications Inc.</p>

										<h6>Publication Date</h6>

										<p>2021-03-16</p>

										<h6>DOI</h6>

										<p>10.2196/15443</p>
									</li>
								</ul>

								<div class="summary__body-actions">
									<Button className="tertiary" block>This data is incorrect</Button>

									<Button v-if="!getCurator" to="/manage-document" className="tertiary" block>
										Manage Document
									</Button>
								</div>
								<!-- /.summary__body-actions -->
							</div>
							<!-- /.summary__body-aside -->

							<div class="summary__body-content">
								<div class="summary__authors">
									<h6>Authors (10)</h6>

									<ul>
										<li>
											<h6>Laura Leadauthor <span>(leadauthor@toh.ca)</span></h6>

											Department of Anesthesiology and Pain Medicine University of Ottawa, Ottawa,
											Canada Clinical Epidemiology Program Ottawa Hospital Research Institute,
											Ottawa, Canada Department of Innovation in Medical Education University of
											Ottawa, Ottawa, Canada Faculty of Medicine Francophone Affairs University of
											Ottawa, Ottawa, Canada
										</li>

										<li>
											<h6>Nicole Etherington</h6>

											Department of Anesthesiology and Pain Medicine University of Ottawa, Ottawa,
											Canada Clinical Epidemiology Program Ottawa Hospital Research Institute,
											Ottawa, Canada
										</li>

										<li>
											<h6>Sandy Lam</h6>

											Department of Anesthesiology and Pain Medicine University of Ottawa, Ottawa,
											Canada Clinical Epidemiology Program Ottawa Hospital Research Institute,
											Ottawa, Canada
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

											Department of Anesthesiology and Pain Medicine University of Ottawa, Ottawa,
											Canada Clinical Epidemiology Program Ottawa Hospital Research Institute,
											Ottawa, Canada
										</li>

										<li>
											<h6>Jeremy Grimshaw</h6>

											Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa,
											Canada
										</li>

										<li>
											<h6>Teodor Grantcharov</h6>

											Department of General Surgery University of Toronto, Toronto, Canada Li Ka
											Shing Knowledge Institute St. Michael's Hospital, Toronto, Canada
										</li>

										<li>
											<h6>Sukhbir Singh</h6>

											Department of Obstetrics, Gynecology, and Newborn Care University of Ottawa,
											Ottawa, Canada
										</li>
									</ul>
								</div>
								<!-- /.summary__authors -->
							</div>
							<!-- /.summary__body-content -->
						</div>
						<!-- /.summary__body -->
					</div>
					<!-- /.summary__content -->

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

						<BtnClose @onClick="$emit('closeBtnClick', $event)" label="Close Summary" />
					</div>
					<!-- /.summary__aside -->
				</div>
				<!-- /.summary__inner -->
			</div>
			<!-- /.shell -->
		</div>
		<!-- /.summary -->
	</transition>
</template>

<script>
/**
 * External Dependencies
 */
import { mapGetters } from 'vuex';

/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import BtnClose from '@/components/btn-close/btn-close';

export default {
	/**
	 * Name
	 */
	name: 'Summary',

	/**
	 * Components
	 */
	components: {
		Icon,
		Button,
		BtnClose
	},

	/**
	 * Props
	 */
	props: {
		isVisible: {
			type: Boolean,
			default: false
		}
	},

	/**
	 * Computed
	 */
	computed: {
		...mapGetters(['getCurator'])
	}
};
</script>
