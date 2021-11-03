<template>
  <div class="form__row" :class="{ 'has-error': error }">
    <label v-if="this.$slots.default" :for="name" class="form__label">
      <slot />
    </label>

    <div class="form__controls">
      <div
        v-if="options.length"
        class="select"
        :class="{ 'is-selected': value.length, 'is-opened': isOpened }"
      >
        <vSelect
          :id="name"
          :placeholder="placeholder"
          :clearable="false"
          :searchable="false"
          :options="options"
          label="title"
        >
          <template #option="{ title, helptext }">
            {{ title }} <i v-if="helptext">{{ helptext }}</i>
          </template>

          <template #selected-option="{ title, helptext }">
            {{ title }} <i v-if="helptext">{{ helptext }}</i>
          </template>
        </vSelect>
      </div>
      <textarea
        v-else-if="type === 'textarea'"
        :name="name"
        :id="name"
        class="field field--textarea"
        @input="handleChange"
        :placeholder="placeholder"
        :value="value"
      >
      </textarea
      ><!-- /# -->
      <input
        v-else
        class="field"
        :tabindex="tabindex"
        :id="name"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :readonly="readonly"
        @input="handleChange"
      />
    </div>
    <!-- /.form__controls -->
  </div>
  <!-- /.form__row -->
</template>

<script>
import vSelect from 'vue-select';

export default {
  name: 'FormRow',

  props: {
    type: {
      type: String,
      default: 'text',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    tabindex: {
      type: Number,
      default: 0,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    vSelect,
  },

  data: function() {
    return {
      isOpened: false,
    };
  },

  methods: {
    handleChange(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>
