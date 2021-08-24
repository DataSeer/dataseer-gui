<template>
  <li>
    <div class="checkbox" :class="{'has-error': error}">
      <input type="checkbox" :name="name" :id="name" @change="handleChange">

      <label :for="name">This is a new version of an article DataSeer has already assessed</label>
    </div><!-- /.checkbox -->
  </li>
</template>

<script>
export default {
  name: 'FormCheckbox',
  props: ['error', 'name'],

  methods: {
    handleChange(event){
      this.$emit('onChange', event);
    }
  }
}
</script>
