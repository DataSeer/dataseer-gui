<template>
  <div class="main main--documents">
    <div class="shell">
      <div class="documents">
          <vuetable ref="vuetable"
            :fields="columns"
            :api-mode="false"
            :sort-order="sortOrder"
            :data="documents"
          ></vuetable>
          <Button alt>Upload new Document</Button>
      </div><!-- /.documents -->
    </div><!-- /.shell -->  
  </div><!-- /.main -->
</template>

<script>
import Vuetable from 'vuetable-2';
import Button from '@/components/button/button.vue';

export default {
  name: "Documents",

  components: {
    Vuetable,
    Button
  },

  data: function() {
    return {
      sortOrder: [
        {
          field: "Title",
        }
      ],
      columns: [
        {
          name: 'Title',
          sortField: 'Title',
        }, 
        'Author', 
        'Journal', 
        'File', 
        'Uploaded', 
        'Modified', 
        'Status', 
        'Action'
      ],
      documents: [
        {
          id: 1,
          Title: 'Implementation of the Operating Room Black Box Research Program at the Ottowa Hospital Through Patient, Clinic Organizational Engagement: Case Study',
          Author: 'Laura Leadauthor',
          Journal: 'Journal of Medical Internet Research',
          File: 'my_uploaded-filename.pdf',
          Uploaded: '2021-06-12',
          Modified: '2021-06-12',
          Status: 'Validating Datasets',
          Action: '<a class="btn btn--tertiary btn--block" href="#">Continue</a>',
        },
        {
          id: 2,
          Title: 'Some Other Research Program at the Ottowa Hospital Through Patient, Clinic Organizational With A really Long Title That Goes  150 Characters So It Gets Cut O…',
          Author: 'Laura Leadauthor',
          Journal: 'Journal of Medical Internet Research',
          File: 'uploaded-file.pdf',
          Uploaded: '2021-06-12',
          Modified: '2021-06-12',
          Status: 'Document Complete',
          Action: '<a class="btn btn--tertiary btn--block" href="#">View Report</a>',
        },
        {
          id: 3,
          Title: 'This Document Has  A Very Short Title',
          Author: 'Laura Leadauthor',
          Journal: 'Journal of Medical Internet Research',
          File: 'a-longer-filename-would-be-cut…',
          Uploaded: '2021-06-12',
          Modified: '2021-06-12',
          Status: 'Document Complete',
          Action: '<a class="btn btn--tertiary btn--block" href="#">View Report</a>',
        }
      ]
    }
  }
}
</script>
