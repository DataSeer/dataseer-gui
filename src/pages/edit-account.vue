<template>
	<Main>
		<template #subheader>	
			<Subheader>
				<SubheaderEdit title="Edit Account" icon="user">
					<Button to="/accounts" className="tertiary">Exit Account</Button>
				</SubheaderEdit>
			</Subheader>
		</template>
		
		<FormEditAccount @accountUpdated="getDocumentLogs" />

		<template #right>
			<Widgets>
				<div class="widget-associations">
					<h6>
						<strong>5</strong>

						Associated Documents
					</h6>

					<Button :to="`/documents/?owner=${accountId}`" className="secondary">
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
			const logs = await accountsService.getAccountLogs(this.accountId)

			this.logs = logs
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
