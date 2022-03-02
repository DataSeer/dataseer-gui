<template>
	<Main className="main--datasets main--datasets-code" hasSubheader>
		<Subheader>
			<SubheaderDatasets />
		</Subheader>
		
		<Intro
			type="Codes"
			v-if="!tabs.length"
		/>
		
		<Tabs>
			<Tab
				v-for="(tab, index) in tabs"
				:completed="tab.completed"
				:flagged="tab.flagged"
				:tooltip="tab.tooltip"
				:key="tab.id"
			>
				<component
					:is="userComponent"
					:title="`Code-${index + 1}`"
					:flagged="tab.flagged"
					@onDatasetDelete="deleteDataset(index)" 
					@onDatasetComplete="(value) => completeDataset(index, value)"
				/>
			</Tab>
		</Tabs>

		<DatasetUtils @addButtonClick="addDataset" />

		<template #right>
			<PDF />
		</template>
	</Main>
</template>

<script>
/**
 * Internal Dependencies
 */
import Subheader from '@/components/subheader/subheader';
import SubheaderDatasets from '@/components/subheader/subheader-datasets';
import PDF from '@/blocks/pdf/pdf';
import Tab from '@/components/tabs/tab';
import Tabs from '@/components/tabs/tabs';
import Main from '@/components/main/main';
import Intro from '@/components/intro/intro'
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
		Subheader,
		SubheaderDatasets,
		PDF,
		Tab,
		Tabs,
		Main,
		Intro,
		FormDatasetCode,
		DatasetUtils
	},

	/**
	 * Data
	 */
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
		addDataset() {
			this.tabs.push({
				tooltip: 'This Dataset Name Is Too Lon…',
				completed: false,
				flagged: false,
			})
		},
		completeDataset(index, value) {
			this.tabs[index].completed = value;
		},
		deleteDataset(index) {
			this.tabs.splice(index, 1);
		}
	},
};
</script>
