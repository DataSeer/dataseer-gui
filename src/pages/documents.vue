 <template>
  <div class="main main--documents">
    <div class="shell">
      <div class="documents">
        <div class="documents__inner" v-if="getDocumentView === 'list'">
          <div class="documents__table">
            <vuetable ref="vuetable"
              :fields="columns"
              :api-mode="false"
              :data-manager="dataManager"
            ></vuetable>
          
            <div class="documents__actions">
              <router-link class='btn btn--tertiary' to="/new-document">Upload new Document</router-link>
            </div><!-- /.documents__actions -->
          </div><!-- /.documents__table -->
        </div><!-- /.documents__inner -->

        <Boxes v-if="getDocumentView === 'grid'">
          <Box v-for="doc in docs" :key="doc.id" :doc="doc"></Box>
        </Boxes>
      </div><!-- /.documents -->
    </div><!-- /.shell -->  
  </div><!-- /.main -->
</template>

<script>
import { mapGetters } from 'vuex'
import Vuetable from 'vuetable-2';

import Box from '@/components/box/box'
import Boxes from '@/components/boxes/boxes'

export default {
  name: "Documents",

  components: {
    Box,
    Boxes,
    Vuetable,
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
          Status: 'Validating',
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
          Status: 'Complete',
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
          Status: 'Complete',
          Action: '<a class="btn btn--tertiary btn--block" href="#">View Report</a>',
        }
      ]
    }
  },

  computed: {
    ...mapGetters([
      'getDocumentView'
      ])
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
    modifyTableData() {
      this.docs = this.docs.map(item => {
        if(item.File) {
          const fileName = item.File.split('/').pop();
          item.File = `<a href="${item.File}" target="_blank">${fileName}</a>`
        }

        if (item.Status){
          var status = item.Status;

          switch (status) {
            case 'Validating':
            item.Status = `<span style="color: #006AC9">Validating Datasets</span>`
            break;
            case 'Alert':
            item.Status = `<span style="color: #E36329">Document Complete</span>`
            break;
            default:
            item.Status = `<span style="color: #66AE2E">Document Complete</span>`
          }
        }

        return item;
      })
    }
  },
  
  mounted() {
    if (this.getDocumentView === 'list') {
      this.modifyTableData();
      this.$refs.vuetable.setData(this.docs);
    }
  },

  updated() {
    if (this.getDocumentView === 'list') {
      this.$refs.vuetable.setData(this.docs);
    }
  }
}
</script>
