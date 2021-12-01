<template>
	<div>
		<FormIssues v-if="flagged && !getCurator" />
		<FormCuratorIssues v-if="isIssuesFormVisible && getCurator" />
		<div class="form form--dataset">
			<form action="?" method="post">
				<div class="form__body">
					<FieldSelect
						:error="$v.type.$error"
						:options="[
							{
								value: 'Tabular Data',
								helptext: 'Suggested Type'
							},
							{
								value: 'Option 0'
							},
							{
								value: 'Option 1'
							},
							{
								value: 'Option 2'
							}
						]"
						name="type"
						v-model.trim="type"
						placeholder="Tabular Data"
					>
						<Icon name="grid" />

						Data Type <a href="#">Type Definitions</a>
					</FieldSelect>

					<FieldSelect
						:error="$v.subtype.$error"
						:options="[
							{
								value: 'Tabular Subtype',
								helptext: 'Suggested Subtype'
							},
							{
								value: 'Option 0'
							},
							{
								value: 'Option 1'
							},
							{
								value: 'Option 2'
							}
						]"
						name="organization"
						v-model.trim="subtype"
						placeholder="Select"
					>
						<Icon name="grid" />

						Data Subtype
					</FieldSelect>

					<div class="checkboxes">
						<ul>
							<FieldCheckbox name="reuse" v-model="reuse" isDropdown>
								This dataset is re-used from another public or private source
							</FieldCheckbox>

							<FieldCheckbox name="publicly" v-model="publicly" isDropdown v-if="reuse === false">
								This dataset cannot be shared publicly
							</FieldCheckbox>

							<FieldCheckbox
								name="practices"
								v-model="practices"
								isDropdown
								v-if="publicly === true"
							>
								<a href="#">Best practices</a> for this data type have been followed
								<button
									tabindex="0"
									type="button"
									class="text-toggle"
									@click="practices_text = !practices_text"
								>
									{{ textToggle(practices_text) }}
								</button>
							</FieldCheckbox>

							<HiddenText v-if="practices_text">
								<p>
									There are many considerations when sharing human clinical or demographic data. Of
									primary concern are issues around consent and identifiability. Ideally, consent
									for data sharing is obtained from participants before data collection occurs. If
									the study design does not involve consenting new participants, then ethics board
									approval needs to be sought with respect to sharing data without consent. Careful
									de-identification (removal of personally identifying data such as birthdates)
									and/or anonymization needs to happen prior to sharing or deposition in a
									repository. Consultation with your ethics review board is required to determine
									what level of de-identification or anonymization is needed in your specific case.
									However, here are some basic guidelines (from
									<a href="https://irb.ucsf.edu/definitions#18"
										>https://irb.ucsf.edu/definitions#18</a
									>) for data from the USA, although these are likely applicable in other
									jurisdictions:
								</p>
								<ol>
									<li>
										an experienced expert determines that the risk that certain information could be
										used to identify an individual is “very small” and documents and justifies the
										determination, or
									</li>
									<li>
										the data do not include any of the 18 identifiers (of the individual or his/her
										relatives, household members, or employers) which could be used alone or in
										combination with other information to identify the subject. Note that even if
										these identifiers are removed, the Privacy Rule states that information will be
										considered identifiable if the covered entity knows that the identity of the
										person may still be determined.
									</li>
								</ol>
								<p>The 18 identifiers mentioned above are:</p>

								<p>
									Names;<br />
									All geographical subdivisions smaller than a State, including street address,
									city, county, precinct, zip code, and their equivalent geocodes, except for the
									initial three digits of a zip code, if according to the current publicly available
									data from the Bureau of the Census: (1) The geographic unit formed by combining
									all zip codes with the same three initial digits contains more than 20,000 people;
									and (2) The initial three digits of a zip code for all such geographic units
									containing 20,000 or fewer people is changed to 000. All elements of dates (except
									year) for dates directly related to an individual, including birth date, admission
									date, discharge date, date of death; and all ages over 89 and all elements of
									dates (including year) indicative of such age, except that such ages and elements
									may be aggregated into a single category of age 90 or older;<br />
									Phone numbers;<br />
									Fax numbers;<br />
									Electronic mail addresses;<br />
									Social Security numbers;<br />
									Medical record numbers;<br />
									Health plan beneficiary numbers;<br />
									Account numbers;<br />
									Certificate/license numbers;<br />
									Vehicle identifiers and serial numbers, including license plate numbers;<br />
									Device identifiers and serial numbers;<br />
									Web Universal Resource Locators (URLs);<br />
									Internet Protocol (IP) address numbers;<br />
									Biometric identifiers, including finger and voice prints;<br />
									Full face photographic images and any comparable images; and<br />
									Any other unique identifying number, characteristic, or code (note this does not
									mean the unique code assigned by the investigator to code the data) This paper has
									some special considerations for clinical data that is accompanying genomic data:<a
										href="https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005873"
										>https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005873</a
									>
								</p>

								<p>
									Finally, a very thorough data dictionary is needed to accompany the data set to
									explain any data coding, categories, or other calculations. Column headings should
									describe the content of each column and contain only numbers, letters, and
									underscores – no spaces, or special characters. Lowercase letters are preferred.
									Row names should be consistent with those used in the article and in other related
									datasets. You can check the formatting of tables with goodtables.io.
								</p>
							</HiddenText>

							<FieldCheckbox name="repo" v-model="repo" isDropdown v-if="publicly === true">
								A <a href="#">suitable repository</a> has been used to host this data

								<button
									tabindex="0"
									type="button"
									class="text-toggle"
									@click="repo_text = !repo_text"
								>
									{{ textToggle(repo_text) }}
								</button>
							</FieldCheckbox>

							<HiddenText v-if="repo_text">
								<p>
									There are many considerations when sharing human clinical or demographic data. Of
									primary concern are issues around consent and identifiability. Ideally, consent
									for data sharing is obtained from participants before data collection occurs. If
									the study design does not involve consenting new participants, then ethics board
									approval needs to be sought with respect to sharing data without consent. Careful
									de-identification (removal of personally identifying data such as birthdates)
									and/or anonymization needs to happen prior to sharing or deposition in a
									repository. Consultation with your ethics review board is required to determine
									what level of de-identification or anonymization is needed in your specific case.
									However, here are some basic guidelines (from
									<a href="https://irb.ucsf.edu/definitions#18"
										>https://irb.ucsf.edu/definitions#18</a
									>) for data from the USA, although these are likely applicable in other
									jurisdictions:
								</p>
								<ol>
									<li>
										an experienced expert determines that the risk that certain information could be
										used to identify an individual is “very small” and documents and justifies the
										determination, or
									</li>
									<li>
										the data do not include any of the 18 identifiers (of the individual or his/her
										relatives, household members, or employers) which could be used alone or in
										combination with other information to identify the subject. Note that even if
										these identifiers are removed, the Privacy Rule states that information will be
										considered identifiable if the covered entity knows that the identity of the
										person may still be determined.
									</li>
								</ol>
								<p>The 18 identifiers mentioned above are:</p>

								<p>
									Names;<br />
									All geographical subdivisions smaller than a State, including street address,
									city, county, precinct, zip code, and their equivalent geocodes, except for the
									initial three digits of a zip code, if according to the current publicly available
									data from the Bureau of the Census: (1) The geographic unit formed by combining
									all zip codes with the same three initial digits contains more than 20,000 people;
									and (2) The initial three digits of a zip code for all such geographic units
									containing 20,000 or fewer people is changed to 000. All elements of dates (except
									year) for dates directly related to an individual, including birth date, admission
									date, discharge date, date of death; and all ages over 89 and all elements of
									dates (including year) indicative of such age, except that such ages and elements
									may be aggregated into a single category of age 90 or older;<br />
									Phone numbers;<br />
									Fax numbers;<br />
									Electronic mail addresses;<br />
									Social Security numbers;<br />
									Medical record numbers;<br />
									Health plan beneficiary numbers;<br />
									Account numbers;<br />
									Certificate/license numbers;<br />
									Vehicle identifiers and serial numbers, including license plate numbers;<br />
									Device identifiers and serial numbers;<br />
									Web Universal Resource Locators (URLs);<br />
									Internet Protocol (IP) address numbers;<br />
									Biometric identifiers, including finger and voice prints;<br />
									Full face photographic images and any comparable images; and<br />
									Any other unique identifying number, characteristic, or code (note this does not
									mean the unique code assigned by the investigator to code the data) This paper has
									some special considerations for clinical data that is accompanying genomic data:<a
										href="https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005873"
										>https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005873</a
									>
								</p>

								<p>
									Finally, a very thorough data dictionary is needed to accompany the data set to
									explain any data coding, categories, or other calculations. Column headings should
									describe the content of each column and contain only numbers, letters, and
									underscores – no spaces, or special characters. Lowercase letters are preferred.
									Row names should be consistent with those used in the article and in other related
									datasets. You can check the formatting of tables with goodtables.io.
								</p>
							</HiddenText>
						</ul>
					</div>

					<Field
						v-if="repo"
						name="permalink"
						type="text"
						v-model.trim="permalink"
						placeholder="https://"
					>
						<Icon name="chain" color="currentColor" />

						DOI or Permalink
					</Field>

					<Field name="instructions" type="textarea" v-model="instructions">
						<Icon name="comment" />

						Additional Comments or Instructions
					</Field>
				</div>
				<!-- /.form__body -->

				<div class="form__cta">
					<div class="form__cta-row">
						<div class="form__cta-col">
							<Button>Complete This Dataset</Button>
						</div>
						<!-- /.form__cta-col -->

						<div class="form__cta-col">
							<Button className="tertiary" v-tooltip.top-center="tooltips.connectText">
								<Icon name="connect" />

								Connect Text
							</Button>

							<Button
								className="tertiary"
								v-tooltip.top-center="tooltips.deleteText"
								@onClick="handleDelete"
							>
								<Icon name="trash" />

								Delete
							</Button>
						</div>
						<!-- /.form-__cta-col -->
					</div>
					<!-- /.form__cta-row -->
				</div>
				<!-- /.form__cta -->
			</form>
		</div>
		<!-- /.form -->
	</div>
