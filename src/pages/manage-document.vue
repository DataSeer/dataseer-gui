<template>
	<Main hasSubheader>
		<FormManageDocument />

		<template #right>
			<Widgets>
				<div class="widget-links">
					<ul>
						<li>
							<a href="#">
								<Icon name="texts_add" color="currentColor" />

								View/Edit Document
							</a>
						</li>

						<li>
							<a href="#">
								<Icon name="document_view" color="currentColor" />

								View Report
							</a>
						</li>

						<li>
							<a href="#">
								<Icon name="invite" color="currentColor" />

								Contact Author
							</a>
						</li>
					</ul>
				</div>
				<!-- /.widget-links -->

				<div class="widget-box">
					<div class="widget__content">
						<h6>Public Share Link</h6>

						<a href="">https://app.dataseer.ai/dataseer/documents/6139467d7600e85b2c69a785</a>
					</div>
					<!-- /.widget__content -->

					<div class="widget__actions">
						<Button className="secondary">
							<Icon name="documents" color="currentColor" />

							Copy Share Link
						</Button>
					</div>
					<!-- /.widget__actions -->
				</div>
				<!-- /.widget-box -->

				<div class="widget-recent-changes">
					<div class="widget__head">
						<h6>Recent Changes</h6>

						<button>Show All</button>
					</div>
					<!-- /.widget__head -->

					<div class="widget__rows">
						<div class="widget__row">
							<div class="widget__col">swad31415@gmail.com</div>
							<!-- /.widget__col -->

							<div class="widget__col">update dataset-4</div>
							<!-- /.widget__col -->

							<div class="widget__col">9/8/2021 4:31:45 PM</div>
							<!-- /.widget__col -->
						</div>
						<!-- /.widget__row -->

						<div class="widget__row">
							<div class="widget__col">swad31415@gmail.com</div>
							<!-- /.widget__col -->

							<div class="widget__col">create dataset-4</div>
							<!-- /.widget__col -->

							<div class="widget__col">9/8/2021 4:31:11 PM</div>
							<!-- /.widget__col -->
						</div>
						<!-- /.widget__row -->

						<div class="widget__row">
							<div class="widget__col">swad31415@gmail.com</div>
							<!-- /.widget__col -->

							<div class="widget__col">update dataset-3</div>
							<!-- /.widget__col -->

							<div class="widget__col">9/8/2021 4:30:38 PM</div>
							<!-- /.widget__col -->
						</div>
						<!-- /.widget__row -->

						<div class="widget__row">
							<div class="widget__col">anotherperson@gmail.com</div>
							<!-- /.widget__col -->

							<div class="widget__col">create dataset-3</div>
							<!-- /.widget__col -->

							<div class="widget__col">9/8/2021 4:30:09 PM</div>
							<!-- /.widget__col -->
						</div>
						<!-- /.widget__row -->

						<div class="widget__row">
							<div class="widget__col">swad31415@gmail.com</div>
							<!-- /.widget__col -->

							<div class="widget__col">update dataset-2</div>
							<!-- /.widget__col -->

							<div class="widget__col">9/8/2021 4:29:52 PM</div>
							<!-- /.widget__col -->
						</div>
						<!-- /.widget__row -->

						<div class="widget__row">
							<div class="widget__col">swad31415@gmail.com</div>
							<!-- /.widget__col -->

							<div class="widget__col">create dataset-2</div>
							<!-- /.widget__col -->

							<div class="widget__col">9/8/2021 4:29:38 PM</div>
							<!-- /.widget__col -->
						</div>
						<!-- /.widget__row -->

						<div class="widget__row">
							<div class="widget__col">swad31415@gmail.com</div>
							<!-- /.widget__col -->

							<div class="widget__col">update dataset-1</div>
							<!-- /.widget__col -->

							<div class="widget__col">9/8/2021 4:30:01 PM</div>
							<!-- /.widget__col -->
						</div>
						<!-- /.widget__row -->

						<div class="widget__row">
							<div class="widget__col">swad31415@gmail.com</div>
							<!-- /.widget__col -->

							<div class="widget__col">create dataset-1</div>
							<!-- /.widget__col -->

							<div class="widget__col">9/8/2021 4:29:27 PM</div>
							<!-- /.widget__col -->
						</div>
						<!-- /.widget__row -->

						<div class="widget__row">
							<div class="widget__col">swad31415@gmail.com</div>
							<!-- /.widget__col -->

							<div class="widget__col">update validateMetadata</div>
							<!-- /.widget__col -->

							<div class="widget__col">9/8/2021 4:27:39 PM</div>
							<!-- /.widget__col -->
						</div>
						<!-- /.widget__row -->

						<div class="widget__row">
							<div class="widget__col">swad31415@gmail.com</div>
							<!-- /.widget__col -->

							<div class="widget__col">update refreshToken</div>
							<!-- /.widget__col -->

							<div class="widget__col">9/8/2021 4:26:26 PM</div>
							<!-- /.widget__col -->
						</div>
						<!-- /.widget__row -->
					</div>
					<!-- /.widget__rows -->
				</div>
				<!-- /.widget-recent-changes -->
			</Widgets>
		</template>
	</Main>
</template>

<script>
/**
 * Internal Dependencies
 */
import Main from '@/components/main/main';
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import Widgets from '@/components/widgets/widgets';
import FormManageDocument from '@/blocks/form-manage-document/form-manage-document';

export default {
	/**
	 * Name
	 */
	name: 'ManageDocument',

	/**
	 * Components
	 */
	components: {
		Main,
		Icon,
		Button,
		Widgets,
		FormManageDocument
	}
};
</script>
