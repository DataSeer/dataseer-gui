<template>
	<svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 13 15">
		<path
			d="M9.733,15v-.409H9.2a1.747,1.747,0,0,1-1.337-.465A2.987,2.987,0,0,1,7.551,12.4V.94H9.733a3.378,3.378,0,0,1,1.548.3,2.255,2.255,0,0,1,.942.946,4.141,4.141,0,0,1,.343,1.327H13L12.829,0H.183L0,3.518H.434A3.2,3.2,0,0,1,.937,1.9,2.1,2.1,0,0,1,1.953,1.1,5.354,5.354,0,0,1,3.5.94H5.358V12.4a3.263,3.263,0,0,1-.251,1.615,1.6,1.6,0,0,1-1.394.575H3.164V15Z"
			:fill="color"
		/>
	</svg>
</template>

<script>
export default {
	/**
	 * name
	 */
	name: 'iconLetter',

	/**
	 * props
	 */
	props: {
		color: {
			type: String,
		},
		width: {
			default: 13
		},
		height: {
			default: 15
		}
	}
};
</script>
