<template>
	<div
		class="main"
		:class="{
			[className]: className,
			'main--no-rightside': !hasRightSide,
			'main--has-subheader': hasSubheader
		}"
	>
		<slot name="subheader" />
		
		<Shell>
			<Spinner v-if="loading" size="large" />
		
			<MainError v-if="error">
				{{errorMessage}}	
			</MainError>

			<div v-if="!error && !loading" class="main__inner">
				<div class="main__left">
					<slot />
				</div> <!-- /.main__left -->

				<div class="main__right" v-if="hasRightSide && !loading">
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
import Spinner from '@/components/spinner/spinner';
import Shell from '@/components/shell/shell';
import MainError from '@/components/main/main-error';

export default {
	/**
	 * Name
	 */
	name: 'Main',

	/**
	 * Components
	 */
	components: {
		Shell,
		Spinner,
		MainError
	},

	/**
	 * Props
	 */
	props: {
		className: {
			type: String,
			default: ''
		},
		loading: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		},
		errorMessage: {
			type: String,
		}
	},

	/**
	 * Computed
	 */
	computed: {
		hasRightSide() {
			return !!this.$slots['right'];
		},
		hasSubheader() {
			return !!this.$slots['subheader'];
		}
	}
};
</script>
