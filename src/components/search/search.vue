<template>
	<div class="form form--search">
		<form action="">
			<Field name="search" v-model.trim="search" type="search" placeholder="Search" />

			<button type="submit" aria-label="Submit Search">
				<Icon name="search" color="#005AC9" />
			</button>
			<!-- /.form__row -->
		</form>
	</div>
	<!-- /.form -->
</template>

<script>
import Icon from '@/components/icon/icon';
import Field from '@/components/field/field';

export default {
	name: 'Search',

	components: {
		Icon,
		Field
	},

	data: function() {
		return {
			search: ''
		};
	}
};
</script>
