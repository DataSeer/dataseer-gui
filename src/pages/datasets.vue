<template>
	<Main className="main--datasets" hasSubheader>
		<div class="dataset-primary">
			<div class="dataset__row">
				<div class="dataset__left">
					<div class="dataset__left-inner">
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
								<div class="intro__text">
									<Icon name="arrow_up" color="#8CABCD" />
									<p>
										These swatches represent passages in the document which DataSeer thinks need a
										reference dataset
									</p>
									<p>Click on one, then review the corresponding form to complete each dataset</p>
								</div>
								<!-- /.intro__text -->

								<div class="intro__text">
									<Icon name="arrow_down" color="#8CABCD" />
									<p>
										If you want to merge datasets together, or add new datasets, use these tools at
										the bottom
									</p>
									<p>
										Finally, once all the datasets are accounted for, you can Complete Document in
										the top right to review your Data Availability Report.
									</p>
								</div>
								<!-- /.intro__text -->
								<div class="intro__cta">
									<ul>
										<li>
											<Button>Great! Let’s Go</Button>
										</li>

										<li>
											<Button className="tertiary">I need some help</Button>
										</li>
									</ul>
								</div>
								<!-- /.intro__cta -->
							</div>
							<!-- /.intro__body -->
						</div>
						<!-- /.intro -->

						<Tabs>
							<Tab
								title="Dataset-1"
								subtitle="Tabular Data"
								completed
								tooltip="This Dataset Name Is Too Lon…"
							>
								<FormDataset />
							</Tab>

							<Tab
								title="Dataset-2"
								subtitle="Tabular Data"
								tooltip="This Dataset Name Is Too Lon…"
							>
								<FormDataset />
							</Tab>

							<Tab
								title="Dataset-3"
								subtitle="Tabular Data"
								tooltip="This Dataset Name Is Too Lon…"
							>
								<FormDataset />
							</Tab>

							<Tab
								title="Dataset-4"
								subtitle="Tabular Data"
								tooltip="This Dataset Name Is Too Lon…"
							>
								<FormDataset />
							</Tab>

							<Tab
								title="Dataset-5"
								subtitle="Tabular Data"
								tooltip="This Dataset Name Is Too Lon…"
							>
								<FormDataset />
							</Tab>

							<Tab
								title="Dataset-6"
								subtitle="Tabular Data"
								tooltip="This Dataset Name Is Too Lon…"
							>
								<FormDataset />
							</Tab>

							<Tab
								title="Dataset-7"
								subtitle="Tabular Data"
								tooltip="This Dataset Name Is Too Lon…"
							>
								<FormDataset />
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
		<!-- /.dataset-primary -->
	</Main>
</template>

<script>
import PDF from '@/blocks/pdf/pdf.vue';
import Tab from '@/components/tabs/tab';
import Tabs from '@/components/tabs/tabs';
import Icon from '@/components/icon/icon.vue';
import Main from '@/components/main/main';
import Button from '@/components/button/button';
import FormDataset from '@/blocks/form-dataset/form-dataset.vue';
import DatasetUtils from '@/components/datasets-utils/datasets-utils.vue';

export default {
	name: 'Datasets',

	data: function() {
		return {
			source: '/test.pdf',
			intro: false
		};
	},

	components: {
		PDF,
		Tab,
		Tabs,
		Icon,
		Main,
		Button,
		FormDataset,
		DatasetUtils
	}
};
</script>
