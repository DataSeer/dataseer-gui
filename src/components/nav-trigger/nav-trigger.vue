<template>
  <button tabindex="0" class="nav-trigger" @click="$emit('onClick')" aria-label="Toggle mobile menu">
    <span></span>

    <span></span>

    <span></span>
  </button>
</template>

<script>
export default {
  name: 'navTrigger',
}
</script>
