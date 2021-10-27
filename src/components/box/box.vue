<template>
	<li>
		<div class="box">
			<div class="box__head">
				<ul>
					<Icon name="document" />
					
					<li>
						<strong>{{shortTitle}}</strong>
					</li>

					<li>
						<a href="http://www.africau.edu/images/default/sample.pdf" target="_blank">my_uploaded-filename.pdf</a>
					</li>
				</ul>

				<h6 class="box__title">
					<router-link to="/datasets">{{doc.title}}</router-link>
				</h6><!-- /.box__title -->

				<div class="box__journal">
					<strong>{{doc.Journal}}</strong>
				</div><!-- /.box__journal -->
			</div><!-- /.box__head -->

			<div class="box__body">
				<div v-if="doc.Status ==='Validating'" class="box__status box__status--validating">
					<p><strong>STATUS</strong> <span>Validating Datasets</span></p>
				</div><!-- /.box__status -->

				<div v-else class="box__status box__status--complete">
					<p><strong>STATUS</strong> <span>Document Complete</span></p>
				</div><!-- /.box__status -->

				<div class="box__date">
					<ul>
						<li>
							<strong>uploaded</strong> <span>{{doc.Uploaded}}</span>
						</li>

						<li>
							<strong>modified</strong> <span>{{doc.Modified}}</span>
						</li>
					</ul>
				</div><!-- /.box__date -->
			</div><!-- /.box__body -->

			<div class="box__actions">
				<ul v-if="doc.Status ==='Validating'">
					<li>
						<router-link to="/datasets" class="btn btn--secondary">Continue</router-link>
					</li>
				</ul>

				<ul v-else>
					<li>
						<a href="#" class="btn btn--secondary">View Report</a>
					</li>

					<li>
						<router-link to="/datasets" class="btn btn--tertiary">Edit</router-link>
					</li>
				</ul>

				<div class="box__dropdown">
					<Dropdown>
						<template #header>
							<span class="btn-dropdown"></span>
						</template>

						<ul class="dropdown__nav">
							<li>
								<a href="#" @click.prevent="toggleSummary">
									<Icon name="view_list" />

									Document Summary
								</a>
							</li>

							<li>

								<a href="#">
									<Icon name="invite" />

									Invite By Email
								</a>
							</li>

							<li>

								<a href="#">
									<Icon name="share" />

									Get A Share Link
								</a>
							</li>

							<li>
								<a href="#">
									<Icon name="document_view" />

									View Uploaded File
								</a>
							</li>
						</ul>
					</Dropdown>
				</div><!-- /.box__dropdown -->
			</div><!-- /.box__actions -->
		</div><!-- /.box -->
	</li>
</template>

<script>
import Icon from '@/components/icon/icon'
import Dropdown from '@/components/dropdown/dropdown'

export default {
	/**
	* Name
	*/
	name: 'Box',

	/**
	* Components
	*/
	components: {
		Icon,
		Dropdown
	},

	/**
	* Props
	*/
	props: ['doc'],

	/**
	* Computed
	*/
	computed: {
		shortTitle: function() {
			const author = this.doc.Author.split(' ');

			author[0] = author[0].substring(0, 1).toUpperCase() + '.'

			return author.join(' ')
		}
	},
	mounted: function () {
		console.log(this.doc.Status);
	}
}
</script>
