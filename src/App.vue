<template>
	<div id="app">
		<Header />

		<router-view />
	</div>
</template>

<script>

/**
 * External Dependencies
 */
import { mapActions } from 'vuex';

/**
 * Internal Dependencies
 */
import Header from '@/components/header/header.vue';
import { clearDropdownsOnClick } from '@/utils/use-dropdowns';

export default {
	/**
	 * Name
	 */
	name: 'App',

	/**
	 * Components
	 */
	components: {
		Header
	},

	/**
	 * Methods
	 */
	methods: {
		...mapActions('account', ['getUserData']),
	},

	/**
	 * Created
	 */
	created() {
		this.getUserData();
		
		window.addEventListener('click', clearDropdownsOnClick);
	},

	/**
	 * Destroyed
	 */
	destroyed() {
		window.removeEventListener('click', clearDropdownsOnClick);
	}
};
</script>
