<template>
  <li>
    <div class="checkbox" :class="{'has-error': error, 'checkbox--select': isDropdown}">
      <input tabindex="0" type="checkbox" ref="checkbox" class="sr-only" :name="name" :id="name" @change="handleChange" :value="value" :checked="value">

      <label v-if="!isDropdown" ref="label" :for="name" >
        <slot />
      </label>

      <p v-if="isDropdown">
        <slot />
      </p>
      
      <vSelect
        v-if="isDropdown"
        :id="name"
        placeholder="Select"
        :clearable="false"
        :searchable="false"
        :options="selectOptions"
        label="title"
        @input=handleSelect
      >
        <template #option="{ title, value }">
          <span :data-value="value.toString()">
            {{ title }}
          </span>
        </template>

        <template #selected-option="{ title, value }">
          <span :data-value="value.toString()">
            {{ title }}
          </span>
        </template>
      </vSelect>
    </div><!-- /.checkbox -->
  </li>
</template>

<script>
import vSelect from 'vue-select';

export default {
  name: 'FormCheckbox',

  components: {
    vSelect
  },
  
  props: {
    error: Boolean,
    name: String,
    isDropdown: {
      type: Boolean,
      default: false,
    }
  },

  data: function() {
    return {
      value: false,
      selectOptions: [
        {
          title: 'Yes',
          value: true,
        },
        {
          title: 'No',
          value: false,
        },
      ],
    };
  },

  methods: {
    handleChange(event){
      this.$emit('onChange', event);
      this.$emit('input', event.target.checked);
    },

    handleSelect(el){
      this.$emit('input', el.value);
      this.value = el.value
    },
  },
}
</script>
