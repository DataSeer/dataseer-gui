<template>
	<Main>
		<FormForgotPassword />

		<template #right>
			<Banner>
				<template #image>
					<img src="@/assets/images/form-img-2@2x.png" alt="Example Image Title" />
				</template>

				<h4>Data sharing has never been simpler</h4>

				<p>
					DataSeer’s AI scans research texts and surfaces sentences which may require dataset citations then gives best-practice advice for sharing
					that type of data.
				</p>
			</Banner>
		</template>
	</Main>
</template>

<script>
/**
 * Internal Dependencies
 */
import Main from '@/components/main/main';
import Banner from '@/components/banner/banner';
import FormForgotPassword from '@/blocks/form-forgot-password/form-forgot-password';

export default {
	/**
	 * 	Name
	 */
	name: 'ForgotPassword',

	/**
	 * 	Components
	 */
	components: {
		Main,
		Banner,
		FormForgotPassword
	}
};
</script>
