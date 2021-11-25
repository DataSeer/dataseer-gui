<template>
	<div class="widgets">
		<ul>
			{{this.$slots.default.map(() =>
				
			)}}
		</ul>
	</div>
	<!-- /.widgets -->
</template>

<script>
export default {
	/**
	 * Name
	 */
	name: 'Widgets',

	mounted() {
		console.log(this.$slots.default);
	}
};
</script>
