<template>
  <div class="subheader">
    <SubheaderDocuments v-if="isDocumentsPage" />
  </div><!-- /.subheader -->
</template>

<script>
import SubheaderDocuments from '@/components/subheader/subheader-documents.vue';

export default {
  name: "Subheader",

  components: { 
    SubheaderDocuments 
  },

  computed: {
    isDocumentsPage() {
      return this.$route.path === '/documents';
    }
  },
}
</script>
