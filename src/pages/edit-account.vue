<template>
	<Main hasSubheader>
		<Subheader>
			<SubheaderEdit title="Edit Account" icon="user">
				<Button to="/accounts" className="tertiary">Exit Account</Button>
			</SubheaderEdit>
		</Subheader>
		
		<FormEditAccount @accountUpdated="getDocumentLogs" />

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

				<WidgetLogs :logs="logs" title="Recent Changes" />
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
import accountsService from '@/services/account/accounts';
import WidgetLogs from '@/components/widget-logs/widget-logs';

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
		WidgetLogs,
		FormEditAccount
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			logs: [],
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
			let tempLogs = [];
			const logs = await accountsService.getAccountLogs(this.accountId)
						
			logs.map(log => {
				log.dates.map(date => {
					tempLogs.push({
					id: `${log._id}-${date}`,
					email: log.account.username,
					kind: log.kind.key,
					date: date
				})})
			})

			this.logs = tempLogs.sort(function compare(a, b) {
				var dateA = new Date(a.date);
				var dateB = new Date(b.date);
				return dateB - dateA;
			});
		},
	},

	/**
	 * Created
	 */
	created () {
		this.getDocumentLogs();
	},
};
</script>
