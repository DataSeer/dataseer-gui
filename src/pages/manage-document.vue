<template>
	<Main hasSubheader>
		<Subheader>
			<SubheaderEdit title="Manage Document" icon="document">
				<Button to="/documents" className="tertiary">Exit Document</Button>
			</SubheaderEdit>
		</Subheader>

		<Loader
			:loading="loading"
			:error="error"
			:errorMessage="errorMessage"
		>
			<FormManageDocument :data="document" />
		</Loader>
		
		<template #right>
			<Widgets v-if="document">
				<div class="widget-links">
					<ul>
						<li>
							<a href="#">
								<Icon name="texts_add" color="currentColor" />

								View/Edit Document
							</a>
						</li>

						<li>
							<a href="#">
								<Icon name="document_view" color="currentColor" />

								View Report
							</a>
						</li>

						<li>
							<a href="#">
								<Icon name="invite" color="currentColor" />

								Contact Author
							</a>
						</li>
					</ul>
				</div><!-- /.widget-links -->

				<div class="widget-box">
					<div class="widget__content">
						<h6>Public Share Link</h6>

						<a href="">https://app.dataseer.ai/dataseer/documents/6139467d7600e85b2c69a785</a>
					</div>
					<!-- /.widget__content -->

					<div class="widget__actions">
						<Button className="secondary">
							<Icon name="documents" color="currentColor" />

							Copy Share Link
						</Button>
					</div>
					<!-- /.widget__actions -->
				</div><!-- /.widget-box -->

				<WidgetLogs :logs="logs" title="Recent Changes" />
			</Widgets>
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
import SubheaderEdit from '@/components/subheader/subheader-edit';
import Main from '@/components/main/main.vue';
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import Widgets from '@/components/widgets/widgets';
import WidgetLogs from '@/components/widget-logs/widget-logs';
import FormManageDocument from '@/blocks/form-manage-document/form-manage-document';

import documentsService from '@/services/documents/documents';

export default {
	/**
	 * Name
	 */
	name: 'ManageDocument',

	/**
	 * Components
	 */
	components: {
		Loader,
		Subheader,
		SubheaderEdit,
		Main,
		Icon,
		Button,
		Widgets,
		WidgetLogs,
		FormManageDocument
	},

	/**
	 * Data
	 */
	data() {
		return {
			document: undefined,
			logs: undefined,
			loading: false,
			error: false,
			errorMessage: 'false',
		}
	},

	/**
	 * Data
	 */
	computed: {
		documentId() {
			return this.$route.params.id
		},
	},

	/**
	 * Methods
	 */
	methods: {
		async getDocumentData() {
			this.loading = true;
			
			try {
				const data = await documentsService.getDocument(this.documentId, {
					metadata: true,
					files: true,
					pdf: true
				});
				const logs = await documentsService.getDocumentLogs(this.documentId);
	
				this.document = data;
				this.logs = logs;
			} catch (error) {
				this.error = true,
				this.errorMessage=  error.message;
			}
			
			this.loading = false;
		}
	},

	/**
	 * Mounted
	 */
	mounted () {
		this.getDocumentData();
	},
};
</script>
