<template>
  <div id="app">
    <Header></Header>

    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/header/header.vue'

export default {
  name: 'App',

  components: {
    Header,
  },

  methods: {
    clearDropdowns(event) {
      const activeDropdowns = document.querySelectorAll('.dropdown-holder.is-active');

      if(activeDropdowns) {
        activeDropdowns.forEach((activeDropdown) => {
          if (activeDropdown.contains(event.target)) return;

          activeDropdown.classList.remove('is-active');
        })
      }
    }
  },

  created(){
    window.addEventListener('click', this.clearDropdowns)
  },

  destroyed() {
    window.removeEventListener('click', this.clearDropdowns)
  }
}
</script>
