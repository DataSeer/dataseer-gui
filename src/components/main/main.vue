<template>
	<div class="main" :class="{ [className]: className, 'main--no-rightside': !hadRightSide, 'main--has-subheader': hasSubheader }">
		<Shell>
			<div class="main__inner">
				<div class="main__left">
					<slot />
				</div> <!-- /.main__left -->

				<div class="main__right" v-if="hadRightSide">
					<slot name="right" />
				</div> <!-- /.main__right -->
			</div> <!-- /.main__inner -->
		</Shell>
	</div> <!-- /.main -->
</template>

<script>
/**
 * Internal Dependencies
 */

import Shell from '@/components/shell/shell';

export default {
	/**
	 * Name
	 */
	name: 'Main',

	/**
	 * Components
	 */
	components: {
		Shell
	},

	/**
	 * Props
	 */
	props: {
		className: {
			type: String,
			default: ''
		},
		hasSubheader: {
			type: Boolean,
			default: false
		}
	},

	/**
	 * Computed
	 */
	computed: {
		hadRightSide() {
			return !!this.$slots['right'];
		}
	}
};
</script>
