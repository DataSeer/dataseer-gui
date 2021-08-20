<template>
  <div class="subheader" v-if="isVisible">
    <SubheaderDocuments v-if="isDocumentsPage" />
    <SubheaderDatasets v-if="isDatasheetsPage" />
    <SubheaderProfile v-if="isUserPage" />
  </div><!-- /.subheader -->
</template>

<script>
import SubheaderDocuments from '@/components/subheader/subheader-documents.vue';
import SubheaderDatasets from '@/components/subheader/subheader-datasets.vue';
import SubheaderProfile from './subheader-profile.vue';

export default {
  name: "Subheader",

  components: { 
    SubheaderDocuments,
    SubheaderDatasets,
    SubheaderProfile
  },

  computed: {
    isDocumentsPage() {
      return this.$route.path === '/documents';
    },
    isDatasheetsPage() {
      return this.$route.path === '/datasets';
    },
    isUserPage() {
      return this.$route.path === '/profile';
    },
    isVisible() {
      return this.isDocumentsPage || this.isUserPage || this.isDatasheetsPage;
    }
  },
}
</script>
