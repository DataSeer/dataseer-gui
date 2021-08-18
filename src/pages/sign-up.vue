<template>
	<div class="main">
		<div class="main__left">
			<FormSignUp />
		</div><!-- /.main__left -->

		<div class="main__right">
			<div class="banner">
				<div class="banner__image">
					<img src="@/assets/images/form-img-1@2x.png" alt="">
				</div><!-- /.banner__image -->

				<div class="banner__content">
					<h4>DataSeer is better together!</h4>

					<p>Collaboration is essential for researchers and DataSeer is no different. Invite co-authors and other stakeholders to contribute to the data citation process.</p>
				</div><!-- /.banner__content -->
			</div><!-- /.banner -->
		</div><!-- /.main__right -->
	</div><!-- /.main -->
</template>

<script>
import FormSignUp from '@/blocks/form-sign-up/form-sign-up';

export default {
	name: 'SignUp',

	components: {
		FormSignUp
	}
}
</script>
