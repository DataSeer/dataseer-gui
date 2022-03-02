<template>
	<div class="tabs">
		<div class="tabs__links">
			<ul>
				<li
					v-for="(tab) in tabs"
					:key="tab.id"
					@click="$emit('tabsNavClick', tab)"
					class="tabs__link"
					:class="{
						'is-active': tab.id === activeTabId,
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
		activeTabId: {
			type: String || undefined,
			default: undefined
		},
		tabs: {
			type: [],
			default: () => []
		},
	},
};
</script>
