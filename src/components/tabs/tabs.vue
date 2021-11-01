<template>
  <div class="tabs">
    <div class="tabs__links">
      <ul>
        <li v-for='(tab, index) in tabs'
          :key='index'
          @click='selectTab(index)'
          :class='{"is-active": (index === activeIndex), "is-completed": tab.completed}'
        >
          <span @click="selectTab(index)" v-tooltip.right="tabTooltips[index]"></span>
        </li>
      </ul>
    </div><!-- /.tabs__links -->

    <div class="tabs__contents">
      <slot :activeIndex="activeIndex" />
    </div>
    <!-- /.tabs__content -->
  </div>
  <!-- /.tabs -->
</template>

<script>
export default {  
  name: "Tabs",

  data: function() {
    return {
      tabs: [],
      activeIndex: 0,
    }
  },

  computed: {
    tabTooltips() {
      return this.tabs.map((item) => item.tooltip);
    }
  },

  methods: {
    selectTab (i) {
      this.activeIndex = i
      
      this.tabs.forEach((tab, index) => {
        tab.isActive = (index === i)
      })
    }
 },
  
  created () {
    this.tabs = this.$children
  }
};
</script>
