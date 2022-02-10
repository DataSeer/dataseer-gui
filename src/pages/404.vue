<template>
	<Main className="main--not-found">
		<Banner>
			<template #image>
				<img src="@/assets/images/form-img-2@2x.png" alt="Example Image Title" />
			</template>

			<h2>Error 404 - Not Found</h2>

			<p>
				Please check the URL for proper spelling and capitalization.
				
				<br>
				
				If you're having trouble locating a destination, try visiting the:
			</p>

			<Button to="/profile">Back To Homepage</Button>
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
