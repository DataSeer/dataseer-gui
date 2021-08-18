<template>
	<div class="main">
		<div class="main__left">
			<FormSignIn />
		</div><!-- /.main__left -->

		<div class="main__right">
			<div class="banner">
				<div class="banner__image">
					<img src="@/assets/images/form-img-1@2x.png" alt="">
				</div><!-- /.banner__image -->

				<div class="banner__content">
					<h4>Data sharing has never been simpler</h4>

					<p>DataSeer’s AI scnas research texts and surfaces sentences which may require dataset citations then gives best-practice advice for sharing that type of data.</p>
				</div><!-- /.banner__content -->
			</div><!-- /.banner -->
		</div><!-- /.main__right -->
	</div><!-- /.main -->
</template>

<script>
import FormSignIn from '@/blocks/form-sign-in/form-sign-in';

export default {
	name: 'SignIn',

	components: {
		FormSignIn
	}
}
</script>
