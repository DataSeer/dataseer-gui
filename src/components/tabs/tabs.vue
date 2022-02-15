<template>
	<div class="tabs">
		<div class="tabs__links">
			<ul>
				<li
					v-for="(tab, index) in tabs"
					:key="index"
					@click="selectTab(index)"
					class="tabs__link"
					:class="{
						'is-active': index === activeIndex,
						'is-completed': tab.completed
					}"
				>
					<i v-if="tab.flagged" class="dot" />

					<span @click="selectTab(index)" v-tooltip.right="tabTooltips[index]" />
				</li>
			</ul>
		</div>
		<!-- /.tabs__links -->

		<div class="tabs__contents">
			<slot :activeIndex="activeIndex" />
		</div>
		<!-- /.tabs__content -->
	</div>
	<!-- /.tabs -->
</template>

<script>
export default {
	/**
	 * Name
	 */
	name: 'Tabs',

	/**
	 * Data
	 */
	data: function() {
		return {
			tabs: [],
			activeIndex: 0
		};
	},

	/**
	 * Computed
	 */
	computed: {
		tabTooltips() {
			return this.tabs.map((tab) => tab.tooltip);
		}
	},

	/**
	 * Methods
	 */
	methods: {
		selectTab(i) {
			this.activeIndex = i;

			this.tabs.map((tab, index) => (tab.isActive = index === i));
		}
	},
	
	/**
	 * Mounted
	 */
	mounted() {
		this.selectTab(0);
	},

	/**
	 * Created
	 */
	created() {
		this.tabs = this.$children;
	}
};
</script>
