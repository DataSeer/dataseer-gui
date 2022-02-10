<template>
	<Main hasSubheader>
		<Subheader>
			<SubheaderEdit title="Edit Account" icon="user">
				<Button to="/accounts" className="tertiary">Exit Account</Button>
			</SubheaderEdit>
		</Subheader>
		
		<FormEditAccount />

		<template #right>
			<Widgets>
				<div class="widget-associations">
					<h6>
						<strong>5</strong>

						Associated Documents
					</h6>

					<Button to="/documents" className="secondary">
						<Icon name="documents" color="currentColor" />

						View Documents
					</Button>
				</div>

				<div class="widget-recent-changes">
					<div class="widget__head">
						<h6>Recent Changes</h6>

						<button>Show All</button>
					</div>
					<!-- /.widget__head -->

					<div class="widget__rows">
						<div class="widget__row">
							<div class="widget__col">swad31415@gmail.com</div>
							<!-- /.widget__col -->

							<div class="widget__col">update dataset-4</div>
							<!-- /.widget__col -->

							<div class="widget__col">9/8/2021 4:31:45 PM</div>
							<!-- /.widget__col -->
						</div>
						<!-- /.widget__row -->

						<div class="widget__row">
							<div class="widget__col">swad31415@gmail.com</div>
							<!-- /.widget__col -->

							<div class="widget__col">create dataset-4</div>
							<!-- /.widget__col -->

							<div class="widget__col">9/8/2021 4:31:11 PM</div>
							<!-- /.widget__col -->
						</div>
						<!-- /.widget__row -->

						<div class="widget__row">
							<div class="widget__col">swad31415@gmail.com</div>
							<!-- /.widget__col -->

							<div class="widget__col">update dataset-3</div>
							<!-- /.widget__col -->

							<div class="widget__col">9/8/2021 4:30:38 PM</div>
							<!-- /.widget__col -->
						</div>
						<!-- /.widget__row -->

						<div class="widget__row">
							<div class="widget__col">anotherperson@gmail.com</div>
							<!-- /.widget__col -->

							<div class="widget__col">create dataset-3</div>
							<!-- /.widget__col -->

							<div class="widget__col">9/8/2021 4:30:09 PM</div>
							<!-- /.widget__col -->
						</div>
						<!-- /.widget__row -->

						<div class="widget__row">
							<div class="widget__col">swad31415@gmail.com</div>
							<!-- /.widget__col -->

							<div class="widget__col">update dataset-2</div>
							<!-- /.widget__col -->

							<div class="widget__col">9/8/2021 4:29:52 PM</div>
							<!-- /.widget__col -->
						</div>
						<!-- /.widget__row -->

						<div class="widget__row">
							<div class="widget__col">swad31415@gmail.com</div>
							<!-- /.widget__col -->

							<div class="widget__col">create dataset-2</div>
							<!-- /.widget__col -->

							<div class="widget__col">9/8/2021 4:29:38 PM</div>
							<!-- /.widget__col -->
						</div>
						<!-- /.widget__row -->

						<div class="widget__row">
							<div class="widget__col">swad31415@gmail.com</div>
							<!-- /.widget__col -->

							<div class="widget__col">update dataset-1</div>
							<!-- /.widget__col -->

							<div class="widget__col">9/8/2021 4:30:01 PM</div>
							<!-- /.widget__col -->
						</div>
						<!-- /.widget__row -->

						<div class="widget__row">
							<div class="widget__col">swad31415@gmail.com</div>
							<!-- /.widget__col -->

							<div class="widget__col">create dataset-1</div>
							<!-- /.widget__col -->

							<div class="widget__col">9/8/2021 4:29:27 PM</div>
							<!-- /.widget__col -->
						</div>
						<!-- /.widget__row -->

						<div class="widget__row">
							<div class="widget__col">swad31415@gmail.com</div>
							<!-- /.widget__col -->

							<div class="widget__col">update validateMetadata</div>
							<!-- /.widget__col -->

							<div class="widget__col">9/8/2021 4:27:39 PM</div>
							<!-- /.widget__col -->
						</div>
						<!-- /.widget__row -->

						<div class="widget__row">
							<div class="widget__col">swad31415@gmail.com</div>
							<!-- /.widget__col -->

							<div class="widget__col">update refreshToken</div>
							<!-- /.widget__col -->

							<div class="widget__col">9/8/2021 4:26:26 PM</div>
							<!-- /.widget__col -->
						</div>
						<!-- /.widget__row -->
					</div>
					<!-- /.widget__rows -->
				</div>
			</Widgets>
		</template>
	</Main>
</template>

<script>
/**
 * Internal Dependencies
 */
import Subheader from '@/components/subheader/subheader';
import SubheaderEdit from '@/components/subheader/subheader-edit';
import FormEditAccount from '@/blocks/form-edit-account/form-edit-account';
import Widgets from '@/components/widgets/widgets';
import Button from '@/components/button/button';
import Icon from '@/components/icon/icon';
import Main from '@/components/main/main';

import documentsService from '@/services/documents/documents';

export default {
	/**
	 * Name
	 */
	name: 'EditAccount',

	/**
	 * Components
	 */
	components: {
		Subheader,
		SubheaderEdit,
		Main,
		Icon,
		Button,
		Widgets,
		FormEditAccount
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			logs: [],
			actions: [
				{
					name: 'Some Document Name',
					action: 'update dataset-4',
					date: '9/8/2021 4:31:45 PM'
				},
				{
					name: 'Signed In',
					action: '',
					date: '9/8/2021 4:31:11 PM'
				},
				{
					name: 'Another Document Name',
					action: 'update dataset-3',
					date: '9/8/2021 4:30:38 PM'
				},
				{
					name: 'Another Document Name',
					action: 'create dataset-3',
					date: '9/8/2021 4:30:09 PM'
				},
				{
					name: 'Another Document Name',
					action: 'update dataset-2',
					date: '9/8/2021 4:29:52 PM'
				},
				{
					name: 'Another Document Name',
					action: 'create dataset-2',
					date: '9/8/2021 4:29:38 PM'
				},
				{
					name: 'Signed In',
					action: '',
					date: '9/8/2021 4:30:01 PM'
				},
				{
					name: 'Another Document Name',
					action: 'create dataset-1',
					date: '9/8/2021 4:29:27 PM'
				},
				{
					name: 'Another Document Name',
					action: 'update validateMetadata',
					date: '9/8/2021 4:27:39 PM'
				},
				{
					name: 'Another Document Name',
					action: 'update refreshToken',
					date: '9/8/2021 4:26:26 PM'
				}
			]
		};
	},

	/**
	 * Computed
	 */
	computed: {
		accountId() {
			return this.$route.params.id
		}
	},
	
	/**
	 * Methods
	 */
	methods: {
		async getDocumentLogs() {
			const logs = await documentsService.getDocumentsLogs('6203f103e7ac0508c6fd338a')

			console.log(logs);
		}
	},

	/**
	 * Created
	 */
	created () {
		this.getDocumentLogs();
	},
};
</script>
