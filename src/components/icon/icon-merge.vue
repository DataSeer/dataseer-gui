<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="27.3" height="27.3" viewBox="0 0 27.3 27.3">
    <g transform="translate(7.8)" fill="none" :stroke="color" stroke-miterlimit="10" stroke-width="1.5">
      <rect width="19.5" height="19.5" rx="6.5" stroke="none"/>
      <rect x="0.75" y="0.75" width="18" height="18" rx="5.75" fill="none"/>
    </g>
    
	<g data-name="Rectangle" transform="translate(0 7.8)" fill="none" :stroke="color" stroke-miterlimit="10" stroke-width="1.5">
      <rect width="19.5" height="19.5" rx="6.5" stroke="none"/>
      <rect x="0.75" y="0.75" width="18" height="18" rx="5.75" fill="none"/>
    </g>
    <path data-name="Path 4" d="M3.911,0,0,3.911" transform="translate(9.1 9.161)" fill="none" :stroke="color" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5"/>
    <path data-name="Path 4" d="M3.911,0,0,3.911" transform="translate(14.3 14.361)" fill="none" :stroke="color" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5"/>
    <path data-name="Path 4" d="M5.85.589l-5.2,5.2" transform="translate(10.4 10.461)" fill="none" :stroke="color" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5"/>
  </svg>
</template>

<script>
  export default {
  /**
   * name
  */
  name: 'iconMerge',

  /**
   * props
  */
  props: ['color']
  }
</script>
