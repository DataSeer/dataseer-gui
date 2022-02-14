<template>
	<div class="loader">
		<Spinner v-if="loading" size="large" />

		<slot v-else />
	</div><!-- /.loader -->
</template>

<script>
import Spinner from '@/components/spinner/spinner';

export default {
	/**
	 * Name
	 */
	name: 'Loader',

	/**
	 * Components
	 */
	components: {
		Spinner,
	},

	/**
	 * Props
	 */
	props: {
		loading: {
			type: Boolean,
			default: false
		},
	},
}
</script>

