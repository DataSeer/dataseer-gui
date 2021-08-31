<template>
  <ul class="datasets-utils">
    <li>
      <a href="#" v-tooltip.right="mergeText">
        <Icon name="merge" color="#006AC9" />
      </a>
    </li>
    <li>
      <a href="#" v-tooltip.right="addText">
        <Icon name="add" color="#006AC9" />
      </a>
    </li>
  </ul><!-- /.datasets-utils -->
</template>

<script>
import Icon from '@/components/icon/icon.vue';

export default {
  name: "DatasetsUtils",

  components: {
    Icon
  },

  data: function() {
    return {
      mergeText: 'Merge existing datasets',
      addText: 'Add New Dataset'
    }
  }
}
</script>
