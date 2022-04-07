<template>
	<div class="dropdown-holder" ref="dropdown">
		<button tabindex="0" class="dropdown__header" @click="handleClick" aria-label="dropdown">
			<slot name="header" />
		</button> <!-- /.dropdown__header -->

		<div class="dropdown__body">
			<slot />
		</div> <!-- /.dropdown__body -->
	</div> <!-- /.dropdown-holder -->
</template>

<script>
	import DropdownNavDatasets from './dropdown-nav-datasets'

	export default {
		/**
		 * Name
		 */
		name: 'Dropdown',

		/**
		 * Methods
		 */
		methods: {
			handleClick(e) {
				e.preventDefault();

				this.$refs.dropdown.classList.toggle('is-active');
			}
		}
	};

	export {
		DropdownNavDatasets
	}
</script>
