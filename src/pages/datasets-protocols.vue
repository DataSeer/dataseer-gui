<template>
	<Main className="main--datasets main--datasets-protocols" hasSubheader>
		<Intro
			type="Protocols"
			v-if="!tabs.length"
		/>

		<Tabs>
			<Tab v-for="(tab, index) in tabs" :completed="tab.completed" :flagged="tab.flagged" :tooltip="tab.tooltip" :key="tab.id">
				<FormDatasetProtocols
					:title="`Protocol-${index + 1}`"
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
import PDF from '@/blocks/pdf/pdf';
import Tab from '@/components/tabs/tab';
import Tabs from '@/components/tabs/tabs';
import Main from '@/components/main/main';
import Intro from '@/components/intro/intro'
import FormDatasetProtocols from '@/blocks/form-dataset-protocols/form-dataset-protocols';
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
		Intro,
		DatasetUtils,
		FormDatasetProtocols
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
					flagged: false,
					formData: {

					}
				},
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
					flagged: false,
					formData: {

					}
				},
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
					flagged: false,
					formData: {

					}
				},
				{
					tooltip: 'This Dataset Name Is Too Lon…',
					completed: false,
					flagged: false,
					formData: {

					}
				},
			],
			source: '/test.pdf',
			intro: false
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
