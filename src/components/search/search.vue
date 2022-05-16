<template>
	<div class="form form--search">
		<form action="">
			<Field
				name="search"
				type="search"
				placeholder="Search"
				:value="search"
				@input="(value) => this.$emit('input', value)"
			/>

			<button type="submit" aria-label="Submit Search">
				<Icon name="search" :color="cssVariables.primary" />
			</button>
		</form>
	</div>
</template>

<script>
/**
 * Internal Dependencies
 */

import variables from '@/assets/scss/generic/_variables.scss'
import Icon from '@/components/icon/icon';
import Field from '@/components/field/field';

export default {
	/**
	 * Name
	 */
	name: 'Search',

	/**
	 * Components
	 */
	components: {
		Icon,
		Field
	},

	/**
	 * Data
	 */
	data: function() {
		return {
			search: ''
		};
	},

	/**
	 * Computed
	 */
	computed: {
		cssVariables() {
			return variables
		},
	},
};
</script>
