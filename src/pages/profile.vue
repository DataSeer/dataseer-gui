<template>
	<div class="main">
		<div class="shell">
			<div class="main__inner">
				<div class="main__left">
					<FormProfile />
				</div><!-- /.main__left -->

				<div class="main__right">
					<div class="banner">
						<div class="banner__image">
							<img src="@/assets/images/form-img-2@2x.png" alt="">
						</div><!-- /.banner__image -->

						<div class="banner__content">
							<h4>Data standards can be confusing</h4>

							DataSeer simplifies the process by providing a structured library of current data types and best practices for each so you’ll know just what to do with your data.
						</div><!-- /.banner__content -->
					</div><!-- /.banner -->
				</div><!-- /.main__right -->
			</div><!-- /.main__inner -->
		</div><!-- /.shell -->
	</div><!-- /.main -->
</template>

<script>
import FormProfile from '@/blocks/form-profile/form-profile';

export default {
  name: 'Profile',
  components: {
    FormProfile
  }
}
</script>
