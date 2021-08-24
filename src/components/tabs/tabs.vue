<template>
  <div class="tabs">
      <div class="tabs__links">
        <ul>
          <li 
            v-for="(tab, index) in tabs"
            :key="index"
            :class="{ 'is-active': tab.isActive }"
          >
            <a 
              :href="tab.href"
              @click="selectTab(tab)"
              v-tooltip.right="tabTooltips[index]"
            >
              {{ tab.name }}
            </a>
          </li>
        </ul>
      </div><!-- /.tabs__links -->
      <div class="tabs__contents">
        <slot />
      </div><!-- /.tabs__content -->
  </div><!-- /.tabs -->
</template>

<script>
export default {
  name: 'Tabs',

  props: ['start'],

  data: function() {
    return {
      tabs: [],
    }
  },

  computed: {
    tabTooltips() {
      return this.tabs.map(item => item.tooltip);
    }
  },

  watch: {
    start() {
      this.tabs[0].isActive = true;
    }
  },

  methods: {
    selectTab(selectedTab) {
      this.$emit('tabSelected');
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name == selectedTab.name);
      });
    }
  },

  created() {
    this.tabs = this.$children;
  },
}
</script>
