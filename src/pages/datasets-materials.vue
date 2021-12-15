<template>
	<Main className="main--datasets main--datasets-materials" hasSubheader>
		<div class="intro" v-if="intro">
			<div class="intro__head">
				<h3>
					No Materials Yet

					<span>Need to Add Some?</span>
				</h3>

				<figure>
					<img src="@/assets/images/intro-img@2x.png" alt="Example Image Title" />
				</figure>
			</div>
			<!-- /.intro__head -->

			<div class="intro__body">
				<div class="intro__about">
					<p>Our AI has not detected any Materials in this document.</p>

					<p>
						<Icon name="arrow_up" color="#8CABCD" /> If you want to add some, first select a text
						passage in the document which references Materials
					</p>

					<p>
						<Icon name="arrow_down" color="#8CABCD" />

						Then click the <Icon name="add" color="currentColor" /> “Add” button below
					</p>

					<p>
						<Button className="tertiary">I need more help</Button>
					</p>
				</div>
				<!-- /.intro__about -->

				<div class="intro__tip">
					<h6>Pro-Tip</h6>

					<p>
						If multiple text passages make reference to the same Materials, you can shift+click to
						select more than one
					</p>

					<p>
						Additionally, you can add more text passgaes later by using the “Connect Text” button
					</p>
				</div>
				<!-- /.intro__tip -->
			</div>
			<!-- /.intro__body -->
		</div><!-- /.intro -->

		<Tabs v-if="!intro">
			<Tab v-for="(tab, index) in tabs" :completed="tab.completed" :flagged="tab.flagged" :tooltip="tab.tooltip" :key="tab.id">
				<FormDatasetMaterial
					:title="`Dataset-${index + 1}`"
					@onDatasetDelete="deleteDataset(index)" 
					@onDatasetComplete="(value) => completeDataset(index, value)"
				/>
			</Tab>
		</Tabs>

		<DatasetUtils @addButtonClick="intro = false" />

		<template #right>
			<PDF />
		</template>
	</Main>
</template>

<script>
import PDF from '@/blocks/pdf/pdf';
import Tab from '@/components/tabs/tab';
import Tabs from '@/components/tabs/tabs';
import Icon from '@/components/icon/icon';
import Main from '@/components/main/main';
import Button from '@/components/button/button';
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
			tabs: [
				{
					tooltip: 'This Dataset Name Is Too Lon…',
					completed: false,
					flagged: false,
					formData: {

					}
				},
			],
			source: '/test.pdf',
			intro: true
		};
	},

	/**
	 * Components
	 */
	components: {
		PDF,
		Tab,
		Tabs,
		Icon,
		Main,
		Button,
		DatasetUtils,
		FormDatasetMaterial
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
