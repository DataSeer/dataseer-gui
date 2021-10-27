<template>
  <div class="subheader__inner" tabindex="0" aria-labelledby="subheader-title">
    <div class="subheader__left">
      <div class="subheader__document">
        <Icon name="document" />
        
        <ul>
          <li><strong>L. Leadauthor</strong></li>
          
          <li>
            <a href="#">my_uploaded-filename.pdf</a>
          </li>
        </ul>

        <h6 id="subheader-title" @click.prevent="toggleSummary">Implementation of the Operating Room Black Box Research Program at the O ttowa Hospital Through Patient, Clinic Organizational Engagement: Case Study</h6>
        
        <Dropdown>
          <template #header>
            <span class="btn-dropdown"></span>
          </template>

          <ul class="dropdown__nav">
            <li>
              <a href="#" @click.prevent="toggleSummary">
                <Icon name="view_list" color="currentColor" />
                
                Document Summary
              </a>
            </li>

            <li>

              <a href="#">
                <Icon name="invite" color="currentColor" />
                
                Invite By Email
              </a>
            </li>

            <li>

              <a href="#">
                <Icon name="share" color="currentColor" />
                
                Get A Share Link
              </a>
            </li>

            <li>
              <a href="#">
                <Icon name="document_view" color="currentColor" />
                
                View Uploaded File
              </a>
            </li>
          </ul>
        </Dropdown>
      </div><!-- /.subheader__document -->
    </div><!-- /.subheader__left -->

    <div class="subheader__right">
      <div class="subheader__menu">
        <ul>
          <li>
            <div class="document-status">
              <ul>
                <li>
                  <span>1</span> of 7 Completed
                </li>
                
                <li>
                  <Icon name="check" color="#66AE2E"></Icon>
                  
                  Auto-Saved
                </li>
              </ul>
            </div><!-- /.document-status -->
          </li>
          
          <li><Button className="tertiary" disabled>Complete <span>Document</span></Button></li>
        </ul>
      </div><!-- /.subheader__menu -->
    </div><!-- /.subheader__right -->

    <transition name="summary">
      <div class="summary" v-if="showSummary">
        <div class="shell">
          <div class="summary__inner">
            <div class="summary__content">
              <div class="summary__head">
                <h3 class="summary__title">Document Summary</h3>
              </div><!-- /.summary__head -->

              <div class="summary__body">
                <div class="summary__body-aside">
                  <ul>
                    <li>
                      <h6>Title</h6>

                      <p>Implementation of the Operating Room Black Box Research Program at the Ottowa Hospital Through Patient, Clinic Organizational Engagement: Case Study</p>
                    </li>

                    <li>
                      <h6>Journal</h6>

                      <p>Journal of Medical Internet Research</p>
                    
                      <h6>Publisher</h6>

                      <p>JMIR Publications Inc.</p>
                    
                      <h6>Publication Date</h6>

                      <p>2021-03-16</p>
                    
                      <h6>DOI</h6>

                      <p>10.2196/15443</p>
                    </li>
                  </ul>

                  <a href="#" class="btn btn--tertiary btn--block">This data is incorrect</a>
                </div><!-- /.summary__body-aside -->

                <div class="summary__body-content">
                  <div class="summary__authors">
                    <h6>Authors (10)</h6>

                    <ul>
                      <li>
                        <h6>Laura Leadauthor <span>(leadauthor@toh.ca)</span></h6>

                        Department of Anesthesiology and Pain Medicine University of Ottawa, Ottawa, Canada
                        Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa, Canada
                        Department of Innovation in Medical Education University of Ottawa, Ottawa, Canada
                        Faculty of Medicine Francophone Affairs University of Ottawa, Ottawa, Canada
                      </li>

                      <li>
                        <h6>Nicole Etherington</h6>

                        Department of Anesthesiology and Pain Medicine University of Ottawa, Ottawa, Canada
                        Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa, Canada
                      </li>

                      <li>
                        <h6>Sandy Lam</h6>

                        Department of Anesthesiology and Pain Medicine University of Ottawa, Ottawa, Canada
                        Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa, Canada
                      </li>

                      <li>
                        <h6>Maxime Lê</h6>

                        Patient and Family Advisory Council The Ottawa Hospital, Ottawa, Canada
                      </li>

                      <li>
                        <h6>Laurie Proulx</h6>

                        Patient and Family Advisory Council The Ottawa Hospital, Ottawa, Canada
                      </li>

                      <li>
                        <h6>Meghan Britton</h6>

                        Main Operating Room The Ottawa Hospital, Ottawa, Canada
                      </li>

                      <li>
                        <h6>Julie Kenna</h6>

                        Main Operating Room The Ottawa Hospital, Ottawa, Canada
                      </li>

                      <li>
                        <h6>Antoine Przybylak-Brouillard</h6>

                        Department of Anesthesiology and Pain Medicine University of Ottawa, Ottawa, Canada
                        Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa, Canada
                      </li>

                      <li>
                        <h6>Jeremy Grimshaw</h6>

                        Clinical Epidemiology Program Ottawa Hospital Research Institute, Ottawa, Canada
                      </li>

                      <li>
                        <h6>Teodor Grantcharov</h6>

                        Department of General Surgery University of Toronto, Toronto, Canada
                        Li Ka Shing Knowledge Institute St. Michael's Hospital, Toronto, Canada
                      </li>

                      <li>
                        <h6>Sukhbir Singh</h6>

                        Department of Obstetrics, Gynecology, and Newborn Care University of Ottawa, Ottawa, Canada
                      </li>
                    </ul>
                  </div><!-- /.summary__authors -->
                </div><!-- /.summary__body-content -->
              </div><!-- /.summary__body -->
            </div><!-- /.summary__content -->

            <div class="summary__aside">
              <h4>Invite Collaborators</h4>

              <ul>
                <li>
                  <a href="#">
                    <span>
                      <Icon name="invite" color="currentColor" />
                    </span>

                    Send Email
                  </a>
                </li>

                <li>
                  <a href="#">
                    <span>
                      <Icon name="share" color="currentColor" />
                    </span>

                    Get A Link
                  </a>
                </li>

                <li>
                  <a href="#">
                    <span>
                      <Icon name="document_view" color="currentColor" />
                    </span>

                    Open File
                  </a>
                </li>
              </ul>

              <BtnClose @onClick='toggleSummary' label="Close Summary" />
            </div><!-- /.summary__aside -->
          </div><!-- /.summary__inner -->
        </div><!-- /.shell -->
      </div><!-- /.summary -->
    </transition>
  </div><!-- /.subheader__inner -->
</template>

<script>
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button.vue'
import Dropdown from '@/components/dropdown/dropdown';
import BtnClose from '@/components/btn-close/btn-close';

export default {
  name: "SubheaderDatasets",

  data: function() {
    return {
      showSummary: false
    }
  },
  
  components: { 
    Icon,
    Button,
    Dropdown,
    BtnClose
  },
  
  methods: {
    toggleSummary() {
        console.log('dasdasdasd');
        this.showSummary = !this.showSummary;
    }
  }
}
</script>
