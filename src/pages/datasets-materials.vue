<template>
	<Main className="main--datasets main--datasets-materials" hasSubheader>
		<Intro
			type="Materials"
			v-if="!tabs.length"
		/>

		<Tabs v-if="tabs.length">
			<Tab v-for="(tab, index) in tabs" :completed="tab.completed" :flagged="tab.flagged" :tooltip="tab.tooltip" :key="tab.id">
				<FormDatasetMaterial
					:title="`Material-${index + 1}`"
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
import DatasetUtils from '@/components/datasets-utils/datasets-utils';
import FormDatasetMaterial from '@/blocks/form-dataset-material/form-dataset-material';

export default {
	/**
	 * Name
	 */
	name: 'Datasets',

	/**
	 * Data
	 */
	data: function() {
		return {
			tabs: [],
			source: '/test.pdf',
		};
	},

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
		FormDatasetMaterial
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
