<template>
  <router-link 
    v-if="to"
    class="btn"
    :to="to"
    :class="{
      [`btn--${className}`]: className,
      'is-disabled': disabled,
      'btn--small': size === 'small',
      'btn--block': block
    }"
    @click="$emit('onClick')"
  >
    <slot />
  </router-link>
  
  <a
    v-else-if="href"
    class="btn"
    :href="href"
    :class="{
      [`btn--${className}`]: className,
      'is-disabled': disabled,
      'btn--small': size === 'small',
      'btn--block': block
    }"
    @click="$emit('onClick')"
  >
    <slot />
  </a>

  <button
    v-else
    type="button"
    class="btn"
    tabindex="0"
    :class="{
      [`btn--${className}`]: className,
      'is-disabled': disabled,
			'btn--small': size === 'small',
      'btn--block': block
    }"
    @click="$emit('onClick')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  /**
   * Name
   */
  name: 'Button',

  /**
   * Props
   */
  props: {
    to: {
      type: String,
      default: '',
    },
    
    href: {
      type: String,
      default: '',
    },
    
    className: {
      type: String,
      default: '',
      validator: function(value) {
        // The value must match one of these strings
        return ['', 'secondary', 'tertiary'].indexOf(value) !== -1;
      },
    },

    block: {
      type: Boolean,
      default: false,
    },
		
    size: {
			type: String,
			default: '',
			validator: function(value) {
        // The value must match one of these strings
        return ['', 'small'].indexOf(value) !== -1;
      },
		},
    
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
