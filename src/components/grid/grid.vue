<template>
	<div
		class="grid"
		:class="{
			'gap-x-sm': columnGap === 'small',
			'gap-x-md': columnGap === 'medium',
			'gap-x-lg': columnGap === 'large',
			'gap-y-sm': rowGap === 'small',
			'gap-y-md': rowGap === 'medium',
			'gap-y-lg': rowGap === 'large'
		}"
	>
		<slot />
	</div>
	<!-- /.grid -->
</template>

<script>
import GridColumn from './grid-column';

export { GridColumn };

export default {
	/**
	 * Name
	 */
	name: 'Grid',

	/**
	 * Props
	 */
	props: {
		columnGap: {
			type: String,
			default: 'medium'
		},
		rowGap: {
			type: String,
			default: 'medium'
		}
	}
};
</script>
