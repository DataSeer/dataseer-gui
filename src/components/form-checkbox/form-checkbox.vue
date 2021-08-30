<template>
  <li>
    <div class="checkbox" :class="{'has-error': error}">
      <input type="checkbox" :name="name" :id="name" @change="handleChange" :value="value">

      <label tabindex="1" :for="name">
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
    }
  }
}
</script>
