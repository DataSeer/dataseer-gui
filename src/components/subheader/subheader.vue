<template>
  <div class="subheader" :class="{[`subheader--${additionalClass}`]: additionalClass}" v-if="isVisible">
    <div class="shell">
      <SubheaderDocuments v-if="isDocumentsPage" />
      <SubheaderDatasets v-if="isDatasetsPage" />
      <SubheaderProfile v-if="isUserPage" />
      <SubheaderReport v-if="isReportPage" />
    </div><!-- /.shell -->
  </div><!-- /.subheader -->
</template>

<script>
import SubheaderDocuments from './subheader-documents.vue';
import SubheaderDatasets from './subheader-datasets.vue';
import SubheaderProfile from './subheader-profile.vue';
import SubheaderReport from './subheader-report.vue';

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
    SubheaderProfile,
    SubheaderReport
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
    isReportPage() {
      return this.$route.path === '/data-availability-report';
    },
    isVisible() {
      return this.isDocumentsPage || this.isUserPage || this.isDatasetsPage || this.isReportPage;
    },
    additionalClass() {
      if(this.isDocumentsPage) {
        return 'documents';
      } else if(this.isDatasetsPage) {
        return 'datasets';
      } else if (this.isUserPage) {
        return 'profile';
      } else if (this.isReportPage) {
        return 'report';
      } else {
        return '';
      }
    }
  }
}
</script>
