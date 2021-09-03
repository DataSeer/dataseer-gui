<template>
  <li>
    <div class="checkbox" :class="{'has-error': error}">
      <input tabindex="0" type="checkbox" ref="checkbox" class="sr-only" :name="name" :id="name" @change="handleChange" :value="value">

      <label ref="label" :for="name" >
        <slot />
      </label>
    </div><!-- /.checkbox -->
  </li>
</template>

<script>
export default {
  name: 'FormCheckbox',
  props: ['error', 'name', 'value'],

  methods: {
    handleChange(event){
      this.$emit('onChange', event);
      this.$emit('input', event.target.checked);
    },
  }
}
</script>
