<template>
  <div class="main main--dataset">
    <div class="shell">
      <div class="dataset-primary dataset-primary--code">
        <div class="dataset__row">
          <div class="dataset__left">
            <div class="dataset__left-inner">
              <Tabs>
                <Tab completed tooltip="This Dataset Name Is Too Lon…">
                  <div class="form__heading">
                    <div class="form__heading-col">
                      <h5>R v4.2.1</h5>
                    </div><!-- /.form__heading-col -->
                    
                    <div class="form__heading-col">
                      Code/Software
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
    Tabs,
    Tab,
    FormDataset,
    DatasetUtils,
    PDF
  },
}
</script>
