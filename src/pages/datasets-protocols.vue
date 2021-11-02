<template>
  <div class="main main--dataset">
    <div class="shell">
      <div class="dataset-primary dataset-primary--protocols">
        <div class="dataset__row">
          <div class="dataset__left">
            <div class="dataset__left-inner">
              <div class="intro" v-if="intro">
                <div class="intro__head">
                  <h3>No Materials Yet

                    <span>Need to Add Some?</span>
                  </h3>
                  
                  <figure>
                    <img src="@/assets/images/intro-img@2x.png" alt="Example Image Title">
                  </figure>
                </div><!-- /.intro__head -->

                <div class="intro__body">
                  <div class="intro__about">
                    <p>Our AI has not detected any Materials in this document. </p>

                    <p><Icon name="arrow_up" color="#8CABCD" /> If you want to add some, first select a text passage in the document which references Materials</p>
                    
                    <p>
                      <Icon name="arrow_down" color="#8CABCD" />

                      Then click the <Icon name="add" color="currentColor" /> “Add” button below
                    </p>

                    <p>
                      <Button className="tertiary">I need more help</Button>
                    </p>
                  </div><!-- /.intro__about -->

                  <div class="intro__tip">
                    <h6>Pro-Tip</h6>

                    <p>If multiple text passages make reference to the same Materials, you can shift+click to select more than one</p>
                    
                    <p>Additionally, you can add more text passgaes later by using the “Connect Text” button</p>
                  </div><!-- /.intro__tip -->
                </div><!-- /.intro__body -->
              </div><!-- /.intro -->

              <Tabs v-if="!intro">
                <Tab completed tooltip="This Dataset Name Is Too Lon…">
                  <div class="form__heading">
                    <div class="form__heading-col">
                      <h5>Protocol Section Heading Text</h5>
                    </div><!-- /.form__heading-col -->
                  </div><!-- /.form__heading -->
                  
                  <FormDataset />
                </Tab>
                
                <Tab tooltip="This Dataset Name Is Too Lon…">
                  <div class="form__heading">
                    <div class="form__heading-col">
                      <h5>How much we do it for</h5>
                    </div><!-- /.form__heading-col -->
                    
                    <div class="form__heading-col">
                      Code/Software
                    </div><!-- /.form__heading-col -->
                  </div><!-- /.form__heading -->
                </Tab>
                
                <Tab tooltip="This Dataset Name Is Too Lon…">
                  <div class="form__heading">
                    <div class="form__heading-col">
                      <h5>Why we do it</h5>
                    </div><!-- /.form__heading-col -->
                    
                    <div class="form__heading-col">
                      Code/Software
                    </div><!-- /.form__heading-col -->
                  </div><!-- /.form__heading -->
                </Tab>
                
                <Tab tooltip="This Dataset Name Is Too Lon…">
                  <div class="form__heading">
                    <div class="form__heading-col">
                      <h5>How much we do it for</h5>
                    </div><!-- /.form__heading-col -->
                    
                    <div class="form__heading-col">
                      Code/Software
                    </div><!-- /.form__heading-col -->
                  </div><!-- /.form__heading -->
                </Tab>
                
                <Tab tooltip="This Dataset Name Is Too Lon…">
                  <div class="form__heading">
                    <div class="form__heading-col">
                      <h5>Why we do it</h5>
                    </div><!-- /.form__heading-col -->
                    
                    <div class="form__heading-col">
                      Code/Software
                    </div><!-- /.form__heading-col -->
                  </div><!-- /.form__heading -->
                </Tab>
                
                <Tab tooltip="This Dataset Name Is Too Lon…">
                  <div class="form__heading">
                    <div class="form__heading-col">
                      <h5>How much we do it for</h5>
                    </div><!-- /.form__heading-col -->
                    
                    <div class="form__heading-col">
                      Code/Software
                    </div><!-- /.form__heading-col -->
                  </div><!-- /.form__heading -->
                </Tab>
                
                <Tab tooltip="This Dataset Name Is Too Lon…">
                  <div class="form__heading">
                    <div class="form__heading-col">
                      <h5>Why we do it</h5>
                    </div><!-- /.form__heading-col -->
                    
                    <div class="form__heading-col">
                      Code/Software
                    </div><!-- /.form__heading-col -->
                  </div><!-- /.form__heading -->
                </Tab>
              </Tabs>
            </div><!-- /.dataset__left-inner -->
            
            <DatasetUtils />
          </div><!-- /.dataset__left -->

          <div class="dataset__right">
            <div class="pdf-holder">
              <PDF />
            </div><!-- /.pdf-holder -->
          </div><!-- /.dataset__right -->
        </div><!-- /.dataset__row -->
      </div><!-- /.dataset -->
    </div><!-- /.shell -->
  </div><!-- /.main -->
</template>

<script>
import Icon from '@/components/icon/icon';
import Button from '@/components/button/button';
import Tabs from '@/components/tabs/tabs';
import Tab from '@/components/tabs/tab';
import FormDataset from '@/blocks/form-dataset/form-dataset.vue';
import DatasetUtils from '@/components/datasets-utils/datasets-utils.vue';
import PDF from '@/blocks/pdf/pdf.vue';

export default {
	name: 'Datasets',

  data: function() {
    return {
      source: '/test.pdf',
      intro: false,
    }
  },

  components: {
    Icon,
    Button,
    Tabs,
    Tab,
    FormDataset,
    DatasetUtils,
    PDF
  },
}
</script>
