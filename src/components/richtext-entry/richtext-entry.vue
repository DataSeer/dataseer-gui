<template>
	<div class="richtext-entry">
		<div v-if="label" class="richtext__label">
			<Icon v-if="icon" :name="icon" />

			{{ label }}
		</div>
		<!-- /.richtext__label -->

		<div class="richtext__body">
			<slot />
		</div>
		<!-- /.richtext__body -->
	</div>
	<!-- /.richtext-entry -->
</template>

<script>
/**
 * Internal Dependencies
 */
import Icon from '@/components/icon/icon';

export default {
	/**
	 * Name
	 */
	name: 'RichtextEntry',

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
		icon: {
			type: String,
			default: null
		},
		label: {
			type: String,
			default: null
		},
		title: {
			type: String,
			default: ''
		}
	}
};
</script>
