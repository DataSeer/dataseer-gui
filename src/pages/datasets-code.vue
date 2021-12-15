<template>
	<Main className="main--datasets main--datasets-code" hasSubheader>
		<Tabs>
			<Tab v-for="(tab, index) in tabs" :completed="tab.completed" :flagged="tab.flagged" :tooltip="tab.tooltip" :key="tab.id">
				<FormDatasetCode
					:title="`Dataset-${index + 1}`"
					@onDatasetDelete="deleteDataset(index)" 
					@onDatasetComplete="(value) => completeDataset(index, value)"
				/>
			</Tab>
		</Tabs>

		<DatasetUtils />

		<template #right>
			<PDF />
		</template>
	</Main>
</template>

<script>
import PDF from '@/blocks/pdf/pdf';
import Tab from '@/components/tabs/tab';
import Tabs from '@/components/tabs/tabs';
import Main from '@/components/main/main';
import FormDatasetCode from '@/blocks/form-dataset-code/form-dataset-code';
import DatasetUtils from '@/components/datasets-utils/datasets-utils';

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
		Tabs,
		Main,
		FormDatasetCode,
		DatasetUtils
	},

	data: function() {
		return {
			tabs: [
				{
					tooltip: 'This Dataset Name Is Too Lon…',
					completed: false,
					flagged: false,
					formData: {

					}
				},
				{
					tooltip: 'This Dataset Name Is Too Lon…',
					completed: false,
					flagged: true,
					formData: {

					}
				},
			],
			source: '/test.pdf',
		};
	},

	/**
	 * Methods
	 */
	methods: {
		completeDataset(index, value) {
			this.tabs[index].completed = value;
		},
		deleteDataset(index) {
			this.tabs.splice(index, 1);
		}
	},
};
</script>
