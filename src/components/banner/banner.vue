<template>
  <div class="banner">
    <div class="banner__image" v-if="$slots.image">
      <slot name="image" />
    </div><!-- /.banner__image -->

    <div class="banner__content">
      <slot />
    </div><!-- /.banner__content -->
  </div><!-- /.banner -->
</template>

<script>
export default {
  name: "Banner",
}
</script>
