<template>
	<Main className="main--not-found">
		<Banner>
			<template #image>
				<img src="@/assets/images/form-img-2@2x.png" alt="Example Image Title" />
			</template>

			<h2>Error 404 - Not Found</h2>

			<Button to="/profile" className="secondary">Go Back</Button>
		</Banner>
	</Main>
</template>

<script>
	/**
	 * Internal Dependencies
	 */
	import Main from '@/components/main/main';
	import Banner from '@/components/banner/banner';
	import Button from '@/components/button/button';
	
	export default {
		/**
		 * 	Name
		 */
		name: 'NotFound',	

		/**
		 * 	Components
		 */
		components: {
			Main,
			Button,
			Banner
		}
	}
</script>
