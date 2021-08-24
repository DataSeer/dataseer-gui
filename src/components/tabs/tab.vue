<template>
  <div v-show="isActive" class="tab">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Tab",

  data: function() {
    return {
      isActive: false
    }
  },

  props: {
    name: { required: true },
    selected: { default: false},
    tooltip: {dfault: ''}
  },

  mounted() {
    this.isActive = this.selected;
  }
}
</script>
