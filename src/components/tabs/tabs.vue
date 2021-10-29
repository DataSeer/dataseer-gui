<template>
  <div class="tabs">
    <div class="tabs__links">
      <ul>
        <li
          v-for="(tab, index) in tabs"
          :key="tab.index"
          @click="selectTab(index)"
        >
          <span @click="selectTab(index)" v-tooltip.right="tabTooltips[index]"></span>
        </li>
      </ul>
    </div>
    <!-- /.tabs__links -->

    <div class="tabs__contents">
      <slot :activeIndex="activeTabIndex" />
    </div>
    <!-- /.tabs__content -->
  </div>
  <!-- /.tabs -->
</template>

<script>
export default {
  name: "Tabs",
  props: ["start"],

  data: function() {
    return {
      tabs: [],
      activeIndex: 0,
    };
  },

  

  computed: {
    tabTooltips() {
      return this.tabs.map((item) => item.tooltip);
    },
  },

  methods: {
    selectTab(i) {
      this.activeIndex = i;

      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = index === i;
      });
    },
  },

  mounted() {
    this.selectTab(0);
  },

  created() {
    this.tabs = this.$children;
  },
};
</script>
