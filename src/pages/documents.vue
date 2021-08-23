<template>
  <div class="main main--documents">
    <div class="shell">
      <div class="documents">
        <div class="documents__inner" v-if="layout === 'LIST'">
          <vuetable ref="vuetable"
            :fields="columns"
            :api-mode="false"
            :data-manager="dataManager"
          ></vuetable>
        
          <div class="documents__actions">
            <router-link class='btn btn--tertiary' to="/new-document">Upload new Document</router-link>
          </div><!-- /.documents__actions -->
        </div><!-- /.documents__inner -->

        <div class="boxes" v-else>
          <ul>
            <li>
              <div class="box">
                <div class="box__head">
                  <ul>
                    <li>
                      <i class="icon"></i> <strong>L. Leadauthor</strong>
                    </li>

                    <li>
                      <a href="http://www.africau.edu/images/default/sample.pdf" target="_blank">my_uploaded-filename.pdf</a>
                    </li>
                  </ul>

                  <h6 class="box__title">Implementation of the Operating Room Black Box Research Program at the Ottowa Hospital Through Patient, Clinic Organizational Engagement: Case Study</h6><!-- /.box__title -->

                  <div class="box__journal">
                    <strong>Journal of Medical Internet Research</strong>
                  </div><!-- /.box__journal -->
                </div><!-- /.box__head -->

                <div class="box__body">
                  <div class="box__status box__status--validating">
                    <p><strong>STATUS</strong> <span>Validating Datasets</span></p>

                    <div class="box__status-bar">
                      <span style="width: 40%"></span>
                    </div><!-- /.box__status-bar -->
                  </div><!-- /.box__status -->

                  <div class="box__date">
                    <ul>
                      <li>
                        <strong>uploaded</strong> <span>2021-06-12</span>
                      </li>

                      <li>
                        <strong>modified</strong> <span>2021-06-18</span>
                      </li>
                    </ul>
                  </div><!-- /.box__date -->
                </div><!-- /.box__body -->

                <div class="box__actions">
                  <ul>
                    <li>
                      <a href="#" class="btn btn--secondary">Continue</a>
                    </li>
                  </ul>

                  <div class="box__dropdown">
                    <Dropdown>
                      <template #header>
                        <span class="dropdown__button"></span>
                      </template>

                      <ul class="dropdown__nav">
                        <li>
                          <router-link to="/profile">User Profile</router-link>
                        </li>

                        <li>
                          <a href="#">Invite By Email</a>
                        </li>

                        <li>
                          <a href="#">Get A Share Link</a>
                        </li>

                        <li>
                          <a href="#">View Uploaded File</a>
                        </li>
                      </ul>
                    </Dropdown>
                  </div><!-- /.box__dropdown -->

                </div><!-- /.box__actions -->
              </div><!-- /.box -->
            </li>

            <li>
              <div class="box">
                <div class="box__head">
                  <ul>
                    <li>
                      <i class="icon"></i> <strong>L. Leadauthor</strong>
                    </li>

                    <li>
                      <a href="http://www.africau.edu/images/default/sample.pdf" target="_blank">my_uploaded-filename.pdf</a>
                    </li>
                  </ul>

                  <h6 class="box__title">Some Other Research Program at the Ottowa Hospital Through Patient, Clinic Organizational With A really Long Title That Goes  150 Characters So It Gets Cut O…</h6><!-- /.box__title -->

                  <div class="box__journal">
                    <strong>Journal of Medical Internet Research</strong>
                  </div><!-- /.box__journal -->
                </div><!-- /.box__head -->

                <div class="box__body">
                  <div class="box__status box__status--complete">
                    <p><strong>STATUS</strong> <span>Document Complete</span></p>

                    <div class="box__status-bar">
                      <span style="width: 100%"></span>
                    </div><!-- /.box__status-bar -->
                  </div><!-- /.box__status -->

                  <div class="box__date">
                    <ul>
                      <li>
                        <strong>uploaded</strong> <span>2021-04-02</span>
                      </li>

                      <li>
                        <strong>modified</strong> <span>2021-04-11</span>
                      </li>
                    </ul>
                  </div><!-- /.box__date -->
                </div><!-- /.box__body -->

                <div class="box__actions">
                  <ul>
                    <li>
                      <a href="#" class="btn btn--secondary">Continue</a>
                    </li>
                    
                    <li>
                      <a href="#" class="btn btn--tertiary">Edit</a>
                    </li>
                  </ul>

                  <div class="box__dropdown">
                    <Dropdown>
                      <template #header>
                        <span class="dropdown__button"></span>
                      </template>

                      <ul class="dropdown__nav">
                        <li>
                          <router-link to="/profile">User Profile</router-link>
                        </li>

                        <li>
                          <a href="#">Invite By Email</a>
                        </li>

                        <li>
                          <a href="#">Get A Share Link</a>
                        </li>

                        <li>
                          <a href="#">View Uploaded File</a>
                        </li>
                      </ul>
                    </Dropdown>
                  </div><!-- /.box__dropdown -->

                </div><!-- /.box__actions -->
              </div><!-- /.box -->
            </li>

            <li>
              <div class="box">
                <div class="box__head">
                  <ul>
                    <li>
                      <i class="icon"></i> <strong>L. Leadauthor</strong>
                    </li>

                    <li>
                      <a href="http://www.africau.edu/images/default/sample.pdf" target="_blank">a-longer-filename-would-be-cut-off-after…</a>
                    </li>
                  </ul>

                  <h6 class="box__title">This Document Has  A Very Short Title</h6><!-- /.box__title -->

                  <div class="box__journal">
                    <strong>Journal of Medical Internet Research</strong>
                  </div><!-- /.box__journal -->
                </div><!-- /.box__head -->

                <div class="box__body">
                  <div class="box__status box__status--complete">
                    <p><strong>STATUS</strong> <span>Document Complete</span></p>

                    <div class="box__status-bar">
                      <span style="width: 100%"></span>
                    </div><!-- /.box__status-bar -->
                  </div><!-- /.box__status -->

                  <div class="box__date">
                    <ul>
                      <li>
                        <strong>uploaded</strong> <span>2021-01-19</span>
                      </li>

                      <li>
                        <strong>modified</strong> <span>2021-01-21</span>
                      </li>
                    </ul>
                  </div><!-- /.box__date -->
                </div><!-- /.box__body -->

                <div class="box__actions">
                  <ul>
                    <li>
                      <a href="#" class="btn btn--secondary">Continue</a>
                    </li>
                    
                    <li>
                      <a href="#" class="btn btn--tertiary">Edit</a>
                    </li>
                  </ul>

                  <div class="box__dropdown">
                    <Dropdown>
                      <template #header>
                        <span class="dropdown__button"></span>
                      </template>

                      <ul class="dropdown__nav">
                        <li>
                          <router-link to="/profile">User Profile</router-link>
                        </li>

                        <li>
                          <a href="#">Invite By Email</a>
                        </li>

                        <li>
                          <a href="#">Get A Share Link</a>
                        </li>

                        <li>
                          <a href="#">View Uploaded File</a>
                        </li>
                      </ul>
                    </Dropdown>
                  </div><!-- /.box__dropdown -->

                </div><!-- /.box__actions -->
              </div><!-- /.box -->
            </li>

            <li>
              <div class="box box--upload">
                <figure>
                  <img src="css/images/temp/" alt="">
                </figure>
                
                <a href="#" class="btn btn--tertiary">Upload new Document</a>
              </div><!-- /.box box-/-upload -->
            </li>
          </ul>
        </div><!-- /.boxes -->
      </div><!-- /.documents -->
    </div><!-- /.shell -->  
  </div><!-- /.main -->
</template>

<script>
import Vuetable from 'vuetable-2';
import Dropdown from '@/components/dropdown/dropdown'

export default {
  name: "Documents",

  components: {
    Vuetable,
    Dropdown
  },

  data: function() {
    return {
      layout: 'GRID',
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
