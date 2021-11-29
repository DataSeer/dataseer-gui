<template>
	<Main>
		<FormSignUp />

		<template #right>
			<Banner>
				<template #image>
					<img src="@/assets/images/form-img-1@2x.png" alt="Example Image Title" />
				</template>

				<h4>DataSeer is better together!</h4>

				<p>
					Collaboration is essential for researchers and DataSeer is no different. Invite co-authors and other stakeholders to contribute to the data
					citation process.
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
import FormSignUp from '@/blocks/form-sign-up/form-sign-up';

export default {
	/**
	 * Name
	 */
	name: 'SignUp',

	/**
	 * Components
	 */
	components: {
		Main,
		Banner,
		FormSignUp
	}
};
</script>
