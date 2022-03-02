<template>
	<div
		class="grid"
		:class="{
			'grid-cols-2': columnSize === 'half',
			'grid-cols-3': columnSize === 'third',
			'grid-cols-4': columnSize === 'quarter',
			'gap-x-sm': columnGap === 'small',
			'gap-x-md': columnGap === 'medium',
			'gap-x-lg': columnGap === 'large',
			'gap-y-sm': rowGap === 'small',
			'gap-y-md': rowGap === 'medium',
			'gap-y-lg': rowGap === 'large',
			'gap-y-xlg': rowGap === 'extralarge'
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
		columnSize: {
			type: String,
			default: ''
		},
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
