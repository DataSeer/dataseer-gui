<template>
  <div class="form__row" :class="{'has-error': error}">
    <label :for="name" class="form__label">
      <slot name="label" />
    </label>

    <div class="field field--upload">
      <input type="file" :id="name" :name="name" :file="file" :accept="accept" :multiple="multiple" @change="handleChange">

      <label :for="name">
        <span class="btn btn--secondary">Choose File</span>
      </label>
      
      {{text}}
    </div><!-- /.field -->

    <div class="form__helptext">
      <slot name="helptext" />
    </div><!-- /.form__helptext -->
  </div><!-- /.form__row -->
</template>

<script>
export default {
  name: 'FormFile',

  props: ['file', 'name', 'text', 'error', 'accept', 'multiple'],

  methods: {
    handleChange(event){
      this.$emit('onChange', event);
    }
  }
}
</script>