</template>

<script>
/**
 * External Dependencies
 */
import { mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';

/**
 * Internal Dependencies
 */
import Field from '@/components/field/field';
import FieldSelect from '@/components/field-select/field-select';
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import FieldCheckbox from '@/components/field-checkbox/field-checkbox';
import HiddenText from '@/components/hidden-text/hidden-text';
import FormIssues from '@/blocks/form-issues/form-issues';
import FormCuratorIssues from '@/blocks/form-issues/form-curator-issues';

export default {
	name: 'FormDataset',

	props: {
		flagged: {
			type: Boolean,
			default: false
		}
	},

	components: {
		Icon,
		Field,
		Button,
		FieldSelect,
		HiddenText,
		FieldCheckbox,
		FormIssues,
		FormCuratorIssues
	},

	data: function() {
		return {
			type: '',
			subtype: '',
			permalink: '',
			instructions: '',
			reuse: null,
			publicly: null,
			practices: null,
			repo: null,
			practices_text: false,
			repo_text: false,
			tooltips: {
				connectText: 'Select additional sentences from the document to connect to this dataset',
				deleteText: 'Delete this Dataset'
			}
		};
	},

	/**
	 * Computed
	 */
	computed: {
		...mapGetters(['getCurator'])
	},

	validations: {
		type: {
			required
		},
		subtype: {
			required
		},
		permalink: {
			required
		}
	},

	methods: {
		textToggle(check) {
			return check ? 'Hide' : 'Show';
		},

		handleDelete() {
			window.confirm('Are you sure you want to delete this dataset?');
		}
	}
};
</script>
