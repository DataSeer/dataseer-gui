<template>
  <div class="main main--documents">
    <div class="shell">
      <div class="documents">
          <vuetable ref="vuetable"
            :fields="columns"
            :api-mode="false"
            :data-manager="dataManager"
          ></vuetable>

          <router-link class='btn btn--tertiary' to="/new-document">Upload new Document</router-link>
      </div><!-- /.documents -->
    </div><!-- /.shell -->  
  </div><!-- /.main -->
</template>

<script>
import Vuetable from 'vuetable-2';

export default {
  name: "Documents",

  components: {
    Vuetable
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
    
  },

  methods: {
    dataManager(sortOrder) {
      if (!sortOrder.length) {
        return;
      }
      const sort = sortOrder[0].direction;
      this.docs = this.docs.sort((a,b) => {
        const aLower = a.title.toLowerCase();
        const bLower = b.title.toLowerCase();
        if(aLower > bLower) {
          return sort === 'asc' ? -1 : 1;
        } else if(aLower < bLower) {
          return sort === 'asc' ? 1 : -1;
        } else {
          return 0
        }
      })
      this.$refs.vuetable.setData(this.docs);
    },

    dataModify() {
      this.docs = this.docs.map(item => {
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

  mounted() {
    this.dataModify();
    this.$refs.vuetable.setData(this.docs);
  }
}
</script>
