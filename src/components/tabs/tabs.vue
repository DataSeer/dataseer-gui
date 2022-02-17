<template>
	<div class="tabs">
		<div class="tabs__links">
			<ul>
				<li
					v-for="(tab, index) in tabs"
					:key="index"
					@click.prevent="$emit('navButtonClick', index)"
					class="tabs__link"
					:class="{
						'is-active': index === activeTabIndex,
						'is-completed': tab.status === 'saved'
					}"
				>
					<i v-if="tab.issue" class="dot" />

					<span v-tooltip.right="tab.description" />
				</li>
			</ul>
		</div> <!-- /.tabs__links -->

		<div class="tabs__contents">
			<slot />
		</div> <!-- /.tabs__content -->
	</div> <!-- /.tabs -->
</template>

<script>
/**
 * Internal Dependencies
 */

export default {
	/**
	 * Name
	 */
	name: 'Tabs',

	/**
	 * Props
	 */
	props: {
		activeTabIndex: {
			type: Number || null,
			default: null
		},
		tabs: {
			type: [],
			default: () => []
		},
	},
};
</script>
