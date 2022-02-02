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
		clearDropdowns(event) {
			const activeDropdowns = document.querySelectorAll('.dropdown-holder.is-active');

			if (activeDropdowns) {
				activeDropdowns.forEach((activeDropdown) => {
					if (activeDropdown.contains(event.target)) return;
					activeDropdown.classList.remove('is-active');
				});
			}
		}
	},

	/**
	 * Created
	 */
	created() {
		this.getUserData();
		window.addEventListener('click', this.clearDropdowns);
	},

	/**
	 * Destroyed
	 */
	destroyed() {
		window.removeEventListener('click', this.clearDropdowns);
	}
};
</script>
