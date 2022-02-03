<template>
	<div class="table-filters">
		<BtnClose alt label="Close Table Filters" @onClick="$emit('closeButtonClick')" />

		<slot />
	</div><!-- /.table-filters -->
</template>

<script>
/**
 * Internal Dependencies
 */
import BtnClose from '@/components/btn-close/btn-close';

export default {
	/**
	 * Name
	 */
	name: 'TableFilters',

	/**
	 * Components
	 */
	components: {
		BtnClose
	},
}
</script>

