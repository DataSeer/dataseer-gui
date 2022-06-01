<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		:width="width"
		:height="height"
		viewBox="0 0 25.829 16.829">
		<g transform="translate(0.414 0.914)">
			<path d="M0,10,1.121,1.121,10,0" transform="translate(8.929 7.5) rotate(-45)" fill="none" :stroke="color" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.7"/>
			<path d="M0,10,1.121,1.121,10,0" transform="translate(0.929 7.5) rotate(-45)" fill="none" :stroke="color" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.7"/>
		</g>
	</svg>
</template>

<script>
	export default {
	/**
	 * name
	*/
	name: 'iconBack',

	/**
	 * props
	 */
	props: {
		color: {
			default: 'currentColor'
		},
		width: {
			default: 24.829
		},
		height: {
			default: 16.829
		}
	}
}
</script>

