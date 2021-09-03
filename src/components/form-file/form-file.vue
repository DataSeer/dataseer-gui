<template>
  <div class="form__row" :class="{'has-error': error}">
    <label :for="name" class="form__label">
      <slot name="label" />
    </label>

    <div tabindex="0" class="field field--upload">
      <input ref="file" type="file" :id="name" :name="name" :value="file" :accept="accept" :multiple="multiple" @change="onChange">

      <label :for="name">
        <span class="btn btn--secondary">Choose File</span>
      </label>
      
      <p class="field__text">{{text}}</p><!-- /.field__text -->
      
      <a href="#" v-if="file" @click.prevent="onClear" class="form__clear"></a>
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
    onChange(event){
      this.$emit('onChange', event);
    },
    onClear(){
      this.$emit('onClear', this.name);
    }
  }
}
</script>
