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
					<Dot v-if="tab.flagged" />
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
import Dot from '@/components/dot/dot';

export default {
	/**
	 * Name
	 */
	name: 'Tabs',

	/**
	 * Components
	 */
	components: {
		Dot
	},

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
			return this.tabs.map((item) => item.tooltip);
		}
	},

	/**
	 * Methods
	 */
	methods: {
		selectTab(i) {
			this.activeIndex = i;

			this.tabs.forEach((tab, index) => {
				tab.isActive = index === i;
			});
		}
	},

	/**
	 * Created
	 */
	created() {
		this.tabs = this.$children;
	},

	/**
	 * Mounted
	 */
	mounted() {
		this.selectTab(0);
	}
};
</script>
