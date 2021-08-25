<template>
  <div class="subheader__inner">
    <div class="subheader__left">

      <div class="subheader__document">
        <Icon name="document" />
        
        <ul>
          <li><strong>L. Leadauthor</strong></li>
          
          <li>
            <a href="#">my_uploaded-filename.pdf</a>
          </li>
        </ul>

        <h6>Implementation of the Operating Room Black Box Research Program at the O ttowa Hospital Through Patient, Clinic Organizational Engagement: Case Study</h6>
        
        <Dropdown>
          <template #header>
            <span class="dropdown__button"></span>
          </template>

          <ul class="dropdown__nav">
            <li>
              <a href="#" @click.prevent="toggleSummary">
                <Icon name="view_list" />
                
                Document Summary
              </a>
            </li>

            <li>

              <a href="#">
                <Icon name="invite" />
                
                Invite By Email
              </a>
            </li>

            <li>

              <a href="#">
                <Icon name="share" />
                
                Get A Share Link
              </a>
            </li>

            <li>
              <a href="#">
                <Icon name="view" />
                
                View Uploaded File
              </a>
            </li>
          </ul>
        </Dropdown>
      </div><!-- /.subheader__document -->
    </div><!-- /.subheader__left -->

    <div class="subheader__right">
      <div class="document-status">
        <ul>
          <li>
            <span>1</span> of 7 Completed
          </li>
          
          <li>
            <Icon name="check"></Icon>
            
            Auto-Saved
          </li>
        </ul>
      
      </div><!-- /.document-status -->
      <Button className="tertiary" disabled>Complete Document</Button>
    </div><!-- /.subheader__right -->

    <div class="summary" v-if="showSummary">
      <div class="shell">
        <div class="summary__inner">
          <div class="summary__content">
            <div class="summary__head">
              <h3>Document Upload Summary</h3>

              <p>Please review the data shown below and confirm if it is correct</p>
            </div><!-- /.summary__head -->

            <div class="summary__body">
              <div class="summary__body-aside">
                <ul>
                  <li>
                    <h6>Journal</h6>

                    Journal of Medical Internet Research
                  </li>
                  
                  <li>
                    <h6>Publisher</h6>

                    JMIR Publications Inc.
                  </li>
                  
                  <li>
                    <h6>Publication Date</h6>

                    2021-03-16
                  </li>
                  
                  <li>
                    <h6>DOI</h6>

                    10.2196/15443
                  </li>
                </ul>
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

                <div class="summary__actions">
                  <ul>
                    <li>
                      <a href="#" class="btn btn--block" @click.prevent="toggleSummary">This Data Looks Good, Continue</a>
                    </li>

                    <li>
                      <a href="#" class="btn btn--tertiary btn--block">Something is wrong with this data</a>
                    </li>
                  </ul>
                </div><!-- /.summary__actions -->
              </div><!-- /.summary__body-content -->
            </div><!-- /.summary__body -->
          </div><!-- /.summary__content -->

          <div class="summary__aside">
            <h4>Invite Collaborators</h4>

            <ul>
              <li>
                <a href="#">
                  <span>
                    <Icon name="invite" />
                  </span>

                  Send Email
                </a>
              </li>

              <li>
                <a href="#">
                  <span>
                    <Icon name="share" />
                  </span>

                  Get A Link
                </a>
              </li>

              <li>
                <a href="#">
                  <span>
                    <Icon name="view" />
                  </span>

                  Open File
                </a>
              </li>
            </ul>
          </div><!-- /.summary__aside -->
        </div><!-- /.summary__inner -->
      </div><!-- /.shell -->
    </div><!-- /.summary -->
  </div><!-- /.subheader__inner -->
</template>

<script>
import Button from '@/components/button/button.vue'
import Icon from '@/components/icon/icon';
import Dropdown from '@/components/dropdown/dropdown';

export default {
  name: "SubheaderDatasets",

  data: function() {
    return {
      showSummary: false
    }
  },
  
  components: { 
    Dropdown,
    Button,
    Icon
  },
  
  methods: {
    toggleSummary() {
        this.showSummary = !this.showSummary;
    }
  }
}
</script>
