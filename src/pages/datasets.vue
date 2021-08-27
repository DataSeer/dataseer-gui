<template>
  <div class="main main--dataset">
    <div class="shell">
      <div class="dataset">
        <div class="dataset__row">
          <div class="dataset__left">
            <div class="dataset__left-inner">
              <div class="intro" v-if="intro">
                <div class="intro__head">
                  <h3>
                    WELCOME TO DATASEER
                    
                    <span>Let’s Get Started</span>
                  </h3>
                  
                  <figure>
                    <img src="@/assets/images/intro-img@2x.png" alt="">
                  </figure>
                </div><!-- /.intro__head -->

                <div class="intro__body">
                  <div class="intro__text">
                    <Icon name="arrow_up" />
                    <p>These swatches represent passages in the document which DataSeer thinks need a reference dataset</p>
                    <p>Click on one, then review the corresponding form to complete each dataset</p>
                  </div><!-- /.intro__text -->
                  
                  <div class="intro__text">
                    <Icon name="arrow_down" />
                    <p>If you want to merge datasets together, or add new datasets, use these tools at the bottom</p>
                    <p>Finally, once all the datasets are accounted for, you can Complete Document in the top right to review your Data Availability Report.</p>
                  </div><!-- /.intro__text -->
                  <div class="intro__cta">
                    <ul>
                      <li>
                        <Button @click="handleStart">Great! Let’s Go</Button>
                      </li>
                      
                      <li>
                        <Button className="tertiary">I need some help</Button>
                      </li>
                    </ul>
                  </div><!-- /.intro__cta -->
                </div><!-- /.intro__body -->
              </div><!-- /.intro -->

              <Tabs @tabSelected="intro=false" :start="start">
                <Tab name="1" tooltip="This Dataset Name Is Too Lon…">
                  <div class="form__heading">
                    <div class="form__heading-col">
                      <h5>
                        <a href="#">Dataset-6</a>
                      </h5>
                    </div><!-- /.form__heading-col -->
                    <div class="form__heading-col">
                      Incomplete Dataset 6
                    </div><!-- /.form__heading-col -->
                  </div><!-- /.form__heading -->
                  <FormDataset />
                </Tab>
                <Tab name="2" tooltip="This Dataset Name Is Too Lon…">
                  <h1>How much we do it for</h1>
                </Tab>
                <Tab name="3" tooltip="This Dataset Name Is Too Lon…">
                  <h1>Why we do it</h1>
                </Tab>
                <Tab name="4" tooltip="This Dataset Name Is Too Lon…">
                  <h1>How much we do it for</h1>
                </Tab>
                <Tab name="5" tooltip="This Dataset Name Is Too Lon…">
                  <h1>Why we do it</h1>
                </Tab>
                <Tab name="6" tooltip="This Dataset Name Is Too Lon…">
                  <h1>How much we do it for</h1>
                </Tab>
                <Tab name="7" tooltip="This Dataset Name Is Too Lon…">
                  <h1>Why we do it</h1>
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
import Button from '@/components/button/button';
import Tabs from '@/components/tabs/tabs';
import Tab from '@/components/tabs/tab';
import Icon from '@/components/icon/icon.vue';
import FormDataset from '@/blocks/form-dataset/form-dataset.vue';
import DatasetUtils from '@/components/datasets-utils/datasets-utils.vue';
import PDF from '@/blocks/pdf/pdf.vue';

export default {
	name: 'Datasets',

  data: function() {
    return {
      source: '/test.pdf',
      intro: true,
      start: false
    }
  },

  components: {
    Button,
    Tabs,
    Tab,
    Icon,
    FormDataset,
    DatasetUtils,
    PDF
  },

  methods: {
    handleStart() {
      this.start = true;
      this.intro = false;
    }
  }
}
</script>
