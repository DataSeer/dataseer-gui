<template>
	<div class="dropdown-holder js-dropdown-holder" ref="dropdown">
		<button tabindex="0" class="dropdown__header" @click="handleClick" aria-label="dropdown">
			<slot name="header" />
		</button> <!-- /.dropdown__header -->

		<div class="dropdown__body" :data-placement="placement">
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
		 * Props
		 */
		props: {
			placement: {
				default: 'left',
				type: String,
				// Value must match one of these strings
				validator: function(value) {
					return ['left', 'right'].indexOf(value) !== -1;
				}
			},
		},

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
