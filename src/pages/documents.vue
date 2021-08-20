<template>
  <div class="main main--documents">
    <div class="shell">
      <div class="documents">
          <vuetable ref="vuetable"
            :fields="columns"
            :api-mode="false"
            :data-manager="dataManager"
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
      columns: [
        {
          name: 'title',
          field: "title",
          sortField: 'title'
        }, 
        'Author', 
        'Journal', 
        'File', 
        'Uploaded', 
        'Modified', 
        'Status', 
        'Action'
      ],
      docs: [
        {
          id: 1,
          title: 'Implementation of the Operating Room Black Box Research Program at the Ottowa Hospital Through Patient, Clinic Organizational Engagement: Case Study',
          Author: 'Laura Leadauthor',
          Journal: 'Journal of Medical Internet Research',
          File: 'http://www.africau.edu/images/default/sample.pdf',
          Uploaded: '2021-06-12',
          Modified: '2021-06-12',
          Status: 'Validating Datasets',
          Action: '<a class="btn btn--tertiary btn--block" href="#">Continue</a>',
        },
        {
          id: 2,
          title: 'Some Other Research Program at the Ottowa Hospital Through Patient, Clinic Organizational With A really Long title That Goes  150 Characters So It Gets Cut O…',
          Author: 'Laura Leadauthor',
          Journal: 'Journal of Medical Internet Research',
          File: 'http://www.africau.edu/images/default/sample.pdf',
          Uploaded: '2021-06-12',
          Modified: '2021-06-12',
          Status: 'Document Complete',
          Action: '<a class="btn btn--tertiary btn--block" href="#">View Report</a>',
        },
        {
          id: 3,
          title: 'This Document Has  A Very Short Title',
          Author: 'Laura Leadauthor',
          Journal: 'Journal of Medical Internet Research',
          File: 'http://www.africau.edu/images/default/sample.pdf',
          Uploaded: '2021-06-12',
          Modified: '2021-06-12',
          Status: 'Document Complete',
          Action: '<a class="btn btn--tertiary btn--block" href="#">View Report</a>',
        }
      ]
    }
  },

  computed: {
    dataModify() {
      return this.docs.map(item => {
        if(item.title) {
          item.title = `<i class="ico-doc"></i> ${item.title}`
        }

        if(item.File) {
          const fileName = item.File.split('/').pop();
          item.File = `<a href="${item.File}">${fileName}</a>`
        }

        return item;
      })
    }
  },

  methods: {
    dataManager(sortOrder) {
      if (!sortOrder.length) {
        return;
      }
      const sort = sortOrder[0].direction;
      this.docs = this.docs.sort((a,b) => {
        if(a.title.toLowerCase() > b.title.toLowerCase()) {
          return sort === 'asc' ? -1 : 1;
        } else if(a.title.toLowerCase() < b.title.toLowerCase()) {
          return sort === 'asc' ? 1 : -1;
        } else {
          return 0
        }
      })
      this.$refs.vuetable.setData(this.dataModify);
    }
  },

  mounted() {
    this.$refs.vuetable.setData(this.dataModify);
  }
}
</script>
