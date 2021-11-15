<template>
	<div class="subheader__inner" tabindex="0" aria-labelledby="subheader-title">
		<div class="subheader__left">
			<h3 id="subheader-title">
				<Icon :name="icon" color="currentColor" />

				{{ title }}
			</h3>
		</div>
		<!-- /.subheader__left -->

		<div class="subheader__right">
			<div class="subheader__menu">
				<ul>
					<li>
						<slot />
					</li>
				</ul>
			</div>
			<!-- /.subheader__menu -->
		</div>
		<!-- /.subheader__right -->
	</div>
	<!-- /.subheader__inner -->
</template>

<script>
import Icon from '@/components/icon/icon';

export default {
	/**
	 * Name
	 */
	name: 'SubheaderEdit',

	/**
	 * Components
	 */
	components: {
		Icon
	},

	/**
	 * Props
	 */
	props: {
		title: String,
		icon: String
	}
};
</script>
