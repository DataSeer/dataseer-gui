<template>
	<div class="form form--search">
		<form action="">
			<Field
				name="search"
				type="search"
				placeholder="Search"
				:value="value"
				@input="handleInput"
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
import { debounce } from '@/utils/use-debounce'
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
	 * Props
	 */
	props: {
		value: {
			type: String,
			default: ''
		},
	},

	/**
	 * Computed
	 */
	computed: {
		cssVariables() {
			return variables
		},
	},

	methods: {
		handleInput: debounce(function (value) {
			this.$emit('input', value);	
		}, 500) 
	},
};
</script>