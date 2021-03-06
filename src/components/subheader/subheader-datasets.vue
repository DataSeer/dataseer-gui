<template>
	<div class="subheader__inner" tabindex="0" aria-labelledby="subheader-title">
		<div class="subheader__left">
			<nav class="nav-datasets">
				<ul>
					<li v-for="type in datasetTypes" :key="type.id">
						<button
							:data-value="type.id"
							:class="{ 'is-active': type.id === activeDatasetType }"
							@click.prevent="setActiveDatasetType(type.id)"
						>
							<Dot v-if="isDatatypeFlagged(type.id)" />
							<Icon :name="type.icon" color="currentColor" />

							{{ type.label }}
						</button>
					</li>
				</ul>
			</nav> <!-- /.nav-datasets -->
		</div> <!-- /.subheader__left -->

		<div v-if="reportPageURl" class="subheader__right">
			<Button :to="reportPageURl" className="tertiary">
				<Icon name="lock" color="currentColor" />

				Open Science Report
			</Button>
		</div> <!-- /.subheader__right -->

		<template v-if="document && document.metadata._id">
			<Summary
				:metadata="document.metadata"
				:isVisible="isSummaryVisible"
				@closeBtnClick="toggleSummary"
			/>

			<div class="dataset-title">
				<div class="dataset__inner">
					<Icon name="document" />

					<h6
						v-if="document.metadata.article_title"
						id="subheader-title"
						class="overflow-truncate"
						@click.prevent="toggleSummary"
						v-tooltip.bottom-center="document.metadata.article_title"
					>
						{{ document.metadata.article_title }}
					</h6>

					<Dropdown placement="bottom-end">
						<template #header>
							<span class="btn-dropdown"></span>
						</template>

						<div class="dropdown__nav">
							<ul>
								<li>
									<a href="#" @click.prevent="toggleSummary">
										<Icon name="view_list" color="currentColor" />

										Document Summary
									</a>
								</li>

								<li>
									<a :href="`mailto:${documentUsername}`">
										<Icon name="invite" color="currentColor" />

										Invite By Email
									</a>
								</li>

								<li>
									<button type="button" @click.prevent="copyText(publicURL, 'Public URL copied !')">
										<Icon name="share" color="currentColor" />

										Get A Share Link
									</button>
								</li>

								<li>
									<a :href="uploadedFileURl" target="blank">
										<Icon name="document_view" color="currentColor" />

										View Uploaded File
									</a>
								</li>
							</ul>

							<ul v-if="userRoleWeight >= 1000" data-title="Curator Tools">
								<li>
									<button @click.prevent="detectSentences">
										<Icon name="document_check" />

										OCR Detect
									</button>
								</li>

								<li>
									<button @click.prevent="importDatasets">
										<Icon name="document_import" />

										Import Data
									</button>
								</li>
							</ul>
						</div>
						<!-- /.dropdown__nav -->
					</Dropdown>
				</div>
				<!-- /.dataset__inner -->

				<ul>
					<li v-if="document.metadata.submitting_author">
						<strong>{{ document.metadata.submitting_author }}</strong>
					</li>

					<li>
						<a :href="uploadedFileURl" target="blank">
							{{ document.name }}
						</a>
					</li>
				</ul>
			</div>
			<!-- /.dataset-title -->
		</template>
	</div> <!-- /.subheader__inner -->
</template>

<script>
/* eslint-disable */
/**
 * External Dependencies
 */
import { mapActions, mapGetters } from 'vuex';

/**
 * Internal Dependencies
 */
import Dot from '@/components/dot/dot';
import Icon from '@/components/icon/icon';
import Summary from '@/blocks/summary/summary';
import Button from '@/components/button/button.vue';
import Dropdown from '@/components/dropdown/dropdown';

export default {
	/**
	 * Name
	 */
	name: 'SubheaderDatasets',

	/**
	 * Components
	 */
	components: {
		Dot,
		Icon,
		Button,
		Summary,
		Dropdown
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			isSummaryVisible: false
		};
	},

	/**
	 * Computed
	 */
	computed: {
		...mapGetters('account', ['userRoleWeight']),
		...mapGetters('pdfViewer', [
			'filteredDatasets',
			'activeDataset',
			'activeDatasetType',
			'documentUsername',
			'publicURL',
			'uploadedFileURl',
			'datasets',
			'documentHandler',
			'document',
			'datasetTypes'
		]),
		reportPageURl() {
			return this.document ? `/documents/${this.document._id}/report` : undefined;
		}
	},

	/**
	 * Methods
	 */
	methods: {
		...mapActions('pdfViewer', [
			'setActiveDataset',
			'setActiveDatasetType',
			'importDatasets',
			'detectSentences'
		]),
		toggleSummary() {
			this.isSummaryVisible = !this.isSummaryVisible;
		},
		copyText(text, message) {
			this.$copyText(text).then(
				() => { alert(message.length ? message : 'Copied !') },
				() => { alert('Can not copy') }
			);
		},
		isDatatypeFlagged(datatype) {
			return this.datasets.some(
				el => el.datasetType === datatype &&
				(el.flagged === true || el.flagged === 'true')
			);
		}
	}
};
</script>
