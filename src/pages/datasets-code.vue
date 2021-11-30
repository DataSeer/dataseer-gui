<template>
	<Main className="main--datasets main--datasets-code" hasSubheader>
		<div class="dataset-primary">
			<div class="dataset__row">
				<div class="dataset__left">
					<div class="dataset__left-inner">
						<Tabs>
							<Tab
								completed
								title="How much we do it for"
								subtitle="Code/Software"
								tooltip="This Dataset Name Is Too Lon…"
							>
								<FormDatasetCode />
							</Tab>

							<Tab
								title="How much we do it for"
								subtitle="Code/Software"
								tooltip="This Dataset Name Is Too Lon…"
							>
								<FormDatasetCode />
							</Tab>

							<Tab
								title="Why we do it"
								subtitle="Code/Software"
								tooltip="This Dataset Name Is Too Lon…"
							>
								<FormDatasetCode />
							</Tab>

							<Tab
								title="Code-3-Has-Issues"
								subtitle="Python"
								flagged
								tooltip="This Dataset Name Is Too Lon…"
							>
								<FormDatasetCode flagged />
							</Tab>

							<Tab
								title="Why we do it"
								subtitle="Code/Software"
								tooltip="This Dataset Name Is Too Lon…"
							>
								<FormDatasetCode />
							</Tab>

							<Tab
								title="How much we do it for"
								subtitle="Code/Software"
								tooltip="This Dataset Name Is Too Lon…"
							>
								<FormDatasetCode />
							</Tab>

							<Tab
								title="Why we do it"
								subtitle="Code/Software"
								tooltip="This Dataset Name Is Too Lon…"
							>
								<FormDatasetCode />
							</Tab>
						</Tabs>
					</div>
					<!-- /.dataset__left-inner -->

					<DatasetUtils />
				</div>
				<!-- /.dataset__left -->

				<div class="dataset__right">
					<div class="pdf-holder">
						<PDF />
					</div>
					<!-- /.pdf-holder -->
				</div>
				<!-- /.dataset__right -->
			</div>
			<!-- /.dataset__row -->
		</div>
		<!-- /.dataset -->
	</Main>
</template>

<script>
/**
 * Internal Dependencies
 */
import PDF from '@/blocks/pdf/pdf';
import Tab from '@/components/tabs/tab';
import Tabs from '@/components/tabs/tabs';
import Main from '@/components/main/main';

import DatasetUtils from '@/components/datasets-utils/datasets-utils';
import FormDatasetCode from '@/blocks/form-dataset-code/form-dataset-code';

export default {
	/**
	 * Name
	 */
	name: 'Datasets',

	/**
	 * Components
	 */
	components: {
		PDF,
		Tab,
		Main,
		Tabs,
		DatasetUtils,
		FormDatasetCode
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			source: '/test.pdf',
			intro: false
		};
	}
};
</script>
