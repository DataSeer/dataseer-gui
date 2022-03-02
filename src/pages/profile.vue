<template>
	<Main className="main--profile" hasSubheader>
		<Subheader>
			<SubheaderProfile />
		</Subheader>
		
		<Grid columnGap="large" rowGap="small" columnSize="half">
			<GridColumn>
				<FormProfile />
			</GridColumn>

			<GridColumn>
				<FormResetPassword />
			</GridColumn>
		</Grid>

		<template #right>
			<Banner>
				<template #image>
					<img src="@/assets/images/form-img-4@2x.png" alt="Example Image Title" />
				</template>

				<h4>Data standards can be confusing</h4>

				<p>
					DataSeer simplifies the process by providing a structured library of current data types
					and best practices for each so you’ll know just what to do with your data.
				</p>
			</Banner>
		</template>
	</Main>
</template>

<script>
import Main from '@/components/main/main';
import Banner from '@/components/banner/banner';
import Grid, { GridColumn } from '@/components/grid/grid';
import FormProfile from '@/blocks/form-profile/form-profile.vue';
import FormResetPassword from '@/blocks/form-reset-password/form-reset-password';
import Subheader from '@/components/subheader/subheader';
import SubheaderProfile from '@/components/subheader/subheader-profile';

export default {
	name: 'Profile',

	components: {
		Main,
		Grid,
		Subheader,
		Banner,
		GridColumn,
		FormProfile,
		SubheaderProfile,
		FormResetPassword
	}
};
</script>
