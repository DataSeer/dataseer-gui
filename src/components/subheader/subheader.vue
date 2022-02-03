<template>
	<portal to="subheader">
		<div
			class="subheader"
			:class="{
				[`subheader--${modifier}`]: modifier,
			}"
		>
			<Shell>
				<slot />
			</Shell>
		</div><!-- /.subheader -->
	</portal>
</template>

<script>
import Shell from '@/components/shell/shell';

export default {
	/**
	 * Name
	 */
	name: 'Subheader',

	/**
	 * Components
	 */
	components: {
		Shell,
	},

	props: {
		modifier: {
			type: String,
			default: ''
		},
	},
};
</script>
