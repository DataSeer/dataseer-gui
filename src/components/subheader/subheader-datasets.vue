<template>
	<div class="subheader__inner" tabindex="0" aria-labelledby="subheader-title">
		<div class="subheader__left">
			<nav class="nav-datasets">
				<ul>
					<li>
						<router-link to="/datasets">
							<Icon name="datasets" color="currentColor" />

							Datasets
						</router-link>
					</li>

					<li>
						<router-link to="/datasets-code">
							<Dot />
							<Icon name="brackets" color="currentColor" />

							Code
						</router-link>
					</li>

					<li>
						<router-link to="/datasets-materials">
							<Icon name="flask" color="currentColor" />

							Materials
						</router-link>
					</li>

					<li>
						<router-link to="/datasets-protocols">
							<Icon name="protocols" color="currentColor" />

							Protocols
						</router-link>
					</li>
				</ul>
			</nav>
			<!-- /.nav-datasets -->
		</div>
		<!-- /.subheader__left -->

		<div class="subheader__right">
			<Button to="/report" className="tertiary">
				<Icon name="lock" color="currentColor" />

				Open Science Report
			</Button>
		</div>
		<!-- /.subheader__right -->

		<Summary :isVisible="isSummaryVisible" @closeBtnClick="toggleSummary" />

		<div class="dataset-title">
			<div class="dataset__inner">
				<Icon name="document" />

				<h6 id="subheader-title" @click.prevent="toggleSummary">
					Implementation of the Operating Room Black Box Research Program at the O ttowa Hospital
					Through Patient, Clinic Organizational Engagement: Case Study
				</h6>

				<Dropdown>
					<template #header>
						<span class="btn-dropdown"></span>
					</template>

					<div class="dropdown__nav">
						<ul>
							<li>
								<a href="#" @click.prevent="toggleSummary">
									<Icon name="view_list" color="currentColor" />

									Document Summary
								</a>
							</li>

							<li>
								<a href="#">
									<Icon name="invite" color="currentColor" />

									Invite By Email
								</a>
							</li>

							<li>
								<a href="#">
									<Icon name="share" color="currentColor" />

									Get A Share Link
								</a>
							</li>

							<li>
								<a href="#">
									<Icon name="document_view" color="currentColor" />

									View Uploaded File
								</a>
							</li>
						</ul>
					</div>
					<!-- /.dropdown__nav -->
				</Dropdown>
			</div>
			<!-- /.dataset__inner -->

			<ul>
				<li><strong>L. Leadauthor</strong></li>

				<li>
					<a href="#">my_uploaded-filename.pdf</a>
				</li>
			</ul>
		</div>
		<!-- /.dataset-title -->
	</div>
	<!-- /.subheader__inner -->
</template>

<script>
import Dot from '@/components/dot/dot';
import Icon from '@/components/icon/icon';
import Summary from '@/blocks/summary/summary';
import Button from '@/components/button/button.vue';
import Dropdown from '@/components/dropdown/dropdown';

export default {
	name: 'SubheaderDatasets',

	data: function() {
		return {
			isSummaryVisible: false
		};
	},

	components: {
		Dot,
		Icon,
		Button,
		Summary,
		Dropdown
	},

	methods: {
		toggleSummary() {
			this.isSummaryVisible = !this.isSummaryVisible;
		}
	}
};
</script>
