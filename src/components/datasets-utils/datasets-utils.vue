<template>
  <ul class="datasets-utils">
    <li>
      <a href="#" v-tooltip.right="mergeText">
        <Icon name="merge" />
      </a>
    </li>
    <li>
      <a href="#">
        <Icon name="add" />
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
      mergeText: 'Merge existing datasets'
    }
  }
}
</script>
