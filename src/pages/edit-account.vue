<template>
	<div class="main main--edit">
		<div class="shell">
			<div class="main__inner">
				<div class="main__left">
					<FormEditAccount />
				</div>

				<!-- /.main__left -->
				<div class="main__right">
					<div class="widgets">
						<ul>
							<li>
								<div class="widget-associations">
									<h6>
										<strong>5</strong>

										Associated Documents
									</h6>

									<Button to="/accounts" className="secondary">
										<Icon name="documents" color="currentColor" />

										View Documents
									</Button>
								</div>
								<!-- /.widget-associations -->
							</li>

							<li>
								<div class="widget-recent-actions">
									<div class="widget__head">
										<h6>Recent Actions</h6>

										<button>Show All</button>
									</div>
									<!-- /.widget__head -->

									<div class="widget__body">
										<div v-for="(action, index) in actions" class="widget__row" :key="index">
											<div class="widget__col">{{ action.name }}</div>

											<!-- /.widget__col -->
											<div class="widget__col">{{ action.action }}</div>
											<!-- /.widget__col -->

											<div class="widget__col">{{ action.date }}</div>
											<!-- /.widget__col -->
										</div>
										<!-- /.widget__row -->
									</div>
									<!-- /.widget__body -->
								</div>
								<!-- /.widget-recent-actions -->
							</li>
						</ul>
					</div>
					<!-- /.widgets -->
				</div>
				<!-- /.main__right -->
			</div>
			<!-- /.main__inner -->
		</div>
		<!-- /.shell -->
	</div>
	<!-- /.main -->
</template>

<script>
/**
 * Internal Dependencies
 */
import FormEditAccount from '@/blocks/form-edit-account/form-edit-account';
import Button from '@/components/button/button';
import Icon from '@/components/icon/icon';

export default {
	/**
	 * Name
	 */
	name: 'EditAccount',

	/**
	 * Components
	 */
	components: {
		Icon,
		Button,
		FormEditAccount
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			actions: [
				{
					name: 'Some Document Name',
					action: 'update dataset-4',
					date: '9/8/2021 4:31:45 PM'
				},
				{
					name: 'Signed In',
					action: '',
					date: '9/8/2021 4:31:11 PM'
				},
				{
					name: 'Another Document Name',
					action: 'update dataset-3',
					date: '9/8/2021 4:30:38 PM'
				},
				{
					name: 'Another Document Name',
					action: 'create dataset-3',
					date: '9/8/2021 4:30:09 PM'
				},
				{
					name: 'Another Document Name',
					action: 'update dataset-2',
					date: '9/8/2021 4:29:52 PM'
				},
				{
					name: 'Another Document Name',
					action: 'create dataset-2',
					date: '9/8/2021 4:29:38 PM'
				},
				{
					name: 'Signed In',
					action: '',
					date: '9/8/2021 4:30:01 PM'
				},
				{
					name: 'Another Document Name',
					action: 'create dataset-1',
					date: '9/8/2021 4:29:27 PM'
				},
				{
					name: 'Another Document Name',
					action: 'update validateMetadata',
					date: '9/8/2021 4:27:39 PM'
				},
				{
					name: 'Another Document Name',
					action: 'update refreshToken',
					date: '9/8/2021 4:26:26 PM'
				}
			]
		};
	}
};
</script>
