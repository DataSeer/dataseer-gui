<template>
	<transition name="summary">
		<div class="summary" v-if="isVisible">
			<div class="shell">
				<div class="summary__inner">
					<div class="summary__content">
						<div v-if="summaryTitle" class="summary__head">
							<h3 class="summary__title">{{summaryTitle}}</h3>
						</div> <!-- /.summary__head -->

						<div class="summary__body">
							<div class="summary__body-aside">
								<ul>
									<li>
										<h6>Title</h6>

										<p>
											{{metadata.article_title}}
										</p>
									</li>

									<li v-if="hasDescription">
										<template v-if="metadata.journal">
											<h6>Journal</h6>

											<p>{{metadata.journal}}</p>
										</template>

										<template v-if="metadata.publisher">
											<h6>Publisher</h6>

											<p>{{metadata.publisher}}</p>
										</template>

										<template v-if="metadata.date_published">
											<h6>Publication Date</h6>

											<p>{{formatDate(metadata.date_published)}}</p>
										</template>

										<template v-if="metadata.doi">
											<h6>DOI</h6>

											<p>{{metadata.doi}}</p>
										</template>
									</li>
								</ul>

								<div class="summary__body-actions">
									<Button className="tertiary" block>This data is incorrect</Button>

									<Button
										v-if="userRoleWeight >= 1000"
										:to="`/documents/${$route.params.id}/manage`"
										className="tertiary"
										block
									>
										Manage Document
									</Button>
								</div> <!-- /.summary__body-actions -->
							</div><!-- /.summary__body-aside -->

							<div
								v-if="!metadata.authors"
								class="summary__body-content"
							>
								<RichtextEntry
									:label="`Authors (${metadata.authors.length})`"
								>
									<ul>
										<li v-for="(author, index) in metadata.authors" :key="index">
											<h6>{{author.name}} <span v-if="author.email">{{`(${author.email})`}}</span></h6>
											
											<template v-if="author.affiliations">
												<p
													v-for="(affiliation, index) in author.affiliations"
													:key="index"
												>
													{{affiliation}}
												</p>
											</template>
										</li>
									</ul>
								</RichtextEntry>
							</div> <!-- /.summary__body-content -->
						</div> <!-- /.summary__body -->
					</div> <!-- /.summary__content -->

					<div class="summary__aside">
						<h4>Invite Collaborators</h4>

						<ul>
							<li>
								<a :href="`mailto:${documentUsername}`">
									<span>
										<Icon name="invite" color="currentColor" />
									</span>

									Send Email
								</a>
							</li>

							<li>
								<a @click.prevent="copyText(publicURL, 'Public URL copied !')">
									<span>
										<Icon name="share" color="currentColor" />
									</span>

									Get A Link
								</a>
							</li>

							<li>
								<a :href="uploadedFileURl" target="blank">
									<span>
										<Icon name="document_view" color="currentColor" />
									</span>

									Open File
								</a>
							</li>
						</ul>

						<BtnClose @onClick="$emit('closeBtnClick', $event)" label="Close Summary" />
					</div> <!-- /.summary__aside -->
				</div> <!-- /.summary__inner -->
			</div> <!-- /.shell -->
		</div> <!-- /.summary -->
	</transition>
</template>

<script>
/**
 * External Dependencies
 */
import { format } from 'date-fns' 
import { mapGetters } from 'vuex';

/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import BtnClose from '@/components/btn-close/btn-close';
import RichtextEntry from '@/components/richtext-entry/richtext-entry';

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
		BtnClose,
		RichtextEntry
	},

	/**
	 * Props
	 */
	props: {
		metadata: {
			type: Object,
			default: () => {}
		},
		isVisible: {
			type: Boolean,
			default: false
		},
	},

	data() {
		return {
			summaryTitle: "Document Summary"
		}
	},

	computed: {
		...mapGetters('account', ['username', 'userRoleWeight']),
		...mapGetters('pdfViewer', ['documentUsername', 'publicURL', 'uploadedFileURl']),
		hasDescription() {
			return this.metadata.journal
				|| this.metadata.publisher
				|| this.metadata.date_published
				|| this.metadata.doi
		}
	},


	/**
	 * Methods
	 */
	methods: {
		formatDate(date) {
			return format(new Date(date), 'yyyy-MM-dd');
		},
		copyText(text, message) {
			this.$copyText(text).then(() => {
				alert(message.length ? message : 'Copied !')
			}, () => {
				alert('Can not copy')
			})
		}
	},
};
</script>
