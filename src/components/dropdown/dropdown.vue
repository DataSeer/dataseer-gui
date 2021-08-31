<template>
  <div class="dropdown-holder" ref="dropdown">
    <div tabindex="0" class="dropdown__header" @click="handleClick">
      <slot name="header" />
    </div><!-- /.dropdown__header -->
    <div class="dropdown__body">
      <slot />
    </div><!-- /.dropdown__body -->
  </div><!-- /.dropdown-holder -->
</template>

<script>
export default {
  name: 'Dropdown',

  methods: {
    handleClick() {
      this.$refs.dropdown.classList.toggle('is-active')
    }
  }
}
</script>
