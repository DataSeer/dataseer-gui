<template>
	<Main className="main--datasets main--datasets-materials" hasSubheader>
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
								<div class="intro__about">
									<p>Our AI has not detected any Materials in this document.</p>

									<p>
										<Icon name="arrow_up" color="#8CABCD" /> If you want to add some, first select a text passage in the document which references
										Materials
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

									<p>If multiple text passages make reference to the same Materials, you can shift+click to select more than one</p>

									<p>Additionally, you can add more text passgaes later by using the “Connect Text” button</p>
								</div>
								<!-- /.intro__tip -->
							</div>
							<!-- /.intro__body -->
						</div>
						<!-- /.intro -->

						<Tabs v-if="!intro">
							<Tab tooltip="This Dataset Name Is Too Lon…">
								<div class="form__heading">
									<div class="form__heading-col">
										<h5>R v4.2.1</h5>
									</div>
									<!-- /.form__heading-col -->

									<div class="form__heading-col">
										Code/Software
									</div>
									<!-- /.form__heading-col -->
								</div>
								<!-- /.form__heading -->

								<FormDatasetMaterial />
							</Tab>
						</Tabs>
					</div>
					<!-- /.dataset__left-inner -->

					<DatasetUtils @onAddClick="addTab" />
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
import Icon from '@/components/icon/icon';
import Tabs from '@/components/tabs/tabs';
import Tab from '@/components/tabs/tab';
import PDF from '@/blocks/pdf/pdf.vue';
import Main from '@/components/main/main';
import Button from '@/components/button/button';
import DatasetUtils from '@/components/datasets-utils/datasets-utils.vue';
import FormDatasetMaterial from '@/blocks/form-dataset-material/form-dataset-material.vue';

export default {
	name: 'Datasets',

	data: function() {
		return {
			source: '/test.pdf',
			intro: true
		};
	},

	components: {
		Icon,
		Button,
		Tabs,
		Tab,
		Main,
		FormDatasetMaterial,
		DatasetUtils,
		PDF
	},

	methods: {
		addTab() {
			this.intro = false;
		}
	}
};
</script>
