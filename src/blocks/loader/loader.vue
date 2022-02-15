<template>
	<div class="loader">
		<Spinner v-if="loading" size="large" />
		
		<LoaderError v-if="error">
			{{errorMessage}}	
		</LoaderError>

		<slot v-if="!error && !loading" />
	</div><!-- /.loader -->
</template>

<script>
import LoaderError from '@/blocks/loader/loader-error';
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
		LoaderError
	},

	/**
	 * Props
	 */
	props: {
		loading: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		},
		errorMessage: {
			type: String,
			default: ''
		},
	},
}
</script>

