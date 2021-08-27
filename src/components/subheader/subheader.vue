<template>
  <div class="subheader" :class="{[`subheader--${additionalClass}`]: additionalClass}" v-if="isVisible">
    <div class="shell">
      <SubheaderDocuments v-if="isDocumentsPage" />
      <SubheaderDatasets v-if="isDatasetsPage" />
      <SubheaderProfile v-if="isUserPage" />
    </div><!-- /.shell -->
  </div><!-- /.subheader -->
</template>

<script>
import SubheaderDocuments from './subheader-documents.vue';
import SubheaderDatasets from './subheader-datasets.vue';
import SubheaderProfile from './subheader-profile.vue';

export default {
  /**
   * Name
  */
  name: "Subheader",

  /**
   * components
  */
  components: { 
    SubheaderDocuments,
    SubheaderDatasets,
    SubheaderProfile
  },

  /**
   * computed
  */
  computed: {
    isDocumentsPage() {
      return this.$route.path === '/documents';
    },
    isDatasetsPage() {
      return this.$route.path === '/datasets';
    },
    isUserPage() {
      return this.$route.path === '/profile';
    },
    isVisible() {
      return this.isDocumentsPage || this.isUserPage || this.isDatasetsPage;
    },
    additionalClass() {
      if(this.isDocumentsPage) {
        return 'documents';
      } else if(this.isDatasetsPage) {
        return 'datasets';
      } else if (this.isUserPage) {
        return 'profile';
      } else {
        return '';
      }
    }
  }
}
</script>
