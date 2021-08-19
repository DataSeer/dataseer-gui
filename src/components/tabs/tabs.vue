<template>
  <div class="tabs">
      <div class="tabs__links">
        <ul>
          <li 
            v-for="(tab, index) in tabs"
            :key="index"
            :class="{ 'is-active': tab.isActive }"
          >
              <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
          </li>
        </ul>
      </div><!-- /.tabs__links -->
      <div class="tabs__content">
        <slot />
      </div><!-- /.tabs__content -->
  </div><!-- /.tabs -->
</template>

<script>
export default {
  name: 'Tabs',

  data: function() {
    return {
      tabs: [],
    }
  },

  methods: {
      selectTab(selectedTab) {
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
