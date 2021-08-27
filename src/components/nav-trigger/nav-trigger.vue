<template>
  <button tabindex="0" class="nav-trigger" @click="$emit('onClick')">
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
