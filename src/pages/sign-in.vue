<template>
	<div class="main">
		<div class="shell">
			<div class="main__inner">
				<div class="main__left">
					<FormSignIn />
				</div><!-- /.main__left -->

				<div class="main__right">
					<Banner>
						<template #image>
							<img src="@/assets/images/form-img-2@2x.png" alt="Example Image Title">
						</template>
						
						<h4>Data sharing has never been simpler</h4>

						<p>DataSeer’s AI scnas research texts and surfaces sentences which may require dataset citations then gives best-practice advice for sharing that type of data.</p>
					</Banner>
				</div><!-- /.main__right -->
			</div><!-- /.main__inner -->
		</div><!-- /.shell -->
	</div><!-- /.main -->
</template>

<script>
import FormSignIn from '@/blocks/form-sign-in/form-sign-in';
import Banner from '@/components/banner/banner';

export default {
	name: 'SignIn',

	components: {
		FormSignIn,
		Banner
	}
}
</script>
