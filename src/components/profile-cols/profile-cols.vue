<template>
	<div class="form-cols">
		<div class="form__cols">
			<div class="form__col">
				<FormProfile />
			</div><!-- /.form__col -->
			
			<div class="form__col">
				<FormResetPasswod />
			</div><!-- /.form__col -->
		</div><!-- /.form__cols -->
	</div><!-- /.form -->
</template>

<script>
	import FormProfile from '@/blocks/form-profile/form-profile.vue'
	import FormResetPasswod from '@/blocks/form-reset-password/form-reset-password'
	
	export default {
		name: 'ProfileCols',
		components: {
			FormProfile,
			FormResetPasswod
		}
	}
</script>
