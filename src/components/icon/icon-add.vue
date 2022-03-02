<template>
	<svg xmlns="http://www.w3.org/2000/svg" width="27.3" height="27.3" viewBox="0 0 27.3 27.3">
		<g fill="none" :stroke="color" stroke-miterlimit="10" stroke-width="1.5">
			<rect width="27.3" height="27.3" rx="7.8" stroke="none" />
			<rect x="0.75" y="0.75" width="25.8" height="25.8" rx="7.05" fill="none" />
		</g>
		<path
			d="M0,.65H11.7"
			transform="translate(7.8 13)"
			fill="none"
			:stroke="color"
			stroke-linecap="round"
			stroke-miterlimit="10"
			stroke-width="1.5"
		/>
		<path
			d="M.65,0V11.7"
			transform="translate(13 7.8)"
			fill="none"
			:stroke="color"
			stroke-linecap="round"
			stroke-miterlimit="10"
			stroke-width="1.5"
		/>
	</svg>
</template>

<script>
export default {
	/**
	 * name
	 */
	name: 'iconAdd',

	/**
	 * color
	 */
	props: ['color'],
};
</script>
